import asyncio
import random
import re
from fastapi import APIRouter, HTTPException, status

from src.config.crawler import CRAWLER_ENDPOINT
from src.model import Brands, SearchPhone
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


@router.post("/test_search", status_code=status.HTTP_200_OK, response_model=list[SearchPhone])
async def test_search(keyword: str) -> list[SearchPhone]:
    try:
        # ใส่ Pattern + Path ของลิงค์ที่ต้องการ Claw
        await asyncio.sleep(random.uniform(0.1, 0.25))
        matches = cedt_regex.find(Pattern.FIND_SEARCH_PHONE, f"results.php3?sFreeText={keyword}", mobile=False)

        all_phone:list[SearchPhone] = []

        for href, img, name in matches:
            clean_name = re.sub(r"<.*?>", "", name).strip()
            phone = SearchPhone(name=clean_name, img=img, href=f"{CRAWLER_ENDPOINT}/{href}")

            if phone not in all_phone:
                all_phone.append(phone)

        return all_phone
    except Exception as error_msg:
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error_msg,
            )
