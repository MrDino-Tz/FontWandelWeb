from typing import Any

from fastapi import APIRouter, Depends, HTTPException

from .. import store
from ..security import require_admin

router = APIRouter(prefix="/api", tags=["content"])


@router.get("/content")
def get_content() -> dict:
    return store.load_site_content()


@router.put("/content", dependencies=[Depends(require_admin)])
def replace_content(payload: dict[str, Any]) -> dict:
    if not isinstance(payload.get("hero"), dict) or not isinstance(
        payload.get("homeLayout"), list
    ):
        raise HTTPException(
            status_code=422,
            detail="'hero' (object) and 'homeLayout' (array) are required",
        )
    merged = store.load_site_content()
    merged.update(payload)
    store.save_site_content(merged)
    return merged


@router.post("/content/reset", dependencies=[Depends(require_admin)])
def reset_content() -> dict:
    return store.reset_site_content()
