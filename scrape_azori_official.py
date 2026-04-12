import requests
from bs4 import BeautifulSoup
import json

url = "https://azoriceramica.ru/collections/"
headers = {"User-Agent": "Mozilla/5.0"}
resp = requests.get(url, headers=headers)
soup = BeautifulSoup(resp.text, 'html.parser')

collections = []
items = soup.find_all('a', class_='collection-item')

if not items:
    # try another selector
    items = soup.find_all('div', class_=lambda c: c and 'collection' in c)

print(f"Found {len(items)} items")

# Let's just dump the HTML of the first few items to understand the structure
with open("azori_html.txt", "w") as f:
    f.write(soup.prettify())

