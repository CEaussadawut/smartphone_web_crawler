class Pattern:
    FINDING_ALL_BRAND = r'<li>\s*<a href="([^"]*phones[^"]*)">(.*?)</a>\s*</li>'
    FINDING_ALL_PHONE_BRAND = r'<li>\s*<a href="([^"]*\.php)"><img\s+src="?([^" >]+)"?[^>]*>\s*(.*?)<\/a><\/li>'
    FINDING_BATTERY = r'<td class="nfo"[^>]*>(.*?)<\/td>'

    FINDING_DISPLAY_TYPE = r'<td\b[^>]*\bdata-spec\s*=\s*["]displaytype["][^>]*>(.*?)<\/td>'
    #FINDING_DISPLAY_SIZE มีส่วนที่เป็น  <sup>2</sup> ใช้ให้เป็น cm² ต้องมี part map ก่อนส่งด้วย JSON ไป Front   
    FINDING_DISPLAY_SIZE = r'<td\b[^>]*\bdata-spec\s*=\s*["]displaysize["][^>]*>(.*?)<\/td>'  
    FINDING_DISPLAY_RESOLUTION = r'<td\b[^>]*\bdata-spec\s*=\s*["]displayresolution["][^>]*>(.*?)<\/td>'
    FINDING_DISPLAY_PROTECTION = r'<td\b[^>]*\bdata-spec\s*=\s*["]displayprotection["][^>]*>(.*?)<\/td>'

    FINDING_PLATFORM_OS = r'<td\b[^>]*\bdata-spec\s*=\s*["]os["][^>]*>(.*?)<\/td>'
    FINDING_PLATFORM_CHIPSET = r'<td\b[^>]*\bdata-spec\s*=\s*["]chipset["][^>]*>(.*?)<\/td>'
    FINDING_PLATFORM_CPU = r'<td\b[^>]*\bdata-spec\s*=\s*["]cpu["][^>]*>(.*?)<\/td>'
    FINDING_PLATFORM__GPU = r'<td\b[^>]*\bdata-spec\s*=\s*["]gpu["][^>]*>(.*?)<\/td>'

    FINDING_TABLE_HEAD = r'<th[^>]*rowspan="[^"]*"[^>]*scope="row"[^>]*>(.*?)</th>'
    FINDING_TABLE_TTL = r'<td[^>]*class="ttl"[^>]*><a[^>]*>(.*?)</a></td>'
    FINDING_TABLE_NFO = r'<td[^>]*class=["\'][^"\']*\bnfo\b[^"\']*["\'][^>]*>([\s\S]*?)</td>'
    FINDING_PHOTO = r'<img src="(.*)" border=0 alt=".*">'
    FINDING_PHOTO_IN_SPEC_PAGE = r'<div class="specs-photo-main">\n*\s*<a href=(.*)><img alt="[^"]" src=(.*)<\/a>'
    FINDING_COMMS = r'<td class="nfo" data\-spec=".">(.)<\/td>'
    FINDING_MISC = r'<td class="nfo" data-spec="(colors|models|sar-eu|price)">([^<]+)<\/td>'