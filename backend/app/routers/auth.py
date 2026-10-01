import secrets

from fastapi import APIRouter, Cookie, HTTPException, Response, status
from pydantic import BaseModel, Field

from ..config import settings
from ..security import create_token, read_token

router = APIRouter(prefix="/api/auth", tags=["auth"])


class LoginIn(BaseModel):
    username: str = Field(min_length=1, max_length=64)
    password: str = Field(min_length=1, max_length=128)


def _set_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key=settings.session_cookie,
        value=token,
        max_age=settings.session_max_age,
        httponly=True,
        samesite="lax",
        secure=settings.cookie_secure,
        path="/",
    )


@router.post("/login")
def login(payload: LoginIn, response: Response) -> dict:
    user_ok = secrets.compare_digest(
        payload.username.strip(), settings.admin_username
    )
    pass_ok = secrets.compare_digest(payload.password, settings.admin_password)
    if not (user_ok and pass_ok):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    token = create_token(settings.admin_username)
    _set_cookie(response, token)
    return {"authenticated": True, "username": settings.admin_username}


@router.post("/logout")
def logout(response: Response) -> dict:
    response.delete_cookie(key=settings.session_cookie, path="/")
    return {"authenticated": False}


@router.get("/me")
def me(
    token: str | None = Cookie(default=None, alias=settings.session_cookie),
) -> dict:
    username = read_token(token) if token else None
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    return {"authenticated": True, "username": username}
