#!/usr/bin/env python3
import json
import time
import random
import requests
from bs4 import BeautifulSoup
from collections import defaultdict
from pathlib import Path
import re
import sys

_BASE = Path(__file__).parent
DATA_JSON = _BASE / "lib/products-data.json"
URL_MAP_FILE = _BASE / "progress/product_url_map.json"
TS_FILE = _BASE / "lib/products-data.ts"
TS_NEW_FILE = _BASE / "lib/products-data-new.ts"

# Use a session for connection pooling
session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"})

def fetch(url):
    try:
        r = session.get(url, timeout=10)
        if r.status_code == 200:
            return r.text
    except Exception as e:
        pass
    return None

def update_ts_files(products):
    new_json = json.dumps(products, ensure_ascii=False, indent=2)
    
    if TS_NEW_FILE.exists():
        content = TS_NEW_FILE.read_text(encoding="utf-8")
        pattern = r'(export\s+const\s+importedProducts\b[^=]*=\s*)\[[\s\S]*?\](\s*(?:as\s+\w[\w<>\[\]]*\s*)?;)'
        new_c = re.sub(pattern, r'\g<1>' + new_json + r'\g<2>', content, count=1)
        if new_c == content:
            pattern2 = r'(export\s+const\s+importedProducts\s*:\s*any\[\]\s*=\s*)\[[\s\S]*\]'
            new_c = re.sub(pattern2, r'\g<1>' + new_json, content, count=1)
        TS_NEW_FILE.write_text(new_c, encoding="utf-8")

def main():
    if not DATA_JSON.exists():
        print("lib/products-data.json not found")
        return
        
    products = json.loads(DATA_JSON.read_text(encoding="utf-8"))
    url_map = json.loads(URL_MAP_FILE.read_text(encoding="utf-8")) if URL_MAP_FILE.exists() else {}

    collections = defaultdict(list)
    for p in products:
        if p.get("brand") == "Cersanit":
            continue
        coll = p.get("collection", "").strip()
        if coll:
            collections[(p["brand"], coll)].append(p)
            
    print(f"Found {len(collections)} non-Cersanit collections.")
    
    updates = 0
    total = len(collections)
    processed = 0
    skipped_has_img = 0
    skipped_no_url = 0
    
    # Fast filtering
    items_to_process = []
    for (brand, coll), prods in collections.items():
        has_interior = any(p.get("collection_image") or p.get("interior_images") for p in prods)
        if has_interior:
            skipped_has_img += 1
            continue
            
        prods_with_urls = [p for p in prods if p.get("id") in url_map]
        if not prods_with_urls:
            skipped_no_url += 1
            continue
            
        items_to_process.append(((brand, coll), prods, prods_with_urls))
        
    print(f"Skipped {skipped_has_img} already with image, {skipped_no_url} without URLs.")
    print(f"Remaining to process: {len(items_to_process)}")
    
    for idx, ((brand, coll), prods, prods_with_urls) in enumerate(items_to_process):
        print(f"[{idx+1}/{len(items_to_process)}] {brand} - {coll}...", end=" ", flush=True)
        
        found_interior = None
        for p in prods_with_urls[:3]: # try up to 3 products
            url = url_map[p["id"]]
            html = fetch(url)
            if not html:
                continue
                
            soup = BeautifulSoup(html, "html.parser")
            images = []
            
            gallery_items = soup.find_all(attrs={"data-role": "gallery.pictures.item.picture"})
            for item in gallery_items:
                src = item.get("data-src") or item.get("src", "")
                if "/upload/iblock/" in src and src.endswith((".jpg", ".png", ".webp", ".jpeg")):
                    if src.startswith("/"):
                        src = "https://plitburg.ru" + src
                    if src not in images:
                        images.append(src)
                        
            if not images:
                for img in soup.find_all('img'):
                    src = img.get("data-src") or img.get("src", "")
                    if "/upload/iblock/" in src and src.endswith((".jpg", ".png", ".webp", ".jpeg")):
                        if src.startswith("/"):
                            src = "https://plitburg.ru" + src
                        if src not in images:
                            images.append(src)
            
            if len(images) > 1:
                found_interior = images[1]
                break
                
        if found_interior:
            print(f"✅ Found")
            first_p_id = prods[0]["id"]
            for i, p in enumerate(products):
                if p["id"] == first_p_id:
                    products[i]["collection_image"] = found_interior
                    break
            updates += 1
            
            if updates % 10 == 0:
                DATA_JSON.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")
                update_ts_files(products)
        else:
            print("❌ No interior")

    if updates > 0:
        DATA_JSON.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")
        update_ts_files(products)
        print(f"\nDone! Updated {updates} collections.")
    else:
        print("\nNo updates made.")

if __name__ == "__main__":
    main()
