from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from src.api import (brands_router, device_router, export_router)
from src.config.config import PROJECT_NAME, VERSION, ENVIRONMENT

app = FastAPI(title=PROJECT_NAME, version=VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(brands_router, tags=["brands"])
app.include_router(device_router, tags=["device"])
app.include_router(export_router, tags=["export"])

if ENVIRONMENT == "production":
    app.mount("/assets", StaticFiles(directory="src/static/assets"), name="assets")

    @app.get("/{full_path:path}")
    async def catch_all(full_path: str):
        return FileResponse("src/static/index.html")
