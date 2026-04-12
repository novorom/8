import json

DATA_FILE = "lib/products-data.json"
TS_NEW_FILE = "lib/products-data-new.ts"

products = json.load(open(DATA_FILE, encoding="utf-8"))
new_json = json.dumps(products, ensure_ascii=False, indent=2)

header = """// @ts-nocheck
// AUTO-GENERATED — НЕ РЕДАКТИРОВАТЬ ВРУЧНУЮ

export const importedProducts: any[] = """

with open(TS_NEW_FILE, "w", encoding="utf-8") as f:
    f.write(header)
    f.write(new_json)
    f.write(";")

print("Rebuilt TS file from scratch.")
