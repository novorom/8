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

BASE_DIR = "/Users/r/8"
DATA_JSON = os.path.join(BASE_DIR, "lib/products-data.json")
URL_MAP_FILE = os.path.join(BASE_DIR, "progress/product_url_map.json")
PROGRESS_FILE = os.path.join(BASE_DIR, "progress/product_main_photo_sync.json")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

def get_main_product_photo(product_url):
    """
    Заходит на страницу ТОВАРА и берет ровно ОДНО главное фото (плитка на белом фоне).
    """
    try:
        res = subprocess.run(['curl', '-s', '-m', '20', product_url], capture_output=True, text=True)
        html = res.stdout
        if not html: return None
        
        domain = "https://plitburg.ru" if "plitburg.ru" in product_url else "https://lincer.ru"

        # 1. На Plitburg главное фото товара часто в блоке catalog-element-main-image или itemprop="image"
        # Ищем через регулярку iblock, который ПЕРВЫЙ в списке картинок (обычно это и есть товар)
        iblock_paths = re.findall(r'/upload/iblock/[a-zA-Z0-9/_.-]+', html)
        
        for path in iblock_paths:
            clean_path = re.sub(r'[^\w/._-].*$', '', path)
            if clean_path.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                # Игнорируем иконки и лого
                if any(x in clean_path.lower() for x in ["30d", "60d", "42f", "61b", "logotype"]): continue
                # Главное фото товара обычно НЕ png (интерьеры/лого бывают png)
                # Но для надежности берем первый попавшийся jpg/webp
                return domain + clean_path if clean_path.startswith("/") else clean_path
                    
        return None
    except Exception as e:
        logging.error(f"Error fetching product photo from {product_url}: {e}")
        return None

def main():
    with open(DATA_JSON, 'r') as f: products = json.load(f)
    with open(URL_MAP_FILE, 'r') as f: url_map = json.load(f)
    
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f: progress = json.load(f)
    else:
        progress = {}

    logging.info(f"Starting main product photo sync for {len(products)} items...")

    count = 0
    updated_count = 0
    
    for p in products:
        pid = p.get('id')
        brand = p.get('brand', '')
        
        # Пропускаем Cersanit и уже обработанные
        if brand == "Cersanit" or pid in progress: continue
        
        url = url_map.get(pid)
        if not url: continue

        logging.info(f"[{count}] Processing product: {p.get('name')[:50]}...")
        
        main_photo = get_main_product_photo(url)
        
        if main_photo:
            try:
                # Загружаем в Cloudinary в папку products_v2
                res = cloudinary.uploader.upload(main_photo, folder="products_v2", public_id=f"prod_{pid}")
                p['main_image'] = res['secure_url']
                p['images'] = [res['secure_url']] # Оставляем только одно главное фото
                progress[pid] = res['secure_url']
                updated_count += 1
                logging.info(f"Updated photo: {res['secure_url']}")
            except Exception as e:
                logging.error(f"Cloudinary error: {e}")
        else:
            logging.warning(f"No photo found for {pid}. Marking for deletion.")
            p['_DELETE_ME'] = True
            progress[pid] = "NOT_FOUND"
        
        count += 1
        if count % 20 == 0:
            with open(DATA_JSON, 'w') as f: json.dump(products, f, ensure_ascii=False, indent=2)
            with open(PROGRESS_FILE, 'w') as f: json.dump(progress, f)
            logging.info(f"--- Progress saved ({updated_count} photos updated) ---")
        
        time.sleep(1)

    # Финальная чистка от тех, кому не нашлось фото
    final_products = [p for p in products if not p.get('_DELETE_ME')]
    with open(DATA_JSON, 'w') as f: json.dump(final_products, f, ensure_ascii=False, indent=2)
    
    logging.info(f"Job complete. Final product count: {len(final_products)}")

if __name__ == "__main__":
    main()
