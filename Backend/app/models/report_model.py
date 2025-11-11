from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class Report(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    description: str
    user: str  # id user? O user User
    category: str
    latitude: float
    longitude: float
    # lo de arriba pyede ser reemplazado por location: GeoJsonPoint (location: Location)
    #crear un índice 2dsphere en MongoDB para esto
    date: datetime = Field(default_factory=datetime.utcnow)
