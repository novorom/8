import os
import json
import subprocess
import cloudinary
import cloudinary.uploader
import time
import re
import logging
from io import BytesIO
import requests
from PIL import Image

# Cloudinary configuration
cloudinary.config(
    cloud_name="de1sotnld",
    api_key="458436493949628",
    api_secret="YBuNnADbviTuobnBkuKymII6kDs"
)

BASE_DIR = "/Users/r/8"
DATA_JSON = os.path.join(BASE_DIR, "lib/products-data.json")
URL_MAP_FILE = os.path.join(BASE_DIR, "progress/product_url_map.json")
PROGRESS_FILE = os.path.join(BASE_DIR, "progress/product_main_photo_sync.json")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

def get_main_product_photo_url(product_url):
    try:
        res = subprocess.run(['curl', '-s', '-m', '20', product_url], capture_output=True, text=True)
        html = res.stdout
        if not html: return None
        domain = "https://plitburg.ru" if "plitburg.ru" in product_url else "https://lincer.ru"
        iblock_paths = re.findall(r'/upload/iblock/[a-zA-Z0-9/_.-]+', html)
        for path in iblock_paths:
            clean_path = re.sub(r'[^\w/._-].*$', '', path)
            if clean_path.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                if any(x in clean_path.lower() for x in ["30d", "60d", "42f", "61b", "logotype"]): continue
                return domain + clean_path if clean_path.startswith("/") else clean_path
        return None
    except Exception as e:
        logging.error(f"Error fetching product photo from {product_url}: {e}")
        return None

def download_and_compress(url):
    """Скачивает картинку и сжимает её, если она больше 10МБ."""
    try:
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
        img_data = resp.content
        
        # Если файл больше 9.5МБ (запас), сжимаем
        if len(img_data) > 9.5 * 1024 * 1024:
            logging.info(f"Compressing large image: {len(img_data)} bytes")
            img = Image.open(BytesIO(img_data))
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            output = BytesIO()
            img.save(output, format="JPEG", quality=85, optimize=True)
            return output.getvalue()
        
        return img_data
    except Exception as e:
        logging.error(f"Download/Compress error: {e}")
        return None

def main():
    with open(DATA_JSON, 'r') as f: products = json.load(f)
    with open(URL_MAP_FILE, 'r') as f: url_map = json.load(f)
    
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f: progress = json.load(f)
    else:
        progress = {}

    logging.info(f"Starting product photo sync with COMPRESSION for {len(products)} items...")

    count = 0
    updated_count = 0
    
    for p in products:
        pid = p.get('id')
        brand = p.get('brand', '')
        if brand == "Cersanit" or pid in progress: continue
        
        url = url_map.get(pid)
        if not url: continue

        logging.info(f"[{count}] {p.get('name')[:40]}...")
        photo_url = get_main_product_photo_url(url)
        
        if photo_url:
            compressed_data = download_and_compress(photo_url)
            if compressed_data:
                try:
                    res = cloudinary.uploader.upload(
                        compressed_data, 
                        folder="products_v2", 
                        public_id=f"prod_{pid}"
                    )
                    p['main_image'] = res['secure_url']
                    p['images'] = [res['secure_url']]
                    progress[pid] = res['secure_url']
                    updated_count += 1
                    logging.info(f"Success: {res['secure_url']}")
                except Exception as e:
                    logging.error(f"Cloudinary error: {e}")
            else:
                logging.warning(f"Failed to process image data for {pid}")
        else:
            logging.warning(f"No photo URL for {pid}. Marking for deletion.")
            p['_DELETE_ME'] = True
            progress[pid] = "NOT_FOUND"
        
        count += 1
        if count % 20 == 0:
            with open(DATA_JSON, 'w') as f: json.dump(products, f, ensure_ascii=False, indent=2)
            with open(PROGRESS_FILE, 'w') as f: json.dump(progress, f)
            logging.info(f"--- Progress saved ({updated_count} photos updated) ---")
            logging.info(f"--- Global check: {sum(1 for i in products if 'products_v2' in i.get('main_image', ''))} total items in DB have V2 photos ---")
        
        time.sleep(1.2)

    final_products = [p for p in products if not p.get('_DELETE_ME')]
    with open(DATA_JSON, 'w') as f: json.dump(final_products, f, ensure_ascii=False, indent=2)
    logging.info("Job complete.")

if __name__ == "__main__":
    main()
