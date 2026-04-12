import json
import re

DATA_FILE = "lib/products-data.json"
products = json.load(open(DATA_FILE, encoding="utf-8"))

def get_slug(name):
    slug = name.lower().replace(" ", "-")
    slug = re.sub(r'[^a-zа-яё0-9-]', '', slug)
    return slug

updated = 0
for p in products:
    coll = p.get("collection", "")
    if not coll: continue
    
    # 1. Split by separators
    if "," in coll: coll = coll.split(",")[0]
    if ";" in coll: coll = coll.split(";")[0]
    
    # 2. Clean brand names
    coll = coll.replace("Gracia Ceramica", "").replace("Unitile", "").replace("Shakhty", "").replace("Azori (Азори)", "").replace("Azori", "").replace("Нефрит-Керамика", "").strip()
    
    # 3. Double check length
    slug = get_slug(coll)
    if len(slug) > 50:
        # Take first 30 chars and cut at space
        coll = coll[:40]
        if " " in coll:
            coll = coll.rsplit(" ", 1)[0]
        
    # Re-verify slug
    slug = get_slug(coll)
    if len(slug) > 50:
        coll = slug[:40]
        
    if p["collection"] != coll:
        p["collection"] = coll.strip()
        updated += 1

print(f"Super clean applied to {updated} items.")
with open(DATA_FILE, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

