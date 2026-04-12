import requests
from bs4 import BeautifulSoup
import json
import re

url = "https://plitburg.ru/catalog/plitka/170061_602_estel_plitka_d_sten_60_20_nefrit_keramika/"
r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(r.text, 'html.parser')

name = soup.find('h1').text.strip() if soup.find('h1') else ''

# Breadcrumbs
breadcrumbs = []
bc_items = soup.find_all('a', class_='breadcrumb-link')
for bc in bc_items:
    breadcrumbs.append(bc.get('title') or bc.text.strip())

print(f"Name: {name}")
print(f"Breadcrumbs: {breadcrumbs}")

# The JSON with price and article is inside a div with class c-catalog-element
el = soup.find('div', class_=lambda c: c and 'c-catalog-element' in c)
if el and el.get('data-data'):
    data = json.loads(el['data-data'])
    print(f"Article: {data.get('article')}")
    print(f"Price: {data['prices'][0]['base']['value'] if data.get('prices') else 0}")
    
# Extract properties from the JSON data-properties or from HTML
if el and el.get('data-properties'):
    props = json.loads(el['data-properties'])
    for p in props[:5]:
        print(p)

# Images
imgs = []
gallery = soup.find_all('div', class_=lambda c: c and 'catalog-element-gallery-pictures-slider-item-picture' in c)
for item in gallery:
    src = item.get('data-src') or item.find('img').get('data-src') or item.find('img').get('src')
    if src:
        src = "https://plitburg.ru" + re.sub(r'/resize_cache(/iblock/[a-f0-9]+)/[0-9_]+/(.*)', r'\1/\2', src)
        imgs.append(src)
print(f"Images: {imgs}")

