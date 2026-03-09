import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://cersanit-spb.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

export const metadata: Metadata = {
  title: "Керамогранит под мрамор Cersanit купить в СПб — полированный | Дом Плитки",
  description: "Керамогранит под мрамор Cersanit в Санкт-Петербурге. Коллекции Calacatta, Thassos, Neve, Crema, Deep Calacatta. Полированный, ректификат. Склад Янино, доставка по СПб от 1 дня.",
  alternates: { canonical: `${SITE_URL}/keramogranit-pod-mramor-spb` },
  openGraph: {
    title: "Керамогранит под мрамор Cersanit в СПб — полированный ректификат",
    description: "Роскошный вид мрамора без его цены и капризности. Склад Янино, доставка от 1 дня.",
    url: `${SITE_URL}/keramogranit-pod-mramor-spb`,
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  { q: "Чем керамогранит под мрамор лучше натурального мрамора?", a: "Натуральный мрамор — капризный материал: впитывает пятна, трескается при нагрузках, требует ежегодной пропитки. Керамогранит Cersanit под мрамор выглядит так же эффектно, но не боится кислот, вина и кофе, не требует ухода, в 3–5 раз дешевле и не скользит при намокании (матовые варианты)." },
  { q: "Какие коллекции Cersanit имитируют мрамор?", a: "Calacatta — классический белый мрамор с золотыми прожилками, формат 29,8×59,8 см. Deep Calacatta, Gold Venice, Classy Marble — крупный формат 60×120 см, эффект люкс. Thassos — белоснежный полированный, 60×120 см. Crema — бежевый мрамор. Nero — чёрный полированный. Silvia — белый и бежевый, доступная цена от 844 ₽/м²." },
  { q: "Полированный или матовый керамогранит под мрамор — что выбрать?", a: "Полированный — максимальный блеск, роскошный вид, визуально увеличивает пространство. Подходит для стен и зон с небольшой нагрузкой. Матовый — практичнее для пола: не скользит, не показывает следы ног. Для большинства жилых помещений рекомендуем полированный на стены + матовый на пол." },
  { q: "Как быстро доставите в СПб?", a: "Доставка по СПб и ЛО — 1–2 рабочих дня. Самовывоз из Янино бесплатный. Пн-Пт 10:00–16:45. Бесплатно рассчитаем количество по площади вашего помещения." },
]

export default function MramorPage() {
  const items = products
    .filter(p => p.slug && p.product_type === "Керамогранит" && p.design === "Мрамор")
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
            <span className="text-foreground font-medium">Керамогранит под мрамор</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Керамогранит под мрамор Cersanit в Санкт-Петербурге</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">{items.length} позиций в наличии на складе в Янино. Роскошный вид мрамора — практичность керамогранита. От {Math.min(...items.map(p => p.price_retail))} ₽/м².</p>
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
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Керамогранит под мрамор — {items.length} позиций</h2>
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
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Роскошь мрамора без его недостатков</h2>
            <p className="text-foreground/80 leading-relaxed">Натуральный мрамор — красиво, но дорого и капризно. Керамогранит Cersanit под мрамор воспроизводит рисунок прожилок с фотографической точностью благодаря технологии цифровой печати. При этом материал не впитывает пятна, выдерживает механические нагрузки, не требует ежегодной пропитки и стоит в разы дешевле натурального камня.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Коллекции Cersanit под мрамор</h2>
            <p className="text-foreground/80 leading-relaxed"><strong>Calacatta</strong> — классика жанра: белый фон, золотисто-серые прожилки, 29,8×59,8 см. <strong>Deep Calacatta и Gold Venice</strong> — крупный формат 60×120 см, максимальный эффект. <strong>Thassos</strong> — белоснежный полированный, 60×120 и 60×60 см. <strong>Nero</strong> — чёрный полированный для смелых решений. <strong>Silvia</strong> — белый и бежевый, самая доступная цена от 844 ₽/м². Все с ректификатом — швы от 1,5 мм.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Где применяется?</h2>
            <p className="text-foreground/80 leading-relaxed">Ванная комната — главное применение: стены, пол, ниши. Гостиная — акцентная стена или сплошное покрытие пола. Холл и прихожая — создаёт ощущение роскоши с первого шага. Кухня — рабочий фартук под мрамор без риска пятен. Коридоры и лестничные зоны в частных домах.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Купить в Санкт-Петербурге</h2>
            <p className="text-foreground/80 leading-relaxed">Склад в Янино-1 (15–20 мин от КАД). Самовывоз бесплатный на следующий рабочий день. Доставка по СПб и ЛО 1–2 рабочих дня. Поможем рассчитать количество и подобрать коллекцию под ваш интерьер — звоните.</p>
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
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Подберём керамогранит под ваш интерьер</h2>
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
      {/* Полезные статьи */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Link href="/blog/plitka-pod-mramor-v-interere" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Плитка под мрамор в интерьере</p>
                <p className="text-sm text-muted-foreground">Идеи оформления мрамором.</p>
              </Link>
              <Link href="/blog/kak-rezat-keramogranit" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как резать керамогранит</p>
                <p className="text-sm text-muted-foreground">Нарезка мраморного керамогранита.</p>
              </Link>
              <Link href="/blog/trendy-plitki-2025" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Тренды плитки 2025</p>
                <p className="text-sm text-muted-foreground">Мрамор в трендах 2025.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
