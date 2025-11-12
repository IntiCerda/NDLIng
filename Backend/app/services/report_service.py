from app.database import db
from app.models.report_model import Report
from fastapi import HTTPException


reports_collection = db["reports"]
categories_collection = db["categories"]
users_collection = db["users"]

async def create_report(report_data: dict):
    
    category_name = report_data.get("category") .lower()

    category = await db["categories"].find_one({"category": category_name})
    if not category:
        raise HTTPException(
            status_code=400,
            detail=f"Categoría '{category_name}' no existe."
        )
    
    user_email = report_data.get("user")
    user = await db["users"].find_one({"email": user_email})
    if not user:
        raise HTTPException(
            status_code=400,
            detail=f"Email '{user_email}' no existe."
        )


    report_data["category"] = category_name
    report_data.pop("_id", None)
    new_report = await reports_collection.insert_one(report_data)
    created_report = await reports_collection.find_one({"_id": new_report.inserted_id})
    
    created_report["_id"] = str(created_report["_id"])
    return created_report

#No está en uso
async def get_reports():
    reports = await reports_collection.find().to_list(100)
    for r in reports:
        r["_id"] = str(r["_id"])
    return reports

async def get_all_reports():
    reports = []
    async for report in reports_collection.find():
        report["_id"] = str(report["_id"])

        # Buscamos el usuario asociado
        user = await users_collection.find_one({"email": report["user"]})

        # Adjuntamos solo la info relevante
        if user:
            report["user"] = {
                "nombre": user.get("nombre"),
                "rut": user.get("rut"),
                "email": user.get("email"),
                "type_user": user.get("type_user")
            }

        reports.append(report)
    return reports