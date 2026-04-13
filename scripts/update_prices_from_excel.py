
import pandas as pd
import json
import os

PRICE_FILE = '/Users/r/Desktop/Копия Прайсы - вход.xlsx'
DATA_FILE = '/Users/r/8/lib/products-data.json'
OUTPUT_FILE = '/Users/r/8/lib/products-data.json' # Overwrite or temp

def extract_prices():
    sheets = pd.read_excel(PRICE_FILE, sheet_name=None)
    price_map = {}
    
    for name, df in sheets.items():
        if df.empty: continue
        
        # Search for header row
        header_idx = -1
        for i, row in df.iterrows():
            row_str = " ".join(str(x).lower() for x in row.values)
            if 'артикул' in row_str and 'розничная цена' in row_str:
                header_idx = i
                break
        
        if header_idx == -1: continue
        
        # Set proper header
        df.columns = df.iloc[header_idx]
        df = df.iloc[header_idx + 1:]
        
        # Clean column names
        df.columns = [str(c).strip().lower() for c in df.columns]
        
        art_col = None
        price_col = None
        for col in df.columns:
            if 'артикул' in col: art_col = col
            if 'розничная цена' in col: price_col = col
            
        if art_col and price_col:
            for _, row in df.iterrows():
                art = str(row[art_col]).strip()
                price = row[price_col]
                unit = str(row.get('ед. изм.', '')).strip().lower() if 'ед. изм.' in df.columns else ''
                
                if art and art != 'nan' and pd.notnull(price):
                    try:
                        # Convert to float and apply -12%
                        val = float(str(price).replace(' ', '').replace(',', '.'))
                        final_price = round(val * 0.88, 2)
                        price_map[art] = {
                            'price': final_price,
                            'unit': 'шт' if 'шт' in unit else ('м2' if 'м2' in unit else None)
                        }
                    except:
                        continue
    return price_map

def update_json(price_map):
    if not os.path.exists(DATA_FILE):
        print(f"File {DATA_FILE} not found")
        return

    with open(DATA_FILE, 'r') as f:
        data = json.load(f)
    
    updated_count = 0
    # Data is expected to be a dict or list
    items = data if isinstance(data, list) else data.values()
    
    for product in items:
        sku = product.get('sku') or product.get('article')
        if sku in price_map:
            product['price'] = price_map[sku]['price']
            if price_map[sku]['unit']:
                product['unit'] = price_map[sku]['unit']
            updated_count += 1
                
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Updated {updated_count} products with prices (-12%)")

if __name__ == "__main__":
    prices = extract_prices()
    print(f"Extracted {len(prices)} unique articles with prices from Excel")
    update_json(prices)
