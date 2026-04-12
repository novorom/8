import requests
from bs4 import BeautifulSoup
import json
import re

base = "https://plitburg.ru"
headers = {"User-Agent": "Mozilla/5.0"}
all_links = set()

for i in range(1, 5):
    url = f"{base}/brand/azori/?PAGEN_1={i}"
    resp = requests.get(url, headers=headers)
    soup = BeautifulSoup(resp.text, 'html.parser')
    links = set(a['href'] for a in soup.find_all('a', href=True) if '/catalog/kollektsii/' in a['href'] and 'azori' in a['href'])
    all_links.update(links)

collections_extracted = []
for href in list(all_links):
    name = href.split('/')[-2]
    # Name from URL slug: bricks_briks_31_5kh63_azori
    parts = name.split('_')
    if len(parts) > 2:
        collections_extracted.append(parts[0] + " " + parts[1])

print(collections_extracted[:10])
