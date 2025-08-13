import re
import requests
from fastapi import APIRouter, HTTPException, status
from fake_useragent import UserAgent

from src.model import Brands
from src.utils.regex import Regex
from src.config import CRAWLER_ENDPOINT

router = APIRouter()

cache = {}
regex_pattern = Regex()

@router.get("/get_brands", status_code=status.HTTP_200_OK)
async def get_brands() -> list[Brands]:
    if "brands" in cache:
        print("From cache")
        return cache["brands"]
    
    ua = UserAgent()
    
    headers = {
        "User-Agent": ua.random,
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }

    res = requests.get(url=f"{CRAWLER_ENDPOINT}/makers.php3", headers=headers)
    
    if res.status_code != 200:
        print("Error code: ", res.status_code)
        
        raise HTTPException(
            status_code=res.status_code,
            detail=f"Failed to fetch data from crawler: {res.status_code}"
        )
    
    raw_html = res.text

    html = raw_html.encode().decode('unicode_escape')

    pattern = regex_pattern.whyzotee_pattern()
    matches = re.findall(pattern, html, flags=re.DOTALL | re.IGNORECASE)

    brands = []
    
    for href, name in matches:
        clean_name = re.sub(r'<.*?>', '', name).strip()
        if href.endswith(".php") and "-phones-" in href and clean_name:
            brands.append(Brands(name=clean_name, link=f"https://www.gsmarena.com/{href}"))

    cache["brands"] = brands

    return brands