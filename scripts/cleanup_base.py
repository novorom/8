import os
import json
import logging

BASE_DIR = "/Users/r/8"
DATA_JSON = os.path.join(BASE_DIR, "lib/products-data.json")

logging.basicConfig(level=logging.INFO, format='%(message)s')

def cleanup():
    if not os.path.exists(DATA_JSON): return
    
    with open(DATA_JSON, 'r') as f:
        products = json.load(f)
    
    initial_count = len(products)
    
    # 1. Удаление дубликатов по SKU (или ID если SKU пуст)
    seen_skus = set()
    unique_products = []
    
    for p in products:
        sku = p.get('sku') or p.get('id')
        if sku not in seen_skus:
            unique_products.append(p)
            seen_skus.add(sku)
    
    # 2. Удаление помеченных на удаление (где не нашлось фото)
    final_products = [p for p in unique_products if not p.get('_DELETE_ME')]
    
    removed_count = initial_count - len(final_products)
    
    with open(DATA_JSON, 'w') as f:
        json.dump(final_products, f, ensure_ascii=False, indent=2)
    
    logging.info(f"Cleanup complete: {removed_count} products removed. Remaining: {len(final_products)}")

if __name__ == "__main__":
    cleanup()
