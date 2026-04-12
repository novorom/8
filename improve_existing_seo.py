import json
import re
import random

DATA_FILE = "lib/products-data.json"
TS_NEW_FILE = "lib/products-data-new.ts"

with open(DATA_FILE, "r", encoding="utf-8") as f:
    products = json.load(f)

updated = 0

for p in products:
    brand = p.get("brand", "")
    if brand == "Cersanit": continue # The user said "церсанит не трогай"
    
    name = p.get("name", "")
    coll = p.get("collection", "")
    p_type = p.get("product_type", "Плитка")
    surface = p.get("surface", "")
    format_p = p.get("format", "")
    
    # generate new SEO text
    surf_str = f" с {surface.lower()} поверхностью" if surface else ""
    form_str = f" в формате {format_p}" if format_p else ""
    
    seo_text = (f"{p_type} {name}{surf_str}{form_str} из популярной коллекции {coll} от проверенного бренда {brand}. "
                f"Идеально подходит для стильного интерьера ванной комнаты, фартука кухни или пола в гостиной. "
                f"Отличается долговечностью, устойчивостью к влаге и современным дизайном. "
                f"Купить {brand} {name} по выгодной цене с доставкой по Санкт-Петербургу и Ленинградской области со склада Янино-1.")
                
    p["description"] = seo_text
    updated += 1

print(f"Updated SEO descriptions for {updated} existing products (excluding Cersanit).")

with open(DATA_FILE, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

def update_ts_files(prods):
    new_json = json.dumps(prods, ensure_ascii=False, indent=2)
    with open(TS_NEW_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    pattern = r'(export\s+const\s+importedProducts\b[^=]*=\s*)\[[\s\S]*?\](\s*(?:as\s+\w[\w<>\[\]]*\s*)?;)'
    new_c = re.sub(pattern, r'\g<1>' + new_json + r'\g<2>', content, count=1)
    if new_c == content:
        pattern2 = r'(export\s+const\s+importedProducts\s*:\s*any\[\]\s*=\s*)\[[\s\S]*\]'
        new_c = re.sub(pattern2, r'\g<1>' + new_json, content, count=1)

    with open(TS_NEW_FILE, "w", encoding="utf-8") as f:
        f.write(new_c)

update_ts_files(products)
