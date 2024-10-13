from typing import Optional, List
from pydantic import BaseModel, HttpUrl, ValidationError
import logging
from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
import models
import schemas
import operations

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create the database tables
Base.metadata.create_all(bind=engine)

# Create the FastAPI app
app = FastAPI()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Function to load initial data
def init_db():
    db = SessionLocal()
    try:
        # Check if there are any existing records
        if not db.query(models.YouTubeURL).first():
            # Add initial data if the table is empty
            initial_urls = [
                {"url": "https://www.youtube.com/watch?v=oYFL2pDggqQ&ab_channel=TVGlobo", "description": "Sample Video 1", "updated_by": "Pedro", "updated_at": "2021-09-01T12:00:00"},
                {"url": "https://www.youtube.com/watch?v=1Gg1mQ7dG5w&ab_channel=TVGlobo", "description": "Sample Video 2", "updated_by": "Pedro", "updated_at": "2021-09-01T12:00:00"},
                {"url": "https://www.youtube.com/watch?v=wcmFsnm5S2w&ab_channel=ge", "description": "Sample Video 2", "updated_by": "Pedro", "updated_at": "2021-09-01T12:00:00"},
                {"url": "https://www.youtube.com/watch?v=oEJLmKSddks&ab_channel=TVGlobo", "description": "Sample Video 2", "updated_by": "Pedro", "updated_at": "2021-09-01T12:00:00"},
                {"url": "https://www.youtube.com/watch?v=YM4S3vDhYRE&ab_channel=ge", "description": "Sample Video 2", "updated_by": "Pedro", "updated_at": "2021-09-01T12:00:00"},
            ]
            for url_data in initial_urls:
                try:
                    # Validate URL format
                    schemas.YouTubeURLCreate(**url_data)
                    operations.create_url(db, schemas.YouTubeURLCreate(**url_data))
                except ValidationError as e:
                    logger.error(f"Failed to validate initial URL: {url_data['url']}, error: {e}")
            logger.info("Database initialized with sample data.")
        else:
            logger.info("Database already contains data. Skipping initialization.")
    except Exception as e:
        logger.error(f"Failed to initialize the database: {e}")
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
async def read_root():
    return {"Nice to see you here"}

@app.post("/urls/", response_model=schemas.YouTubeURLResponse)
def create_url(url_data: schemas.YouTubeURLCreate, db: Session = Depends(get_db)):
    """
    Create a new YouTube URL entry in the database.
    Args:
        url_data (schemas.YouTubeURLCreate): The data for the YouTube URL to be created.
        db (Session, optional): The database session dependency. Defaults to Depends(get_db).
    Raises:
        HTTPException: If the provided URL is not a valid YouTube URL.
    Returns:
        The created YouTube URL entry.
    """
    # Validate that the provided URL is a valid YouTube URL
    if "youtube.com" not in url_data.url and "youtu.be" not in url_data.url:
        raise HTTPException(status_code=400, detail="The provided URL is not a valid YouTube URL.")
    
    return operations.create_url(db=db, url_data=url_data)

@app.get("/urls/", response_model=List[schemas.YouTubeURLResponse])
def read_urls(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(10, ge=1, le=100, description="Maximum number of records to return"),
    db: Session = Depends(get_db)
):
    """ 
    Retrieve a list of URLs from the database.
    """
    return operations.get_urls(db=db, skip=skip, limit=limit)

@app.get("/urls/{url_id}", response_model=schemas.YouTubeURLResponse)
def read_url(url_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a URL from the database by its ID.

    Args:
        url_id (int): The ID of the URL to retrieve.
        db (Session, optional): The database session dependency. Defaults to Depends(get_db).

    Returns:
        URL: The URL object if found.

    Raises:
        HTTPException: If the URL is not found, raises a 404 HTTP exception with the message "URL not found".
    """
    url = operations.get_url(db=db, url_id=url_id)
    if not url:
        raise HTTPException(status_code=404, detail="URL not found")
    return url

@app.delete("/urls/{url_id}")
def delete_url(url_id: int, db: Session = Depends(get_db)):
    """
    Delete a URL by its ID.

    Args:
        url_id (int): The ID of the URL to delete.
        db (Session, optional): The database session dependency.

    Raises:
        HTTPException: If the URL with the given ID is not found.

    Returns:
        dict: A message indicating the URL was deleted successfully.
    """
    success = operations.delete_url(db=db, url_id=url_id)
    if not success:
        raise HTTPException(status_code=404, detail="URL not found")
    return {"message": "URL deleted successfully"}

@app.post("/urls/edit/{url_id}", response_model=schemas.YouTubeURLResponse)
def edit_url(url_id: int, url_data: schemas.YouTubeURLCreate, db: Session = Depends(get_db)):
    """
    Edit an existing YouTube URL entry in the database.
    Args:
        url_id (int): The ID of the URL to be edited.
        url_data (schemas.YouTubeURLCreate): The new data for the URL, including the URL, description, updated_by, and updated_at fields.
        db (Session, optional): The database session dependency.
    Raises:
        HTTPException: If the provided URL is not a valid YouTube URL.
        HTTPException: If the URL with the given ID is not found.
    Returns:
        The updated URL entry.
    """
    # Validate that the provided URL is a valid YouTube URL
    if "youtube.com" not in url_data.url and "youtu.be" not in url_data.url:
        raise HTTPException(status_code=400, detail="The provided URL is not a valid YouTube URL.")
    
    url = operations.get_url(db=db, url_id=url_id)
    if not url:
        raise HTTPException(status_code=404, detail="URL not found")
    
    # Update the URL with the new data
    url.url = url_data.url
    url.description = url_data.description
    url.updated_by = url_data.updated_by
    url.updated_at = url_data.updated_at

    db.commit()
    db.refresh(url)
    return url