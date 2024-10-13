from sqlalchemy.orm import Session
from models import YouTubeURL
from schemas import YouTubeURLCreate

def create_url(db: Session, url_data: YouTubeURLCreate):
    new_url = YouTubeURL(**url_data.dict())
    db.add(new_url)
    db.commit()
    db.refresh(new_url)
    return new_url

def get_urls(db: Session, skip: int = 0, limit: int = 10):
    return db.query(YouTubeURL).offset(skip).limit(limit).all()

def get_url(db: Session, url_id: int):
    return db.query(YouTubeURL).filter(YouTubeURL.id == url_id).first()

def delete_url(db: Session, url_id: int):
    url = db.query(YouTubeURL).filter(YouTubeURL.id == url_id).first()
    if url:
        db.delete(url)
        db.commit()
        return True
    return False
