from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .routers import auth, contact, content, health, spa, support

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="API for the FontWandel Technologies website.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(content.router)
app.include_router(support.router)
app.include_router(contact.router)
app.include_router(auth.router)
app.include_router(spa.router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
