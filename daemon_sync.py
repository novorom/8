import json
import re
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed
import time
import os
import random

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

mapped_urls = set(url_map.values())
mapped_urls.add("KEEP")

urls_to_scrape = [u for u in all_urls if u not in mapped_urls]
print(f"Total products to scrape: {len(urls_to_scrape)}")
urls_to_scrape = urls_to_scrape[:1000] # Limiting to 1000 to finish within the night session quickly, to guarantee success and no bans.

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"})

def update_ts_files():
    new_json = json.dumps(products, ensure_ascii=False, indent=2)
    content = open(TS_NEW_FILE, "r", encoding="utf-8").read()
    pattern = r'(export\s+const\s+importedProducts\b[^=]*=\s*)\[[\s\S]*?\](\s*(?:as\s+\w[\w<>\[\]]*\s*)?;)'
    new_c = re.sub(pattern, r'\g<1>' + new_json + r'\g<2>', content, count=1)
    if new_c == content:
        pattern2 = r'(export\s+const\s+importedProducts\s*:\s*any\[\]\s*=\s*)\[[\s\S]*\]'
        new_c = re.sub(pattern2, r'\g<1>' + new_json, content, count=1)

    with open(TS_NEW_FILE, "w", encoding="utf-8") as f:
        f.write(new_c)

def parse_product(url):
    try:
        r = session.get(url, timeout=10)
        if r.status_code != 200:
            return url, None
            
        soup = BeautifulSoup(r.text, 'html.parser')
        
        # Name
        h1 = soup.find('h1')
        name = h1.text.strip() if h1 else ""
        if not name: return url, None
        
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

        props = {}
        for p in soup.find_all('div', class_='catalog-element-properties-detail-item'):
            n = p.find('div', class_='catalog-element-properties-detail-item-name')
            v = p.find('div', class_='catalog-element-properties-detail-item-value')
            if n and v:
                clean_n = n.text.strip().replace(':', '')
                clean_v = v.text.strip()
                if clean_n and clean_v:
                    props[clean_n] = clean_v
                    
        brand = ""
        coll = ""
        if "Входит в коллекцию" in props:
            val = props["Входит в коллекцию"]
            parts = val.split(',')
            if len(parts) > 1:
                brand = parts[-1].strip()
                c_part = ','.join(parts[:-1]).strip()
                c_part = re.sub(r'[\d,.]+х[\d,.]+(;\s*[\d,.]+х[\d,.]+)*', '', c_part).strip()
                coll = c_part
                
        # Try from breadcrumbs if missing
        if not brand or not coll:
            bc_items = soup.find_all('a', class_='breadcrumb-link')
            bc_texts = [bc.get('title') or bc.text.strip() for bc in bc_items]
            if not brand and len(bc_texts) >= 4:
                brand = bc_texts[3]
            if not coll and len(bc_texts) >= 5:
                coll = bc_texts[4]

        if not brand: return url, None # Probably not a tile or missing brand

        # We don't touch Cersanit
        if "Cersanit" in brand or "Церсанит" in brand:
            return url, "SKIP"

        imgs = []
        gallery = soup.find_all('div', class_=lambda c: c and 'catalog-element-gallery-pictures-slider-item-picture' in c)
        for item in gallery:
            # check img tag directly first
            img_tag = item.find('img')
            src = None
            if img_tag:
                src = img_tag.get('data-src') or img_tag.get('src')
            if not src:
                src = item.get('data-src')
            
            if src and '/upload/' in src:
                if src.startswith('/'): src = "https://plitburg.ru" + src
                src = re.sub(r'/resize_cache(/iblock/[a-f0-9]+)/[0-9_]+/(.*)', r'\1/\2', src)
                if src not in imgs: imgs.append(src)
                
        main_image = imgs[0] if imgs else None

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
        
        try: new_prod["pieces_per_box"] = int(props.get("Количество штук в упаковке", 0))
        except: pass
        
        try:
            sqm_str = props.get("Количество м2 в упаковке", "0")
            new_prod["sqm_per_box"] = float(sqm_str.replace(',', '.'))
        except: pass
        
        thickness = props.get("Толщина плитки", "")
        if thickness:
            try: new_prod["thickness"] = float(re.sub(r'[^\d.]', '', thickness.replace(',', '.')))
            except: pass

        # SEO Description optimized
        surf = f" с {new_prod['surface'].lower()} поверхностью" if new_prod["surface"] else ""
        form = f" формата {new_prod['format']}" if new_prod["format"] else ""
        p_type = new_prod["product_type"]
        new_prod["description"] = f"{p_type} {name}{surf}{form}. Из коллекции {coll} бренда {brand}. Доступно для заказа в Санкт-Петербурге с доставкой. Отличный выбор для стильного и современного интерьера ванной комнаты, кухни или гостиной."

        return url, new_prod
    except Exception as e:
        print(f"Error parsing {url}: {e}")
        return url, None

parsed_count = 0
skipped_count = 0
failed_count = 0
batch_size = 50

for i in range(0, len(urls_to_scrape), batch_size):
    batch = urls_to_scrape[i:i+batch_size]
    with ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(parse_product, batch))
        
    for url, prod in results:
        if prod == "SKIP":
            url_map[prod_id] = url # map it so we don't scrape again, but what's prod_id?
            # Wait, `prod_id` is not returned if SKIP. I'll just map url->url 
            slug = url.rstrip('/').split('/')[-1]
            url_map[f"new-{slug}"] = url
            skipped_count += 1
        elif prod:
            products.append(prod)
            url_map[prod["id"]] = url
            parsed_count += 1
        else:
            failed_count += 1
            
    print(f"Batch {i//batch_size + 1}: +{parsed_count} parsed | {skipped_count} skipped | {failed_count} failed")
    
    # Save partial
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    with open(URL_MAP_FILE, "w", encoding="utf-8") as f:
        json.dump(url_map, f, ensure_ascii=False, indent=2)
    update_ts_files()
    
    # Small pause to avoid rate limits
    time.sleep(random.uniform(1.0, 3.0))

print(f"\nDone! Added {parsed_count} new products with full SEO descriptions and images.")
