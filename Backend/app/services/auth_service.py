from app.services.user_service import get_user_by_email, update_password
from app.models.user_model import verify_password


async def login_user(email: str, password: str):
    user = await get_user_by_email(email)
    if not user:
        return None
    if not verify_password(password, user["password"]):
        return False  # contraseña incorrecta
    return user  # login exitoso


async def recover_password(email: str, new_password: str):
    user = await get_user_by_email(email)
    if not user:
        return None

    updated = await update_password(email, new_password)
    return updated
