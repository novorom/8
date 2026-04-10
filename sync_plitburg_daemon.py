import json
import re
import requests
from bs4 import BeautifulSoup
import time
import os
import subprocess
import random

DATA_FILE = "lib/products-data.json"
TS_NEW_FILE = "lib/products-data-new.ts"
PLITBURG_URLS = "plitburg_urls.json"

try:
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        products = json.load(f)
except Exception as e:
    exit(1)

with open(PLITBURG_URLS, "r", encoding="utf-8") as f:
    all_urls = json.load(f)

# Find what we already mapped
# Plitburg uses slug in the URL
existing_slugs = set(p.get("slug") for p in products if p.get("slug"))

urls_to_scrape = [u for u in all_urls if u.rstrip('/').split('/')[-1] not in existing_slugs and "/kollektsii/" not in u and "/brand/" not in u]

print(f"Total products to scrape: {len(urls_to_scrape)}")

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
})

def update_ts_files(prods):
    new_json = json.dumps(prods, ensure_ascii=False, indent=2)
    header = "// @ts-nocheck\n// AUTO-GENERATED — НЕ РЕДАКТИРОВАТЬ ВРУЧНУЮ\n\nexport const importedProducts: any[] = "
    with open(TS_NEW_FILE, "w", encoding="utf-8") as f:
        f.write(header)
        f.write(new_json)
        f.write(";")

def commit_and_push(count):
    try:
        subprocess.run(["git", "add", DATA_FILE, TS_NEW_FILE], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        subprocess.run(["git", "commit", "-m", f"feat: ночная автосинхронизация с Плитбургом, добавлено {count} новых товаров с описаниями SEO"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        subprocess.run(["git", "push", "origin", "main"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("Git push successful.")
    except Exception as e:
        print(f"Git push failed: {e}")

def parse_product(url):
    try:
        r = session.get(url, timeout=10)
        if r.status_code != 200:
            return url, None
            
        soup = BeautifulSoup(r.text, 'html.parser')
        h1 = soup.find('h1')
        name = h1.text.strip() if h1 else ""
        if not name: return url, None
        
        slug = url.rstrip('/').split('/')[-1]
        prod_id = f"plitburg-{slug}"
        
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
                if "," in coll: coll = coll.split(",")[0].strip()
                if ";" in coll: coll = coll.split(";")[0].strip()
                coll = coll.replace("Gracia Ceramica", "").replace("Unitile", "").replace("Shakhty", "").strip()
                slug_coll = re.sub(r"[^a-zа-яё0-9-]", "", coll.lower().replace(" ", "-"))
                if len(slug_coll) > 40:
                    coll = coll[:40]
                    if " " in coll: coll = coll.rsplit(" ", 1)[0]
                coll = coll.strip()
                
        if not brand or not coll:
            bc_items = soup.find_all('a', class_='breadcrumb-link')
            bc_texts = [bc.get('title') or bc.text.strip() for bc in bc_items]
            if not brand and len(bc_texts) >= 4:
                brand = bc_texts[3]
            if not coll and len(bc_texts) >= 5:
                coll = bc_texts[4]
            if "," in coll: coll = coll.split(",")[0].strip()
            if ";" in coll: coll = coll.split(";")[0].strip()
            coll = coll.replace("Gracia Ceramica", "").replace("Unitile", "").replace("Shakhty", "").strip()
            slug_coll = re.sub(r"[^a-zа-яё0-9-]", "", coll.lower().replace(" ", "-"))
            if len(slug_coll) > 40:
                coll = coll[:40]
                if " " in coll: coll = coll.rsplit(" ", 1)[0]
            coll = coll.strip()

        if not brand: return url, None
        if "Cersanit" in brand or "Церсанит" in brand:
            return url, "SKIP"
            
        imgs = []
        gallery = soup.find_all('div', class_=lambda c: c and 'catalog-element-gallery-pictures-slider-item-picture' in c)
        for item in gallery:
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
                
        if not imgs:
            img = soup.find('img', itemprop='image')
            if img:
                src = img.get('src')
                if src:
                    if src.startswith('/'): src = "https://plitburg.ru" + src
                    src = re.sub(r'/resize_cache(/iblock/[a-f0-9]+)/[0-9_]+/(.*)', r'\1/\2', src)
                    imgs.append(src)

        main_image = imgs[0] if imgs else None
        
        p_type = props.get("Тип товара", "Плитка")
        surface = props.get("Поверхность", "")
        format_p = props.get("Размер, мм", props.get("Размер", ""))

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
            "product_type": p_type,
            "surface": surface,
            "color": props.get("Цвет", ""),
            "design": props.get("Дизайн", ""),
            "format": format_p,
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

        surf_str = f" с {surface.lower()} поверхностью" if surface else ""
        form_str = f" в формате {format_p}" if format_p else ""
        
        seo_text = (f"{p_type} {name}{surf_str}{form_str} из коллекции {coll} от популярного бренда {brand}. "
                    f"Идеально подходит для ванной комнаты, кухни или гостиной. Устойчива к износу и влаге. "
                    f"Мы предлагаем низкие цены, скидки на опт и быструю доставку напрямую со склада в Янино (СПб и Ленобласть). "
                    f"Покупая {brand} у нас, вы получаете премиальное качество по доступной цене!")
        
        new_prod["description"] = seo_text

        return url, new_prod
    except Exception as e:
        print(f"Exception parsing {url}: {e}")
        return url, None

parsed_count = 0
skipped_count = 0
failed_count = 0
batch_size = 20

if os.path.exists("daemon_running.lock"):
    print("Daemon already running.")
    exit(0)
with open("daemon_running.lock", "w") as f:
    f.write("running")

try:
    for i in range(0, len(urls_to_scrape), batch_size):
        batch = urls_to_scrape[i:i+batch_size]
        
        for url in batch:
            _, prod = parse_product(url)
            if prod == "SKIP":
                skipped_count += 1
            elif prod:
                products.append(prod)
                parsed_count += 1
                print(f"Parsed [{parsed_count}]: {prod['name']}")
            else:
                failed_count += 1
            time.sleep(random.uniform(0.5, 1.0))
            
        print(f"Batch done. Parsed: {parsed_count}, Skipped: {skipped_count}, Failed: {failed_count}")
        
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(products, f, ensure_ascii=False, indent=2)
        update_ts_files(products)

        if parsed_count > 0 and parsed_count % 500 == 0:
            commit_and_push(parsed_count)
        
        time.sleep(5.0)

finally:
    if os.path.exists("daemon_running.lock"):
        os.remove("daemon_running.lock")

commit_and_push(parsed_count)
print(f"\nDaemon finished successfully! Scraped {parsed_count} new products.")
