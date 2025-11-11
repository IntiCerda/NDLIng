from app.database import db
from app.models.report_model import Report
from fastapi import HTTPException


reports_collection = db["reports"]
categories_collection = db["categories"]

async def create_report(report_data: dict):
    
    category_name = report_data.get("category") .lower()

    category = await db["categories"].find_one({"category": category_name})
    if not category:
        raise HTTPException(
            status_code=400,
            detail=f"Categoría '{category_name}' no existe."
        )


    report_data["category"] = category_name
    report_data.pop("_id", None)
    new_report = await reports_collection.insert_one(report_data)
    created_report = await reports_collection.find_one({"_id": new_report.inserted_id})
    
    created_report["_id"] = str(created_report["_id"])
    return created_report

async def get_reports():
    reports = await reports_collection.find().to_list(100)
    for r in reports:
        r["_id"] = str(r["_id"])
    return reports
