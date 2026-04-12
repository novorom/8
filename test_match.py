import json
import re

DATA_FILE = "lib/products-data.json"
products = json.load(open(DATA_FILE, encoding="utf-8"))
plitburg = json.load(open("plitburg_azori_colls.json", encoding="utf-8"))

# Undo the previous mistake (the 3D banner)
for p in products:
    if p.get("collection_image") == "https://plitburg.ru/upload/iblock/42f/7g8bi9k12zacex7bpz19k479oprvt7iz.png":
        del p["collection_image"]

missing_azori = list(set(p["collection"] for p in products if p.get("brand") == "Азори" and not p.get("collection_image")))
print(f"Missing {len(missing_azori)} images.")

updated = 0

for coll in missing_azori:
    # "River (РИВЕР)" -> "River", "РИВЕР"
    en_part = coll
    ru_part = coll
    m = re.match(r'^(.*?)\s*\((.*?)\)$', coll)
    if m:
        en_part = m.group(1).lower().strip()
        ru_part = m.group(2).lower().strip()
    
    best_img = None
    for c in plitburg:
        c_en = c["en"].lower().strip()
        c_ru = c["ru"].lower().strip()
        
        # Check exact or strong match
        if en_part and (en_part == c_en or en_part == c_ru):
            best_img = c["img"]; break
        if ru_part and (ru_part == c_ru or ru_part == c_en):
            best_img = c["img"]; break
            
        # Try without weird prefixes
        c_ru_clean = c_ru.replace("коллекция", "").strip()
        if ru_part == c_ru_clean:
            best_img = c["img"]; break

    if best_img:
        for p in products:
            if p.get("collection") == coll:
                p["collection_image"] = best_img
        updated += 1
        print(f"✅ {coll} -> {best_img}")
    else:
        # Fallback to manual map or just finding a non-square product image
        pass

print(f"Updated {updated} collections from Plitburg collections list.")
with open(DATA_FILE, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

