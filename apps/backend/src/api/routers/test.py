from fastapi import APIRouter, HTTPException, status

from src.config.crawler import CRAWLER_ENDPOINT
from src.model import Brands
from src.utils import Regex, Pattern

router = APIRouter(prefix="/api")

cedt_regex = Regex()

@router.get("/test", status_code=status.HTTP_200_OK, response_model=list)
async def test() -> list[Brands]:
    try:
        # ใส่ Pattern + Path ของลิงค์ที่ต้องการ Claw
        matches = cedt_regex.find(Pattern.FINDING_ALL_BRAND, "makers.php3")

        return matches
    except Exception as error_msg:
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error_msg,   
            )