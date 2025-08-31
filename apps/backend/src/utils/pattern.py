class Pattern:
    FINDING_ALL_BRANDS = r'<li>\s*<a href="([^"]*phones[^"]*)">(.*?)</a>\s*</li>'
    FINDING_ALL_PHONE_BRAND = r'<li>\s*<a href="([^"]*\.php)"><img\s+src="?([^" >]+)"?[^>]*>\s*(.*?)<\/a><\/li>'
    FINDING_BATTERY = r'<td class="nfo"[^>]*>(.*?)<\/td>'
