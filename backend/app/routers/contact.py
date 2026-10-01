from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr, Field

from .. import store
from ..security import require_admin

router = APIRouter(prefix="/api/contact", tags=["contact"])


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: str = Field(default="General inquiry", max_length=200)
    message: str = Field(min_length=1, max_length=5000)


@router.post("", status_code=201)
def send_message(payload: ContactIn) -> dict:
    saved = store.append_message(
        {
            **payload.model_dump(),
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
    )
    return {
        "ok": True,
        "id": saved["id"],
        "detail": "Message received — our team will get back to you.",
    }


@router.get("/messages", dependencies=[Depends(require_admin)])
def list_messages() -> list[dict]:
    return store.load_messages()
