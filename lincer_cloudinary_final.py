import os
import json
import requests
from bs4 import BeautifulSoup
import cloudinary
import cloudinary.uploader
import time
import logging

# --- CONFIGURATION (MOCK) ---
CLOUDINARY_CONFIG = {
    "cloud_name": "MOCK_CLOUD",
    "api_key": "MOCK_KEY",
    "api_secret": "MOCK_SECRET"
}

# cloudinary.config(**CLOUDINARY_CONFIG)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
}

# Setup Logging
logging.basicConfig(
    filename='/Users/r/8/parsing_errors.log',
    level=logging.ERROR,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

PROGRESS_FILE = '/Users/r/8/parsing_progress.json'

def load_progress():
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f:
            return json.load(f)
    return {"processed_urls": []}

def save_progress(url):
    progress = load_progress()
    if url not in progress["processed_urls"]:
        progress["processed_urls"].append(url)
        with open(PROGRESS_FILE, 'w') as f:
            json.dump(progress, f)

def get_images_lincer(soup):
    """
    Lincer structure analysis:
    - Main image: Found in .product-detail-slider__item or just look for /upload/iblock/
    - Interior: Usually the 2nd or later high-res image in the gallery.
    """
    imgs = []
    # Find all images that look like product/interior photos
    for img in soup.find_all('img'):
        src = img.get('src')
        if src and '/upload/iblock/' in src and 'resize_cache' not in src:
            full_url = "https://lincer.ru" + src if src.startswith('/') else src
            if full_url not in imgs:
                imgs.append(full_url)
    
    # Heuristic: 1st is product, 2nd+ are likely interiors
    product = imgs[0] if imgs else None
    interior = imgs[1] if len(imgs) > 1 else None
    return imgs, product, interior

def get_images_plitburg(soup):
    """
    Plitburg structure analysis:
    - Images are in sliders or specific blocks.
    - Path usually contains /upload/iblock/
    """
    imgs = []
    # Specific slider container for better accuracy if exists
    slider = soup.find('div', class_=lambda x: x and ('slider' in x or 'gallery' in x))
    targets = slider.find_all('img') if slider else soup.find_all('img')
    
    for img in targets:
        src = img.get('src') or img.get('data-src')
        if src and '/upload/iblock/' in src and 'resize_cache' not in src:
            full_url = "https://plitburg.ru" + src if src.startswith('/') else src
            if full_url not in imgs:
                imgs.append(full_url)
                
    product = imgs[0] if imgs else None
    interior = imgs[1] if len(imgs) > 1 else None
    return imgs, product, interior

def upload_mock(url, folder):
    print(f"[MOCK UPLOAD] {url} -> folder: {folder}")
    return f"https://cloudinary.com/mock/{folder}/{os.path.basename(url)}"

def process_site(file_path, site_type):
    if not os.path.exists(file_path):
        return

    with open(file_path, 'r') as f:
        urls = json.load(f)

    progress = load_progress()

    for url in urls:
        if url in progress["processed_urls"]:
            continue

        print(f"Fetching: {url}")
        try:
            res = requests.get(url, headers=HEADERS, timeout=15)
            res.raise_for_status()
            soup = BeautifulSoup(res.text, 'html.parser')
            
            if site_type == 'lincer':
                all_imgs, prod, intel = get_images_lincer(soup)
            else:
                all_imgs, prod, intel = get_images_plitburg(soup)

            # Upload Product
            if prod:
                upload_mock(prod, "products")
            
            # Upload Interior/Collection
            if intel:
                upload_mock(intel, "collections")
            
            # (Optional) Upload all other gallery images to products
            for other in all_imgs:
                if other != prod and other != intel:
                    upload_mock(other, "products")

            save_progress(url)
            time.sleep(2)

        except Exception as e:
            logging.error(f"Failed {url}: {str(e)}")
            print(f"Error on {url}, logged.")

if __name__ == "__main__":
    print("Starting Final Lincer/Plitburg Scraper...")
    process_site('/Users/r/8/lincer_urls.json', 'lincer')
    process_site('/Users/r/8/plitburg_urls.json', 'plitburg')
    print("Done.")
