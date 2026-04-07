#!/usr/bin/env python3
"""
scraper_plitburg.py — докачивает фото и характеристики с plitburg.ru

Задачи:
  1. Фото: Нефрит (682 без Cloudinary), Уральский гранит (28), Gracia (38), Dako (16)
  2. Характеристики: pieces_per_box, sqm_per_box, thickness, frost_resistant,
                     water_abs, wear_class, slip_class, rectified, color, usage
  3. Азори slug-маппинг: автоматически находит английский slug для русских коллекций

Запуск:
  python3 scraper_plitburg.py --mode sitemap        # скачать и разобрать sitemap
  python3 scraper_plitburg.py --mode analyze_azori  # показать маппинг коллекций
  python3 scraper_plitburg.py --mode photos         # докачать фото
  python3 scraper_plitburg.py --mode chars          # докачать характеристики
  python3 scraper_plitburg.py --mode all            # всё сразу
  python3 scraper_plitburg.py --brand "Азори"       # только один бренд
  python3 scraper_plitburg.py --limit 50            # ограничить кол-во товаров

Прогресс сохраняется в ./progress/ — безопасно прерывать и возобновлять.
"""

import re
import sys
import json
import time
import random
import argparse
import requests
import xml.etree.ElementTree as ET
from pathlib import Path
from difflib import SequenceMatcher
from bs4 import BeautifulSoup
from collections import defaultdict

# ─── Пути ─────────────────────────────────────────────────────────────────────
_BASE     = Path(__file__).parent
DATA_JSON = _BASE / "lib/products-data.json"
DATA_TS   = _BASE / "lib/products-data-new.ts"
PROG_DIR  = _BASE / "progress"
PROG_DIR.mkdir(exist_ok=True)

SITEMAP_URL = "https://plitburg.ru/sitemap-iblock-16.xml"
BASE_URL    = "https://plitburg.ru"

DELAY_MIN = 1.3
DELAY_MAX = 2.8
RETRIES   = 3

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/122.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "ru-RU,ru;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Referer": "https://plitburg.ru/catalog/",
}

# ─── Маппинг характеристик plitburg → наши поля ───────────────────────────────
CHAR_MAP = {
    "количество штук в упаковке":   "pieces_per_box",
    "штук в упаковке":              "pieces_per_box",
    "кол-во в упаковке":            "pieces_per_box",
    "кол-во штук в упаковке":       "pieces_per_box",
    "площадь упаковки":             "sqm_per_box",
    "площадь в упаковке":           "sqm_per_box",
    "м² в упаковке":                "sqm_per_box",
    "площадь в уп.":                "sqm_per_box",
    "количество м2 в упаковке":     "sqm_per_box",
    "количество м² в упаковке":     "sqm_per_box",
    "м2 в упаковке":                "sqm_per_box",
    "толщина":                       "thickness",
    "толщина, мм":                   "thickness",
    "морозостойкость":               "frost_resistant",
    "морозостойкий":                 "frost_resistant",
    "водопоглощение":                "water_abs",
    "водопоглощение, %":             "water_abs",
    "класс износостойкости":        "wear_class",
    "степень износостойкости":      "wear_class",
    "pei":                           "wear_class",
    "класс истираемости":           "wear_class",
    "противоскользящие свойства":   "slip_class",
    "класс скольжения":             "slip_class",
    "r-класс":                       "slip_class",
    "r класс":                       "slip_class",
    "ректификация":                  "rectified",
    "ректифицированная":             "rectified",
    "цвет":                          "color",
    "цветовая гамма":                "color",
    "назначение":                    "usage",
    "применение":                    "usage",
    "область применения":            "usage",
    "коллекция":                     "_collection",   # для Азори slug-маппинга
    "бренд":                         "_brand",
    "производитель":                 "_brand",
}

# Нормализация usage
USAGE_NORM = {
    "для стен":        "wall", "стены": "wall", "настенная": "wall",
    "для пола":        "floor", "пол": "floor", "напольная": "floor",
    "для пола и стен": "both", "универсальная": "both", "универсальный": "both",
    "для улицы":       "outdoor", "фасадная": "outdoor", "уличная": "outdoor",
    "для пола, стен":  "both", "стены, пол": "both",
}

BOOL_YES = {"да", "yes", "+", "есть", "морозостойкая", "морозостойкий", "true", "f"}
BOOL_NO  = {"нет", "no", "-", "false", "нф"}

# Бренды которые нас интересуют (как в plitburg meta itemprop brand → наш brand)
BRAND_ALIAS = {
    "нефрит-керамика":  "Нефрит-Керамика",
    "нефрит керамика":  "Нефрит-Керамика",
    "нефрит":           "Нефрит-Керамика",
    "азори":            "Азори",
    "azori":            "Азори",
    "уральский гранит": "Уральский гранит",
    "идальго":          "Идальго",
    "idalgo":           "Идальго",
    "gracia ceramica":  "Gracia Ceramica",
    "gracia":           "Gracia Ceramica",
    "dako":             "Dako",
    "kerama marazzi":   "Kerama Marazzi",
    "бонапарт":         "Бонапарт",
    "элетто":           "Элетто",
    "гранитея":         "Гранитея",
    "cersanit":         "Cersanit",
}

# ─── Утилиты ──────────────────────────────────────────────────────────────────

def sleep_random():
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))


def fetch(url: str) -> requests.Response | None:
    for attempt in range(RETRIES):
        try:
            r = requests.get(url, headers=HEADERS, timeout=25)
            if r.status_code == 200:
                return r
            if r.status_code == 404:
                return None
            print(f"  HTTP {r.status_code} [{attempt+1}/{RETRIES}] {url[-60:]}")
        except Exception as e:
            print(f"  Error [{attempt+1}/{RETRIES}]: {e}")
        if attempt < RETRIES - 1:
            sleep_random()
    return None


def load_progress(name: str) -> dict:
    p = PROG_DIR / f"{name}.json"
    return json.loads(p.read_text()) if p.exists() else {}


def save_progress(name: str, data: dict):
    (PROG_DIR / f"{name}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2))


def load_products() -> list:
    return json.loads(DATA_JSON.read_text(encoding="utf-8"))


def save_products(products: list):
    DATA_JSON.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")
    _update_ts(products)


def _update_ts(products: list):
    if not DATA_TS.exists():
        return
    content = DATA_TS.read_text(encoding="utf-8")
    new_json = json.dumps(products, ensure_ascii=False, indent=2)
    import re as _re
    pattern = r'(export\s+const\s+products\b[^=]*=\s*)\[[\s\S]*?\](\s*(?:as\s+\w[\w<>\[\]]*\s*)?;)'
    new_c = _re.sub(pattern, r'\g<1>' + new_json + r'\g<2>', content, count=1)
    if new_c != content:
        DATA_TS.write_text(new_c, encoding="utf-8")


def normalize_str(s: str) -> str:
    """Нормализует строку для сравнения: нижний регистр, убирает лишние пробелы."""
    return re.sub(r'\s+', ' ', s.lower().strip())


def similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, normalize_str(a), normalize_str(b)).ratio()


# ─── Парсинг страницы plitburg ────────────────────────────────────────────────

def parse_plitburg_page(url: str) -> dict:
    """
    Парсит страницу товара на plitburg.ru.
    Возвращает: {image_url, brand, collection, chars: {...}}
    """
    resp = fetch(url)
    if not resp:
        return {}

    soup = BeautifulSoup(resp.text, "html.parser")
    result = {"url": url, "chars": {}}

    # 1. Фото — ищем data-src с /iblock/ или itemprop="image"
    for selector in [
        ('img', {"itemprop": "image"}),
        ('link', {"itemprop": "contentUrl"}),
        ('img', {"data-src": re.compile(r'/iblock/')}),
        ('img', {"src":      re.compile(r'/iblock/')}),
    ]:
        tag, attrs = selector
        img = soup.find(tag, attrs)
        if img:
            src = img.get("data-src") or img.get("src") or img.get("href", "")
            if src.startswith("/"):
                src = BASE_URL + src
            if src:
                result["image_url"] = src
                break

    # 2. Характеристики — ищем через meta itemprop="name"/"value" 
    # И ТАКЖЕ через div (новые страницы)
    
    # 2a. Из div (приоритетнее, т.к. в meta часто бывает "Array")
    props_divs = soup.find_all("div", class_="catalog-element-properties-detail-item")
    for div in props_divs:
        name_div = div.find("div", class_="catalog-element-properties-detail-item-name")
        val_div = div.find("div", class_="catalog-element-properties-detail-item-value")
        if name_div and val_div:
            char_name = normalize_str(name_div.get_text(strip=True).replace(":", ""))
            char_value = val_div.get_text(strip=True)
            if char_name and char_value and char_value.lower() != "array":
                _apply_char(result, char_name, char_value)

    # 2b. Из meta (дозаполняем если нет в div)
    names  = soup.find_all("meta", {"itemprop": "name"})
    values = soup.find_all("meta", {"itemprop": "value"})

    for name_tag, value_tag in zip(names, values):
        char_name  = normalize_str(name_tag.get("content", ""))
        char_value = value_tag.get("content", "").strip()
        if char_name and char_value and char_value.lower() != "array":
            _apply_char(result, char_name, char_value)

    # 3. Бренд из title/h1 если не найден в itemprop
    if "brand_raw" not in result:
        title = soup.find("title")
        if title:
            for alias in BRAND_ALIAS:
                if alias in normalize_str(title.text):
                    result["brand_raw"] = alias
                    break

    return result


def _apply_char(result: dict, char_name: str, char_value: str):
    field = CHAR_MAP.get(char_name)
    if not field:
        # Частичное совпадение
        for key, mapped in CHAR_MAP.items():
            if key in char_name or char_name in key:
                field = mapped
                break

    if not field or not char_value:
        return

    val = char_value

    if field == "_collection":
        result["collection_raw"] = val
        return
    if field == "_brand":
        result["brand_raw"] = normalize_str(val)
        return

    # Приводим к нужному типу
    val_low = normalize_str(val)
    if field in ("frost_resistant", "rectified"):
        if val_low in BOOL_YES:
            val = True
        elif val_low in BOOL_NO:
            val = False
        else:
            val = None
    elif field in ("pieces_per_box", "wear_class"):
        try:
            # Ищем число
            match = re.search(r'\d+', val)
            val = int(match.group()) if match else None
        except:
            val = None
    elif field in ("sqm_per_box", "thickness", "water_abs"):
        try:
            match = re.search(r'[\d.,]+', val)
            val = float(match.group().replace(',', '.')) if match else None
        except:
            val = None
    elif field == "usage":
        val = USAGE_NORM.get(val_low, val_low)
    elif field == "color":
        val = val.strip().capitalize()

    if val is not None:
        if field not in result["chars"]:
            result["chars"][field] = val


# ─── Загрузка sitemap ─────────────────────────────────────────────────────────

def load_sitemap() -> list[str]:
    """Загружает sitemap и возвращает все URL товаров."""
    progress = load_progress("sitemap")
    if progress.get("urls"):
        print(f"  Sitemap из кэша: {len(progress['urls'])} URL")
        return progress["urls"]

    print(f"  Загружаем {SITEMAP_URL}...")
    resp = fetch(SITEMAP_URL)
    if not resp:
        print("  ❌ Не удалось загрузить sitemap")
        return []

    root = ET.fromstring(resp.content)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [loc.text.strip() for loc in root.findall(".//sm:loc", ns) if loc.text]
    print(f"  Найдено URL в sitemap: {len(urls)}")

    save_progress("sitemap", {"urls": urls})
    return urls


# ─── Азори slug-маппинг ───────────────────────────────────────────────────────

def analyze_azori_slugs(products: list, sitemap_urls: list) -> dict:
    """
    Строит маппинг: азори_slug (из URL) → название коллекции (из страницы).
    Потом сопоставляет с нашими коллекциями.
    """
    # Фильтруем Азори URL из sitemap
    azori_urls = [u for u in sitemap_urls if "azori" in u.lower()]
    print(f"  Азори URL в sitemap: {len(azori_urls)}")

    # Извлекаем slug из URL
    def extract_slug(url: str) -> str:
        # https://plitburg.ru/catalog/plitka/amati_bezh.../  → amati
        path = url.rstrip("/").split("/")[-1]
        return path

    # Наши коллекции Азори
    our_azori = [p for p in products if p["brand"] == "Азори"]
    our_collections = set(
        normalize_str(p.get("collection", ""))
        for p in our_azori
        if p.get("collection")
    )
    print(f"  Наших коллекций Азори: {len(our_collections)}")

    # Загружаем прогресс
    slug_map = load_progress("azori_slugs")

    # Сэмплируем по одному URL на каждый уникальный первый токен slug
    slug_tokens = {}
    for url in azori_urls:
        slug = extract_slug(url)
        token = slug.split("_")[0]
        if token not in slug_tokens:
            slug_tokens[token] = url

    print(f"  Уникальных slug-токенов: {len(slug_tokens)}")
    new_tokens = {t: u for t, u in slug_tokens.items() if t not in slug_map}
    print(f"  Нужно проверить: {len(new_tokens)}")

    done = 0
    for token, url in new_tokens.items():
        print(f"  [{done+1}/{len(new_tokens)}] {token} → {url[-50:]}", end="", flush=True)
        page = parse_plitburg_page(url)
        coll = page.get("collection_raw", "")
        slug_map[token] = {"url": url, "collection_plitburg": coll}
        print(f" → {repr(coll)}")
        done += 1
        save_progress("azori_slugs", slug_map)
        sleep_random()

    # Строим обратный маппинг: наша коллекция → список slug-токенов
    print("\n=== МАППИНГ АЗОРИ: slug → коллекция ===")
    result = {}
    for token, data in sorted(slug_map.items()):
        coll_plitburg = normalize_str(data.get("collection_plitburg", ""))
        # Ищем совпадение с нашими
        best_match = None
        best_score = 0
        for our_coll in our_collections:
            score = similarity(coll_plitburg, our_coll)
            if score > best_score:
                best_score = score
                best_match = our_coll
        status = "✅" if best_score > 0.6 else "❓"
        print(f"  {status} slug={token!r:20} plitburg={coll_plitburg!r:25} our={best_match!r:25} ({best_score:.2f})")
        result[token] = {
            "collection_plitburg": data.get("collection_plitburg", ""),
            "our_collection": best_match if best_score > 0.5 else None,
            "score": best_score,
        }

    save_progress("azori_slug_map", result)
    return result


# ─── Матчинг товаров с URL sitemap ────────────────────────────────────────────

def match_products_to_urls(products: list, sitemap_urls: list, target_brands: list) -> dict:
    """
    Для каждого товара из target_brands находит URL на plitburg.
    Стратегия: сначала SKU в URL, потом коллекция.
    Возвращает: {product_id: url}
    """
    progress = load_progress("product_url_map")
    already_mapped = set(progress.keys())

    target = [p for p in products
              if p["brand"] in target_brands
              and p.get("id") not in already_mapped]
    print(f"  Товаров для маппинга: {len(target)}")

    if not target:
        return progress

    # Нормализуем все URL один раз
    url_norms = [(u, u.lower().replace("-", "").replace("_", "").replace("/", ""))
                 for u in sitemap_urls]

    for idx, p in enumerate(target):
        pid = p.get("id", "")
        sku_raw = p.get("sku", "")

        # Все варианты SKU
        sku_variants = []
        if sku_raw:
            s = sku_raw.lower()
            sku_variants.append(s.replace("-", "").replace("_", ""))
            sku_variants.append(s.replace("-", "_"))
            sku_variants.append(s)
            digits_only = re.sub(r"\D", "", s)
            if len(digits_only) >= 6:
                sku_variants.append(digits_only[-8:])
                sku_variants.append(digits_only[-6:])
        sku_variants = list(dict.fromkeys(v for v in sku_variants if len(v) >= 4))

        coll_words = [w for w in normalize_str(p.get("collection", "")).split()
                      if len(w) >= 5]

        best_url = None
        best_score = 0

        for url, url_flat in url_norms:
            matched_by_sku = False
            for sv in sku_variants:
                # Более строгий поиск SKU в URL:
                # В оригинальном URL SKU обычно разделено подчеркиваниями (00_00110060)
                # или стоит обособленно. Ищем `sv` в `url_flat` но с проверкой:
                if sv in url_flat:
                    # Чтобы избежать ложных срабатываний (например '110060' внутри '0401110060010751'),
                    # проверяем в оригинальном URL с помощью регулярок
                    
                    # Пытаемся найти оригинальный формат в URL
                    if sv in url.lower():
                        matched_by_sku = True
                        break
                    
                    # Если sv это числа, ищем их как отдельное число в URL, разделенное спецсимволами
                    if sv.isdigit():
                         # Для Азори артикулы часто в начале с подчеркиваниями, например 00_00110060
                         # Или просто числа разделенные _ или -
                         if re.search(r'[-_/]' + re.escape(sv) + r'[-_/]', url.lower()) or \
                            re.search(r'[-_/]00_00' + re.escape(sv[-6:]) + r'[-_/]', url.lower()) or \
                            re.search(r'^' + re.escape(sv) + r'[-_/]', url.split('/')[-2].lower() if len(url.split('/'))>1 else ""):
                             matched_by_sku = True
                             break
                             
            if matched_by_sku:
                best_url = url
                best_score = 1.0
                break

            for cw in coll_words[:2]:
                if cw in url_flat:
                    if 0.6 > best_score:
                        best_score = 0.6
                        best_url = url
                    break

        if not best_url and sku_raw:
            # Fallback to search
            import urllib.request
            import urllib.parse
            import ssl
            from bs4 import BeautifulSoup
            
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            
            q = urllib.parse.quote(sku_raw)
            search_url = f"https://plitburg.ru/search/?q={q}"
            try:
                req = urllib.request.Request(search_url, headers=HEADERS)
                resp = urllib.request.urlopen(req, context=ctx, timeout=10)
                html = resp.read().decode("utf-8")
                soup = BeautifulSoup(html, "html.parser")
                links = soup.find_all("a", href=True)
                for a in links:
                    if "/catalog/plitka/" in a["href"]:
                        # Проверяем, что в ссылке есть наш артикул (без учета регистра/спецсимволов)
                        h = a["href"].lower()
                        if any(sv in h.replace("-","").replace("_","") for sv in sku_variants if len(sv)>4):
                            best_url = BASE_URL + a["href"].split('?')[0]
                            print(f"    🔍 Найден через поиск: {best_url}")
                            break
            except Exception as e:
                pass

        if best_url:
            progress[pid] = best_url

        if (idx + 1) % 50 == 0:
            print(f"  Сматчено: {len(progress)} / {len(target) + len(already_mapped)}")
            save_progress("product_url_map", progress)

    save_progress("product_url_map", progress)
    print(f"  Итого сматчено: {len(progress)}")
    return progress


# ─── Скрапинг фото ────────────────────────────────────────────────────────────

def scrape_photos(products: list, url_map: dict, brands: list) -> tuple[list, int]:
    """Скачивает фото для товаров без Cloudinary-картинок."""
    progress = load_progress("photos_done")
    prod_index = {p.get("id",""): i for i, p in enumerate(products)}

    # Список товаров которым нужны фото (нет фото вообще)
    need_photo = [
        p for p in products
        if p["brand"] in brands
        and p.get("id") in url_map
        and p.get("id") not in progress
        and not p.get("main_image")
        and not (p.get("images") and any(p["images"]))
    ]

    print(f"  Товаров без Cloudinary-фото: {len(need_photo)}")
    fixed = 0

    for idx, p in enumerate(need_photo):
        url = url_map[p["id"]]
        print(f"  [{idx+1}/{len(need_photo)}] {p['brand']} | {p['name'][:40]}", end=" → ", flush=True)

        page = parse_plitburg_page(url)
        img_url = page.get("image_url")

        if img_url:
            i = prod_index[p["id"]]
            products[i]["main_image"] = img_url
            products[i]["images"] = [img_url]
            fixed += 1
            progress[p["id"]] = img_url
            print(f"✅ {img_url[-40:]}")
        else:
            progress[p["id"]] = None
            print("❌ нет фото")

        # Сохраняем каждые 20 товаров
        if (idx + 1) % 20 == 0:
            save_progress("photos_done", progress)
            save_products(products)
            print(f"  💾 Промежуточное сохранение ({fixed} фото)")

        sleep_random()

    save_progress("photos_done", progress)
    return products, fixed


# ─── Скрапинг характеристик ───────────────────────────────────────────────────

CHAR_FIELDS = ["pieces_per_box", "sqm_per_box", "thickness", "frost_resistant",
               "water_abs", "wear_class", "slip_class", "rectified", "color", "usage"]


def scrape_characteristics(products: list, url_map: dict, brands: list) -> tuple[list, int]:
    """Докачивает характеристики для товаров у которых они пустые."""
    progress = load_progress("chars_done")
    prod_index = {p.get("id",""): i for i, p in enumerate(products)}

    need_chars = [
        p for p in products
        if p["brand"] in brands
        and p.get("id") in url_map
        and p.get("id") not in progress
        # Если нет хотя бы одного из важных полей
        and (not p.get("pieces_per_box") or not p.get("sqm_per_box") or not p.get("thickness"))
    ]

    print(f"  Товаров без характеристик: {len(need_chars)}")
    fixed = 0

    for idx, p in enumerate(need_chars):
        url = url_map[p["id"]]
        print(f"  [{idx+1}/{len(need_chars)}] {p['brand']} | {p['name'][:35]}", end=" → ", flush=True)

        page = parse_plitburg_page(url)
        chars = page.get("chars", {})

        if chars:
            i = prod_index[p["id"]]
            for field, val in chars.items():
                if val is not None and not products[i].get(field):
                    products[i][field] = val
            fixed += 1
            progress[p["id"]] = chars
            filled = [f for f in CHAR_FIELDS if chars.get(f) is not None]
            print(f"✅ {len(filled)} полей: {', '.join(filled[:4])}")
        else:
            progress[p["id"]] = {}
            print("❌ нет данных")

        if (idx + 1) % 20 == 0:
            save_progress("chars_done", progress)
            save_products(products)
            print(f"  💾 Промежуточное сохранение ({fixed} товаров)")

        sleep_random()

    save_progress("chars_done", progress)
    return products, fixed


# ─── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["sitemap","analyze_azori","photos","chars","all"],
                        default="all")
    parser.add_argument("--brand", help="Только один бренд")
    parser.add_argument("--limit", type=int, help="Ограничить кол-во товаров")
    parser.add_argument("--reset-match", action="store_true", help="Сбросить кэш маппинга URL")
    args = parser.parse_args()

    products = load_products()
    print(f"📂 Товаров загружено: {len(products)}")

    # Определяем бренды
    if args.brand:
        brands = [args.brand]
    else:
        brands = ["Нефрит-Керамика", "Азори", "Уральский гранит", "Идальго",
                  "Gracia Ceramica", "Dako", "Гранитея"]

    print(f"🎯 Бренды: {', '.join(brands)}\n")

    # Загружаем sitemap
    print("📡 Загружаем sitemap...")
    sitemap_urls = load_sitemap()
    if not sitemap_urls:
        sys.exit(1)

    # Analyze Azori
    if args.mode in ("analyze_azori", "all"):
        print("\n🔍 Анализируем Азори slug-маппинг...")
        analyze_azori_slugs(products, sitemap_urls)

    if args.mode == "analyze_azori":
        return

    # Матчим товары с URL
    print("\n🔗 Матчим товары с URL sitemap...")
    if getattr(args, "reset_match", False):
        (PROG_DIR / "product_url_map.json").unlink(missing_ok=True)
        print("  🗑  Кэш маппинга сброшен")
    
    # Получаем полный маппинг
    all_url_map = match_products_to_urls(products, sitemap_urls, brands)
    
    # Фильтруем только те товары, которые относятся к текущим брендам
    brand_set = set(brands)
    url_map = {
        p["id"]: all_url_map[p["id"]] 
        for p in products 
        if p["brand"] in brand_set and p.get("id") in all_url_map
    }
    print(f"  Товаров выбранных брендов с URL: {len(url_map)}")

    # Лимит
    if args.limit:
        url_map = dict(list(url_map.items())[:args.limit])
        print(f"⚠️  Лимит: {args.limit} товаров")

    # Фото
    if args.mode in ("photos", "all"):
        print(f"\n📸 Скрапим фото для: {', '.join(brands)}")
        products, n = scrape_photos(products, url_map, brands)
        print(f"  ✅ Получено фото: {n}")
        save_products(products)

    # Характеристики
    if args.mode in ("chars", "all"):
        print(f"\n📋 Скрапим характеристики для: {', '.join(brands)}")
        products, n = scrape_characteristics(products, url_map, brands)
        print(f"  ✅ Заполнено товаров: {n}")
        save_products(products)

    print("\n✅ Готово!")


if __name__ == "__main__":
    main()
