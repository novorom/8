import os
import json
import subprocess
import cloudinary
import cloudinary.uploader
import time
import re
import logging
from bs4 import BeautifulSoup

# Cloudinary configuration
cloudinary.config(
    cloud_name="de1sotnld",
    api_key="458436493949628",
    api_secret="YBuNnADbviTuobnBkuKymII6kDs"
)

BASE_DIR = "/Users/r/8"
DATA_JSON = os.path.join(BASE_DIR, "lib/products-data.json")
PROGRESS_FILE = os.path.join(BASE_DIR, "progress/direct_collection_sync.json")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

def get_collection_cover_from_plitburg(coll_name):
    """
    Ищет коллекцию на Plitburg через поиск и берет её обложку.
    """
    try:
        search_query = subprocess.run(['python3', '-c', f'import urllib.parse; print(urllib.parse.quote("{coll_name}"))'], capture_output=True, text=True).stdout.strip()
        search_url = f"https://plitburg.ru/search/?q={search_query}"
        
        res = subprocess.run(['curl', '-s', '-m', '20', search_url], capture_output=True, text=True)
        html = res.stdout
        
        # Ищем ссылку на страницу коллекции в результатах поиска
        match = re.search(r'href="(/catalog/kollektsii/[^"]+)"', html)
        if match:
            coll_url = "https://plitburg.ru" + match.group(1)
            logging.info(f"Matched collection on Plitburg: {coll_url}")
            
            res_coll = subprocess.run(['curl', '-s', '-m', '20', coll_url], capture_output=True, text=True)
            html_coll = res_coll.stdout
            
            # Берем самую первую большую картинку
            iblock_paths = re.findall(r'/upload/iblock/[a-zA-Z0-9/_.-]+', html_coll)
            for path in iblock_paths:
                if any(x in path for x in ["logotype", "30d", "60d", "42f", "61b"]): continue
                if path.lower().endswith((".jpg", ".png", ".webp")):
                    return "https://plitburg.ru" + path
        return None
    except Exception as e:
        logging.error(f"Error searching Plitburg for {coll_name}: {e}")
        return None

def main():
    with open(DATA_JSON, 'r') as f: products = json.load(f)
    
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f: progress = json.load(f)
    else:
        progress = {}

    # Собираем список уникальных коллекций
    collections = {}
    for p in products:
        name = p.get('collection')
        brand = p.get('brand', '')
        if name and brand != "Cersanit":
            if name not in collections:
                collections[name] = []
            collections[name].append(p)

    logging.info(f"Unique collections to process: {len(collections)}")

    count = 0
    for coll_name, prods in collections.items():
        if coll_name in progress: continue

        logging.info(f"Processing collection [{count}/{len(collections)}]: {coll_name}")
        
        cover_url = get_collection_cover_from_plitburg(coll_name)
        
        if cover_url:
            try:
                safe_id = re.sub(r'[^\w-]', '_', coll_name)
                res = cloudinary.uploader.upload(cover_url, folder="verified_collections", public_id=f"cover_{safe_id}")
                final_url = res['secure_url']
                
                # Обновляем все товары в этой коллекции
                for p in prods:
                    p['collection_image'] = final_url
                
                progress[coll_name] = final_url
                logging.info(f"Updated collection {coll_name} -> {final_url}")
            except Exception as e:
                logging.error(f"Cloudinary error: {e}")
        else:
            logging.warning(f"No cover found for {coll_name}. Marking products for deletion.")
            for p in prods:
                p['_DELETE_ME'] = True
            progress[coll_name] = "NOT_FOUND"
        
        count += 1
        if count % 10 == 0:
            with open(DATA_JSON, 'w') as f: json.dump(products, f, ensure_ascii=False, indent=2)
            with open(PROGRESS_FILE, 'w') as f: json.dump(progress, f)
            logging.info("--- Progress saved ---")
        
        time.sleep(1)

if __name__ == "__main__":
    main()
