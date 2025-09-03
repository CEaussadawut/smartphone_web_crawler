class Pattern:
    FINDING_ALL_BRANDS = r'<li>\s*<a href="([^"]*phones[^"]*)">(.*?)</a>\s*</li>'
    FINDING_ALL_PHONE_BRAND = r'<li>\s*<a href="([^"]*\.php)">\s*<img src="([^"]*\.(?:jpe?g|png|webp|gif))"[^>]*>\s*(.*?)</a>\s*</li>'