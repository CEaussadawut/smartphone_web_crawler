import re
import asyncio
import random
from src.model import PhonePreview
from src.utils import Regex, Pattern
from fastapi import APIRouter, HTTPException, status

from src.config import CRAWLER_ENDPOINT


router = APIRouter(prefix="/api")

ตัวอย่าง_regex = Regex()

@router.get("/export/csv", status_code=status.HTTP_200_OK,response_model=list[PhonePreview])
async def get_phone_brand():
    try:    

        x = ตัวอย่าง_regex.find(Pattern.FINDING_ALL_BRANDS, "makers.php3", True)
        matches = []
        for href, _ in x:
            await asyncio.sleep(random.uniform(1, 1.25))
            matches.extend(ตัวอย่าง_regex.find(Pattern.FINDING_ALL_PHONE_BRAND, href))



        
        

        all_phone = []

        for href, img, name in matches:
            clean_name = re.sub(r"<.*?>", "", name).strip()
            phone = PhonePreview(name=clean_name, img=img, href=f"{CRAWLER_ENDPOINT}/{href}")

            if phone not in all_phone:
                all_phone.append(phone)
        
        return all_phone
    except Exception as error_msg:
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error_msg,
            )
   