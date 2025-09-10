from src.api.routers.brands import router as brands_router
from src.api.routers.device import router as device_router
from src.api.routers.export import router as export_router
from src.api.routers.test import router as test_router
from src.api.routers.search import router as search_router

__all__ = [
    "brands_router",
    "device_router",
    "export_router",
    "test_router",
    "search_router"
]