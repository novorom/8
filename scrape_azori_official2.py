import requests
from bs4 import BeautifulSoup
import json

url = "https://azoriceramica.ru/collections/"
headers = {"User-Agent": "Mozilla/5.0"}
session = requests.Session()
session.cookies.set('beget', 'begetok')

resp = session.get(url, headers=headers)
soup = BeautifulSoup(resp.text, 'html.parser')

items = soup.find_all('a', href=lambda x: x and '/collections/' in x)
print(f"Found {len(items)} links to collections")

with open("azori_html.txt", "w") as f:
    f.write(soup.prettify())
