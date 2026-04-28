import json
import re

# Update JSON
with open('lib/products-data.json', 'r') as f:
    data = json.load(f)

for p in data:
    if 'price_official' in p and p['price_official'] is not None and p['price_official'] > p['price_retail']:
        p['price_retail'] = p['price_official']
    # If the user wants no discounts at all, we can remove price_official entirely so it doesn't show a crossed out price.
    p['price_official'] = None

with open('lib/products-data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Update TS
with open('lib/products-data.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# For TS, we have price_retail: <num>, and sometimes price_official: <num>,
# Let's use a regex to replace price_retail if price_official exists in the same block.
# Actually, since TS is mostly localProducts, let's just find and replace.
# The user wants "retail prices". If it's a Cersanit product with *0.8, we multiply by 1.25.
def ts_replacer(match):
    block = match.group(0)
    # Extract price_official if it exists
    off_m = re.search(r'price_official:\s*(\d+)', block)
    if off_m:
        new_price = int(off_m.group(1))
        block = re.sub(r'price_retail:\s*\d+,', f'price_retail: {new_price},', block)
    else:
        # Check if it's Cersanit which was *0.8
        ret_m = re.search(r'price_retail:\s*(\d+)', block)
        if ret_m:
            new_price = int(int(ret_m.group(1)) / 0.8)
            block = re.sub(r'price_retail:\s*\d+,', f'price_retail: {new_price},', block)
    
    # Remove price_official line
    block = re.sub(r'\s*price_official:\s*\d+,', '', block)
    return block

# Replace blocks bounded by { id: ... } 
new_ts = re.sub(r'{\s*id:.*?}', ts_replacer, ts_content, flags=re.DOTALL)

with open('lib/products-data.ts', 'w', encoding='utf-8') as f:
    f.write(new_ts)

print("Prices updated successfully.")
