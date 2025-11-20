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
        raw_html = self.get_raw_html(url_path, mobile, cache)

        # ให้ regex หาตาม pattern ที่เราเขียน
        matches = re.findall(pattern, raw_html, flags=re.DOTALL | re.IGNORECASE)

        if len(matches) == 0:
            print("Empty data raw html:", raw_html)
        
        return matches

    def find_nested_tags(self, pattern1: Pattern, pattern2: Pattern, url_path: str, mobile=True, cache=True) -> list[Any]:
        raw_html = self.get_raw_html(url_path, mobile, cache)

        # หา block จาก pattern1 (เช่น div nav-pages)
        blocks = re.findall(pattern1, raw_html, flags=re.DOTALL | re.IGNORECASE)

        results = []
        
        # debug
        if not blocks:
            safe_name = url_path.replace("/", "_").replace("\\", "_")
            filename = f"debug_raw_html_{safe_name}.html"

            with open(filename, "w", encoding="utf-8") as f:
                f.write(raw_html)

        # สำหรับ block แต่ละอัน หา pattern2 ภายใน block นั้น
        for block in blocks:
            matches = re.findall(pattern2, block, flags=re.DOTALL | re.IGNORECASE)
            results.append(matches)

        return results
    
    def get_raw_html(self, url_path, mobile=True, cache=True):
        if cache and (url_path in self.__cache):
            print("Use html from Cache")
            return self.__cache[url_path]

        response = requests.get(url=f"{CRAWLER_MOBILE_ENDPOINT if mobile else CRAWLER_ENDPOINT}/{url_path}", headers=CRAWLER_HEADERS)
        
        if response.status_code != 200:
            print(f"Failed to get path {url_path} with status code: {response.status_code}")

            print(f"url {CRAWLER_MOBILE_ENDPOINT if mobile else CRAWLER_ENDPOINT}/{url_path}")

            raise Exception(f"Failed to get path {url_path} with status code: {response.status_code}")

        self.__cache[url_path] = response.text

        raw_html = self.__cache[url_path]

        return raw_html

    # เอาไว้ Test pattern
    def parser(self, pattern: str, data: str) -> dict:
        matches = re.findall(pattern, data)

        return matches