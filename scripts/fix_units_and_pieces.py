
import json
import os

DATA_FILE = '/Users/r/8/lib/products-data.json'
OUTPUT_FILE = '/Users/r/8/lib/products-data.json'

# Keywords to identify piece-based items
PIECE_KEYWORDS = ['декор', 'бордюр', 'вставка', 'панно', 'карандаш', 'уголок', 'плинтус', 'ступень', 'подступенок']

def fix_units():
    if not os.path.exists(DATA_FILE):
        print(f"File {DATA_FILE} not found")
        return

    with open(DATA_FILE, 'r') as f:
        data = json.load(f)
    
    updated_count = 0
    
    def process_product(product):
        nonlocal updated_count
        name = product.get('name', '').lower()
        product_type = product.get('product_type', '').lower()
        
        is_piece = any(kw in name for kw in PIECE_KEYWORDS) or any(kw in product_type for kw in PIECE_KEYWORDS)
        
        # If it's a decorative element, ensure it's marked correctly
        if is_piece:
            # Change unit logic if applicable (this depends on how the frontend handles it, 
            # but usually we'd set a 'unit' field or ensure price is interpreted as per piece)
            product['unit'] = 'шт'
            # If sqm_per_box is present, it might be misleading for pieces, 
            # but usually pieces don't have sqm_per_box or it's 1.
            # We keep sqm_per_box for technical reasons but 'unit' is the key.
            updated_count += 1
        else:
            product['unit'] = 'м2'

    if isinstance(data, list):
        for product in data:
            process_product(product)
    elif isinstance(data, dict):
        for product in data.values():
            process_product(product)
                
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Processed units for {len(data)} products. {updated_count} marked as 'шт' (piece).")

if __name__ == "__main__":
    fix_units()
