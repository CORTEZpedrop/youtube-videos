from pydantic import BaseModel
from typing import Optional

class YouTubeURLBase(BaseModel):
    url: str
    description: Optional[str] = None
    updated_by: Optional[str] = None
    updated_at: Optional[str] = None

class YouTubeURLCreate(YouTubeURLBase):
    pass

class YouTubeURLResponse(YouTubeURLBase):
    id: int

    class Config:
        orm_mode = True
