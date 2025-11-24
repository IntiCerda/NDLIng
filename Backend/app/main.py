from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import db
from app.routes import user_routes, report_routes, category_routes, auth_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(report_routes.router, prefix="/reports", tags=["Reports"])
app.include_router(category_routes.router, prefix="/categories", tags=["Categories"])
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])

@app.get("/")
async def root():
    return {"message": "NDL Backend running"}

