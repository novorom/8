import pandas as pd
import json
import os
import numpy as np
import re

# Paths
json_path = "/Users/r/8/lib/products-data.json"
ts_path = "/Users/r/8/lib/products-data-new.ts"
excel_path = "/Users/r/Documents/1 job/Копия Прайсы - вход.xlsx"

def backup_file(path):
    backup_path = path + ".bak"
    if not os.path.exists(backup_path):
        import shutil
        shutil.copy2(path, backup_path)
        print(f"Backup created at {backup_path}")

backup_file(json_path)
backup_file(ts_path)

# Load JSON
print("Loading JSON data...")
with open(json_path, 'r', encoding='utf-8') as f:
    products_json = json.load(f)

# Load TS data
print("Loading TS data...")
with open(ts_path, 'r', encoding='utf-8') as f:
    ts_content = f.read()
    # Find the array content
    array_match = re.search(r'export const importedProducts: any\[\] = (\[.*\]);?', ts_content, re.DOTALL)
    if array_match:
        products_ts = json.loads(array_match.group(1))
    else:
        print("Could not parse products from TS file.")
        products_ts = []

def normalize_brand(b):
    if not b: return ""
    b = str(b).lower()
    if "cersanit" in b: return "cersanit"
    if "kerama marazzi" in b or "керама марацци" in b or "км" in b: return "kerama marazzi"
    if "azori" in b or "азори" in b: return "azori"
    if "элетто" in b or "eletto" in b: return "eletto"
    if "бонапарт" in b or "bonapart" in b: return "bonapart"
    if "alma ceramica" in b: return "alma ceramica"
    if "gracia ceramica" in b or "грация" in b: return "gracia ceramica"
    if "нефрит" in b: return "нефрит"
    if "идальго" in b or "idalgo" in b: return "idalgo"
    if "квадро декор" in b: return "quadro decor"
    if "урал" in b: return "ural granite"
    return b

def normalize_sku(s):
    if s is None or pd.isna(s): return ""
    s = str(s).strip().lower()
    return s

def clean_name(n):
    if not n or pd.isna(n): return ""
    n = str(n).lower()
    n = re.sub(r'\d+[xх,.]+\d+', '', n)
    n = n.replace('cersanit', '').replace('идальго', '').replace('idalgo', '').replace('керама марацци', '').replace('kerama marazzi', '')
    n = n.replace('керамогранит', '').replace('плитка', '').replace('декор', '').replace('вставка', '').replace('настенная', '')
    n = re.sub(r'[^\w\s]', ' ', n)
    tokens = sorted(list(set(n.split())))
    return " ".join(tokens)

# Build index for both
def build_index(products_list):
    sku_idx = {}
    brand_idx = {}
    for p in products_list:
        brand_norm = normalize_brand(p.get('brand'))
        sku_norm = normalize_sku(p.get('sku'))
        if brand_norm not in brand_idx: brand_idx[brand_norm] = []
        brand_idx[brand_norm].append(p)
        if brand_norm and sku_norm:
            sku_idx[(brand_norm, sku_norm)] = p
    return sku_idx, brand_idx

sku_idx_json, brand_idx_json = build_index(products_json)
sku_idx_ts, brand_idx_ts = build_index(products_ts)

print(f"Indexed {len(products_json)} products from JSON and {len(products_ts)} from TS.")

# Load Excel
print("Loading Excel file...")
xl = pd.ExcelFile(excel_path)

updated_count = 0

# Process sheets
for sheet_name in reversed(xl.sheet_names):
    print(f"Processing sheet: {sheet_name}")
    try:
        df_head = pd.read_excel(excel_path, sheet_name=sheet_name, nrows=50, header=None)
        
        header_row_idx = -1
        sku_col = -1
        name_col = -1
        price_col = -1
        
        for i, row in df_head.iterrows():
            row_list = [str(cell).lower() for cell in row]
            has_sku = any("артикул" in s for s in row_list)
            has_name = any("наименование" in s or "название" in s for s in row_list)
            has_price = any("рознич" in s or "розница" in s for s in row_list)
            
            if (has_sku or has_name) and has_price:
                header_row_idx = i
                for j, cell in enumerate(row_list):
                    if "артикул" in cell: sku_col = j
                    if "наименование" in cell or "название" in cell: name_col = j
                    if "рознич" in cell or "розница" in cell: price_col = j
                break
        
        if header_row_idx == -1:
            print(f"  Could not find header row in {sheet_name}. Skipping.")
            continue
            
        print(f"  Found headers at row {header_row_idx}. SKU:{sku_col} Name:{name_col} Price:{price_col}")
        
        df = pd.read_excel(excel_path, sheet_name=sheet_name, skiprows=header_row_idx + 1, header=None)
        brand_norm_from_sheet = normalize_brand(sheet_name)
        
        for i, row in df.iterrows():
            sku = row[sku_col] if sku_col != -1 else None
            name = row[name_col] if name_col != -1 else None
            price = row[price_col]
            if pd.isna(price): continue
            try:
                new_price = float(str(price).replace(',', '.').replace(' ', '').replace('\xa0', ''))
            except: continue

            sku_str = normalize_sku(sku) if not pd.isna(sku) else ""
            c_name = clean_name(str(name)) if not pd.isna(name) else ""

            def update_list(sku_idx, brand_idx):
                count = 0
                matched = None
                # SKU match
                if sku_str:
                    key = (brand_norm_from_sheet, sku_str)
                    if key in sku_idx:
                        matched = sku_idx[key]
                # Name match fallback
                if not matched and c_name:
                    for p in brand_idx.get(brand_norm_from_sheet, []):
                        p_name_clean = clean_name(p.get('name', ''))
                        tokens = c_name.split()
                        if tokens and all(t in p_name_clean for t in tokens):
                            matched = p
                            break
                if matched:
                    if matched.get('price_retail') != new_price:
                        matched['price_retail'] = new_price
                        count = 1
                return count

            updated_count += update_list(sku_idx_json, brand_idx_json)
            updated_count += update_list(sku_idx_ts, brand_idx_ts)

    except Exception as e:
        print(f"  Error processing sheet {sheet_name}: {e}")

print(f"Total updates: {updated_count}")

# Save JSON
print("Saving updated JSON...")
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(products_json, f, ensure_ascii=False, indent=2)

# Save TS
print("Saving updated TS...")
# Use split/join or find/replace to avoid re.sub backslash issues
prefix = 'export const importedProducts: any[] = '
suffix_start = ts_content.find('];', ts_content.find(prefix)) + 2
if suffix_start < 2: # maybe no semicolon
    suffix_start = ts_content.find(']', ts_content.find(prefix)) + 1

new_json_data = json.dumps(products_ts, ensure_ascii=False, indent=2)
# Reconstruct the file content
ts_prefix = ts_content.split(prefix)[0] + prefix
ts_suffix = ts_content[suffix_start:]
new_ts_content = ts_prefix + new_json_data + ts_suffix

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(new_ts_content)

print("Done.")
