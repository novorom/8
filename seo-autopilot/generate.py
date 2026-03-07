#!/usr/bin/env python3
"""SEO Autopilot for cersanit-spb.ru"""

import os, json, re, sys, urllib.request, urllib.error
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
    cls = "flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"
    rows = ""
    for p in products:
        rows += '\n              <Link href="/catalog/{}" className="{}">' \
                '<span className="text-foreground">{}</span>' \
                '<span className="text-primary font-medium ml-3">{} руб/м2</span>' \
                '</Link>'.format(p["slug"], cls, p["name"], p["price"])
    return (
        '\n          <div className="mt-8 p-5 rounded-xl bg-muted/50 border border-border">'
        '\n            <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>'
        '\n            <div className="flex flex-col gap-2">'
        + rows +
        '\n            </div>'
        '\n            <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог</Link>'
        '\n          </div>'
    )


def force_inject_products(content, products):
    """Always inject products block before the last closing tags"""
    block = build_products_block(products)
    
    # Remove any existing products block first to avoid duplicates
    if "Товары из этой статьи" in content:
        log("  Блок товаров уже есть в контенте")
        return content
    
    log("  Вставляю блок товаров принудительно")
    
    # Strategy: find the last </article> tag
    if "</article>" in content:
        content = content.replace("</article>", block + "\n        </article>", 1)
        log("  Вставлено перед </article>")
        return content
    
    # Strategy 2: find "  )\n}" at the very end
    if content.rstrip().endswith("}\n") or content.rstrip().endswith("}"):
        stripped = content.rstrip()
        # Find last occurrence of )\n}
        idx = stripped.rfind("\n  )\n}")
        if idx != -1:
            content = stripped[:idx] + "\n" + block + stripped[idx:]
            log("  Вставлено перед закрытием компонента")
            return content
        # Find last </div>
        idx = stripped.rfind("</div>")
        if idx != -1:
            content = stripped[:idx] + block + "\n" + stripped[idx:]
            log("  Вставлено перед последним </div>")
            return content
    
    # Last resort: just append before the last line
    lines = content.rstrip().split("\n")
    lines.insert(-1, block)
    content = "\n".join(lines)
    log("  Вставлено в конец файла")
    return content


def validate_tsx(content, slug):
    required = [
        "export default function",
        "import Link",
        "canonical",
        "Товары из этой статьи",
    ]
    for check in required:
        if check not in content:
            log("  FAIL валидация: нет '{}' в {}".format(check, slug))
            return False
    if re.search(r'\{<[A-Z]', content):
        log("  FAIL валидация: найден {<Link в {}".format(slug))
        return False
    log("  OK валидация: {}".format(slug))
    return True


def generate_blog_article(topic):
    slug = topic["slug"]
    title = topic["title"]
    keywords = topic["keywords"]
    products = topic["products"]
    p0, p1, p2 = products[0], products[1], products[2]

    prompt = (
        "Ты SEO-копирайтер магазина плитки Cersanit в Санкт-Петербурге.\n"
        "Напиши статью блога на русском языке в формате Next.js TSX.\n\n"
        "ТЕМА: {title}\n"
        "КЛЮЧЕВЫЕ СЛОВА: {kw}\n"
        "SLUG: {slug}\n\n"
        "ТРЕБОВАНИЯ:\n"
        "1. Только TSX код — никаких пояснений и markdown\n"
        "2. Начни файл с: import type {{ Metadata }} from \"next\"\n"
        "3. Добавь: const SITE_URL = \"https://cersanit-spb.ru\"\n"
        "4. canonical: `${{SITE_URL}}/blog/{slug}`\n"
        "5. openGraph с title, description, url, siteName, locale, type\n"
        "6. Статья 1500+ слов, минимум 5 секций h2\n"
        "7. Упомяни Санкт-Петербург, Янино, официальный дилер Cersanit\n"
        "8. export default function Article()\n"
        "9. Не используй синтаксис {{<Component>}}\n"
    ).format(title=title, kw=keywords, slug=slug)

    log("  Генерирую статью: {}".format(slug))
    content = call_claude(prompt)

    # Clean markdown fences
    content = re.sub(r'^```[a-z]*\n?', '', content.strip())
    content = re.sub(r'\n?```$', '', content.strip())

    # Always inject products block
    content = force_inject_products(content, products)

    return content


def update_blog_index(slug, title):
    blog_index = REPO_ROOT / "app" / "blog" / "page.tsx"
    if not blog_index.exists():
        return
    content = blog_index.read_text(encoding="utf-8")
    if slug in content:
        return
    today = datetime.now().strftime("%Y-%m-%d")
    entry = '  {{ href: "/blog/{}", title: "{}", desc: "Читайте на нашем сайте.", date: "{}", time: "5 мин" }},\n'.format(
        slug, title, today
    )
    content = content.replace(
        "]\n\nexport default function BlogIndex",
        entry + "]\n\nexport default function BlogIndex"
    )
    blog_index.write_text(content, encoding="utf-8")
    log("  {} добавлен в blog/page.tsx".format(slug))


def update_sitemap(slug):
    sitemap = REPO_ROOT / "app" / "sitemap.ts"
    if not sitemap.exists():
        return
    content = sitemap.read_text(encoding="utf-8")
    if slug in content:
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
        log("=" * 50)
        log("ГОТОВО: /blog/{}".format(slug))
        log("=" * 50)

    except urllib.error.HTTPError as e:
        log("HTTP ошибка: {} {}".format(e.code, e.reason))
        log(e.read().decode("utf-8")[:300])
        sys.exit(1)
    except Exception as e:
        log("Ошибка: {}".format(e))
        import traceback
        log(traceback.format_exc())
        sys.exit(1)


if __name__ == "__main__":
    main()
