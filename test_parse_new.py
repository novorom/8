import requests
from bs4 import BeautifulSoup
import json

url = "https://plitburg.ru/catalog/plitka/170061_602_estel_plitka_d_sten_60_20_nefrit_keramika/"
r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(r.text, 'html.parser')

name = soup.find('h1').text.strip() if soup.find('h1') else ''
breadcrumbs = [a.text.strip() for a in soup.find_all('a', class_='breadcrumb-link')]

# Plitburg breadcrumbs: Главная > Каталог > Плитка > Нефрит-Керамика > Estel (Эстель)
brand = breadcrumbs[3] if len(breadcrumbs) > 3 else ''
coll = breadcrumbs[4] if len(breadcrumbs) > 4 else ''

price_tag = soup.find('div', class_='catalog-element-price-discount')
price = 0
if price_tag:
    price_text = price_tag.text.replace(' ', '').replace('руб.', '').strip()
    try: price = int(price_text)
    except: pass

props = {}
for p in soup.find_all('div', class_=lambda c: c and 'catalog-element-properties-item' in c):
    name_tag = p.find('div', class_=lambda c: c and 'name' in c)
    val_tag = p.find('div', class_=lambda c: c and 'value' in c)
    if name_tag and val_tag:
        props[name_tag.text.strip().replace(':', '')] = val_tag.text.strip()

images = []
for img in soup.find_all('img'):
    src = img.get('data-src') or img.get('src')
    if src and '/upload/iblock/' in src and 'resize_cache' not in src:
        images.append("https://plitburg.ru" + src)

data = {
    "name": name,
    "brand": brand,
    "collection": coll,
    "price": price,
    "props": props,
    "images": list(set(images))
}
print(json.dumps(data, ensure_ascii=False, indent=2))
