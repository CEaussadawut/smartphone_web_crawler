import asyncio
import random
import re
from fastapi import APIRouter, HTTPException, status

from src.config.crawler import CRAWLER_ENDPOINT
from src.model import Brands, SearchPhone
from src.utils import Regex, Pattern

import requests

router = APIRouter(prefix="/api")

cedt_regex = Regex()


# ฟังก์ชันสำหรับดึงข้อมูลจาก device (หรือ phone) ด้วย regex
async def search_phone(keyword: str) -> list[SearchPhone]:
    try:
        # หน่วงเวลาแบบสุ่ม
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

# ฟังก์ชันหลักสำหรับการค้นหา 
# ถ้าใช้ API จากเว็บ จะ search เจอแค่ reviews กับ phone จึงสร้าง method search_phone() แยกขึ้นมา โดยใช้ RexEx แล้วเอาค่าที่ return จาก search_phone() มาใส่รวมกับ search()
@router.post("/search", status_code=status.HTTP_200_OK, response_model=dict)
def search(keyword: str) -> dict:
    try:
        # ใช้ API ของ GSMArena เพื่อดึงข้อมูล reviews และ news
        url = f"https://www.gsmarena.com/search-json.php3?sSearch={keyword}"
        resp = requests.get(url, timeout=15)
        resp.raise_for_status()  # ถ้า error จะโยน exception
        
        # ดึงข้อมูล JSON จาก API
        data = resp.json()

        # เรียกใช้ test_search เพื่อดึงข้อมูล device (หรือ phone)
        all_phone = asyncio.run(test_search(keyword))

        # สร้าง dictionary เพื่อเก็บข้อมูลทั้งหมด
        all_data = {
            "phones": all_phone,  # ใช้ all_phone แทน devices
            "news": [],
            "reviews": []
        }

        # ดึงข้อมูลจาก reviews และ news ที่ได้จาก API
        for item in data.get("reviews", []):
            clean_name = re.sub(r"<.*?>", "", item["text"]).strip()  # ลบ HTML tags ออก
            phone = SearchPhone(name=clean_name, img=item["src"], href=f"{CRAWLER_ENDPOINT}/{item['href']}")
            if phone not in all_data["reviews"]:
                all_data["reviews"].append(phone)

        for item in data.get("news", []):
            clean_name = re.sub(r"<.*?>", "", item["text"]).strip()  # ลบ HTML tags ออก
            phone = SearchPhone(name=clean_name, img=item["src"], href=f"{CRAWLER_ENDPOINT}/{item['href']}")
            if phone not in all_data["news"]:
                all_data["news"].append(phone)

        return all_data
    
    except Exception as error_msg:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error_msg),
        )