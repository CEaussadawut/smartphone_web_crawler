class Pattern:
    # Brand
    FINDING_ALL_BRAND = r'<li>\s*<a href="([^"]*phones[^"]*)">(.*?)</a>\s*</li>'

    # All Phone Brand
    FINDING_ALL_PHONE_BRAND = r'<li>\s*<a href="([^"]*\.php)"><img\s+src="?([^" >]+)"?[^>]*>\s*(.*?)<\/a><\/li>'

    # Network
    FINDING_PHONE_NETWORK = r'(?:<tr class="tr-toggle"(?: data-spec-optional="")?[^>]*>[\s\S]*?<td class="nfo"[^>]*>(?:<a [^>]*>)?|<td class="nfo"[^>]*data-spec="nettech"[^>]*>(?:<a [^>]*>)?)([\s\S]*?)(?:<\/a>)?<\/td>'

    # Launch
    FINDING_PHONE_LAUNCH = r'<td class="nfo" data-spec="(?:year|status)">([^<]+)<\/td>'

    # Body
    FINDING_BODY_DIMENSIONS = r'<td[^>]*data-spec\s*=\s*"dimensions"[^>]*>(.*?)</td>'
    FINDING_BODY_WEIGHT = r'<td[^>]*data-spec\s*=\s*"weight"[^>]*>(.*?)</td>'
    FINDING_BODY_BUILD  = r'<td[^>]*data-spec\s*=\s*"build"[^>]*>(.*?)</td>'
    FINDING_BODY_SIM    = r'<td[^>]*data-spec\s*=\s*"sim"[^>]*>(.*?)</td>'
    FINDING_BODY_OTHER  = r'<td[^>]*data-spec\s*=\s*"bodyother"[^>]*>(.*?)</td>'
    
    # Display
    FINDING_DISPLAY_TYPE = r'<td\b[^>]*\bdata-spec\s*=\s*["]displaytype["][^>]*>(.*?)<\/td>'
    #FINDING_DISPLAY_SIZE มีส่วนที่เป็น  <sup>2</sup> ใช้ให้เป็น cm² ต้องมี part map ก่อนส่งด้วย JSON ไป Front   
    FINDING_DISPLAY_SIZE = r'<td\b[^>]*\bdata-spec\s*=\s*["]displaysize["][^>]*>(.*?)<\/td>'  
    FINDING_DISPLAY_RESOLUTION = r'<td\b[^>]*\bdata-spec\s*=\s*["]displayresolution["][^>]*>(.*?)<\/td>'
    FINDING_DISPLAY_PROTECTION = r'<td\b[^>]*\bdata-spec\s*=\s*["]displayprotection["][^>]*>(.*?)<\/td>'

    # Platform
    FINDING_PLATFORM_OS = r'<td\b[^>]*\bdata-spec\s*=\s*["]os["][^>]*>(.*?)<\/td>'
    FINDING_PLATFORM_CHIPSET = r'<td\b[^>]*\bdata-spec\s*=\s*["]chipset["][^>]*>(.*?)<\/td>'
    FINDING_PLATFORM_CPU = r'<td\b[^>]*\bdata-spec\s*=\s*["]cpu["][^>]*>(.*?)<\/td>'
    FINDING_PLATFORM_GPU = r'<td\b[^>]*\bdata-spec\s*=\s*["]gpu["][^>]*>(.*?)<\/td>'

    # Memory
    FINDING_MEMORY = r'<td class="nfo" data-spec="(?:memoryslot|internalmemory|memoryother)">([^<]+)<\/td>'
    
    # Rear Camera
    FINDING_MAIN_MODULES = r'<td[^>]*data-spec="cam1modules"[^>]*>([\s\S]*?)</td>'
    FINDING_MAIN_VIDEO   = r'<td[^>]*data-spec="cam1video"[^>]*>([\s\S]*?)</td>'

    # Front Camera
    FINDING_SELFIE_MODULES = r'<td[^>]*data-spec="cam2modules"[^>]*>([\s\S]*?)</td>'
    FINDING_SELFIE_VIDEO   = r'<td[^>]*data-spec="cam2video"[^>]*>([\s\S]*?)</td>'

    # Sound
    FINDING_SOUND = r'<td[^>]*class="ttl"[^>]*>\s*<a[^>]*?term=(loudspeaker|audio-jack)[^"]*"[^>]*>.*?</a>\s*</td>\s*'
    FINDING_SOUND_3_5 = r'<td[^>]*class="nfo"[^>]*>\s*([^<]+?)\s*</td>'

    # Comms
    FINDING_COMMS = r'<td class="nfo" data\-spec=".">(.)<\/td>'

    # Features
    FINDING_FEATURES = r'<td class="nfo" data-spec="(?:sensors)">([^<]+)<\/td>'

    # Battery
    FINDING_BATTERY = r'<td class="nfo"[^>]*>(.*?)<\/td>'

    # Misc
    FINDING_MISC_COLORS = r'<td[^>]*data-spec="colors"[^>]*>(.*?)</td>'
    FINDING_MISC_MODELS = r'<td[^>]*data-spec="models"[^>]*>(.*?)</td>'
    FINDING_MISC_PRICE = r'<td[^>]*data-spec="price"[^>]*>(.*?)</td>'

    # Image
    FINDING_PHOTO_IN_SPEC_PAGE = r'<div class="specs-cp-pic-rating">[\s\S]*?<img[^>]*src=["\']?([^"\'>\s]+)'
    FINDING_ALL_PHOTO_LINK = r'<li id="specs-cp-pics">.*?<a href="([^"]+)"'
    FINDING_PHOTO = r'<img\s+src="([^"]+)"[^>]*>'

    # Search
    FIND_SEARCH_PHONE = r'<a\s+href=([^>]+)><img\s+src=([^ ]+)[^>]*><strong>(.*?)</strong>'
