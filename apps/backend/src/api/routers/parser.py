from src.utils import Regex, Pattern
from fastapi import APIRouter, HTTPException, status

router = APIRouter(prefix="/api")

@router.get("/parser", status_code=status.HTTP_200_OK)
async def parser():
    pass
