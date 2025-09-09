class Pattern:
    FINDING_ALL_BRAND = r'<li>\s*<a href="([^"]*phones[^"]*)">(.*?)</a>\s*</li>'
    FINDING_ALL_PHONE_BRAND = r'<li>\s*<a href="([^"]*\.php)"><img\s+src="?([^" >]+)"?[^>]*>\s*(.*?)<\/a><\/li>'
    
    FINDING_PHONE_NETWORK = r'(?:<tr class="tr-toggle"(?: data-spec-optional="")?[^>]*>[\s\S]*?<td class="nfo"[^>]*>(?:<a [^>]*>)?|<td class="nfo"[^>]*data-spec="nettech"[^>]*>(?:<a [^>]*>)?)([\s\S]*?)(?:<\/a>)?<\/td>'
    
    FINDING_PHONE_LAUNCH = r'<td class="nfo" data-spec="(?:year|status)">([^<]+)<\/td>'
    
    FINDING_BODY_DIMENSIONS = r'<td\b[^>]\bdata-spec\s=\s*["]dimensions["][^>]>(.?)<\/td>'
    FINDING_BODY_WEIGHT = r'<td\b[^>]\bdata-spec\s=\s*["]weight["][^>]>(.?)<\/td>'
    FINDING_BODY_BUILD = r'<td\b[^>]\bdata-spec\s=\s*["]build["][^>]>(.?)<\/td>'
    FINDING_BODY_SIM = r'<td\b[^>]\bdata-spec\s=\s*["]sim["][^>]>(.?)<\/td>'
    FINDING_BODY_OTHER = r'<td\b[^>]\bdata-spec\s=\s*["]bodyother["][^>]>(.?)<\/td>'
    
    FINDING_DISPLAY_TYPE = r'<td\b[^>]*\bdata-spec\s*=\s*["]displaytype["][^>]*>(.*?)<\/td>'
    FINDING_DISPLAY_SIZE = r'<td\b[^>]*\bdata-spec\s*=\s*["]displaysize["][^>]*>(.*?)<\/td>'  
    FINDING_DISPLAY_RESOLUTION = r'<td\b[^>]*\bdata-spec\s*=\s*["]displayresolution["][^>]*>(.*?)<\/td>'
    FINDING_DISPLAY_PROTECTION = r'<td\b[^>]*\bdata-spec\s*=\s*["]displayprotection["][^>]*>(.*?)<\/td>'
    
    FINDING_PLATFORM_OS = r'<td\b[^>]*\bdata-spec\s*=\s*["]os["][^>]*>(.*?)<\/td>'
    FINDING_PLATFORM_CHIPSET = r'<td\b[^>]*\bdata-spec\s*=\s*["]chipset["][^>]*>(.*?)<\/td>'
    FINDING_PLATFORM_CPU = r'<td\b[^>]*\bdata-spec\s*=\s*["]cpu["][^>]*>(.*?)<\/td>'
    FINDING_PLATFORM__GPU = r'<td\b[^>]*\bdata-spec\s*=\s*["]gpu["][^>]*>(.*?)<\/td>'
    
    FINDING_MEMORY = r'<td class="nfo" data-spec="(?:memoryslot|internalmemory|memoryother)">([^<]+)<\/td>'
    
    FINDING_MAIN_CAMERA_MODULES = r'<td class="nfo"[^>]data-spec="cam1modules"[^>]>([\s\S]?)<\/td>'
    FINDING_MAIN_CAMERA_VIDEO   = r'<td class="nfo"[^>]data-spec="cam1video"[^>]>([\s\S]?)<\/td>'
    FINDING_SELFIE_CAMERA_MODULES = r'<td class="nfo"[^>]data-spec="cam2modules"[^>]>([\s\S]?)<\/td>'
    FINDING_SELFIE_CAMERA_VIDEO   = r'<td class="nfo"[^>]data-spec="cam2video"[^>]>([\s\S]?)<\/td>'
    
    FINDING_SOUND = r'<td[^>]*class="ttl"[^>]*>\s*<a[^>]*?term=(loudspeaker|audio-jack)[^"]*"[^>]*>.*?<\/a>\s*<\/td>\s*<td[^>]*class="nfo"[^>]*>\s*([^<]+)\s*<\/td>'
    
    FINDING_COMMS = r'<td class="nfo" data\-spec=".">(.)<\/td>'
    
    FINDING_FEATURES = r'<td class="nfo" data-spec="(?:sensors)">([^<]+)<\/td>'
    
    FINDING_BATTERY = r'<td class="nfo"[^>]*>(.*?)<\/td>'
    
    FINDING_MISC = r'<td class="nfo" data-spec="(colors|models|sar-eu|price)">([^<]+)<\/td>'
    
    FINDING_PHOTO = r'<img src="(.*)" border=0 alt=".*">'
    FINDING_PHOTO_IN_SPEC_PAGE = r'<div class="specs-photo-main">\n*\s*<a href=(.*)><img alt="[^"]" src=(.*)<\/a>'
    
    
    

    FINDING_TABLE_HEAD = r'<th[^>]*rowspan="[^"]*"[^>]*scope="row"[^>]*>(.*?)</th>'
    FINDING_TABLE_TTL = r'<td[^>]*class="ttl"[^>]*><a[^>]*>(.*?)</a></td>'
    FINDING_TABLE_NFO = r'<td[^>]*class=["\'][^"\']*\bnfo\b[^"\']*["\'][^>]*>([\s\S]*?)</td>'
    #FINDING_DISPLAY_SIZE มีส่วนที่เป็น  <sup>2</sup> ใช้ให้เป็น cm² ต้องมี part map ก่อนส่งด้วย JSON ไป Front 