from itsdangerous import BadSignature, URLSafeTimedSerializer
from fastapi import Cookie, Depends, HTTPException, status

from .config import settings

_serializer = URLSafeTimedSerializer(settings.secret_key, salt="fontwandel-admin")


def create_token(username: str) -> str:
    return _serializer.dumps({"sub": username})


def read_token(token: str) -> str | None:
    try:
        data = _serializer.loads(token, max_age=settings.session_max_age)
    except BadSignature:
        return None
    sub = data.get("sub") if isinstance(data, dict) else None
    return sub if isinstance(sub, str) else None


def require_admin(
    token: str | None = Cookie(default=None, alias=settings.session_cookie),
) -> str:
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
        )
    username = read_token(token)
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session",
        )
    return username
