import sys
import os

with open('/Users/r/8/lib/seo-data.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open('/Users/r/8/scratch/new_seo_clusters.ts', 'r', encoding='utf-8') as f:
    new_content = f.read()

# Find the end of seoPages object (the last '}')
# The object ends at the very end of the file or before the final export if any.
# In seo-data.ts, it ends at line 529 (the inner last '}')

for i in range(len(lines)-1, 0, -1):
    if '}' in lines[i] and '};' not in lines[i] and 'seoPages' in "".join(lines[i-100:i]): # rough check
        # Wait, the file ends with '  }\n}\n' effectively.
        pass

# Let's just find the last entry "plitka-yanino-spb"
target_entry = '"plitka-yanino-spb"'
insert_pos = -1
for i, line in enumerate(lines):
    if target_entry in line:
        # Move forward until we find the closing brace for this entry
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

lines.insert(insert_pos, ",\n" + new_content)

with open('/Users/r/8/lib/seo-data.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Successfully merged SEO clusters")
