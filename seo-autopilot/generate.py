#!/usr/bin/env python3
"""SEO Autopilot for cersanit-spb.ru — v7 with internal linking"""

import os, json, re, sys, urllib.request, urllib.error
from datetime import datetime
from pathlib import Path

SITE_URL = "https://cersanit-spb.ru"
REPO_ROOT = Path(__file__).parent.parent
TOPICS_FILE = Path(__file__).parent / "topics.json"
LOG_FILE = Path(__file__).parent / "autopilot.log"
MODEL = "claude-haiku-4-5-20251001"
MAX_TOKENS = 6000
API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

# All landing pages for automatic linking
ALL_LANDINGS = {
    "/plitka-dlya-vannoj-spb": "Плитка для ванной в СПб",
    "/plitka-dlya-kuhni-spb": "Плитка для кухни в СПб",
    "/plitka-dlya-prihozhej-spb": "Плитка для прихожей в СПб",
    "/plitka-dlya-balkona-spb": "Плитка для балкона в СПб",
    "/plitka-dlya-dushi-spb": "Плитка для душа в СПб",
    "/keramogranit-spb": "Керамогранит в СПб",
    "/keramogranit-pod-derevo-spb": "Керамогранит под дерево в СПб",
    "/keramogranit-pod-mramor-spb": "Керамогранит под мрамор в СПб",
    "/keramogranit-matovyy-spb": "Матовый керамогранит в СПб",
    "/keramogranit-60x120-spb": "Керамогранит 60x120 в СПб",
    "/keramogranit-60x60-spb": "Керамогранит 60x60 в СПб",
    "/keramogranit-45x90-spb": "Керамогранит 45x90 в СПб",
    "/plitka-pod-mramor-spb": "Плитка под мрамор в СПб",
    "/plitka-pod-derevo-spb": "Плитка под дерево в СПб",
    "/plitka-pod-beton-spb": "Плитка под бетон в СПб",
    "/plitka-pod-kamen-spb": "Плитка под камень в СПб",
    "/plitka-seraya-spb": "Серая плитка в СПб",
    "/plitka-belaya-spb": "Белая плитка в СПб",
    "/plitka-nastennaya-spb": "Настенная плитка в СПб",
    "/mozaika-spb": "Мозаика в СПб",
    "/plitka-30x60-spb": "Плитка 30x60 в СПб",
    "/magazin-plitki-spb": "Магазин плитки в СПб",
    "/plitka-yanino-spb": "Плитка со склада Янино",
}


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
    with urllib.request.urlopen(req, timeout=180) as resp:
        data = json.loads(resp.read())
    return data["content"][0]["text"]


def fix_imports(content):
    needed = [
        'import type { Metadata } from "next"',
        'import Link from "next/link"',
    ]
    first_import = content.find("import ")
    if first_import == -1:
        first_import = 0
    for line in needed:
        key = line.split(" from")[0]
        if key not in content:
            log("  Добавляю импорт: {}".format(line))
            content = content[:first_import] + line + "\n" + content[first_import:]
    return content


def fix_site_url(content, slug):
    if "SITE_URL" not in content:
        content = content.replace(
            'import Link from "next/link"\n',
            'import Link from "next/link"\n\nconst SITE_URL = "https://cersanit-spb.ru"\n',
            1
        )
    if "canonical" not in content:
        content = re.sub(
            r'(export const metadata[^{]*\{)',
            r'\1\n  alternates: { canonical: `' + SITE_URL + '/blog/' + slug + '` },',
            content, count=1
        )
    return content


def build_products_block(products):
    cls = "flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"
    rows = ""
    for p in products:
        rows += '\n              <Link href="/catalog/{}" className="{}">' \
                '<span className="text-foreground">{}</span>' \
                '<span className="text-primary font-medium ml-3">{} руб/м2</span>' \
                '</Link>'.format(p["slug"], cls, p["name"], p["price"])
    return (
        '          <div className="mt-8 p-5 rounded-xl bg-muted/50 border border-border">\n'
        '            <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>\n'
        '            <div className="flex flex-col gap-2">'
        + rows +
        '\n            </div>\n'
        '            <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог</Link>\n'
        '          </div>\n'
    )


def build_internal_links_block(related_landings):
    """Build internal linking block with related landing pages"""
    links = ""
    for href in related_landings:
        label = ALL_LANDINGS.get(href, href.replace("/", "").replace("-", " ").title())
        links += (
            '\n              <Link href="{}" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg'
            ' border border-border bg-background hover:border-primary/40 hover:bg-accent'
            ' transition-all text-sm text-foreground font-medium">{}</Link>'
        ).format(href, label)
    return (
        '          <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">\n'
        '            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>\n'
        '            <div className="flex flex-wrap gap-2">'
        + links +
        '\n            </div>\n'
        '          </div>\n'
    )



def strip_images(content):
    """Remove all image tags from generated content"""
    import re
    # Remove <img ...> tags
    content = re.sub(r'<img[^>]*/?>\s*', '', content)
    # Remove <Image ...> Next.js component (multiline)
    content = re.sub(r'<Image[^/]*/?>\s*', '', content)
    # Remove <figure>...</figure> blocks
    content = re.sub(r'<figure[^>]*>.*?</figure>', '', content, flags=re.DOTALL)
    # Remove empty divs left after image removal
    content = re.sub(r'<div[^>]*>\s*</div>', '', content)
    return content

def fix_truncation(content):
    stripped = content.rstrip()
    if stripped.endswith("}\n") or stripped.endswith("}"):
        if "  )\n}" in stripped or "  );\n}" in stripped:
            return content
    log("  Файл обрезан — восстанавливаю")
    closing_tags = ["</section>", "</div>", "</p>", "</ul>", "</li>"]
    last_pos = -1
    for tag in closing_tags:
        pos = stripped.rfind(tag)
        if pos > last_pos:
            last_pos = pos + len(tag)
    if last_pos > 0:
        content = stripped[:last_pos]
        content += "\n        </article>\n      </div>\n    </div>\n  )\n}"
        log("  Закрытие восстановлено")
    return content


def inject_products(content, products):
    if "Товары из этой статьи" in content:
        return content
    log("  Вставляю блок товаров")
    block = build_products_block(products)
    if "</article>" in content:
        content = content.replace("</article>", block + "        </article>", 1)
    elif "  )\n}" in content:
        idx = content.rfind("  )\n}")
        content = content[:idx] + "\n" + block + content[idx:]
    else:
        lines = content.rstrip().split("\n")
        lines.insert(-1, block)
        content = "\n".join(lines)
    return content


def inject_internal_links(content, related_landings):
    """Inject internal links block before products block"""
    if not related_landings:
        return content
    if "По теме" in content:
        log("  Блок перелинковки уже есть")
        return content

    log("  Вставляю блок перелинковки -> {}".format(related_landings))
    block = build_internal_links_block(related_landings)

    # Insert before products block
    marker = '          <div className="mt-8 p-5 rounded-xl bg-muted/50'
    if marker in content:
        content = content.replace(marker, block + "          " + marker[10:], 1)
    elif "</article>" in content:
        content = content.replace("</article>", block + "        </article>", 1)
    return content


def validate_tsx(content, slug):
    required = {
        "import Link": "import Link",
        "canonical": "canonical",
        "export default function": "export default function",
        "Товары из этой статьи": "блок товаров",
        "По теме": "блок перелинковки",
    }
    ok = True
    for check, label in required.items():
        if check not in content:
            log("  FAIL: нет '{}'".format(label))
            ok = False
    stripped = content.rstrip()
    if not (stripped.endswith("}") or stripped.endswith(">")):
        log("  FAIL: файл обрезан")
        ok = False
    return ok


def generate_blog_article(topic):
    slug = topic["slug"]
    title = topic["title"]
    keywords = topic["keywords"]
    products = topic["products"]
    related_landings = topic.get("related_landings", [])

    prompt = (
        "Напиши статью для блога магазина плитки Cersanit (Санкт-Петербург).\n"
        "Формат: Next.js TSX. ТОЛЬКО КОД, без markdown, без пояснений.\n\n"
        "ТЕМА: {title}\n"
        "КЛЮЧЕВЫЕ СЛОВА: {kw}\n"
        "SLUG: {slug}\n\n"
        "ТОЧНАЯ СТРУКТУРА ФАЙЛА:\n\n"
        'import type {{ Metadata }} from "next"\n'
        'import Link from "next/link"\n'
        'import {{ ChevronRight }} from "lucide-react"\n\n'
        'const SITE_URL = "https://cersanit-spb.ru"\n\n'
        "export const metadata: Metadata = {{\n"
        '  title: "ЗАГОЛОВОК | Дом Плитки СПб",\n'
        '  description: "ОПИСАНИЕ 150-160 символов",\n'
        "  alternates: {{ canonical: `${{SITE_URL}}/blog/{slug}` }},\n"
        "  openGraph: {{ title: \"...\", url: `${{SITE_URL}}/blog/{slug}`, siteName: \"Дом Плитки CERSANIT\", locale: \"ru_RU\", type: \"article\" }},\n"
        "}}\n\n"
        "export default function Article() {{\n"
        "  return (\n"
        "    <div className=\"min-h-screen bg-background\">\n"
        "      <article className=\"mx-auto max-w-4xl px-4 py-10\">\n"
        "        <h1 className=\"text-3xl font-bold mb-6\">ЗАГОЛОВОК</h1>\n"
        "        [СТАТЬЯ: 5 секций h2, каждая 150-200 слов]\n"
        "        [Упомяни: Санкт-Петербург, Янино, официальный дилер Cersanit]\n"
        "      </article>\n"
        "    </div>\n"
        "  )\n"
        "}}\n\n"
        "ВАЖНО:\n"
        "- Статья на русском языке\n"
        "- НЕ добавляй блок товаров и блок ссылок — я добавлю их сам\n"
        "- Закончи файл точно на символе }} \n"
        "- Не используй синтаксис {{<Component>}}\n"
        "- НЕ добавляй теги <img>, <Image>, <figure> — статья без фото\n"
    ).format(title=title, kw=keywords, slug=slug)

    log("  Генерирую статью: {}".format(slug))
    content = call_claude(prompt)

    content = re.sub(r'^```[a-z]*\n?', '', content.strip())
    content = re.sub(r'\n?```$', '', content.strip())

    content = strip_images(content)
    content = fix_truncation(content)
    content = fix_imports(content)
    content = fix_site_url(content, slug)
    content = inject_products(content, products)
    content = inject_internal_links(content, related_landings)

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
        r'("blog/kak-vybrat-plitku-dlya-prihozhej",)',
        r'\1\n    "blog/' + slug + '",',
        content
    )
    sitemap.write_text(content, encoding="utf-8")
    log("  {} добавлен в sitemap.ts".format(slug))


def main():
    log("=" * 50)
    log("SEO АВТОПИЛОТ v7 — с перелинковкой")
    log("=" * 50)

    if not API_KEY:
        log("ANTHROPIC_API_KEY не задан")
        sys.exit(1)

    topics = json.loads(TOPICS_FILE.read_text(encoding="utf-8"))
    next_topic = next((t for t in topics["blog"] if not t.get("used")), None)

    if not next_topic:
        log("Все темы использованы!")
        sys.exit(0)

    slug = next_topic["slug"]
    log("Тема: {}".format(next_topic["title"]))
    log("Перелинковка: {}".format(next_topic.get("related_landings", [])))

    try:
        tsx_content = generate_blog_article(next_topic)

        if not validate_tsx(tsx_content, slug):
            log("Файл не прошёл валидацию. Отменено.")
            sys.exit(1)

        article_dir = REPO_ROOT / "app" / "blog" / slug
        article_dir.mkdir(parents=True, exist_ok=True)
        article_file = article_dir / "page.tsx"
        article_file.write_text(tsx_content, encoding="utf-8")
        log("Сохранён: {}".format(article_file))

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
