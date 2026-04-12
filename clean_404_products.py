import json
import requests
from concurrent.futures import ThreadPoolExecutor

DATA_FILE = "lib/products-data.json"
URL_MAP = "progress/product_url_map.json"

products = json.load(open(DATA_FILE, encoding="utf-8"))
url_map = json.load(open(URL_MAP, encoding="utf-8"))

target_prods = [p for p in products if p.get("brand") != "Cersanit"]
print(f"Checking {len(target_prods)} non-Cersanit products.")

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0"})

def check_status(p):
    url = url_map.get(p["id"])
    if not url: return p, 404
    try:
        r = session.head(url, timeout=10, allow_redirects=True)
        if r.status_code == 405:
            r = session.get(url, stream=True, timeout=10)
        return p, r.status_code
    except Exception as e:
        return p, 500

with ThreadPoolExecutor(max_workers=20) as executor:
    results = list(executor.map(check_status, target_prods))

valid_ids = set()
for p, status in results:
    if status == 200:
        valid_ids.add(p["id"])

print(f"Valid URLs: {len(valid_ids)} / {len(target_prods)}")

final_products = []
for p in products:
    if p.get("brand") == "Cersanit" or p["id"] in valid_ids:
        final_products.append(p)
        
print(f"Removed {len(products) - len(final_products)} products due to 404/invalid links.")

with open(DATA_FILE, "w", encoding="utf-8") as f:
    json.dump(final_products, f, ensure_ascii=False, indent=2)

