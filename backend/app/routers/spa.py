from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse, JSONResponse

from ..config import settings

router = APIRouter(include_in_schema=False)


def _api_not_found(full_path: str) -> JSONResponse:
    return JSONResponse(
        status_code=404,
        content={"detail": f"Unknown API endpoint: /api/{full_path}"},
    )


for _method in ("GET", "POST", "PUT", "PATCH", "DELETE"):
    router.add_api_route(
        "/api/{full_path:path}",
        _api_not_found,
        methods=[_method],
        include_in_schema=False,
    )


@router.get("/{full_path:path}")
def spa(full_path: str) -> FileResponse:
    dist = settings.dist_dir
    index = dist / "index.html"

    if not index.is_file():
        raise HTTPException(
            status_code=503,
            detail=(
                "Frontend build not found. "
                "Run `npm run build` inside the frontend/ folder."
            ),
        )

    rel = full_path
    base = settings.frontend_base.strip("/")
    if base and (rel == base or rel.startswith(f"{base}/")):
        rel = rel[len(base) :].lstrip("/")

    root = dist.resolve()
    candidate = (dist / rel).resolve() if rel else root
    try:
        candidate.relative_to(root)
    except ValueError:
        raise HTTPException(status_code=404, detail="Not found")

    if candidate.is_file():
        return FileResponse(candidate)

    if full_path.startswith("assets/") or full_path.endswith(
        (".js", ".css", ".svg", ".webp", ".png", ".jpg", ".ico", ".woff2")
    ):
        raise HTTPException(status_code=404, detail="Asset not found")

    return FileResponse(
        index,
        headers={"Cache-Control": "no-cache"},
    )
