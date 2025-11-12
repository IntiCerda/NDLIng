from fastapi import APIRouter, HTTPException
from app.services import category_service
from app.models.category_model import Category

router = APIRouter()

@router.post("/")
async def create_category(category: Category):
    created = await category_service.create_category(category.dict(by_alias=True))
    if not created:
        raise HTTPException(status_code=400, detail="No se pudo crear")
    return created

@router.get("/")
async def get_all_categories():
    category = await category_service.get_categories()
    return category

