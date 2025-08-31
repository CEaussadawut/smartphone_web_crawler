from pydantic import BaseModel


class PhonePreview(BaseModel):
    brand: str
    name: str
    img: str
    href: str
