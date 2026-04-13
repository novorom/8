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

def get_collection_main_cover(url):
    """
    Заходит на страницу списка коллекций и ищет обложку для конкретной ссылки.
    Или заходит внутрь коллекции и берет главное заглавное фото.
    """
    try:
        result = subprocess.run(['curl', '-s', url], capture_output=True, text=True, timeout=30)
        html = result.stdout
        
        # На странице самой коллекции (например /pro_dogana/) 
        # обложка часто лежит в блоке catalog-element-gallery или просто первая большая картинка iblock, 
        # которая НЕ является квадратом 450x450 (товар).
        
        # 1. Поиск через регулярку всех iblock
        iblock_paths = re.findall(r'/upload/iblock/[a-zA-Z0-9/_.-]+', html)
        
        # Ищем картинку, которая выглядит как обложка (обычно первая и большая)
        for path in iblock_paths:
            if any(x in path for x in ["logotype", "30d", "60d", "42f", "61b"]): continue
            if path.endswith((".jpg", ".png", ".webp")):
                return "https://plitburg.ru" + path
        
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def test_specific_collection():
    # Проверяем ровно то, что на скриншоте Романа
    target_url = "https://plitburg.ru/catalog/kollektsii/pro_dogana/"
    print(f"Checking cover for: {target_url}")
    
    img_url = get_collection_main_cover(target_url)
    if img_url:
        print(f"Found Collection Cover: {img_url}")
        try:
            res = cloudinary.uploader.upload(img_url, folder="verified_collections", public_id="pro_dogana_cover")
            print(f"SUCCESS! Verified URL: {res['secure_url']}")
        except Exception as e:
            print(f"Upload fail: {e}")
    else:
        print("Not found.")

if __name__ == "__main__":
    test_specific_collection()
