from datetime import datetime
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from enum import Enum
import bcrypt


class TypeUser(str, Enum):
    free = "Free"
    paid = "Paid"


class User(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    rut: str
    email: EmailStr
    password: str
    verified_email: bool = False
    amount_reports: int = 0
    type_user: str = "Free"
    date_created: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        validate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
        }




def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
