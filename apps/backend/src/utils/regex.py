import re
import requests

from typing import Any
from src.utils.pattern import Pattern
from src.config import CRAWLER_ENDPOINT, CRAWLER_MOBILE_ENDPOINT, CRAWLER_HEADERS

class Regex:
    def __init__(self):
        # เก็บ cache ของแต่ละ path ที่ดึงมา
        self.__cache = {}

    # pattern เอาจาก class Pattern
    # url_path: path ของ web ที่ต้องการ crawler
    # mobile: ใช้ url ในรูปแบบของ mobile เผื่อติด navbar ซึ่งเราไม่อยากได้
    # flags: options ของ lib re
    # cache: ใช้ข้อมูลจาก cache ไหม true / false
    
    def find(self, pattern: Pattern, url_path: str, mobile=True, cache=True) -> list[Any]:

        # หากเจอใน cache ให้เอาจาก cache ไป
        if (cache and url_path in self.__cache):
            print("From Cache")
            return self.__cache[url_path]

        # get raw html
        response = requests.get(url=f"{CRAWLER_MOBILE_ENDPOINT if mobile else CRAWLER_ENDPOINT}/{url_path}", headers=CRAWLER_HEADERS)

        # Error handling
        if response.status_code != 200:
            print(f"Failed to get path {url_path} with status code: {response.status_code}")

            raise Exception(f"Failed to get path {url_path} with status code: {response.status_code}")            

        # แปลงให้ parse หรือจับ pattern ง่ายๆ
        raw_html = response.text

        # print(html)
        # ให้ regex หาตาม pattern ที่เราเขียน
        matches = re.findall(pattern, raw_html, flags=re.DOTALL | re.IGNORECASE)

        if len(matches) == 0:
            print("Empty data raw html:", raw_html)

            return []
        
        # เก็บลง cache
        self.__cache[url_path] = matches
        
        return matches

    # เอาไว้ Test pattern
    def parser(self, pattern: str, data: str) -> dict:
        matches = re.findall(pattern, data)

        return matches