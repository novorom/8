#!/usr/bin/env python3
"""
SEO Autopilot for cersanit-spb.ru
Generates blog articles via Claude API
Runs every Monday at 09:00 MSK via GitHub Actions
"""

import os
import json
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path

SITE_URL = "https://cersanit-spb.ru"
REPO_ROOT = Path(__file__).parent.parent
TOPICS_FILE = Path(__file__).parent / "topics.json"
LOG_FILE = Path(__file__).parent / "autopilot.log"
MODEL = "claude-haiku-4-5-20251001"
MAX_TOKENS = 4000
API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")


def log(msg):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = "[{}] {}".format(ts, msg)
    print(line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def call_claude(prompt):
    if not API_KEY:
        raise ValueError("ANTHROPIC_API_KEY not set")
    payload = json.dumps({
        "model": MODEL,
        "max_tokens": MAX_TOKENS,
        "messages": [{"role": "user", "content": prompt}]
    }).encode("utf-8")
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            "anthropic-version": "2023-06-01",
        },
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = json.loads(resp.read())
    return data["content"][0]["text"]


def build_products_block(products):
    lines = []
    lines.append('          <div className="mt-8 p-5 rounded-xl bg-muted/50 border border-border">')
    lines.append('            <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>')
    lines.append('            <div className="flex flex-col gap-2">')
    cls = "flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"
    for p in products:
        slug = p["slug"]
        name = p["name"]
        price = p["price"]
        line = '              <Link href="/catalog/{}" className="{}"><span className="text-foreground">{}</span><span className="text-primary font-medium ml-3">{} руб/м2</span></Link>'.format(
            slug, cls, name, price
        )
        lines.append(line)
    lines.append('            </div>')
    lines.append('            <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог</Link>')
    lines.append('          </div>')
    return "\n".join(lines)


def inject_products_if_missing(content, products):
    if "Товары из этой статьи" in content:
        return content
    log("  Блок товаров не найден — вставляю принудительно")
    block = build_products_block(products)
    # Find last </article> or last </div> before closing
    marker = "      </article>"
    if marker in content:
        content = content.replace(marker, block + "\n" + marker)
    else:
        # fallback: insert before last })
        last = content.rfind("  )\n}")
        if last != -1:
            content = content[:last] + block + "\n  )\n}"
    log("  Блок товаров вставлен")
    return content


def validate_tsx(content, slug):
    required = [
        "export default function",
        "return (",
        "import Link",
        "SITE_URL",
        "canonical",
        "Товары из этой статьи",
    ]
    for check in required:
        if check not in content:
            log("  Валидация: нет '{}' в {}".format(check, slug))
            return False
    # Check for bad JSX pattern like {<Link
    if re.search(r'\{<[A-Z]', content):
        log("  Валидация: найден синтаксис {<Link в {}".format(slug))
        return False
    log("  Валидация пройдена: {}".format(slug))
    return True


def generate_blog_article(topic):
    slug = topic["slug"]
    title = topic["title"]
    keywords = topic["keywords"]
    products = topic["products"]

    p0 = products[0]
    p1 = products[1]
    p2 = products[2]

    prompt = (
        "Ты SEO-копирайтер магазина плитки Cersanit в Санкт-Петербурге.\n"
        "Напиши статью блога на русском языке в формате Next.js TSX.\n\n"
        "ТЕМА: {}\n"
        "КЛЮЧЕВЫЕ СЛОВА: {}\n"
        "SLUG: {}\n\n"
        "ТРЕБОВАНИЯ:\n"
        "1. Только TSX код — никаких пояснений, никаких markdown блоков\n"
        "2. Начни с: import type {{ Metadata }} from \"next\"\n"
        "3. Используй SITE_URL = \"https://cersanit-spb.ru\"\n"
        "4. Добавь canonical: `${{SITE_URL}}/blog/{}`\n"
        "5. Статья 1500+ слов, минимум 5 секций с h2\n"
        "6. Упомяни Санкт-Петербург, Янино, официальный дилер Cersanit\n"
        "7. В конце добавь секцию с классом 'Читайте также' с тремя ссылками\n"
        "8. После секции 'Читайте также' добавь ТОЧНО ЭТОТ КОД без изменений:\n\n"
        "          <div className=\"mt-8 p-5 rounded-xl bg-muted/50 border border-border\">\n"
        "            <h3 className=\"text-base font-semibold text-foreground mb-4\">Товары из этой статьи</h3>\n"
        "            <div className=\"flex flex-col gap-2\">\n"
        "              <Link href=\"/catalog/{}\" className=\"flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm\"><span className=\"text-foreground\">{}</span><span className=\"text-primary font-medium ml-3\">{} руб/м2</span></Link>\n"
        "              <Link href=\"/catalog/{}\" className=\"flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm\"><span className=\"text-foreground\">{}</span><span className=\"text-primary font-medium ml-3\">{} руб/м2</span></Link>\n"
        "              <Link href=\"/catalog/{}\" className=\"flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm\"><span className=\"text-foreground\">{}</span><span className=\"text-primary font-medium ml-3\">{} руб/м2</span></Link>\n"
        "            </div>\n"
        "            <Link href=\"/catalog\" className=\"mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium\">Весь каталог</Link>\n"
        "          </div>\n\n"
        "9. НЕ используй синтаксис {{<Link>}} — только <Link> без фигурных скобок снаружи\n"
        "10. Структура файла: imports -> SITE_URL -> metadata -> export default function Article()"
    ).format(
        title, keywords, slug, slug,
        p0["slug"], p0["name"], p0["price"],
        p1["slug"], p1["name"], p1["price"],
        p2["slug"], p2["name"], p2["price"],
    )

    log("  Генерирую статью: {}".format(slug))
    content = call_claude(prompt)

    # Clean markdown fences
    content = re.sub(r'^```tsx?\n?', '', content.strip())
    content = re.sub(r'\n?```$', '', content.strip())

    # Inject products block if model forgot
    content = inject_products_if_missing(content, products)

    return content


def update_blog_index(slug, title):
    blog_index = REPO_ROOT / "app" / "blog" / "page.tsx"
    if not blog_index.exists():
        log("  blog/page.tsx не найден")
        return
    content = blog_index.read_text(encoding="utf-8")
    if slug in content:
        log("  {} уже есть в blog/page.tsx".format(slug))
        return
    today = datetime.now().strftime("%Y-%m-%d")
    new_entry = '  {{ href: "/blog/{}", title: "{}", desc: "Читайте на нашем сайте.", date: "{}", time: "5 мин" }},'.format(
        slug, title, today
    )
    content = content.replace(
        "]\n\nexport default function BlogIndex",
        "  {}\n]\n\nexport default function BlogIndex".format(new_entry)
    )
    blog_index.write_text(content, encoding="utf-8")
    log("  {} добавлен в blog/page.tsx".format(slug))


def update_sitemap(slug):
    sitemap = REPO_ROOT / "app" / "sitemap.ts"
    if not sitemap.exists():
        log("  sitemap.ts не найден")
        return
    content = sitemap.read_text(encoding="utf-8")
    if slug in content:
        log("  {} уже есть в sitemap.ts".format(slug))
        return
    content = re.sub(
        r'("blog/trendy-plitki-2025",)',
        r'\1\n    "blog/' + slug + '",',
        content
    )
    sitemap.write_text(content, encoding="utf-8")
    log("  {} добавлен в sitemap.ts".format(slug))


def main():
    log("=" * 50)
    log("SEO АВТОПИЛОТ ЗАПУЩЕН")
    log("=" * 50)

    if not API_KEY:
        log("ANTHROPIC_API_KEY не задан. Выход.")
        sys.exit(1)

    topics = json.loads(TOPICS_FILE.read_text(encoding="utf-8"))
    next_topic = next((t for t in topics["blog"] if not t.get("used")), None)

    if not next_topic:
        log("Все темы использованы!")
        sys.exit(0)

    slug = next_topic["slug"]
    log("Тема: {}".format(next_topic["title"]))

    try:
        tsx_content = generate_blog_article(next_topic)

        if not validate_tsx(tsx_content, slug):
            log("Файл не прошёл валидацию. Публикация отменена.")
            sys.exit(1)

        article_dir = REPO_ROOT / "app" / "blog" / slug
        article_dir.mkdir(parents=True, exist_ok=True)
        article_file = article_dir / "page.tsx"
        article_file.write_text(tsx_content, encoding="utf-8")
        log("Файл сохранён: {}".format(article_file))

        update_blog_index(slug, next_topic["title"])
        update_sitemap(slug)

        next_topic["used"] = True
        TOPICS_FILE.write_text(
            json.dumps(topics, ensure_ascii=False, indent=2),
            encoding="utf-8"
        )
        log("Тема помечена как использованная")
        log("=" * 50)
        log("ГОТОВО! Статья: /blog/{}".format(slug))
        log("=" * 50)

    except urllib.error.HTTPError as e:
        log("HTTP ошибка: {} {}".format(e.code, e.reason))
        log(e.read().decode("utf-8")[:300])
        sys.exit(1)
    except Exception as e:
        log("Ошибка: {}".format(e))
        sys.exit(1)


if __name__ == "__main__":
    main()
