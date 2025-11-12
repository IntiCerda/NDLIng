from fastapi import APIRouter, HTTPException
from app.services import report_service
from app.models.report_model import Report

router = APIRouter()

@router.post("/")
async def create_report(report: Report):
    created = await report_service.create_report(report.dict(by_alias=True))
    if not created:
        raise HTTPException(status_code=400, detail="No se pudo crear el reporte")
    return created

@router.get("/")
async def get_all_reports():
    reports = await report_service.get_all_reports()
    return reports

