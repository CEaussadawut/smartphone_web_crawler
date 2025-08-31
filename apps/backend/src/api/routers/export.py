import re
import asyncio
import random
from src.model import PhonePreview
from src.utils import Regex, Pattern
from fastapi import APIRouter, HTTPException, status

from src.config import CRAWLER_ENDPOINT


router = APIRouter(prefix="/api")

cedt_regex = Regex()

cached = False

@router.get("/export_csv", status_code=status.HTTP_200_OK,response_model=list[PhonePreview])
async def export_csv():
    global cached
    try:    
        all_brand = cedt_regex.find(Pattern.FINDING_ALL_BRAND, "makers.php3")

        get_50_phone = []

        for brand_name, _ in all_brand:
            if not cached:
                await asyncio.sleep(random.uniform(0.1, 0.25))

            brand_clean = brand_name.split("-")[0].capitalize()
            phones = cedt_regex.find(Pattern.FINDING_ALL_PHONE_BRAND, brand_name)
            get_50_phone.extend([(href, img, name, brand_clean) for href, img, name in phones])
            # get_50_phone.extend(cedt_regex.find(Pattern.FINDING_ALL_PHONE_BRAND, brand_name))

        all_phone = []

        for href, img, name, brand in get_50_phone:
            clean_name = re.sub(r"<.*?>", "", name).strip()
            phone = PhonePreview(brand=brand,name=clean_name, img=img, href=f"{CRAWLER_ENDPOINT}/{href}")

            if phone not in all_phone:
                all_phone.append(phone)

        cached = True

        return all_phone
    except Exception as error_msg:
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error_msg,
            )
   