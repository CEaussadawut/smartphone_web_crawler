from fake_useragent import UserAgent

CRAWLER_ENDPOINT= "https://www.gsmarena.com"
CRAWLER_MOBILE_ENDPOINT = "https://m.gsmarena.com/"

CRAWLER_HEADERS = {
    "User-Agent": UserAgent().random,
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}