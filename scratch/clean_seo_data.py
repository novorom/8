



import sys

def clean_file(path):
    with open(path, 'rb') as f:
        content = f.read()
    
    # Try to decode as utf-8 and ignore errors, then encode back to utf-8
    clean_content = content.decode('utf-8', errors='ignore').encode('utf-8')
    
    with open(path, 'wb') as f:
        f.write(clean_content)
    print(f"Cleaned {path}")

if __name__ == "__main__":
    clean_file("/Users/r/8/lib/seo-data.ts")
