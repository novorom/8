#!/usr/bin/env python3
import json
import time
import random
import requests
from bs4 import BeautifulSoup
from collections import defaultdict
from pathlib import Path
import re
import argparse

_BASE = Path(__file__).parent
DATA_JSON = _BASE / "lib/products-data.json"
URL_MAP_FILE = _BASE / "progress/product_url_map.json"
TS_NEW_FILE = _BASE / "lib/products-data-new.ts"

# Use a session for connection pooling
session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
})

def fetch(url):
    try:
        r = session.get(url, timeout=15)
        if r.status_code == 200:
            return r.text
    except Exception as e:
        print(f"Error fetching {url}: {e}")
    return None

def update_ts_files(products):
    if not TS_NEW_FILE.exists():
        return
    new_json = json.dumps(products, ensure_ascii=False, indent=2)
    content = TS_NEW_FILE.read_text(encoding="utf-8")
    pattern = r'(export\s+const\s+importedProducts\b[^=]*=\s*)\[[\s\S]*?\](\s*(?:as\s+\w[\w<>\[\]]*\s*)?;)'
    new_c = re.sub(pattern, r'\g<1>' + new_json + r'\g<2>', content, count=1)
    if new_c == content:
        pattern2 = r'(export\s+const\s+importedProducts\s*:\s*any\[\]\s*=\s*)\[[\s\S]*\]'
        new_c = re.sub(pattern2, r'\g<1>' + new_json, content, count=1)
    TS_NEW_FILE.write_text(new_c, encoding="utf-8")

def is_interior(url):
    """Check if the image URL likely points to an interior photo."""
    url_low = url.lower()
    keywords = ["interier", "interior", "room", "living", "ambiance", "app", "inc_v", "lifestyle", "setup"]
    # If any keyword is in the filename
    filename = url_low.split("/")[-1]
    if any(kw in filename for kw in keywords):
        return True
    return False

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true", help="Re-process even if has image")
    parser.add_argument("--limit", type=int, help="Limit number of collections")
    parser.add_argument("--brand", help="Filter by brand")
    args = parser.parse_args()

    if not DATA_JSON.exists():
        print("lib/products-data.json not found")
        return
        
    products = json.loads(DATA_JSON.read_text(encoding="utf-8"))
    url_map = json.loads(URL_MAP_FILE.read_text(encoding="utf-8")) if URL_MAP_FILE.exists() else {}

    # Group by collection
    collections = defaultdict(list)
    for p in products:
        brand = p.get("brand", "").strip()
        coll = p.get("collection", "").strip()
        if coll and brand:
            if args.brand and brand != args.brand:
                continue
            collections[(brand, coll)].append(p)
            
    print(f"Total collections found: {len(collections)}")
    
    updates = 0
    items_to_process = []
    
    for (brand, coll), prods in collections.items():
        has_interior = any(p.get("collection_image") for p in prods)
        if has_interior and not args.force:
            continue
            
        prods_with_urls = [p for p in prods if p.get("id") in url_map]
        if not prods_with_urls:
            continue
            
        items_to_process.append(((brand, coll), prods, prods_with_urls))
        
    if args.limit:
        items_to_process = items_to_process[:args.limit]
        
    print(f"Collections to process: {len(items_to_process)}")
    
    for idx, ((brand, coll), prods, prods_with_urls) in enumerate(items_to_process):
        print(f"[{idx+1}/{len(items_to_process)}] {brand} - {coll}...", end=" ", flush=True)
        
        found_interior = None
        all_images = []
        
        # Try products in the collection until we find a good image
        for p in prods_with_urls[:5]: # Try up to 5 products for better chance
            url = url_map[p["id"]]
            html = fetch(url)
            if not html:
                continue
                
            soup = BeautifulSoup(html, "html.parser")
            current_product_images = []
            
            # Selectors for images
            selectors = [
                {"data-role": "gallery.pictures.item.picture"},
                {"class": "catalog-element-contents-main-image-link"},
                {"class": "catalog-element-contents-sl-item"}
            ]
            
            for sel in selectors:
                found_tags = soup.find_all(attrs=sel)
                print(f" DEBUG: Selector {sel} found {len(found_tags)} tags")
                for item in found_tags:
                    src = item.get("data-src") or item.get("src") or item.get("href")
                    if src and "/upload/iblock/" in src:
                        if src.startswith("/"): src = "https://plitburg.ru" + src
                        if src not in current_product_images:
                            current_product_images.append(src)
            
            print(f" DEBUG: Found {len(current_product_images)} images for product")
            
            # Fallback to all images
            if not current_product_images:
                for img in soup.find_all('img'):
                    src = img.get("data-src") or img.get("src", "")
                    if "/upload/iblock/" in src and src.endswith((".jpg", ".png", ".webp", ".jpeg")):
                        if src.startswith("/"): src = "https://plitburg.ru" + src
                        if src not in current_product_images:
                            current_product_images.append(src)
            
            # 1. Look for explicit interior keywords
            for img in current_product_images:
                if is_interior(img):
                    found_interior = img
                    break
            
            if found_interior:
                break
                
            # Keep track of all images to pick the best one later if no keywords found
            for img in current_product_images:
                if img not in all_images:
                    all_images.append(img)
                    
        # 2. If no keywords, but we have multiple images, pick the second one (usually interior)
        if not found_interior and len(all_images) > 1:
            found_interior = all_images[1]
        
        # 3. If still nothing and we have at least one image, but it's not the only collection image we want
        # Sometimes there's only one image and it IS an interior, but we can't be sure.
        # However, for collections, if we have NOTHING, even the first image might be better than nothing
        # if the collection name is in the filename.
        if not found_interior and all_images:
             # Just a fallback to the first one if it looks like a collection image
             if any(kw in all_images[0].lower() for kw in [coll.lower().replace(" ", ""), "room"]):
                 found_interior = all_images[0]

        if found_interior:
            print(f"✅ Found: {found_interior.split('/')[-1]}")
            # Update ALL products in this collection with the same image
            target_ids = set(p["id"] for p in prods)
            for i, p in enumerate(products):
                if p["id"] in target_ids:
                    products[i]["collection_image"] = found_interior
            
            updates += 1
            if updates % 10 == 0:
                DATA_JSON.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")
                update_ts_files(products)
        else:
            print("❌ No interior found")

    if updates > 0:
        DATA_JSON.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")
        update_ts_files(products)
        print(f"\nDone! Updated {updates} collections.")
    else:
        print("\nNo updates made.")

if __name__ == "__main__":
    main()
