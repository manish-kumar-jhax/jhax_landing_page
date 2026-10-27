from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy import select
import os
import math
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from data_source import get_provider, PlaceNotFound, DataSourceError
from db import async_session, init_db, dispose_db, LeadORM, StatusCheckORM, DemoRequestORM


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

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
    business_name: Optional[str] = None
    person_name: Optional[str] = None
    phone: Optional[str] = None


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    source: str = "final_cta"
    business_name: Optional[str] = None
    person_name: Optional[str] = None
    phone: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class DemoRequestCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    phone: str = Field(min_length=1, max_length=64)
    restaurant: str = Field(min_length=1, max_length=255)
    locations: str = Field(min_length=1, max_length=32)
    pos: str = Field(default="", max_length=64)
    notes: str = Field(default="", max_length=2000)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "JHAX.ai API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    async with async_session() as session:
        session.add(StatusCheckORM(
            id=status_obj.id,
            client_name=status_obj.client_name,
            timestamp=status_obj.timestamp,
        ))
        await session.commit()
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    async with async_session() as session:
        rows = (await session.execute(select(StatusCheckORM))).scalars().all()
    return [
        StatusCheck(id=r.id, client_name=r.client_name, timestamp=r.timestamp)
        for r in rows
    ]


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    if not payload.email:
        raise HTTPException(status_code=400, detail="Email required")
    lead = Lead(
        email=payload.email,
        source=payload.source or "final_cta",
        business_name=payload.business_name,
        person_name=payload.person_name,
        phone=payload.phone,
    )
    async with async_session() as session:
        session.add(LeadORM(
            id=lead.id,
            email=str(lead.email),
            source=lead.source,
            business_name=lead.business_name,
            person_name=lead.person_name,
            phone=lead.phone,
            created_at=lead.created_at,
        ))
        await session.commit()
    return lead


@api_router.post("/demo-requests")
async def create_demo_request(payload: DemoRequestCreate):
    """Store a demo booking in `demo_requests`; the admin console reads it from there."""
    req_id = str(uuid.uuid4())
    async with async_session() as session:
        session.add(DemoRequestORM(
            id=req_id,
            name=payload.name.strip(),
            email=str(payload.email),
            phone=payload.phone.strip(),
            restaurant=payload.restaurant.strip(),
            locations=payload.locations.strip(),
            pos=payload.pos.strip(),
            notes=payload.notes.strip(),
            market="us",
            status="new",
            created_at=datetime.now(timezone.utc),
        ))
        await session.commit()
    return {"id": req_id, "status": "new"}


@api_router.get("/leads", response_model=List[Lead])
async def list_leads():
    async with async_session() as session:
        rows = (
            await session.execute(select(LeadORM).order_by(LeadORM.created_at.desc()))
        ).scalars().all()
    return [
        Lead(
            id=r.id,
            email=r.email,
            source=r.source,
            business_name=r.business_name,
            person_name=r.person_name,
            phone=r.phone,
            created_at=r.created_at,
        )
        for r in rows
    ]


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

# CORS. CORS_ORIGINS is a comma-separated list of allowed frontend origins, e.g.
#   "https://jhax-landing.vercel.app,http://localhost:3000"
# Use "*" to allow any origin. Note: a literal "*" in allow_origins can't be sent
# together with credentials, so when "*" is requested we reflect the caller's
# origin via allow_origin_regex instead (works with allow_credentials=True).
_cors_origins = [o.strip() for o in os.environ.get('CORS_ORIGINS', '*').split(',') if o.strip()]
_allow_all_origins = '*' in _cors_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=[] if _allow_all_origins else _cors_origins,
    allow_origin_regex='.*' if _allow_all_origins else None,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_db():
    # Create tables if they don't exist yet.
    await init_db()


@app.on_event("shutdown")
async def shutdown_db():
    await dispose_db()
