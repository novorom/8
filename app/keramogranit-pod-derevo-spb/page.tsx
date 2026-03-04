import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://cersanit-spb.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

export const metadata: Metadata = {
  title: "Керамогранит под дерево Cersanit купить в СПб — паркет без ухода | Дом Плитки",
  description: "Керамогранит под дерево Cersanit в Санкт-Петербурге. Коллекции Wood Concept, Northwood, Amberwood, Woodhouse. От 1098 ₽/м². В наличии на складе Янино. Доставка по СПб от 1 дня.",
  alternates: { canonical: `${SITE_URL}/keramogranit-pod-derevo-spb` },
  openGraph: {
    title: "Керамогранит под дерево Cersanit в СПб — от 1098 ₽/м²",
    description: "Реалистичная имитация дерева, прочность керамогранита. Склад Янино, доставка от 1 дня.",
    url: `${SITE_URL}/keramogranit-pod-derevo-spb`,
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  { q: "Чем керамогранит под дерево лучше ламината?", a: "Керамогранит не боится воды, не разбухает, не царапается и служит 30+ лет без замены. Идеален для ванной, кухни, прихожей, балкона. Современные коллекции Cersanit передают текстуру дерева настолько реалистично, что отличить от натурального дерева сложно даже вблизи." },
  { q: "Какие коллекции Cersanit имитируют дерево?", a: "Wood Concept Natural, Wood Concept Prime, Wood Concept Rustic — форматы 21,8x89,8 см и 29,7x59,8 см. Northwood и Amberwood — 18,5x59,8 см. Woodhouse — 29,7x59,8 см. Lofthouse под бетон-дерево — 29,7x59,8 см. Все имеют рельефную поверхность и ректификат для укладки с минимальным швом." },
  { q: "Как укладывать керамогранит под дерево — в ёлочку или параллельно?", a: "Укладка параллельно (как доски) — классика. Укладка в ёлочку (французская ёлочка или 45°) — более дорогой и эффектный вариант. При ёлочке нарезка увеличивает расход на 15-20%. Оба варианта отлично смотрятся с длинными форматами Cersanit." },
  { q: "Как быстро доставите в СПб?", a: "Доставка по СПб и ЛО — 1-2 рабочих дня. Самовывоз из Янино бесплатный. Пн-Пт 10:00-16:45. Бесплатно рассчитаем нужное количество по размерам вашего помещения." },
]

export default function DerevoPodPage() {
  const items = products
    .filter(p => p.slug && p.product_type === "Керамогранит" && p.design === "Дерево")
    .sort((a, b) => a.price_retail - b.price_retail)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Керамогранит под дерево</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Керамогранит под дерево Cersanit в Санкт-Петербурге</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">{items.length} позиций в наличии на складе в Янино. Реалистичная имитация дерева — прочность керамогранита. От {Math.min(...items.map(p => p.price_retail))} ₽/м².</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90 transition-colors">
              Смотреть товары <ChevronRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Керамогранит под дерево — {items.length} позиций</h2>
          <p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {items.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 4} />)}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 flex flex-col gap-8">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Почему керамогранит под дерево — лучший выбор?</h2>
            <p className="text-foreground/80 leading-relaxed">Керамогранит под дерево соединяет эстетику натурального паркета с практичностью керамики. Он не боится воды — подходит для ванной и кухни. Не царапается от мебели и каблуков. Не требует лакировки и специального ухода. Прослужит 30–50 лет без потери внешнего вида. Cersanit производит керамогранит под дерево с рельефной поверхностью, которая передаёт фактуру настоящего дерева — разрезы, сучки, волокна.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Коллекции Cersanit под дерево</h2>
            <p className="text-foreground/80 leading-relaxed"><strong>Wood Concept Natural, Prime, Rustic</strong> — три цветовые гаммы (бежевый, серый, тёмный) в формате 21,8×89,8 см. Идеально для спальни и гостиной. <strong>Northwood и Amberwood</strong> — тёплые оттенки дерева, формат 18,5×59,8 см. Отличный выбор для небольших помещений. <strong>Woodhouse</strong> — коричневые тона под массив, 29,7×59,8 см. Все коллекции с ректификатом — укладка с швом от 1,5 мм.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Где применяется?</h2>
            <p className="text-foreground/80 leading-relaxed">Гостиная и спальня — эффект паркета без ухода. Кухня — легко моется, не впитывает жир. Прихожая — выдерживает интенсивный трафик. Ванная — не скользит (рельефная поверхность), не разбухает. Балкон и лоджия — морозостойкость до -40°C. Можно укладывать с подогревом пола.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Купить в Санкт-Петербурге</h2>
            <p className="text-foreground/80 leading-relaxed">Склад в Янино-1 (15–20 мин от КАД). Самовывоз бесплатный на следующий рабочий день. Доставка по СПб и ЛО 1–2 рабочих дня. Бесплатный расчёт количества по размерам вашего помещения — позвоните нам.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-8">Частые вопросы</h2>
          <div className="max-w-3xl flex flex-col gap-4">
            {faq.map((item, i) => (
              <details key={i} className="group rounded-xl border border-border bg-card overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-medium hover:bg-muted/50">
                  <span className="pr-4">{item.q}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-4"><p className="text-foreground/80 leading-relaxed">{item.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Помогём подобрать керамогранит под ваш интерьер</h2>
          <p className="text-primary-foreground/80 text-lg mb-8">Бесплатная консультация и расчёт количества по размерам</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90">
              <Phone className="h-4 w-4" /> Позвонить
            </a>
            <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10">
              Весь каталог <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map(item => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a }
        }))
      })}} />
    </div>
  )
}
