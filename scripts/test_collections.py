import os
import json
import subprocess
import cloudinary
import cloudinary.uploader
import time
import re

# Cloudinary configuration
cloudinary.config(
    cloud_name="de1sotnld",
    api_key="458436493949628",
    api_secret="YBuNnADbviTuobnBkuKymII6kDs"
)

def get_collection_image_via_curl(url):
    try:
        # Пытаемся получить HTML через curl
        result = subprocess.run(['curl', '-s', url], capture_output=True, text=True, timeout=30)
        html = result.stdout
        
        domain = "https://plitburg.ru" if "plitburg.ru" in url else "https://lincer.ru"
        
        # 1. Ищем og:image
        og_match = re.search(r'property="og:image" content="([^"]+)"', html)
        if og_match:
            img_url = og_match.group(1)
            if "logotype" not in img_url:
                if img_url.startswith("/"): img_url = domain + img_url
                return img_url

        # 2. Собираем все iblock пути
        iblock_paths = re.findall(r'/upload/iblock/[a-zA-Z0-9/_.-]+', html)
        
        all_imgs = []
        for path in iblock_paths:
            clean_path = re.sub(r'[^\w/._-].*$', '', path)
            if clean_path.endswith((".jpg", ".jpeg", ".png", ".webp")):
                # Игнорируем системные иконки
                if any(x in clean_path for x in ["30d", "60d", "42f", "61b", "logotype"]): 
                    continue
                
                full_url = domain + clean_path if clean_path.startswith("/") else clean_path
                if full_url not in all_imgs:
                    all_imgs.append(full_url)
        
        # Эвристика: если это страница товара, берем ВТОРУЮ картинку (интерьер). 
        # Если страница коллекции или картинка одна — берем первую.
        if len(all_imgs) > 1:
            return all_imgs[1]
        elif all_imgs:
            return all_imgs[0]

        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def test_run():
    # Тест на обоих сайтах
    urls = [
        "https://plitburg.ru/catalog/plitka/lexus_gris_polirovannyy_beton_kg_60_120_indiya/",
        "https://lincer.ru/catalog/keramicheskaya_plitka/kolektsiya_royal_stone_beliy_30kh60_rs2l451/"
    ]
    
    for url in urls:
        print(f"\nChecking: {url}")
        img_url = get_collection_image_via_curl(url)
        if img_url:
            print(f"Candidate Interior: {img_url}")
            try:
                res = cloudinary.uploader.upload(img_url, folder="test_final")
                print(f"SUCCESS: {res['secure_url']}")
            except Exception as e:
                print(f"FAIL: {e}")
        else:
            print("Nothing found.")
        time.sleep(2)

if __name__ == "__main__":
    test_run()
