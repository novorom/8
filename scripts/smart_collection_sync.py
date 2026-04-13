import os
import json
import subprocess
import cloudinary
import cloudinary.uploader
import time
import re
import logging

# Cloudinary configuration
cloudinary.config(
    cloud_name="de1sotnld",
    api_key="458436493949628",
    api_secret="YBuNnADbviTuobnBkuKymII6kDs"
)

# Paths
BASE_DIR = "/Users/r/8"
DATA_JSON = os.path.join(BASE_DIR, "lib/products-data.json")
URL_MAP_FILE = os.path.join(BASE_DIR, "progress/product_url_map.json")
COLLECTION_PROGRESS = os.path.join(BASE_DIR, "progress/collection_covers.json")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

def get_collection_url_and_image(product_url):
    """
    Парсит страницу ТОВАРА, находит ссылку на его КОЛЛЕКЦИЮ, 
    переходит в неё и берет заглавное фото (обложку).
    """
    try:
        # 1. Загружаем страницу товара
        res = subprocess.run(['curl', '-s', '-m', '20', product_url], capture_output=True, text=True)
        html = res.stdout
        if not html: return None
        
        # Ищем ссылку на коллекцию (как на скриншоте Романа)
        # Обычно это ссылка внутри блока "Входит в коллекцию"
        # Паттерн для Plitburg: /catalog/kollektsii/some_name/
        coll_match = re.search(r'href="(/catalog/kollektsii/[^"]+)"', html)
        if not coll_match:
            # Fallback: иногда на Lincer/Plitburg это просто ссылка с текстом "Коллекция..."
            coll_match = re.search(r'/catalog/kollektsii/[\w_-]+/', html)
            
        if coll_match:
            coll_path = coll_match.group(1) if hasattr(coll_match, 'group') else coll_match.group(0)
            coll_url = "https://plitburg.ru" + coll_path if coll_path.startswith("/") else coll_path
            
            logging.info(f"Found collection link: {coll_url}")
            
            # 2. Загружаем страницу КОЛЛЕКЦИИ
            res_coll = subprocess.run(['curl', '-s', '-m', '20', coll_url], capture_output=True, text=True)
            html_coll = res_coll.stdout
            
            # 3. Ищем обложку в коллекции (og:image или первый большой iblock)
            og_match = re.search(r'property="og:image" content="([^"]+)"', html_coll)
            if og_match and "logotype" not in og_match.group(1):
                img = og_match.group(1)
                return "https://plitburg.ru" + img if img.startswith("/") else img
            
            iblock_paths = re.findall(r'/upload/iblock/[a-zA-Z0-9/_.-]+', html_coll)
            for path in iblock_paths:
                if any(x in path for x in ["logotype", "30d", "60d", "42f", "61b"]): continue
                if path.lower().endswith((".jpg", ".png", ".webp")):
                    return "https://plitburg.ru" + path
                    
        return None
    except Exception as e:
        logging.error(f"Error: {e}")
        return None

def main():
    with open(DATA_JSON, 'r') as f: products = json.load(f)
    with open(URL_MAP_FILE, 'r') as f: url_map = json.load(f)
    
    if os.path.exists(COLLECTION_PROGRESS):
        with open(COLLECTION_PROGRESS, 'r') as f: coll_cache = json.load(f)
    else:
        coll_cache = {}

    count = 0
    for p in products:
        pid = p.get('id')
        coll_name = p.get('collection')
        brand = p.get('brand', '')
        
        if brand == "Cersanit" or not coll_name: continue
        
        # Если для этой коллекции мы уже нашли обложку — просто применяем
        if coll_name in coll_cache:
            if p.get('collection_image') != coll_cache[coll_name]:
                p['collection_image'] = coll_cache[coll_name]
            continue

        url = url_map.get(pid)
        if not url: continue

        logging.info(f"Seeking cover for collection: {coll_name} (via {p.get('name')})")
        cover_url = get_collection_url_and_image(url)
        
        if cover_url:
            try:
                # Загружаем в Cloudinary один раз для всей коллекции
                safe_coll_id = re.sub(r'[^\w-]', '_', coll_name)
                res = cloudinary.uploader.upload(cover_url, folder="collections_v2", public_id=f"cover_{safe_coll_id}")
                coll_cache[coll_name] = res['secure_url']
                p['collection_image'] = res['secure_url']
                logging.info(f"Updated collection {coll_name}: {res['secure_url']}")
            except Exception as e:
                logging.error(f"Cloudinary error: {e}")
        
        count += 1
        if count % 10 == 0:
            with open(DATA_JSON, 'w') as f: json.dump(products, f, ensure_ascii=False, indent=2)
            with open(COLLECTION_PROGRESS, 'w') as f: json.dump(coll_cache, f)
            
        time.sleep(1)

if __name__ == "__main__":
    main()
