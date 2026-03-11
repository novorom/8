#!/usr/bin/env python3
"""
Второй проход: заходим на каждую страницу товара на Plitburg
и добирём: pieces_per_box, sqm_per_box, surface, thickness, country, specs
"""
import json, re, time, random
import urllib.request, urllib.parse
from html.parser import HTMLParser

INPUT_TS  = "/Users/r/8/lib/products-data-new.ts"
OUTPUT_TS = "/Users/r/8/lib/products-data-new.ts"
SAVE_EVERY = 50

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121 Safari/537.36",
    "Accept-Language": "ru-RU,ru;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xhtml;q=0.9,*/*;q=0.8",
}

class SpecParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_table = False
        self.in_td = False
        self.current_label = None
        self.specs = {}
        self.td_texts = []
        self.row_texts = []
        self.in_row = False

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag == "tr":
            self.in_row = True
            self.row_texts = []
        if tag in ("td", "th"):
            self.in_td = True
    
    def handle_endtag(self, tag):
        if tag == "tr" and self.row_texts:
            if len(self.row_texts) >= 2:
                self.specs[self.row_texts[0].strip()] = self.row_texts[1].strip()
            self.row_texts = []
            self.in_row = False
        if tag in ("td", "th"):
            self.in_td = False

    def handle_data(self, data):
        if self.in_td and data.strip():
            self.row_texts.append(data.strip())

def fetch_page(url):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.read().decode("utf-8", errors="replace")
    except:
        return None

def build_plitburg_url(sku, name):
    """Строим URL на Plitburg по артикулу"""
    slug = re.sub(r'[^a-zA-Zа-яёА-ЯЁ0-9\s]', '', name.lower()).strip()
    slug = re.sub(r'\s+', '_', slug)
    sku_lower = str(sku).lower()
    return f"https://plitburg.ru/catalog/plitka/{sku_lower}_{slug}_cersanit/"

def search_plitburg(sku):
    """Ищем товар через поиск Plitburg"""
    url = f"https://plitburg.ru/search/?q={urllib.parse.quote(str(sku))}"
    html = fetch_page(url)
    if not html:
        return None
    # Ищем первую ссылку на товар
    m = re.search(r'href="(/catalog/plitka/[^"]+/)"', html)
    if m:
        return "https://plitburg.ru" + m.group(1)
    return None

def parse_specs_from_html(html):
    """Парсим характеристики из HTML страницы товара"""
    specs = {}
    
    # Ищем таблицу характеристик
    # Паттерн: label — value в строках таблицы
    rows = re.findall(
        r'<tr[^>]*>.*?<td[^>]*>(.*?)</td>.*?<td[^>]*>(.*?)</td>.*?</tr>',
        html, re.DOTALL
    )
    for label_raw, value_raw in rows:
        label = re.sub(r'<[^>]+>', '', label_raw).strip()
        value = re.sub(r'<[^>]+>', '', value_raw).strip()
        if label and value:
            specs[label] = value
    
    # Также ищем definition list
    dts = re.findall(r'<dt[^>]*>(.*?)</dt>', html, re.DOTALL)
    dds = re.findall(r'<dd[^>]*>(.*?)</dd>', html, re.DOTALL)
    for dt, dd in zip(dts, dds):
        label = re.sub(r'<[^>]+>', '', dt).strip()
        value = re.sub(r'<[^>]+>', '', dd).strip()
        if label and value:
            specs[label] = value
    
    return specs

def extract_fields(specs):
    """Извлекаем нужные поля из словаря характеристик"""
    result = {}
    
    mappings = {
        "Количество штук в упаковке": "pieces_per_box",
        "Количество м2 в упаковке": "sqm_per_box", 
        "Количество м2 в упак.": "sqm_per_box",
        "Кол-во плиток в уп.": "pieces_per_box",
        "Толщина": "thickness",
        "Страна": "country",
        "Поверхность": "surface",
        "Рельефность": "texture",
        "Ректификат": "rectified",
        "Морозостойкость": "frost_resistant",
        "Износостойкость (PEI)": "wear_class",
    }
    
    for ru_key, en_key in mappings.items():
        for k, v in specs.items():
            if ru_key.lower() in k.lower():
                v = v.replace(",", ".").strip()
                if en_key in ("pieces_per_box",):
                    try: result[en_key] = int(float(v))
                    except: pass
                elif en_key in ("sqm_per_box", "thickness"):
                    try: result[en_key] = float(v)
                    except: pass
                elif en_key in ("rectified", "frost_resistant"):
                    result[en_key] = v.lower() in ("да", "yes", "true", "+")
                else:
                    result[en_key] = v
                break
    
    return result

def inject_fields_into_ts(content, sku, fields):
    """Вставляем поля в блок товара по артикулу"""
    if not fields:
        return content, False
    
    # Ищем блок товара
    pattern = rf'(sku:\s*"{re.escape(str(sku))}"[^}}]+?)(images:\s*\[[^\]]*\],)'
    
    def replacer(m):
        existing = m.group(0)
        # Собираем строки для вставки
        inserts = []
        if "pieces_per_box" in fields and "pieces_per_box" not in existing:
            inserts.append(f'  pieces_per_box: {fields["pieces_per_box"]},')
        if "sqm_per_box" in fields and "sqm_per_box" not in existing:
            inserts.append(f'  sqm_per_box: {fields["sqm_per_box"]},')
        if "thickness" in fields and "thickness" not in existing:
            inserts.append(f'  thickness: {fields["thickness"]},')
        if "surface" in fields and "surface" not in existing:
            s = fields["surface"].replace('"', '\\"')
            inserts.append(f'  surface: "{s}",')
        if "country" in fields and "country" not in existing:
            c = fields["country"].replace('"', '\\"')
            inserts.append(f'  country: "{c}",')
        if "frost_resistant" in fields and "frost_resistant" not in existing:
            inserts.append(f'  frost_resistant: {str(fields["frost_resistant"]).lower()},')
        if "rectified" in fields and "rectified" not in existing:
            inserts.append(f'  rectified: {str(fields["rectified"]).lower()},')
        
        if not inserts:
            return existing
        return existing + "\n" + "\n".join(inserts)
    
    new_content, n = re.subn(pattern, replacer, content, flags=re.DOTALL)
    return new_content, n > 0

# ── ГЛАВНЫЙ ЦИКЛ ──
print("📂 Читаем products-data-new.ts...")
with open(INPUT_TS) as f:
    content = f.read()

# Извлекаем все артикулы
skus = re.findall(r'sku:\s*"([^"]+)"', content)
print(f"   Артикулов: {len(skus)}")

# Пропускаем уже обработанные (где есть pieces_per_box)
done_skus = set(re.findall(r'sku:\s*"([^"]+)"[^}]*pieces_per_box', content, re.DOTALL))
todo = [s for s in skus if s not in done_skus]
print(f"   Нужно обработать: {len(todo)}")

updated = 0
failed = 0

for i, sku in enumerate(todo, 1):
    print(f"  [{i}/{len(todo)}] Артикул {sku}...", end=" ", flush=True)
    
    # Ищем URL через поиск
    url = search_plitburg(sku)
    if not url:
        print("❌ не найден")
        failed += 1
        time.sleep(1)
        continue
    
    # Загружаем страницу товара
    html = fetch_page(url)
    if not html:
        print("❌ ошибка загрузки")
        failed += 1
        time.sleep(1)
        continue
    
    specs = parse_specs_from_html(html)
    fields = extract_fields(specs)
    
    if fields:
        content, ok = inject_fields_into_ts(content, sku, fields)
        if ok:
            updated += 1
            print(f"✅ {list(fields.keys())}")
        else:
            print(f"⚠️  не вставлено")
    else:
        print("📝 нет данных")
        failed += 1
    
    # Сохраняем прогресс
    if i % SAVE_EVERY == 0:
        with open(OUTPUT_TS, "w") as f:
            f.write(content)
        print(f"\n  💾 Сохранено {i}/{len(todo)} | Обновлено: {updated}\n")
    
    time.sleep(random.uniform(1.0, 2.0))

# Финальное сохранение
with open(OUTPUT_TS, "w") as f:
    f.write(content)

print(f"\n✅ Готово! Обновлено: {updated} | Не найдено: {failed}")
print("Деплой:")
print("  cd /Users/r/8 && git add -A && git commit -m 'feat: add specs from plitburg' && git push")
