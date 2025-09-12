import re
from src.model import Phone, PhonePreview, PhoneSpec
from src.utils import Regex, Pattern
from fastapi import APIRouter, HTTPException, status

from src.config import CRAWLER_ENDPOINT


router = APIRouter(prefix="/api")

cedt_regex = Regex()

@router.get("/device/spec", status_code=status.HTTP_200_OK, response_model=Phone)
def get_phone_spec(phone_url: str):
    try:
        # Extract the path from the full URL
        url_path = phone_url.replace(CRAWLER_ENDPOINT + '/', "")

        # Fetch the HTML content once
        # The find method caches the content, so subsequent calls with the same url_path will be fast
        phone_name = re.sub(r"^[^_]+_|-\d+\.php$", "", url_path)
        phone_name = phone_name.replace("_", " ")
        phone_name = " ".join(word.capitalize() for word in phone_name.split())

        def find_spec(pattern, only_first_index=True):
            matches = cedt_regex.find(pattern, url_path)

            if only_first_index:
                return matches[0] if matches else None

            return matches

        def find_all_photo(photo_pattern):
            all_photo_path = cedt_regex.find(Pattern.FINDING_ALL_PHOTO_LINK, url_path)

            if not all_photo_path:
                return None
            
            matches = cedt_regex.find(photo_pattern, all_photo_path[0])

            if not matches:
                return None
            
            return matches
        
        spec = PhoneSpec(
            network=find_spec(Pattern.FINDING_PHONE_NETWORK, False),
            launch=find_spec(Pattern.FINDING_PHONE_LAUNCH, False),
            body_dimensions=find_spec(Pattern.FINDING_BODY_DIMENSIONS),
            body_weight=find_spec(Pattern.FINDING_BODY_WEIGHT),
            body_build=find_spec(Pattern.FINDING_BODY_BUILD),
            body_sim=find_spec(Pattern.FINDING_BODY_SIM),
            body_other=find_spec(Pattern.FINDING_BODY_OTHER),
            display_type=find_spec(Pattern.FINDING_DISPLAY_TYPE),
            display_size=find_spec(Pattern.FINDING_DISPLAY_SIZE),
            display_resolution=find_spec(Pattern.FINDING_DISPLAY_RESOLUTION),
            display_protection=find_spec(Pattern.FINDING_DISPLAY_PROTECTION),
            platform_os=find_spec(Pattern.FINDING_PLATFORM_OS),
            platform_chipset=find_spec(Pattern.FINDING_PLATFORM_CHIPSET),
            platform_cpu=find_spec(Pattern.FINDING_PLATFORM_CPU),
            platform_gpu=find_spec(Pattern.FINDING_PLATFORM_GPU),
            memory=find_spec(Pattern.FINDING_MEMORY),
            rear_cam=find_spec(Pattern.FINDING_MAIN_MODULES),
            rear_video=find_spec(Pattern.FINDING_MAIN_VIDEO),
            front_cam=find_spec(Pattern.FINDING_SELFIE_MODULES),
            front_video=find_spec(Pattern.FINDING_SELFIE_VIDEO),
            sound=find_spec(Pattern.FINDING_SOUND),
            sound_3_5=find_spec(Pattern.FINDING_SOUND_3_5),
            comms_wlan=find_spec(Pattern.FINDING_COMMS_WLAN),
            comms_bluetooth=find_spec(Pattern.FINDING_COMMS_BLUETOOTH),
            comms_positioning=find_spec(Pattern.FINDING_COMMS_POSITIONING),
            comms_nfc=find_spec(Pattern.FINDING_COMMS_NFC),
            comms_radio=find_spec(Pattern.FINDING_COMMS_RADIO),
            comms_usb=find_spec(Pattern.FINDING_COMMS_USB),
            features=find_spec(Pattern.FINDING_FEATURES),
            battery=find_spec(Pattern.FINDING_BATTERY),
            misc_color=find_spec(Pattern.FINDING_MISC_COLORS),
            misc_models=find_spec(Pattern.FINDING_MISC_MODELS),
            misc_price=find_spec(Pattern.FINDING_MISC_PRICE),
            photo_preview=find_spec(Pattern.FINDING_PHOTO_IN_SPEC_PAGE),
            photo=find_all_photo(Pattern.FINDING_PHOTO)
        )

        return Phone(name=phone_name, spec=spec)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

@router.get("/device/{brand}", status_code=status.HTTP_200_OK,response_model=list[PhonePreview])
def get_phone_brand(brand: str):
    try:
        all_phone_matches = cedt_regex.find(Pattern.FINDING_ALL_PHONE_BRAND, brand)

        all_phone = []

        brand_name = brand.split("-")[0].capitalize()

        for href, img, name in all_phone_matches:
            clean_name = re.sub(r"<.*?>", "", name).strip()
            phone = PhonePreview(brand=brand_name,name=clean_name, img=img, href=f"{CRAWLER_ENDPOINT}/{href}")

            if phone not in all_phone:
                all_phone.append(phone)
        
        return all_phone
    except Exception as error_msg:
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(error_msg),
            )
   