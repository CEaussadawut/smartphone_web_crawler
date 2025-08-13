import re
import os
import requests
from fastapi import APIRouter, HTTPException, status
from fake_useragent import UserAgent

from src.packages import regex

router = APIRouter(prefix="/process", tags=["process"])

cache = {}

regex_package = regex.Regex()

@router.get(
    "/",
    name="api for process",
    description="",
    include_in_schema=False,
    status_code=status.HTTP_200_OK,
)
async def process():
    return {"data": "ok"}

@router.get(
    "/images",
    name="api for process",
    description="",
    include_in_schema=False,
    status_code=status.HTTP_200_OK,
)
async def image():
    res = regex_package.test()
    return res


@router.get(
    "/get_brands",
    name="api for process",
    description="",
    include_in_schema=False,
    status_code=status.HTTP_200_OK,
)
async def get_brands():
    if "home_page" in cache:
        print("From cache")
        return {"data": cache["brands"]} 
    
    ua = UserAgent()
    
    headers = {
        "User-Agent": ua.random,
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }

    res = requests.get(url=f"{os.getenv("CRAWLER_ENDPOINT")}/makers.php3", headers=headers)
    
    if res.status_code != 200:
        print("Error code: ", res.status_code)
        
        raise HTTPException(
            status_code=res.status_code,
            detail=f"Failed to fetch data from crawler: {res.status_code}"
        )
    
    raw_html = res.text

    html = raw_html.encode().decode('unicode_escape')

    pattern = regex_package.whyzotee_pattern()
    matches = re.findall(pattern, html, flags=re.DOTALL | re.IGNORECASE)

    brands = []
    
    for href, name in matches:
        clean_name = re.sub(r'<.*?>', '', name).strip()
        if href.endswith(".php") and "-phones-" in href and clean_name:
            brands.append({
                "name": clean_name,
                "link": f"https://www.gsmarena.com/{href}"
            })

    cache["brands"] = brands

    return {"data": brands}