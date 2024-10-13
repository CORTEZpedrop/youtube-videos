import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base
from main import get_db
from main import app
import models

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="module")
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_create_url(setup_database):
    response = client.post("/urls/", json={"url": "https://www.youtube.com/watch?v=abc123", "description": "Sample Video", "updated_by": "Pedro", "updated_at": "2021-09-01T12:00:00"})
    assert response.status_code == 200
    assert response.json()["url"] == "https://www.youtube.com/watch?v=abc123"

def test_read_urls(setup_database):
    response = client.get("/urls/")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_read_url(setup_database):
    response = client.get("/urls/1")
    assert response.status_code == 200
    assert response.json()["url"] == "https://www.youtube.com/watch?v=abc123"

def test_edit_url(setup_database):
    response = client.post("/urls/edit/1", json={"url": "https://www.youtube.com/watch?v=xyz789", "description": "Updated Video", "updated_by": "Pedro", "updated_at": "2021-09-01T12:00:00"})
    assert response.status_code == 200
    assert response.json()["url"] == "https://www.youtube.com/watch?v=xyz789"

def test_delete_url(setup_database):
    response = client.delete("/urls/1")
    assert response.status_code == 200
    assert response.json()["message"] == "URL deleted successfully"