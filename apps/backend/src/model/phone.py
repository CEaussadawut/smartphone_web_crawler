from pydantic import BaseModel


class PhonePreview(BaseModel):
    brand: str
    name: str
    img: str
    href: str


class PhoneSpec(BaseModel):
    network: list[str] | None
    launch: list[str] | None
    body_dimensions: str | None
    body_weight: str | None
    body_build: str | None  
    body_sim: str | None
    body_other: str | None
    display_type: str | None
    display_size: str | None
    display_resolution: str | None
    display_protection: str | None
    platform_os: str | None
    platform_chipset: str | None
    platform_cpu: str | None
    platform_gpu: str | None
    memory: str | None
    rear_cam: str | None
    rear_video: str | None
    front_cam: str | None
    front_video: str | None
    sound: str | None
    sound_3_5: str | None
    comms_wlan: str | None
    comms_bluetooth: str | None
    comms_positioning: str | None
    comms_nfc: str | None
    comms_radio: str | None
    comms_usb: str | None
    features: str | None
    battery: str | None
    misc_color: str | None
    misc_models: str | None
    misc_price: str | None
    photo_preview: str | None
    photo: list[str] | None


class Phone(BaseModel):
    name: str
    spec: PhoneSpec
