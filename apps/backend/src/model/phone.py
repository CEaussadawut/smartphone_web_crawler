from pydantic import BaseModel

class Brands(BaseModel):
    name: str
    link: str
