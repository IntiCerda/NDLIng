from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from .user_model import User

class Report(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    description: str
    user: str  # Email.  
    category: str
    severity: int  # 1-5
    latitude: float
    longitude: float
    # lo de arriba pyede ser reemplazado por location: GeoJsonPoint (location: Location)
    #crear un índice 2dsphere en MongoDB para esto
    date: datetime = Field(default_factory=datetime.utcnow)
