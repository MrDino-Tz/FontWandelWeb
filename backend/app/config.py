from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent
REPO_ROOT = BASE_DIR.parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="FW_",
        env_file=BASE_DIR.parent / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "FontWandel API"
    app_version: str = "1.0.0"

    data_dir: Path = BASE_DIR / "data"
    dist_dir: Path = REPO_ROOT / "frontend" / "dist"
    frontend_base: str = "/FontWandelWeb"

    admin_username: str = "admin"
    admin_password: str = "fontwandel123"
    secret_key: str = "change-me-in-production"
    session_cookie: str = "fw_admin_session"
    session_max_age: int = 60 * 60 * 8
    cookie_secure: bool = False

    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ]


settings = Settings()
