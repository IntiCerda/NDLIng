from app.database import db
from app.models.category_model import Category

categories_collection = db["categories"]

from fastapi import HTTPException

async def create_category(category_data: dict):
    # nombre de la categoría a minúsculas
    if "category" in category_data and isinstance(category_data["category"], str):
        category_data["category"] = category_data["category"].lower()

    existing = await categories_collection.find_one({"category": category_data["category"]})
    if existing:
        raise HTTPException(status_code=400, detail=f"La categoría '{category_data['category']}' ya existe.")
    category_data.pop("_id", None)

    result = await categories_collection.insert_one(category_data)
    created = await categories_collection.find_one({"_id": result.inserted_id})
    created["_id"] = str(created["_id"])
    return created


async def get_categories():
    categories = await categories_collection.find().to_list(100)
    for c in categories:
        c["_id"] = str(c["_id"])
    return categories

