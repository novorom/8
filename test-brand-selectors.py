#!/usr/bin/env python3
"""
Тест селекторов на сайтах брендов.
Запускай и смотри вывод — какие селекторы работают.

Запуск:
  cd ~/Downloads/scraper2
  source venv/bin/activate
  python3 test-brand-selectors.py
"""
import time
from playwright.sync_api import sync_playwright

TESTS = [
    {
        "brand": "Kerama Marazzi",
        "url": "https://www.kerama-marazzi.com/catalogue/?q=17006",
        "sku": "17006",
    },
    {
        "brand": "Азори",
        "url": "https://azori.ru/search/?q=00-00110097",
        "sku": "00-00110097",
    },
    {
        "brand": "Нефрит-Керамика",
        "url": "https://nefrit.ru/search/?q=00-00-4-17-00-01-5107",
        "sku": "00-00-4-17-00-01-5107",
    },
    {
        "brand": "Бонапарт",
        "url": "https://bonapart.ru/search/?q=Amuletto",
        "sku": "Amuletto",
    },
    {
        "brand": "Элетто",
        "url": "https://eletto.com.ru/search/?q=00-00108447",
        "sku": "00-00108447",
    },
    {
        "brand": "Идальго",
        "url": "https://idalgo.ru/search/?q=Авеллано",
        "sku": "Авеллано",
    },
    {
        "brand": "Dako",
        "url": "https://dako.ru/search/?q=E-3020",
        "sku": "E-3020",
    },
]

LINK_SELECTORS = [
    "a.catalog-item__name",
    "a.catalog-item-photo",
    "a[href*='/catalogue/']",
    "a[href*='/catalog/']",
    ".catalog-item a",
    ".item-title a",
    ".product-title a",
    ".catalog__item a",
    ".search-result a",
]

IMG_SELECTORS = [
    ".product-image img",
    ".product-photo img",
    ".product-detail img",
    ".detail-page img",
    ".fotorama img",
    ".product__image img",
    ".catalog-detail img",
    ".slider img",
    "img.detail-img",
    ".product-img img",
    ".main-image img",
    ".gallery img",
    "img[src*='/upload/']",
    "img[src*='/images/']",
    "img[src*='/img/']",
]

def test_brand(page, test):
    brand = test["brand"]
    print(f"\n{'='*60}")
    print(f"🔍 {brand}")
    print(f"   URL: {test['url']}")

    try:
        page.goto(test["url"], wait_until="networkidle", timeout=20000)
        time.sleep(2)
    except Exception as e:
        print(f"   ❌ Ошибка загрузки: {e}")
        return

    # Ищем ссылку на товар
    found_link = None
    for sel in LINK_SELECTORS:
        el = page.query_selector(sel)
        if el:
            href = el.get_attribute("href") or ""
            if href and len(href) > 5:
                found_link = (sel, href)
                print(f"   ✅ Ссылка [{sel}]: {href[:80]}")
                break

    if not found_link:
        print("   ⚠️  Ссылка на товар не найдена на странице поиска")
        # Ищем вообще все ссылки
        all_links = page.query_selector_all("a[href]")
        catalog_links = []
        for a in all_links[:50]:
            href = a.get_attribute("href") or ""
            if any(x in href for x in ['/catalog', '/catalogue', '/product', '/tovar']):
                catalog_links.append(href)
        if catalog_links:
            print(f"   ℹ️  Каталожные ссылки на странице: {catalog_links[:3]}")
        else:
            # Выводим страницу
            title = page.title()
            print(f"   ℹ️  Заголовок страницы: {title}")
            # Любые изображения
            imgs = page.query_selector_all("img")
            for img in imgs[:5]:
                src = img.get_attribute("src") or ""
                if src and "logo" not in src.lower() and len(src) > 15:
                    print(f"   ℹ️  Img на странице: {src[:80]}")
        return

    # Переходим на карточку товара
    href = found_link[1]
    if not href.startswith("http"):
        base = "/".join(test["url"].split("/")[:3])
        href = base + href

    try:
        print(f"   → Переходим: {href[:80]}")
        page.goto(href, wait_until="networkidle", timeout=20000)
        time.sleep(2)
    except Exception as e:
        print(f"   ❌ Ошибка карточки: {e}")
        return

    # Ищем картинку
    found_img = False
    for sel in IMG_SELECTORS:
        el = page.query_selector(sel)
        if el:
            src = el.get_attribute("src") or el.get_attribute("data-src") or el.get_attribute("data-lazy") or ""
            src = src.strip()
            if src and len(src) > 20 and "logo" not in src.lower() and not src.endswith(".gif"):
                print(f"   ✅ Картинка [{sel}]: {src[:100]}")
                found_img = True
                break

    if not found_img:
        print("   ⚠️  Картинка не найдена. Все img на странице:")
        imgs = page.query_selector_all("img")
        for img in imgs[:8]:
            src = img.get_attribute("src") or img.get_attribute("data-src") or ""
            if src and len(src) > 15:
                cls = img.get_attribute("class") or ""
                print(f"      class='{cls[:40]}' src={src[:80]}")


def main():
    print("🚀 Тест селекторов на сайтах брендов\n")

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=False)  # headless=False чтобы видеть
        ctx = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121 Safari/537.36",
            locale="ru-RU",
        )
        page = ctx.new_page()

        for test in TESTS:
            test_brand(page, test)
            time.sleep(2)

        print("\n\n✅ Тест завершён. Скинь этот вывод Клоду — он настроит селекторы.")
        browser.close()


if __name__ == "__main__":
    main()
