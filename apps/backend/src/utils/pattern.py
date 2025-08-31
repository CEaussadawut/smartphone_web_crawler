class Pattern:
    FINDING_ALL_BRANDS = r'<li>\s*<a href="([^"]*phones[^"]*)">(.*?)</a>\s*</li>'
    FINDING_ALL_PHONE_BRAND = r'<li>\s*<a href="([^"]*\.php)">\s*<img src="([^"]*\.(?:jpg|png|webp))"[^>]*>\s*(.*?)</a>\s*</li>'
    FINDING_ALL_PHONE_BRAND = r'<li>\s*<a href="([^"]*\.php)">\s*<img src="([^"]*\.(?:jpe?g|png|webp|gif))"[^>]*>\s*(.*?)</a>\s*</li>'
    PHONE_NAME = r'<h1[^>]*class="specs-phone-name-title"[^>]*[^>]*>(.*?)</h1>'
    PHONE_IMAGE = r'<img[^>]*alt="[^"]*MORE PICTURES"[^>]*src=([^>\s]*)'
    PHONE_TABLE = r'<table[^>]*cellspacing="0"[^>]*>(.*?)</table>'
    PHONE_ROW_PATTERN = r'<tr[^>]*>(.*?)</tr>'
    PHONE_TABLE_HEAD = r'<th[^>]*rowspan="[^"]*"[^>]*scope="row"[^>]*>(.*?)</th>'
    PHONE_TABLE_TTL = r'<td[^>]*class="ttl"[^>]*><a[^>]*>(.*?)</a></td>'
    PHONE_TABLE_NFO = r'<td[^>]*class=["\'][^"\']*\bnfo\b[^"\']*["\'][^>]*>([\s\S]*?)</td>'
    CLEAN_TEXT = r'<[^>]+>'
    