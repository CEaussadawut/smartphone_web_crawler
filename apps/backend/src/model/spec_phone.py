from pydantic import BaseModel
from typing import Dict

class SpecPhone(BaseModel):
    name: str
    img: str
    network: Dict[str, str] = {}
    launch: Dict[str, str] = {}
    body: Dict[str, str] = {}
    display: Dict[str, str] = {}
    platform: Dict[str, str] = {}
    memory: Dict[str, str] = {}
    main_camera: Dict[str, str] = {}
    selfie_camera: Dict[str, str] = {}
    sound: Dict[str, str] = {}
    comms: Dict[str, str] = {}
    features: Dict[str, str] = {}
    battery: Dict[str, str] = {}
    misc: Dict[str, str] = {}