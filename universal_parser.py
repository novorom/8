import os
import json
import requests
from bs4 import BeautifulSoup
import cloudinary
import cloudinary.uploader
import time

# Cloudinary configuration (credentials will be provided later)
# cloudinary.config(
#     cloud_name="YOUR_CLOUD_NAME",
#     api_key="YOUR_API_KEY",
#     api_secret="YOUR_API_SECRET"
# )

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
}

def get_soup(url):
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        response.raise_for_status()
        return BeautifulSoup(response.text, 'html.parser')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def parse_lincer(soup, url):
    product_images = []
    collection_images = []
    
    # В Lincer фото интерьеров часто имеют класс или атрибут 'interior' 
    # либо находятся в слайдере. Обычно первое - товар, остальные могут быть интерьером.
    all_imgs = []
    for img in soup.find_all('img'):
        src = img.get('src')
        if src and '/upload/iblock/' in src and 'resize_cache' not in src:
            if src.startswith('/'): src = "https://lincer.ru" + src
            if src not in all_imgs:
                all_imgs.append(src)
    
    if all_imgs:
        # Эвристика: первая картинка - товар, остальные (если есть) - интерьеры
        product_images.append(all_imgs[0])
        if len(all_imgs) > 1:
            collection_images.append(all_imgs[1]) # Берем одно фото интерьера
            
    return product_images, collection_images

def parse_plitburg(soup, url):
    product_images = []
    collection_images = []
    
    # 1. Ищем главную галерею
    gallery = soup.find('div', class_=lambda x: x and ('gallery' in x or 'slider' in x))
    all_imgs = []
    
    if gallery:
        for img in gallery.find_all('img'):
            src = img.get('src') or img.get('data-src')
            if src and not src.startswith('data:'):
                if src.startswith('/'): src = "https://plitburg.ru" + src
                if 'resize_cache' not in src and src not in all_imgs:
                    all_imgs.append(src)
    
    # 2. Если галерея пуста, ищем все крупные из iblock
    if not all_imgs:
        for img in soup.find_all('img'):
            src = img.get('src') or img.get('data-src')
            if src and '/upload/iblock/' in src and 'resize_cache' not in src:
                if src.startswith('/'): src = "https://plitburg.ru" + src
                if src not in all_imgs: all_imgs.append(src)
    
    if all_imgs:
        product_images.append(all_imgs[0])
        # На plitburg интерьерные фото часто идут вторыми в списке галереи
        if len(all_imgs) > 1:
            collection_images.append(all_imgs[1])

    return product_images, collection_images

def upload_to_cloudinary(image_url, folder):
    try:
        # result = cloudinary.uploader.upload(image_url, folder=folder)
        # return result.get('secure_url')
        print(f"Mock upload to {folder}: {image_url}")
        return image_url
    except Exception as e:
        print(f"Cloudinary error in {folder}: {e}")
        return None

def process_urls(file_path, site_type):
    if not os.path.exists(file_path):
        print(f"File {file_path} not found.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        urls = json.load(f)

    results = []
    for url in urls:
        print(f"Processing: {url}")
        soup = get_soup(url)
        if not soup: continue

        if site_type == 'lincer':
            p_imgs, c_imgs = parse_lincer(soup, url)
        else:
            p_imgs, c_imgs = parse_plitburg(soup, url)

        uploaded_products = []
        for img_url in p_imgs:
            if 'icon' in img_url.lower(): continue
            new_url = upload_to_cloudinary(img_url, "products")
            if new_url: uploaded_products.append(new_url)

        uploaded_collections = []
        for img_url in c_imgs:
            if 'icon' in img_url.lower(): continue
            # Для коллекций загружаем в папку collections
            new_url = upload_to_cloudinary(img_url, "collections")
            if new_url: uploaded_collections.append(new_url)

        results.append({
            "source_url": url,
            "product_images": uploaded_products,
            "collection_images": uploaded_collections
        })
        time.sleep(1)
    return results

if __name__ == "__main__":
    # Example usage for one site
    # lincer_data = process_urls('/Users/r/8/lincer_urls.json', 'lincer')
    # plitburg_data = process_urls('/Users/r/8/plitburg_urls.json', 'plitburg')
    
    # with open('/Users/r/8/parsing_results.json', 'w', encoding='utf-8') as f:
    #     json.dump({"lincer": lincer_data, "plitburg": plitburg_data}, f, ensure_ascii=False, indent=4)
    print("Script template created. Awaiting Cloudinary credentials to enable uploads.")
