"""Backend tests for JHAX.ai API - leads + status regression."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://full-page-preview-2.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data


# Leads
def test_create_lead_valid_and_persist(client):
    email = f"test_{uuid.uuid4().hex[:8]}@example.com"
    r = client.post(f"{API}/leads", json={"email": email, "source": "final_cta"})
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["email"] == email
    assert data["source"] == "final_cta"
    assert "id" in data and "created_at" in data

    # Verify via GET
    r2 = client.get(f"{API}/leads")
    assert r2.status_code == 200
    emails = [d["email"] for d in r2.json()]
    assert email in emails


def test_create_lead_invalid_email(client):
    r = client.post(f"{API}/leads", json={"email": "notanemail"})
    assert r.status_code == 422


def test_create_lead_missing_email(client):
    r = client.post(f"{API}/leads", json={})
    assert r.status_code == 422


def test_list_leads(client):
    r = client.get(f"{API}/leads")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# Status regression
def test_status_post_and_get(client):
    name = f"TEST_{uuid.uuid4().hex[:6]}"
    r = client.post(f"{API}/status", json={"client_name": name})
    assert r.status_code == 200
    assert r.json()["client_name"] == name

    r2 = client.get(f"{API}/status")
    assert r2.status_code == 200
    assert any(s["client_name"] == name for s in r2.json())
