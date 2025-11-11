from fastapi import APIRouter, HTTPException
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
async def login(data: dict):
    email = data.get("email")
    password = data.get("password")

    user = await auth_service.login_user(email, password)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")
    if user is False:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta.")

    return {"message": "Inicio de sesión exitoso", "user": user}


@router.post("/recover")
async def recover_password(data: dict):
    email = data.get("email")
    new_password = data.get("new_password")

    updated_user = await auth_service.recover_password(email, new_password)
    if updated_user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    return {"message": "Contraseña actualizada correctamente", "user": updated_user}
