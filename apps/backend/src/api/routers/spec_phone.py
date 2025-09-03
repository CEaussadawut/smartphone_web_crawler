import re
from typing import Dict
from spec_phone import SpecPhone
from src.utils import Regex, Pattern
from fastapi import APIRouter, HTTPException, status

class SimplePhoneParser:
    def __init__(self, url_path: str, mobile: bool = True, cache: bool = True):
        self.url_path = url_path
        self.mobile = mobile
        self.cache = cache
        self.regex = Regex()
    
    def extract_phone_name(self) -> str:
        matches = self.regex.find(Pattern.PHONE_NAME, self.url_path, self.mobile, self.cache)
        if matches:
            return re.sub(Pattern.CLEAN_TEXT, '', matches[0]).strip()
        return "Unknown Phone"
    
    def extract_phone_image(self) -> str:
        matches = self.regex.find(Pattern.PHONE_IMAGE, self.url_path, self.mobile, self.cache)
        if matches:
            return matches[0].strip()
        return ""
    
    def clean_text(self, text: str) -> str:
        if not text:
            return ""
        
        clean = re.sub(Pattern.CLEAN_TEXT, '', text)
        clean = re.sub(r'\s+', ' ', clean).strip()
        clean = clean.replace('&nbsp;', ' ').replace('&amp;', '&')
        clean = clean.replace('&lt;', '<').replace('&gt;', '>')
        clean = clean.replace('&#8377;', 'â‚¹').replace('&thinsp;', ' ')
        return clean
    
    def extract_all_specifications(self) -> Dict[str, Dict[str, str]]:
        tables = self.regex.find(Pattern.PHONE_TABLE, self.url_path, self.mobile, self.cache)
        
        all_specs = {}
        
        for table in tables:
            header_matches = re.findall(Pattern.PHONE_TABLE_HEAD, table)
            
            if header_matches:
                section_name = self.clean_text(header_matches[0])
                if section_name.lower().replace(' ', '') == 'maincamera':
                    section_name = 'main_camera'
                elif section_name.lower().replace(' ', '') == 'selfiecamera':
                    section_name = 'selfie_camera'
                else:
                    section_name = section_name.lower().replace(' ', '_')
                
                rows = re.findall(Pattern.PHONE_ROW_PATTERN, table, re.DOTALL)
                
                section_specs = {}
                
                for row in rows:
                    ttl_matches = re.findall(Pattern.PHONE_TABLE_TTL, row, re.DOTALL)
                    nfo_matches = re.findall(Pattern.PHONE_TABLE_NFO, row, re.DOTALL)
                    
                    if ttl_matches and nfo_matches:
                        key = self.clean_text(ttl_matches[0])
                        value = self.clean_text(nfo_matches[0])
                        
                        if key and value:
                            section_specs[key] = value
                
                if section_specs:
                    all_specs[section_name] = section_specs
        
        return all_specs
    
    def parse(self) -> SpecPhone:
        phone_name = self.extract_phone_name()
        phone_image = self.extract_phone_image()
        all_specs = self.extract_all_specifications()
        
        spec_phone = SpecPhone(
            name=phone_name,
            img=phone_image,
            **all_specs
        )
        
        return spec_phone

def parse_phone_specs(url_path: str, mobile: bool = True, cache: bool = True) -> SpecPhone:
    parser = SimplePhoneParser(url_path, mobile, cache)
    return parser.parse()

def parse_phone_specs_from_html(html_content: str) -> SpecPhone:
    class LegacyPhoneParser:
        def __init__(self, html_content: str):
            self.html = html_content
        
        def extract_phone_name(self) -> str:
            match = re.search(Pattern.PHONE_NAME, self.html)
            if match:
                return re.sub(Pattern.CLEAN_TEXT, '', match.group(1)).strip()
            return "Unknown Phone"
        
        def extract_phone_image(self) -> str:
            match = re.search(Pattern.PHONE_IMAGE, self.html)
            if match:
                return match.group(1).strip()
            return ""
        
        def clean_text(self, text: str) -> str:
            if not text:
                return ""
            
            clean = re.sub(Pattern.CLEAN_TEXT, '', text)
            clean = re.sub(r'\s+', ' ', clean).strip()
            clean = clean.replace('&nbsp;', ' ').replace('&amp;', '&')
            clean = clean.replace('&lt;', '<').replace('&gt;', '>')
            clean = clean.replace('&#8377;', 'â‚¹').replace('&thinsp;', ' ')
            return clean
        
        def extract_all_specifications(self) -> Dict[str, Dict[str, str]]:
            tables = re.findall(Pattern.PHONE_TABLE, self.html, re.DOTALL)
            
            all_specs = {}
            
            for table in tables:
                header_match = re.search(Pattern.PHONE_TABLE_HEAD, table)
                
                if header_match:
                    section_name = self.clean_text(header_match.group(1))
                    if section_name.lower().replace(' ', '') == 'maincamera':
                        section_name = 'main_camera'
                    elif section_name.lower().replace(' ', '') == 'selfiecamera':
                        section_name = 'selfie_camera'
                    else:
                        section_name = section_name.lower().replace(' ', '_')
                    
                    rows = re.findall(Pattern.PHONE_ROW_PATTERN, table, re.DOTALL)
                    
                    section_specs = {}
                    
                    for row in rows:
                        ttl_match = re.search(Pattern.PHONE_TABLE_TTL, row, re.DOTALL)
                        nfo_match = re.search(Pattern.PHONE_TABLE_NFO, row, re.DOTALL)
                        
                        if ttl_match and nfo_match:
                            key = self.clean_text(ttl_match.group(1))
                            value = self.clean_text(nfo_match.group(1))
                            
                            if key and value:
                                section_specs[key] = value
                    
                    if section_specs:
                        all_specs[section_name] = section_specs
            
            return all_specs
        
        def parse(self) -> SpecPhone:
            phone_name = self.extract_phone_name()
            phone_image = self.extract_phone_image()
            all_specs = self.extract_all_specifications()
            
            spec_phone = SpecPhone(
                name=phone_name,
                img=phone_image,
                **all_specs
            )
            
            return spec_phone
    
    parser = LegacyPhoneParser(html_content)
    return parser.parse()

    