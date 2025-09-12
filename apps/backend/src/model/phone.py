from pydantic import BaseModel


class PhonePreview(BaseModel):
    brand: str
    name: str
    img: str
    href: str


class PhoneSpec(BaseModel):
    display_type: str | None
    display_size: str | None
    display_resolution: str | None
    display_protection: str | None
    platform_os: str | None
    platform_chipset: str | None
    platform_cpu: str | None
    platform_gpu: str | None
    battery: str | None


class Phone(BaseModel):
    name: str
    spec: PhoneSpec
