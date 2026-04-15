import re

path = 'lib/mock-data.ts'
with open(path, 'r') as f:
    content = f.read()

# Replace interface property types
content = re.sub(r'id:\s*number', 'id: string', content)

# Replace numeric IDs in objects: id: 123 -> id: "123"
# We look for id: followed by optional space and digits, followed by , or space or }
# But we must be careful not to match things like "reviews_count: 12"
content = re.sub(r'\bid:\s*(\d+)\b', r'id: "\1"', content)

with open(path, 'w') as f:
    f.write(content)

print("Updated lib/mock-data.ts: converted numeric IDs to strings.")
