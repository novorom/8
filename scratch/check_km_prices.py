import json

with open('lib/products-data.json', 'r') as f:
    data = json.load(f)

km_products = [p for p in data if 'kerama marazzi' in str(p.get('brand', '')).lower()]
for p in km_products[:5]:
    print(f"SKU: {p.get('sku')} | Name: {p.get('name')} | Price: {p.get('price_retail')}")
