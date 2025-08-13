class Regex:
    def whyzotee_pattern(self) -> str:
        get_brands_pattern = r'<li>\s*<a href="(.*?)">(.*?)</a>\s*</li>'

        return get_brands_pattern