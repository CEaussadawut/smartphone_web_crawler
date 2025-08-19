from src.api.routers.brands import router as brands_router
from src.api.routers.device import router as device_router
from src.api.routers.parser import router as parser_router

__all__ = [
    "brands_router",
    "device_router",
    "parser_router"
]