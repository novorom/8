import requests
from bs4 import BeautifulSoup
import json

url = "https://lincer.ru/catalog/plitka/amati_modern_dekor_2sht_50_5_40_2_azori/"
r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(r.text, 'html.parser')

name = soup.find('h1').text.strip() if soup.find('h1') else ''
print(f"Name: {name}")

bc = soup.find('div', id='bx_breadcrumb_0')
if bc:
    bcs = soup.find_all('a', class_='breadcrumb__link')
    breadcrumbs = [a.text.strip() for a in bcs]
    print(f"Breadcrumbs: {breadcrumbs}")

price_el = soup.find('div', class_='product-price__current')
price = 0
if price_el:
    price_text = price_el.text.replace(' ', '').replace('₽', '').replace('руб', '').strip()
    try: price = int(price_text)
    except: pass
print(f"Price: {price}")

props = {}
for p in soup.find_all('div', class_=lambda c: c and 'product-property' in c):
    n = p.find('span', class_=lambda c: c and 'name' in c)
    v = p.find('span', class_=lambda c: c and 'value' in c)
    if n and v:
        props[n.text.strip().replace(':', '')] = v.text.strip()

for p in soup.find_all('div', class_=lambda c: c and 'properties__item' in c):
    n = p.find('span', class_=lambda c: c and 'name' in c)
    v = p.find('span', class_=lambda c: c and 'value' in c)
    if n and v:
        props[n.text.strip().replace(':', '')] = v.text.strip()
print(f"Props: {props}")

imgs = []
for img in soup.find_all('img'):
    src = img.get('src')
    if src and '/upload/iblock/' in src and 'resize_cache' not in src:
        if src.startswith('/'): src = "https://lincer.ru" + src
        if src not in imgs: imgs.append(src)
print(f"Images: {imgs}")
