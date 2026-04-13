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
PROGRESS_FILE = os.path.join(BASE_DIR, "progress/full_collection_scrape.json")

# Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

def get_image_via_curl(url):
    try:
        result = subprocess.run(['curl', '-s', '-m', '30', url], capture_output=True, text=True, timeout=40)
        html = result.stdout
        if not html: return None
        
        domain = "https://plitburg.ru" if "plitburg.ru" in url else "https://lincer.ru"
        
        # 1. og:image
        og_match = re.search(r'property="og:image" content="([^"]+)"', html)
        if og_match:
            img_url = og_match.group(1)
            if "logotype" not in img_url.lower():
                if img_url.startswith("/"): img_url = domain + img_url
                return img_url

        # 2. All iblock
        iblock_paths = re.findall(r'/upload/iblock/[a-zA-Z0-9/_.-]+', html)
        all_imgs = []
        for path in iblock_paths:
            clean_path = re.sub(r'[^\w/._-].*$', '', path)
            if clean_path.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                if any(x in clean_path.lower() for x in ["30d", "60d", "42f", "61b", "logotype"]): continue
                full_url = domain + clean_path if clean_path.startswith("/") else clean_path
                if full_url not in all_imgs: all_imgs.append(full_url)
        
        if len(all_imgs) > 1: return all_imgs[1]
        elif all_imgs: return all_imgs[0]
        return None
    except Exception as e:
        logging.error(f"Error fetching {url}: {e}")
        return None

def main():
    if not os.path.exists(DATA_JSON):
        logging.error("Data file not found")
        return

    with open(DATA_JSON, 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    # Load URL mapping (product_id -> source_url)
    if os.path.exists(URL_MAP_FILE):
        with open(URL_MAP_FILE, 'r') as f:
            url_map = json.load(f)
    else:
        logging.error("URL mapping not found. Run matching first.")
        return

    # Load progress
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f:
            progress = json.load(f)
    else:
        progress = {}

    count = 0
    total = len(products)
    
    for p in products:
        pid = p.get('id')
        brand = p.get('brand', '')
        
        if brand == "Cersanit": continue
        if pid in progress: continue
        
        url = url_map.get(pid)
        if not url: continue

        logging.info(f"Processing: {p.get('name')[:50]}...")
        
        img_url = get_image_via_curl(url)
        if img_url:
            try:
                # Use public_id based on PID to avoid duplicates and allow overwriting if needed
                res = cloudinary.uploader.upload(img_url, folder="collections", public_id=f"coll_{pid}")
                p['collection_image'] = res['secure_url']
                progress[pid] = res['secure_url']
                logging.info(f"Success: {res['secure_url']}")
            except Exception as e:
                logging.error(f"Cloudinary error: {e}")
                time.sleep(5) # throttle on error
        
        count += 1
        if count % 20 == 0:
            with open(DATA_JSON, 'w', encoding='utf-8') as f:
                json.dump(products, f, ensure_ascii=False, indent=2)
            with open(PROGRESS_FILE, 'w') as f:
                json.dump(progress, f)
            logging.info(f"--- Progress saved ({count} items processed) ---")
        
        time.sleep(1.5)

    with open(DATA_JSON, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    logging.info("Job complete.")

if __name__ == "__main__":
    main()
