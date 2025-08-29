import re
from src.model import PhonePreview
from src.utils import Regex, Pattern
from fastapi import APIRouter, HTTPException, status

from src.config import CRAWLER_ENDPOINT


router = APIRouter(prefix="/api")

cedt_regex = Regex()

@router.get("/{brand}", status_code=status.HTTP_200_OK,response_model=list[PhonePreview])
async def get_phone_brand(brand: str):
    try:
        all_phone_matches = cedt_regex.find(Pattern.FINDING_ALL_PHONE_BRAND, brand, False)

        all_phone = []

        for href, img, name in all_phone_matches:
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
   