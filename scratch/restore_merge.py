import sys
import os

with open('/Users/r/8/lib/seo-data.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open('/Users/r/8/scratch/restore_final_two.ts', 'r', encoding='utf-8') as f:
    restore_content = f.read()

# Insert at the beginning of seoPages object
target_line = 'export const seoPages: Record<string, SeoPageData> = {'
insert_pos = -1
for i, line in enumerate(lines):
    if target_line in line:
        insert_pos = i + 1
        break

if insert_pos == -1:
    print("Could not find insertion point")
    sys.exit(1)

lines.insert(insert_pos, restore_content + ",\n")

with open('/Users/r/8/lib/seo-data.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Successfully restored missing SEO clusters")
