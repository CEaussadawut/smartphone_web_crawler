import re
from fastapi import APIRouter, HTTPException, status

from src.model import Brands
from src.utils import Regex, Pattern

router = APIRouter(prefix="/api")

ตัวอย่าง_regex = Regex()

@router.get("/brands", status_code=status.HTTP_200_OK, response_model=list[Brands])
async def brands() -> list[Brands]:
    try:
        matches = ตัวอย่าง_regex.find(Pattern.FINDING_ALL_BRANDS, "makers.php3", True)

        brands = []

        for href, name in matches:
            clean_name = re.sub(r"<.*?>", "", name).strip()
            brand_name = Brands(name=clean_name, href=href)

            if brand_name not in brands:
                brands.append(brand_name)

        return brands
    except Exception as error_msg:
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error_msg,
            )
