import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: "Плитка для кухни: как выбрать для пола и фартука | Дом Плитки СПб",
  description: "Как выбрать плитку для кухонного пола и фартука: материал, цвет, скользкость, жаростойкость. Лучшие коллекции Cersanit для кухни. Примеры и цены.",
  alternates: { canonical: `${SITE_URL}/blog/plitka-dlya-kuhni-kak-vybrat` },
  openGraph: { title: "Плитка для кухни: как выбрать", url: `${SITE_URL}/blog/plitka-dlya-kuhni-kak-vybrat`, siteName: "Дом Плитки CERSANIT", locale: "ru_RU", type: "article" },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Плитка для кухни: как выбрать для пола и фартука",
        description: "Полный гид по выбору плитки для кухни.",
        publisher: { "@type": "Organization", name: "Дом Плитки CERSANIT", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/plitka-dlya-kuhni-kak-vybrat`,
        datePublished: "2025-03-05",
        author: { "@type": "Organization", name: "Дом Плитки CERSANIT" },
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-primary">Блог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Плитка для кухни</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">8 минут чтения · Советы по выбору</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Плитка для кухни: пол и фартук</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Кухня — самое эксплуатируемое место в доме. Разбираем требования к плитке и лучшие варианты из каталога Cersanit.</p>
        </header>

        <div className="flex flex-col gap-8 text-foreground/80">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Требования к плитке для кухни</h2>
            <ul className="flex flex-col gap-3 ml-4">
              <li>• <strong>Влагостойкость</strong> — на кухне постоянно влага от мойки, готовки. Все плитки Cersanit влагостойкие.</li>
              <li>• <strong>Жиростойкость</strong> — поверхность должна легко отмываться от жира. Матовые и полуполированные поверхности лучше скрывают пятна.</li>
              <li>• <strong>Механическая прочность пола</strong> — PEI 4–5 для зон с высокой нагрузкой. Керамогранит подходит идеально.</li>
              <li>• <strong>Нескользкий пол</strong> — класс скользкости R9 минимум. Рядом с мойкой — R10.</li>
              <li>• <strong>Термостойкость фартука</strong> — плитка за плитой должна выдерживать тепло. Керамическая плитка и керамогранит — без проблем.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Пол на кухне: что выбрать</h2>
            <p className="leading-relaxed mb-3">Лучший выбор — <strong>матовый керамогранит</strong>. Не скользит, скрывает следы, легко моется, долго служит.</p>
            <p className="leading-relaxed mb-3">Популярные варианты из каталога Cersanit:</p>
            <ul className="flex flex-col gap-2 ml-4">
              <li>• <strong>Lofthouse 29,7×59,8 см</strong> — серый камень, матовый, рельеф. Скрывает все следы. Отличный выбор для современной кухни.</li>
              <li>• <strong>Wood Concept 21,8×89,8 см</strong> — керамогранит под паркет. Тёплый вид, нескользкий, легко моется.</li>
              <li>• <strong>Colorwood 18×60 см</strong> — яркие оттенки под дерево, хорошо в скандинавских интерьерах.</li>
              <li>• <strong>Soft Concrete 60×120 см</strong> — для больших открытых кухонь. Серый бетон, минимализм.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Фартук: главная декоративная зона</h2>
            <p className="leading-relaxed mb-3">Фартук — от столешницы до нижнего края навесных шкафов, обычно 60–70 см. Иногда до потолка — для более цельного вида.</p>
            <p className="leading-relaxed mb-3"><strong>Что хорошо работает на фартуке:</strong></p>
            <ul className="flex flex-col gap-2 ml-4">
              <li>• Плитка под мрамор (Calacatta) — вечная классика, легко протирается</li>
              <li>• Плитка под бетон (Lofthouse) — трендовый лофт-стиль</li>
              <li>• Мозаика — создаёт акцент, визуально интересно</li>
              <li>• Длинная плитка 30×60 вертикально — визуально поднимает потолок</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Сочетание пола и фартука</h2>
            <div className="flex flex-col gap-4">
              {[
                { style: "Современная кухня в серых тонах", floor: "Soft Concrete 60×120 или Lofthouse 30×60", apron: "Lofthouse 30×60 или Deep Calacatta 60×120" },
                { style: "Светлая скандинавская кухня", floor: "Wood Concept Natural 22×90", apron: "Calacatta 30×60 или белая плитка вертикально" },
                { style: "Классическая белая кухня", floor: "Silvia белый 60×60", apron: "Calacatta 30×60 с вставками мозаики" },
                { style: "Яркая кухня-гостиная", floor: "Керамогранит под дерево 60×120", apron: "Мозаика Royal Stone как акцент" },
              ].map(item => (
                <div key={item.style} className="border border-border rounded-xl p-4">
                  <div className="font-semibold text-foreground mb-2">{item.style}</div>
                  <div className="text-sm text-muted-foreground">Пол: {item.floor}</div>
                  <div className="text-sm text-muted-foreground">Фартук: {item.apron}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="font-semibold text-foreground mb-2">Подберём плитку для вашей кухни</p>
            <p className="text-muted-foreground text-sm mb-4">Скажите стиль и размеры — предложим 2–3 варианта с расчётом</p>
            <a href="tel:+79052050900" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              +7 (905) 205-09-00
            </a>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/plitka-dlya-kuhni-spb" className="text-primary hover:underline text-sm">→ Каталог плитки для кухни</Link>
              <Link href="/blog/formaty-plitki" className="text-primary hover:underline text-sm">→ Какой формат плитки выбрать</Link>
              <Link href="/blog/skolko-plitki-nuzhno-kupit" className="text-primary hover:underline text-sm">→ Расчёт количества плитки</Link>
            </div>
          </div>
        </div>
      
              {/* Товары по теме */}
              <div className="mt-10 p-5 rounded-xl bg-muted/50 border border-border">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="flex flex-col gap-2">
                  {<Link key="/catalog/plitka-deco-chernyy-30x60" href="/catalog/plitka-deco-chernyy-30x60" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Плитка Deco черный рельеф 30x60</span><span className="text-primary font-medium ml-3">750 ₽/м²</span></Link>
                  <Link key="/catalog/plitka-blend-mnogotsvetnyy-30x60" href="/catalog/plitka-blend-mnogotsvetnyy-30x60" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Плитка Blend многоцветный 30x60</span><span className="text-primary font-medium ml-3">940 ₽/м²</span></Link>
                  <Link key="/catalog/keramogranit-lofthouse-svetlo-seryy-30x60" href="/catalog/keramogranit-lofthouse-svetlo-seryy-30x60" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Керамогранит Lofthouse 30x60</span><span className="text-primary font-medium ml-3">1017 ₽/м²</span></Link>}
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </div>
              </article>
    </div>
  )
}
