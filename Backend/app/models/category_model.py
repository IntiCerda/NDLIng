from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class Category(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    category: str
    date: datetime = Field(default_factory=datetime.utcnow)
 