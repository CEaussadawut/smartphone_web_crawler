import re
import random
import asyncio
from fastapi import APIRouter, HTTPException, status

from src.config.crawler import CRAWLER_ENDPOINT
from src.model import SearchPhone
from src.utils import Regex, Pattern

router = APIRouter(prefix="/api")

cedt_regex = Regex()

@router.post("/search", status_code=status.HTTP_200_OK, response_model=list[SearchPhone])
async def search(keyword: str) -> dict:
    try:
        await asyncio.sleep(random.uniform(0.1, 0.25))
        matches = cedt_regex.find(Pattern.FIND_SEARCH_PHONE, f"results.php3?sFreeText={keyword}", mobile=False)

        all_phone: list[SearchPhone] = []

        for href, img, name in matches:
            clean_name = re.sub(r"<.*?>", "", name).strip()  # ลบ HTML tags ออก
            phone = SearchPhone(name=clean_name, img=img, href=f"{CRAWLER_ENDPOINT}/{href}")

            if phone not in all_phone:
                all_phone.append(phone)

        return all_phone
    except Exception as error_msg:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error_msg),
        )