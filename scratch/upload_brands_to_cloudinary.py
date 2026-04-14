import os
import cloudinary
import cloudinary.uploader
import json

# Cloudinary configuration
cloudinary.config(
    cloud_name="de1sotnld",
    api_key="458436493949628",
    api_secret="YBuNnADbviTuobnBkuKymII6kDs"
)

BRANDS_DIR = "/Users/r/8/public/brands"
LOGOS = [
    "azori.png",
    "bonaparte.jpg",
    "cersanit.png",
    "gracia-keramika.png",
    "idalgo.jpg",
    "kerama-marazzi.png",
    "nefrit-keramika.jpg",
    "ural-granit.jpg"
]

results = {}

for logo in LOGOS:
    file_path = os.path.join(BRANDS_DIR, logo)
    if os.path.exists(file_path):
        print(f"Uploading {logo}...")
        public_id = os.path.splitext(logo)[0]
        try:
            res = cloudinary.uploader.upload(
                file_path, 
                folder="brands", 
                public_id=public_id,
                overwrite=True
            )
            results[logo] = res['secure_url']
            print(f"Success: {res['secure_url']}")
        except Exception as e:
            print(f"Error uploading {logo}: {e}")
    else:
        print(f"File not found: {file_path}")

# Write results to a json file for reference
with open("/Users/r/8/scratch/brand_cloudinary_urls.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=4, ensure_ascii=False)

print("\nDone! Cloudinary URLs saved to scratch/brand_cloudinary_urls.json")
