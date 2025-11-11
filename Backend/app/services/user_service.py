from app.database import db
from app.models.user_model import User, hash_password

users_collection = db["users"]

async def create_user(user_data: dict):
    # Validar email único
    existing_email = await users_collection.find_one({"email": user_data["email"]})
    if existing_email:
        return {"error": "El email ya está registrado"}

    # Validar RUT único
    existing_rut = await users_collection.find_one({"rut": user_data["rut"]})
    if existing_rut:
        return {"error": "El RUT ya está registrado"}

    # Hashear contraseña antes de guardar
    user_data["password"] = hash_password(user_data["password"])
    new_user = await users_collection.insert_one(user_data)
    created = await users_collection.find_one({"_id": new_user.inserted_id})
    created["_id"] = str(created["_id"])
    return created


async def get_user_by_email(email: str):
    user = await users_collection.find_one({"email": email})
    if user:
        user["_id"] = str(user["_id"])
    return user


async def get_user_by_rut(rut: str):
    user = await users_collection.find_one({"rut": rut})
    if user:
        user["_id"] = str(user["_id"])
    return user


async def get_all_users():
    users = await users_collection.find().to_list(100)
    for u in users:
        u["_id"] = str(u["_id"])
    return users


# 🔑 Cambiar  contraseña
async def update_password(email: str, new_password: str):
    hashed = hash_password(new_password)
    result = await users_collection.update_one(
        {"email": email},
        {"$set": {"password": hashed}}
    )

    if result.modified_count == 0:
        return None

    updated_user = await users_collection.find_one({"email": email})
    updated_user["_id"] = str(updated_user["_id"])
    return updated_user
