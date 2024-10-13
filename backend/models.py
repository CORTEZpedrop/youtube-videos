from sqlalchemy import Column, Integer, String
from database import Base

class YouTubeURL(Base):
    __tablename__ = "youtube_urls"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, index=True, unique=True)
    description = Column(String, nullable=True)
    ## nullable because we do not have the users structure yet
    updated_by = Column(String, nullable=True)
    updated_at = Column(String, nullable=True)