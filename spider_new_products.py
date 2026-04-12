import json
import re
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed
import time
import os
import subprocess

DATA_FILE = "lib/products-data.json"
URL_MAP_FILE = "progress/product_url_map.json"
PLITBURG_URLS = "plitburg_urls.json"
TS_NEW_FILE = "lib/products-data-new.ts"

with open(DATA_FILE, "r", encoding="utf-8") as f:
    products = json.load(f)

with open(URL_MAP_FILE, "r", encoding="utf-8") as f:
    url_map = json.load(f)

with open(PLITBURG_URLS, "r", encoding="utf-8") as f:
    all_urls = json.load(f)

# Find mapped URLs
mapped_urls = set(url_map.values())
mapped_urls.add("KEEP")

# Find remaining URLs
urls_to_scrape = [u for u in all_urls if u not in mapped_urls]
print(f"Total products to scrape: {len(urls_to_scrape)}")

# For testing, let's limit to 20
urls_to_scrape = urls_to_scrape[:20]

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"})

def parse_product(url):
    try:
        r = session.get(url, timeout=10)
        if r.status_code != 200:
            return None
            
        soup = BeautifulSoup(r.text, 'html.parser')
        
        # Name
        h1 = soup.find('h1')
        name = h1.text.strip() if h1 else ""
        if not name: return None
        
        # ID / Slug
        slug = url.rstrip('/').split('/')[-1]
        prod_id = f"new-{slug}"
        
        # Price and JSON properties
        price = 0
        sku = ""
        el = soup.find('div', class_=lambda c: c and 'c-catalog-element' in c)
        if el and el.get('data-data'):
            try:
                data = json.loads(el['data-data'])
                sku = data.get('article', '')
                if data.get('prices') and len(data['prices']) > 0:
                    price = data['prices'][0]['base']['value']
            except: pass

        # Properties
        props = {}
        for p in soup.find_all('div', class_='catalog-element-properties-detail-item'):
            n = p.find('div', class_='catalog-element-properties-detail-item-name')
            v = p.find('div', class_='catalog-element-properties-detail-item-value')
            if n and v:
                clean_n = n.text.strip().replace(':', '')
                clean_v = v.text.strip()
                if clean_n and clean_v:
                    props[clean_n] = clean_v
                    
        # Collection and Brand
        brand = ""
        coll = ""
        if "Входит в коллекцию" in props:
            # "Эстэль (Estel) 38,5х38,5; 60х20, Нефрит-Керамика" -> brand is after comma
            val = props["Входит в коллекцию"]
            parts = val.split(',')
            if len(parts) > 1:
                brand = parts[-1].strip()
                c_part = ','.join(parts[:-1]).strip()
                # remove dimensions like "38,5х38,5; 60х20"
                c_part = re.sub(r'[\d,.]+х[\d,.]+(;\s*[\d,.]+х[\d,.]+)*', '', c_part).strip()
                coll = c_part
        else:
            # Try from breadcrumbs
            bc_items = soup.find_all('a', class_='breadcrumb-link')
            bc_texts = [bc.get('title') or bc.text.strip() for bc in bc_items]
            if len(bc_texts) >= 5:
                brand = bc_texts[-2]
                coll = bc_texts[-1]

        # Extract images
        imgs = []
        gallery = soup.find_all('div', class_=lambda c: c and 'catalog-element-gallery-pictures-slider-item-picture' in c)
        for item in gallery:
            src = item.get('data-src') or item.find('img').get('data-src') or item.find('img').get('src')
            if src:
                src = "https://plitburg.ru" + re.sub(r'/resize_cache(/iblock/[a-f0-9]+)/[0-9_]+/(.*)', r'\1/\2', src)
                if src not in imgs: imgs.append(src)
                
        main_image = imgs[0] if imgs else None

        # Build product
        new_prod = {
            "id": prod_id,
            "sku": sku,
            "name": name,
            "slug": slug,
            "brand": brand,
            "collection": coll,
            "price_retail": price,
            "price_official": price,
            "main_image": main_image,
            "images": imgs,
            "product_type": props.get("Тип товара", "Плитка"),
            "surface": props.get("Поверхность", ""),
            "color": props.get("Цвет", ""),
            "design": props.get("Дизайн", ""),
            "format": props.get("Размер, мм", props.get("Размер", "")),
        }
        
        # Numerics
        try: new_prod["pieces_per_box"] = int(props.get("Количество штук в упаковке", 0))
        except: pass
        try: new_prod["sqm_per_box"] = float(props.get("Количество м2 в упаковке", 0).replace(',', '.'))
        except: pass
        
        thickness = props.get("Толщина плитки", "")
        if thickness: new_prod["thickness"] = float(re.sub(r'[^\d.]', '', thickness.replace(',', '.')))

        # Create dynamic SEO description
        surf = f" с {new_prod['surface'].lower()} поверхностью" if new_prod["surface"] else ""
        form = f" в формате {new_prod['format']}" if new_prod["format"] else ""
        p_type = new_prod["product_type"]
        new_prod["description"] = f"Купить {p_type.lower()} {name}{surf}{form} от бренда {brand} из коллекции {coll} в Санкт-Петербурге. Товар в наличии, доступен самовывоз и доставка. Отличный выбор для стильного интерьера."

        return url, new_prod
    except Exception as e:
        print(f"Error parsing {url}: {e}")
        return url, None

for url in urls_to_scrape:
    _, prod = parse_product(url)
    if prod:
        print(f"Parsed: {prod['brand']} | {prod['collection']} | {prod['name']}")
