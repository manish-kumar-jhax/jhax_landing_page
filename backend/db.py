"""PostgreSQL persistence (SQLAlchemy 2.0 async + asyncpg).

Replaces the previous MongoDB (motor) layer. Set DATABASE_URL to a Postgres
connection string, e.g.  postgresql://user:pass@host:5432/dbname
Render provides DATABASE_URL automatically when you attach a Postgres instance;
it may hand out the bare `postgres://` form, which we normalize below.
"""
import os
from datetime import datetime
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from sqlalchemy import String, DateTime
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

# Load .env here too — this module reads DATABASE_URL at import time, which can
# run before server.py calls load_dotenv. On Render, DATABASE_URL is a real env
# var and load_dotenv won't override it (and there's no .env file there).
load_dotenv(Path(__file__).parent / ".env")


def _normalize_db_url(url: str) -> str:
    """Return an asyncpg-driver URL. Accepts postgres://, postgresql://, or an
    already-qualified postgresql+asyncpg:// string."""
    if not url:
        return url
    if url.startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://"):]
    if url.startswith("postgresql://"):
        url = "postgresql+asyncpg://" + url[len("postgresql://"):]
    return url


DATABASE_URL = _normalize_db_url(os.environ.get("DATABASE_URL", ""))


class Base(DeclarativeBase):
    pass


class LeadORM(Base):
    __tablename__ = "leads"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    email: Mapped[str] = mapped_column(String(320), nullable=False)
    source: Mapped[str] = mapped_column(String(64), default="final_cta")
    business_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    person_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))


class StatusCheckORM(Base):
    __tablename__ = "status_checks"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    client_name: Mapped[str] = mapped_column(String(255), nullable=False)
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True))


engine = create_async_engine(DATABASE_URL, pool_pre_ping=True) if DATABASE_URL else None
async_session: Optional[async_sessionmaker] = (
    async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False) if engine else None
)


async def init_db():
    """Create tables if they don't exist (called on app startup)."""
    if engine is None:
        raise RuntimeError("DATABASE_URL is not configured")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def dispose_db():
    if engine is not None:
        await engine.dispose()
