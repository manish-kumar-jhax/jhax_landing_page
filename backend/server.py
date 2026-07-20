from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import math
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from data_source import get_provider, PlaceNotFound, DataSourceError


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="JHAX.ai API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "final_cta"


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    source: str = "final_cta"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "JHAX.ai API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    if not payload.email:
        raise HTTPException(status_code=400, detail="Email required")
    lead = Lead(email=payload.email, source=payload.source or "final_cta")
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['email'] = str(doc['email'])
    await db.leads.insert_one(doc)
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads():
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


# ---------- Free Audit (Google Places) ----------
class AuditRequest(BaseModel):
    name: str
    city: Optional[str] = ""


# --- Heuristic metrics (ESTIMATES, not from the restaurant's POS) ---
#
# These are transparent rules-of-thumb derived only from the two public signals
# Google gives us: star rating and review count. They are returned under an
# `estimated: true` block so the UI can label them as estimates, never as facts.
#
# Health score (0-100): 75% driven by rating quality, 25% by review volume.
#   rating_score   = clamp((rating - 2.5) / 2.5, 0..1)          # 2.5★ -> 0, 5.0★ -> 100
#   volume_score   = clamp(log10(count + 1) / log10(1000), 0..1) # ~1000 reviews -> 100
#   health         = round(0.75 * rating_score + 0.25 * volume_score) * 100
#
# Money lost / week: two additive leaks, both anchored to a typical independent
#   restaurant doing ~$12k/week (ASSUMED_WEEKLY_REVENUE).
#   1. Reputation leak — a Harvard Business School study found ~5-9% revenue swing
#      per star. We use 7% per star below a 4.7 "tables stay full" benchmark:
#        reputation_loss = ASSUMED_WEEKLY_REVENUE * 0.07 * max(0, 4.7 - rating)
#   2. Visibility leak — thin review counts sink you in local search. Below ~150
#      reviews we scale a 3% discoverability penalty by how far short you are:
#        visibility_loss = ASSUMED_WEEKLY_REVENUE * 0.03 * max(0, (150 - count) / 150)
#   money_lost = round(reputation_loss + visibility_loss)
BENCHMARK_RATING = 4.7
ASSUMED_WEEKLY_REVENUE = 12000.0
REVENUE_PER_STAR = 0.07
VISIBILITY_REVIEW_FLOOR = 150
VISIBILITY_PENALTY = 0.03


def _estimate_health_score(rating: Optional[float], review_count: Optional[int]) -> int:
    rating = rating or 0.0
    review_count = review_count or 0
    rating_score = max(0.0, min(1.0, (rating - 2.5) / 2.5))
    volume_score = max(0.0, min(1.0, math.log10(review_count + 1) / math.log10(1000)))
    score = round((0.75 * rating_score + 0.25 * volume_score) * 100)
    return int(max(0, min(100, score)))


def _estimate_money_lost_weekly(rating: Optional[float], review_count: Optional[int]) -> int:
    rating = rating or 0.0
    review_count = review_count or 0
    reputation_loss = ASSUMED_WEEKLY_REVENUE * REVENUE_PER_STAR * max(0.0, BENCHMARK_RATING - rating)
    visibility_loss = 0.0
    if review_count < VISIBILITY_REVIEW_FLOOR:
        shortfall = (VISIBILITY_REVIEW_FLOOR - review_count) / VISIBILITY_REVIEW_FLOOR
        visibility_loss = ASSUMED_WEEKLY_REVENUE * VISIBILITY_PENALTY * shortfall
    return int(round(reputation_loss + visibility_loss))


def _health_label(score: int) -> str:
    if score >= 75:
        return "Good"
    if score >= 50:
        return "Needs work"
    return "At risk"


@api_router.post("/audit")
async def free_audit(payload: AuditRequest):
    name = (payload.name or "").strip()
    if not name:
        raise HTTPException(status_code=400, detail="Restaurant name is required")

    # The active provider (osm by default, google when a key is added) supplies
    # the raw place facts. The heuristic formulas below are unchanged and simply
    # consume rating + review_count from whatever provider is in use.
    provider = get_provider()
    try:
        place = await provider.fetch(name, payload.city or "")
    except PlaceNotFound:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    except DataSourceError as exc:
        logger.error("Audit data-source error: %s", exc)
        raise HTTPException(status_code=502, detail="Place lookup failed")

    rating = place.get("rating")
    review_count = place.get("review_count")

    # --- Estimated / heuristic block (formulas unchanged) ---
    health = _estimate_health_score(rating, review_count)
    money_lost = _estimate_money_lost_weekly(rating, review_count)

    return {
        "found": True,
        "data_source": place.get("data_source", "estimated"),
        "place": {
            "name": place.get("name"),
            "address": place.get("address"),
            "rating": rating,
            "review_count": review_count,
            "opening_hours": place.get("opening_hours") or {"open_now": None, "weekday_text": []},
            "top_reviews": place.get("top_reviews") or [],
        },
        "estimated": {
            "estimated": True,
            "health_score": health,
            "health_label": _health_label(health),
            "money_lost_weekly": money_lost,
            "basis": (
                f"Estimated from rating "
                f"({rating if rating is not None else 'n/a'}★) and "
                f"{review_count if review_count is not None else 0} reviews. "
                f"Benchmark {BENCHMARK_RATING}★, ~{int(REVENUE_PER_STAR * 100)}% weekly revenue per star."
            ),
        },
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
