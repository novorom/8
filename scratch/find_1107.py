import json

with open('lib/products-data.json', 'r') as f:
    data = json.load(f)

for p in data:
    if p.get('price_retail') in [1085, 1107, 1085.0, 1107.0]:
        print(f"SKU: {p.get('sku')} | Name: {p.get('name')} | Price: {p.get('price_retail')} | Brand: {p.get('brand')}")
