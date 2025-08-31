from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api import (brands_router, device_router, export_router)
from src.config.config import PROJECT_NAME, VERSION

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

