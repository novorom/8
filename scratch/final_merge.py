import sys
import os

with open('/Users/r/8/lib/seo-data.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

batches = [
    '/Users/r/8/scratch/new_seo_clusters_batch3.ts',
    '/Users/r/8/scratch/new_seo_clusters_batch4.ts',
    '/Users/r/8/scratch/new_seo_clusters_batch5.ts'
]

all_new_content = ""
for batch in batches:
    if os.path.exists(batch):
        with open(batch, 'r', encoding='utf-8') as f:
            all_new_content += f.read()

# Find insertion point after the last cluster. 
# Last merger was Batch 1. Let's find "primorskiy-raion-spb" closing brace.
target_entry = '"primorskiy-raion-spb"'
insert_pos = -1
for i, line in enumerate(lines):
    if target_entry in line:
        brace_count = 0
        for j in range(i, len(lines)):
            brace_count += lines[j].count('{')
            brace_count -= lines[j].count('}')
            if brace_count == 0 and '}' in lines[j]:
                insert_pos = j + 1
                break
        break

if insert_pos == -1:
    print("Could not find insertion point")
    sys.exit(1)

lines.insert(insert_pos, ",\n" + all_new_content)

with open('/Users/r/8/lib/seo-data.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print(f"Successfully merged all batches into seo-data.ts")
