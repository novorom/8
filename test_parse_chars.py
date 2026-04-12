import requests
from bs4 import BeautifulSoup
import re

url = "https://plitburg.ru/catalog/plitka/170061_602_estel_plitka_d_sten_60_20_nefrit_keramika/"
r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(r.text, 'html.parser')

props = soup.find_all('div', class_=lambda c: c and 'properties-item' in c)
for p in props:
    n = p.find('div', class_=lambda c: c and 'name' in c)
    v = p.find('div', class_=lambda c: c and 'value' in c)
    if n and v:
        print(f"{n.text.strip()}: {v.text.strip()}")

# Maybe there is a brand link?
brand_links = soup.find_all('a', href=lambda x: x and '/brand/' in x)
for bl in set(b.get('href') for b in brand_links if b.get('href')):
    print(f"Brand link: {bl}")
    
# Maybe collection link?
coll_links = soup.find_all('a', href=lambda x: x and '/kollektsii/' in x)
for cl in set(c.get('href') for c in coll_links if c.get('href')):
    print(f"Coll link: {cl}")

