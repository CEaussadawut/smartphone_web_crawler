from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os

from src.api import (brands_router, device_router, export_router, test_router, search_router)
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
app.include_router(test_router, tags=["test"])
app.include_router(search_router, tags=["search"])

if ENVIRONMENT == "production":
    @app.get("/{full_path:path}")
    async def catch_all(full_path: str):
        static_file_path = os.path.join("src/static", full_path)
        if full_path and os.path.isfile(static_file_path):
            return FileResponse(static_file_path)
        return FileResponse("src/static/index.html")
