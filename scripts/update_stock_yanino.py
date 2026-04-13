
import pandas as pd
import json
import os

STOCK_FILE = '/Users/r/Desktop/ОСТАТКИ ЯНИНО.xls'
DATA_FILE = '/Users/r/8/lib/products-data.json'
OUTPUT_FILE = '/Users/r/8/lib/products-data.json'

def extract_stock():
    # Read xls file
    df = pd.read_excel(STOCK_FILE)
    
    # Search for header row (contains "Артикул" and "Доступно")
    header_idx = -1
    for i, row in df.iterrows():
        row_str = " ".join(str(x).lower() for x in row.values)
        if 'артикул' in row_str and 'доступно' in row_str:
            header_idx = i
            break
            
    if header_idx == -1:
        print("Header not found in stock file")
        return {}
        
    df.columns = df.iloc[header_idx]
    df = df.iloc[header_idx + 1:]
    
    # Clean column names
    df.columns = [str(c).strip() for c in df.columns]
    
    stock_map = {}
    art_col = 'Артикул'
    avail_col = 'Доступно'
    
    for _, row in df.iterrows():
        art = str(row[art_col]).strip()
        avail = row[avail_col]
        
        if art and art != 'nan' and pd.notnull(avail):
            try:
                # Handle potential string numbers with spaces/commas
                val = float(str(avail).replace(' ', '').replace(',', '.'))
                # We only care about available stock > 0
                if val > 0:
                    stock_map[art] = val
            except:
                continue
    return stock_map

def update_json(stock_map):
    if not os.path.exists(DATA_FILE):
        print(f"File {DATA_FILE} not found")
        return

    with open(DATA_FILE, 'r') as f:
        data = json.load(f)
    
    updated_count = 0
    
    def update_product(product):
        nonlocal updated_count
        sku = product.get('sku') or product.get('article')
        if sku in stock_map:
            product['stock'] = stock_map[sku]
            product['in_stock'] = True
            updated_count += 1
        else:
            # Optionally set stock to 0 or remove field if not in Yanino
            product['stock'] = 0
            product['in_stock'] = False

    if isinstance(data, dict):
        for key, product in data.items():
            update_product(product)
    elif isinstance(data, list):
        for product in data:
            update_product(product)
                
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Updated {updated_count} products with stock from Yanino")

if __name__ == "__main__":
    stock = extract_stock()
    print(f"Extracted {len(stock)} articles with positive stock from Yanino")
    update_json(stock)
