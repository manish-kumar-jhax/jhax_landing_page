"""Audit data-source providers (factory pattern).

A provider turns a {name, city} query into the raw place facts the audit needs,
normalized to this shape (or raises PlaceNotFound / DataSourceError):

    {
      "name": str,
      "address": str | None,
      "rating": float | None,
      "review_count": int | None,
      "top_reviews": list[{author, rating, text, relative_time}],
      "opening_hours": {"open_now": bool | None, "weekday_text": list[str]},
      "data_source": "google" | "estimated",
    }

The heuristic formulas (health score, money lost) live in server.py and consume
`rating` + `review_count` from whichever provider is active — providers never
compute heuristics themselves.

Switch providers with the AUDIT_DATA_SOURCE env var:
    osm     -> OSMProvider     (default; OpenStreetMap Nominatim, no key needed)
    google  -> GoogleProvider  (real Google Places, needs GOOGLE_PLACES_API_KEY)

Adding the real Google key later is a one-line env change; no code rewrite.
"""
import asyncio
import hashlib
import os
import time

import httpx


# ---------- Errors (mapped to HTTP status in server.py) ----------
class PlaceNotFound(Exception):
    """No place matched the query -> 404."""


class DataSourceError(Exception):
    """Upstream lookup failed (network/timeout/bad response/misconfig) -> 502."""


# ---------- 1 request/second rate limiter (shared across all requests) ----------
class RateLimiter:
    """Serializes callers and enforces a minimum interval between acquisitions.

    Module-level singletons below are shared process-wide so the whole app stays
    within a provider's public-server budget, no matter how many requests arrive.
    """

    def __init__(self, min_interval_seconds: float):
        self._min_interval = min_interval_seconds
        self._lock = asyncio.Lock()
        self._last = 0.0

    async def acquire(self):
        async with self._lock:
            now = time.monotonic()
            wait = self._min_interval - (now - self._last)
            if wait > 0:
                await asyncio.sleep(wait)
            self._last = time.monotonic()


# ---------- OpenStreetMap Nominatim ----------
NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
# Nominatim's usage policy requires a real, identifying User-Agent with contact
# info, and no more than 1 request/second to the public server.
_NOMINATIM_USER_AGENT = os.environ.get(
    "NOMINATIM_USER_AGENT",
    "JHAX-Audit-Tool/1.0 (contact: jhapayapp@gmail.com)",
)
_NOMINATIM_LIMITER = RateLimiter(1.0)


def _seeded_metrics(key: str):
    """Deterministically derive a plausible (rating, review_count) from a place key.

    OSM has no rating/review data, but the heuristic formulas need both. We hash
    the matched place's stable identity (place_id / display_name) with SHA-256 —
    NOT Python's built-in hash(), which is per-process randomized — so the same
    restaurant always yields the same numbers on repeat searches.

    rating:       3.2 – 4.8 (one decimal)
    review_count: 20 – 400
    """
    digest = hashlib.sha256(key.encode("utf-8")).digest()
    a = int.from_bytes(digest[0:4], "big") / 0xFFFFFFFF  # 0..1
    b = int.from_bytes(digest[4:8], "big") / 0xFFFFFFFF  # 0..1
    rating = round(3.2 + a * (4.8 - 3.2), 1)
    review_count = int(20 + b * (400 - 20))
    return rating, review_count


class OSMProvider:
    """OpenStreetMap Nominatim. Real name/address; pseudo rating/review_count."""

    data_source = "estimated"

    async def fetch(self, name: str, city: str) -> dict:
        query = f"{name} {city}".strip()
        await _NOMINATIM_LIMITER.acquire()
        try:
            async with httpx.AsyncClient(timeout=12.0) as http:
                resp = await http.get(
                    NOMINATIM_URL,
                    params={
                        "q": query,
                        "format": "json",
                        "addressdetails": 1,
                        "limit": 1,
                    },
                    headers={"User-Agent": _NOMINATIM_USER_AGENT},
                )
        except httpx.RequestError as exc:
            raise DataSourceError(f"Nominatim request failed: {exc}") from exc

        if resp.status_code != 200:
            raise DataSourceError(
                f"Nominatim returned {resp.status_code}: {resp.text[:200]}"
            )

        try:
            results = resp.json()
        except ValueError as exc:
            raise DataSourceError("Nominatim returned invalid JSON") from exc

        if not results:
            raise PlaceNotFound()

        r = results[0]
        display_name = r.get("display_name") or name
        # Stable identity for the seed: prefer OSM place_id, fall back to the name.
        seed_key = str(r.get("place_id") or display_name)
        # A short label for the UI: Nominatim's `name`, else the first address part.
        short_name = r.get("name") or display_name.split(",")[0].strip() or name

        rating, review_count = _seeded_metrics(seed_key)

        return {
            "name": short_name,
            "address": display_name,
            "rating": rating,
            "review_count": review_count,
            "top_reviews": [],  # OSM has no reviews
            "opening_hours": {"open_now": None, "weekday_text": []},
            "data_source": self.data_source,
        }


# ---------- Google Places (New) — stubbed until a key is available ----------
PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"
PLACES_DETAILS_URL = "https://places.googleapis.com/v1/places/{place_id}"


class GoogleProvider:
    """Real Google Places (New). Enabled by AUDIT_DATA_SOURCE=google + a key.

    Returns verified rating/review_count/reviews/hours. Raises DataSourceError if
    the key is missing so a misconfigured switch fails loudly rather than silently.
    """

    data_source = "google"

    def __init__(self):
        self.api_key = os.environ.get("GOOGLE_PLACES_API_KEY", "")

    async def fetch(self, name: str, city: str) -> dict:
        if not self.api_key:
            raise DataSourceError("GOOGLE_PLACES_API_KEY is not configured")

        query = f"{name} {city}".strip()
        try:
            async with httpx.AsyncClient(timeout=12.0) as http:
                search_resp = await http.post(
                    PLACES_SEARCH_URL,
                    headers={
                        "Content-Type": "application/json",
                        "X-Goog-Api-Key": self.api_key,
                        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
                    },
                    json={"textQuery": query, "maxResultCount": 1},
                )
                if search_resp.status_code != 200:
                    raise DataSourceError(
                        f"Places textSearch {search_resp.status_code}: {search_resp.text[:200]}"
                    )
                places = search_resp.json().get("places") or []
                if not places:
                    raise PlaceNotFound()
                place_id = places[0].get("id")
                if not place_id:
                    raise PlaceNotFound()

                details_resp = await http.get(
                    PLACES_DETAILS_URL.format(place_id=place_id),
                    headers={
                        "X-Goog-Api-Key": self.api_key,
                        "X-Goog-FieldMask": (
                            "id,displayName,formattedAddress,rating,userRatingCount,"
                            "reviews,regularOpeningHours"
                        ),
                    },
                )
                if details_resp.status_code != 200:
                    raise DataSourceError(
                        f"Places details {details_resp.status_code}: {details_resp.text[:200]}"
                    )
                details = details_resp.json()
        except httpx.RequestError as exc:
            raise DataSourceError(f"Google Places request failed: {exc}") from exc

        top_reviews = []
        for rv in (details.get("reviews") or [])[:5]:
            text_obj = rv.get("text") or rv.get("originalText") or {}
            top_reviews.append({
                "author": (rv.get("authorAttribution") or {}).get("displayName"),
                "rating": rv.get("rating"),
                "text": text_obj.get("text"),
                "relative_time": rv.get("relativePublishTimeDescription"),
            })

        hours = details.get("regularOpeningHours") or {}
        return {
            "name": (details.get("displayName") or {}).get("text") or name,
            "address": details.get("formattedAddress"),
            "rating": details.get("rating"),
            "review_count": details.get("userRatingCount"),
            "top_reviews": top_reviews,
            "opening_hours": {
                "open_now": hours.get("openNow"),
                "weekday_text": hours.get("weekdayDescriptions") or [],
            },
            "data_source": self.data_source,
        }


# ---------- Factory ----------
_PROVIDERS = {
    "osm": OSMProvider,
    "google": GoogleProvider,
}


def get_provider():
    """Return the active provider, chosen by AUDIT_DATA_SOURCE (default: osm)."""
    source = os.environ.get("AUDIT_DATA_SOURCE", "osm").strip().lower()
    provider_cls = _PROVIDERS.get(source, OSMProvider)
    return provider_cls()
