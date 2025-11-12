from fastapi import APIRouter, HTTPException
from app.services import user_service
from app.models.user_model import User

router = APIRouter()


@router.post("/")
async def create_user(user: User):
    created = await user_service.create_user(user.dict(by_alias=True))
    if "error" in created:
        raise HTTPException(status_code=400, detail=created["error"])
    return created


@router.get("/")
async def get_all_users():
    return await user_service.get_all_users()
