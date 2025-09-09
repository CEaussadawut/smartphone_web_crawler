from pydantic import BaseModel


class SearchPhone(BaseModel):
    name: str
    img:str
    href: str