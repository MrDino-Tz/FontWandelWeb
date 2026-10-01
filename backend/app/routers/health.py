from fastapi import APIRouter

from ..config import settings

router = APIRouter(tags=["meta"])


@router.get("/api/health")
def health() -> dict:
    return {
        "status": "ok",
        "app": settings.app_name,
        "version": settings.app_version,
    }
