#!/usr/bin/env python3
"""
SEO Автопилот для cersanit-spb.ru
Генерирует статьи блога и SEO лендинги через Claude API
Запускается GitHub Actions каждый понедельник в 09:00 МСК
"""

import os
import json
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path

# ─── CONFIG ────────────────────────────────────────────────────────────
API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
SITE_URL = "https://cersanit-spb.ru"
REPO_ROOT = Path(__file__).parent.parent
TOPICS_FILE = Path(__file__).parent / "topics.json"
LOG_FILE = Path(__file__).parent / "autopilot.log"
MODEL = "claude-haiku-4-5-20251001"
MAX_TOKENS = 4000

# ─── LOGGING ───────────────────────────────────────────────────────────
def log(msg: str):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")

# ─── CLAUDE API ────────────────────────────────────────────────────────
def call_claude(prompt: str) -> str:
    if not API_KEY:
        raise ValueError("ANTHROPIC_API_KEY не задан")
    
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

# ─── VALIDATION ────────────────────────────────────────────────────────
def validate_tsx(content: str, slug: str) -> bool:
    """Базовая проверка валидности TSX файла"""
    checks = [
        ("export default function", "export default function" in content),
        ("return (", "return (" in content),
        ("</div>", "</div>" in content),
        ("import Link", "import Link" in content),
        ("SITE_URL", "SITE_URL" in content),
        ("canonical", "canonical" in content),
        ("Товары из этой статьи", "Товары из этой статьи" in content),
    ]
    
    for name, ok in checks:
        if not ok:
            log(f"  ❌ Валидация провалена: нет '{name}' в {slug}")
            return False
    
    # Проверяем что нет голых JSX-выражений типа {<Link>
    if re.search(r'\{<[A-Z]', content):
        log(f"  ❌ Валидация провалена: найден синтаксис {{<Link в {slug}")
        return False
    
    log(f"  ✅ Валидация пройдена: {slug}")
    return True

# ─── BLOG ARTICLE GENERATOR ────────────────────────────────────────────
def generate_blog_article(topic: dict) -> str:
    slug = topic["slug"]
    title = topic["title"]
    keywords = topic["keywords"]
    products = topic["products"]
    
    products_list = "\n".join([
        f'- {p["name"]}: slug={p["slug"]}, цена={p["price"]}₽/м²'
        for p in products
    ])
    
    prompt = f"""Ты SEO-копирайтер для интернет-магазина плитки Cersanit в Санкт-Петербурге.

Напиши статью блога в формате Next.js TSX. Строго следуй шаблону ниже.

ТЕМА: {title}
КЛЮЧЕВЫЕ СЛОВА: {keywords}
SLUG: {slug}
ТОВАРЫ ДЛЯ БЛОКА В КОНЦЕ:
{products_list}

СТРОГИЙ ШАБЛОН TSX (не отступай от структуры):

```tsx
import type {{ Metadata }} from "next"
import Link from "next/link"
import {{ ChevronRight }} from "lucide-react"

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {{
  title: "ЗАГОЛОВОК | Дом Плитки СПб",
  description: "ОПИСАНИЕ 150-160 символов с ключевыми словами и Санкт-Петербург",
  alternates: {{ canonical: `${{SITE_URL}}/blog/{slug}` }},
  openGraph: {{
    title: "ЗАГОЛОВОК",
    description: "КОРОТКОЕ ОПИСАНИЕ",
    url: `${{SITE_URL}}/blog/{slug}`,
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "article",
  }},
}}

export default function Article() {{
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-primary transition-colors">Блог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">КРАТКИЙ ЗАГОЛОВОК</span>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-10 lg:py-14">
        <article className="flex flex-col gap-8">
          <header>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <span>X мин чтения</span>
              <span>·</span>
              <span>КАТЕГОРИЯ</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
              ПОЛНЫЙ ЗАГОЛОВОК СТАТЬИ
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ВВОДНЫЙ АБЗАЦ 2-3 предложения
            </p>
          </header>
          <div className="flex flex-col gap-8 text-foreground/90 leading-relaxed">
            ВСЁ СОДЕРЖИМОЕ СТАТЬИ — минимум 5 секций с h2, абзацы, списки
            Каждая секция: <section><h2 className="text-2xl font-bold text-foreground mb-4">...</h2><p>...</p></section>
          </div>
          <div className="mt-4 border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/kak-ukladyvat-plitku" className="text-primary hover:underline text-sm">→ Укладка плитки своими руками</Link>
              <Link href="/blog/formaty-plitki" className="text-primary hover:underline text-sm">→ Форматы плитки</Link>
              <Link href="/keramogranit-spb" className="text-primary hover:underline text-sm">→ Каталог керамогранита</Link>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-muted/50 border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
            <div className="flex flex-col gap-2">
              СЮДА СТАВЬ ССЫЛКИ НА ТОВАРЫ — по одной на строку, без фигурных скобок снаружи:
              <Link href="/catalog/{products[0]['slug']}" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">{products[0]['name']}</span><span className="text-primary font-medium ml-3">{products[0]['price']} ₽/м²</span></Link>
              <Link href="/catalog/{products[1]['slug']}" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">{products[1]['name']}</span><span className="text-primary font-medium ml-3">{products[1]['price']} ₽/м²</span></Link>
              <Link href="/catalog/{products[2]['slug']}" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">{products[2]['name']}</span><span className="text-primary font-medium ml-3">{products[2]['price']} ₽/м²</span></Link>
            </div>
            <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
          </div>
        </article>
      </div>
    </div>
  )
}}
```

ВАЖНО:
1. Напиши готовый TSX файл — только код, никаких пояснений
2. Статья должна быть 1500-2000 слов полезного контента
3. Упомяни Санкт-Петербург, Янино, официальный дилер Cersanit
4. НЕ используй синтаксис {{<Link>}} — только <Link> без фигурных скобок снаружи
5. Все три товара вставь точно как показано в шаблоне
"""

    log(f"  Генерирую статью: {slug}")
    content = call_claude(prompt)
    
    # Clean up markdown code blocks if present
    content = re.sub(r'^```tsx?\n?', '', content.strip())
    content = re.sub(r'\n?```$', '', content.strip())
    
    return content

# ─── UPDATE BLOG INDEX ──────────────────────────────────────────────────
def update_blog_index(slug: str, title: str):
    """Добавляет новую статью в app/blog/page.tsx"""
    blog_index = REPO_ROOT / "app" / "blog" / "page.tsx"
    
    if not blog_index.exists():
        log("  ⚠️ blog/page.tsx не найден, пропускаем")
        return
    
    content = blog_index.read_text(encoding="utf-8")
    
    # Check if already exists
    if slug in content:
        log(f"  ℹ️ {slug} уже есть в blog/page.tsx")
        return
    
    # Add new article to articles array
    today = datetime.now().strftime("%Y-%m-%d")
    new_entry = f'  {{ href: "/blog/{slug}", title: "{title}", desc: "Читайте на нашем сайте.", date: "{today}", time: "5 мин" }},'
    
    # Insert before the closing bracket of articles array
    content = content.replace(
        "]\n\nexport default function BlogIndex",
        f"  {new_entry}\n]\n\nexport default function BlogIndex"
    )
    
    blog_index.write_text(content, encoding="utf-8")
    log(f"  ✅ {slug} добавлен в blog/page.tsx")

# ─── UPDATE SITEMAP ─────────────────────────────────────────────────────
def update_sitemap(slug: str, page_type: str = "blog"):
    """Добавляет новую страницу в sitemap.ts"""
    sitemap = REPO_ROOT / "app" / "sitemap.ts"
    
    if not sitemap.exists():
        log("  ⚠️ sitemap.ts не найден")
        return
    
    content = sitemap.read_text(encoding="utf-8")
    
    if slug in content:
        log(f"  ℹ️ {slug} уже есть в sitemap.ts")
        return
    
    if page_type == "blog":
        # Find last blog entry and insert after it
        content = re.sub(
            r'("blog/trendy-plitki-2025",)',
            f'\\1\n    "blog/{slug}",',
            content
        )
    
    sitemap.write_text(content, encoding="utf-8")
    log(f"  ✅ {slug} добавлен в sitemap.ts")

# ─── MAIN ───────────────────────────────────────────────────────────────
def main():
    log("=" * 50)
    log("SEO АВТОПИЛОТ ЗАПУЩЕН")
    log("=" * 50)
    
    if not API_KEY:
        log("❌ ANTHROPIC_API_KEY не задан. Выход.")
        sys.exit(1)
    
    # Load topics
    topics = json.loads(TOPICS_FILE.read_text(encoding="utf-8"))
    
    # Find next unused blog topic
    next_topic = next((t for t in topics["blog"] if not t.get("used")), None)
    
    if not next_topic:
        log("⚠️ Все темы использованы! Добавьте новые в topics.json")
        sys.exit(0)
    
    slug = next_topic["slug"]
    log(f"📝 Тема: {next_topic['title']}")
    
    try:
        # Generate article
        tsx_content = generate_blog_article(next_topic)
        
        # Validate
        if not validate_tsx(tsx_content, slug):
            log(f"❌ Файл не прошёл валидацию. Публикация отменена.")
            sys.exit(1)
        
        # Save file
        article_dir = REPO_ROOT / "app" / "blog" / slug
        article_dir.mkdir(parents=True, exist_ok=True)
        article_file = article_dir / "page.tsx"
        article_file.write_text(tsx_content, encoding="utf-8")
        log(f"✅ Файл сохранён: {article_file}")
        
        # Update blog index
        update_blog_index(slug, next_topic["title"])
        
        # Update sitemap
        update_sitemap(slug, "blog")
        
        # Mark topic as used
        next_topic["used"] = True
        TOPICS_FILE.write_text(
            json.dumps(topics, ensure_ascii=False, indent=2),
            encoding="utf-8"
        )
        log(f"✅ Тема помечена как использованная")
        
        log("=" * 50)
        log(f"🎉 ГОТОВО! Статья: /blog/{slug}")
        log("=" * 50)
        
    except urllib.error.HTTPError as e:
        log(f"❌ HTTP ошибка API: {e.code} {e.reason}")
        body = e.read().decode("utf-8")
        log(f"   Ответ: {body[:300]}")
        sys.exit(1)
    except Exception as e:
        log(f"❌ Ошибка: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
