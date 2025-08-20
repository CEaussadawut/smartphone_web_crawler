from pydantic import BaseModel

class Network(BaseModel):
    tecnology : str
    twoG : str
    threeG : str
    fourG : str
    fiveG : str
    speed : str

class Launch(BaseModel):
    announced: str
    status: str
    
class Body(BaseModel):
    dimentions : str
    weight : str
    build : str
    sim : str
    
class Display(BaseModel):
    type : str
    size : str
    resolution : str
    protection : str
    
class Platform(BaseModel):
    os : str
    chipset : str
    cpu : str
    gpu : str
    
class Memory(BaseModel):
    cardslot : str
    internal : str

class MainCamera(BaseModel):
    triple : str
    features : str
    video : str
    
class SelfieCamera(BaseModel):
    single : str
    features : str
    video : str
 
class Sound(BaseModel):
    loundspeaker : str
    jack : str
    
class Comms(BaseModel):
    wlan : str
    bluetooth : str
    positioning : str
    nfc : str
    radio : str
    usb : str
    
class Features(BaseModel):
    sensor : str
    
class Battery(BaseModel):
    type : str
    charging : str
    
class Misc(BaseModel):
    colors : str
    models : str
    sareu : str
    price : str
    
class OurTest(BaseModel):
    performance : str
    display : str
    loundspeaker : str
    battery : str
    
class EuLabel(BaseModel):
    energy : str
    battery : str
    freefall : str
    repairability : str

class SpecPhone(BaseModel):
    name: str
    img: str
    network: Network  
    launch: Launch
    body : Body
    display : Display
    platform : Platform
    memory : Memory
    camera : str
    main_camera : MainCamera
    selfie_camera : SelfieCamera
    sound : Sound
    comm : Comms
    features : Features
    battery : Battery
    misc : Misc
    ourtest : OurTest
    eulabel : EuLabel
    
    
    
    
    

