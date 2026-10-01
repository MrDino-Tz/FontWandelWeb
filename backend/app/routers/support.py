from fastapi import APIRouter, HTTPException

from .. import store

router = APIRouter(prefix="/api", tags=["support"])


def _detail(items: list[dict], slug: str, label: str) -> dict:
    for item in items:
        if item.get("slug") == slug:
            return item
    raise HTTPException(status_code=404, detail=f"{label} '{slug}' not found")


@router.get("/articles")
def list_articles() -> list[dict]:
    return store.load_articles()


@router.get("/articles/{slug}")
def get_article(slug: str) -> dict:
    return _detail(store.load_articles(), slug, "Article")


@router.get("/references")
def list_references() -> list[dict]:
    return store.load_references()


@router.get("/references/{slug}")
def get_reference(slug: str) -> dict:
    return _detail(store.load_references(), slug, "Reference")


@router.get("/whitepapers")
def list_whitepapers() -> list[dict]:
    return store.load_whitepapers()


@router.get("/knowledge-base")
def knowledge_base() -> list[dict]:
    return [
        {**item, "kind": "article"} for item in store.load_articles()
    ] + [{**item, "kind": "reference"} for item in store.load_references()]
