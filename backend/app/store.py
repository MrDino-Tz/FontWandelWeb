import json
from typing import Any

from .config import settings


def _read(name: str) -> Any:
    with (settings.data_dir / name).open(encoding="utf-8") as fh:
        return json.load(fh)


def _write(name: str, payload: Any) -> None:
    settings.data_dir.mkdir(parents=True, exist_ok=True)
    with (settings.data_dir / name).open("w", encoding="utf-8") as fh:
        json.dump(payload, fh, ensure_ascii=False, indent=2)
        fh.write("\n")


def load_articles() -> list[dict]:
    return _read("articles.json")


def load_references() -> list[dict]:
    return _read("references.json")


def load_whitepapers() -> list[dict]:
    return _read("whitepapers.json")


def load_site_content() -> dict:
    live = settings.data_dir / "content-live.json"
    if live.exists():
        with live.open(encoding="utf-8") as fh:
            return json.load(fh)
    return _read("site-content.json")


def save_site_content(content: dict) -> None:
    _write("content-live.json", content)


def reset_site_content() -> dict:
    live = settings.data_dir / "content-live.json"
    if live.exists():
        live.unlink()
    return _read("site-content.json")


def load_messages() -> list[dict]:
    path = settings.data_dir / "messages.json"
    if not path.exists():
        return []
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)


def append_message(message: dict) -> dict:
    messages = load_messages()
    message["id"] = max((m["id"] for m in messages), default=0) + 1
    messages.append(message)
    _write("messages.json", messages)
    return message
