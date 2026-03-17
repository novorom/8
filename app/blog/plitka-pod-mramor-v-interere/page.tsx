import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://plitki-spb.ru"

export const metadata: Metadata = {
  title: "Плитка под мрамор: лучшие коллекции 2025–2026 в СПб | Плитки СПб",
  description: "Обзор лучшей плитки под мрамор 2025: Calacatta, Kerama Marazzi, Азори, Gracia Ceramica. Где купить в Санкт-Петербурге со склада. Цены от 650 ₽/м².",
  alternates: { canonical: `${SITE_URL}/blog/plitka-pod-mramor-v-interere` },
  openGraph: {
    title: "Плитка под мрамор: лучшие коллекции 2025–2026 в СПб",
    url: `${SITE_URL}/blog/plitka-pod-mramor-v-interere`,
    siteName: "Плитки СПб",
    locale: "ru_RU",
    type: "article",
  },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Плитка под мрамор: лучшие коллекции 2025–2026",
            description: "Сравнение лучших коллекций плитки под мрамор разных брендов с ценами.",
            publisher: { "@type": "Organization", name: "Плитки СПб", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}/blog/plitka-pod-mramor-v-interere`,
            datePublished: "2025-02-05",
            dateModified: "2026-03-17",
            author: { "@type": "Organization", name: "Плитки СПб" },
          }),
        }}
      />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-primary transition-colors">Блог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Плитка под мрамор в интерьере</span>
          </nav>
        </div>
      </div>

      <div className="p-5 bg-primary/5 border-b border-primary/10">
        <div className="mx-auto max-w-3xl flex flex-wrap gap-2">
          <Link href="/plitka-pod-mramor-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка под мрамор в СПб</Link>
          <Link href="/keramogranit-pod-mramor-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит под мрамор</Link>
          <Link href="/plitka-belaya-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Белая плитка в СПб</Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">8 минут чтения · Выбор материала</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            Плитка под мрамор в интерьере: лучшие коллекции 2025–2026
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Мраморный дизайн — вне времени. Сравниваем лучшие коллекции разных брендов, 
            которые есть в наличии на складе в Янино: от 650 до 3500 ₽/м².
          </p>
        </header>

        <div className="flex flex-col gap-8 text-foreground/80">
          {[
            {
              title: "Почему керамика, а не натуральный мрамор",
              text: "Натуральный мрамор капризен: впитывает влагу, боится кислот (лимонный сок, уксус оставляют матовые пятна), царапается, требует полировки раз в несколько лет. Стоимость качественного мрамора — от 5000 ₽/м², укладка ещё плюс 30%. Керамическая имитация лишена этих недостатков: не боится бытовой химии, практически не царапается, мороза не пугается, и стоит 650–3500 ₽/м² в зависимости от бренда и качества печати.",
            },
            {
              title: "Calacatta (Cersanit) — доступная классика",
              text: "Коллекция Calacatta от Cersanit — самый популярный «мрамор» в нашем ассортименте. Формат 30×60 см, глянцевая и матовая версии, белый фон с тонкими золотисто-серыми прожилками. Цена — от 780 ₽/м², что делает её самой доступной мраморной плиткой в каталоге. Есть декоры с более насыщенным рисунком — Deep Calacatta с интенсивными золотыми жилками. Подходит для ванных и кухонь.",
              link: "/keramogranit-pod-mramor-spb",
              linkText: "Керамогранит Calacatta в каталоге →",
            },
            {
              title: "Kerama Marazzi — средний ценовой сегмент",
              text: "Kerama Marazzi выпускает несколько серий под мрамор в разных ценовых нишах. Скарлетт (900–1200 ₽/м²) — классический белый мрамор 30×60, матовая поверхность. Монте Тиберио (1200–1600 ₽/м²) — серый мрамор Барdiglio, полированная поверхность, очень реалистичная текстура. Лезань (1400–1800 ₽/м²) — тёплый бежевый травертин, крупный формат 60×60. Все три коллекции имеют версии для пола и стен в одном дизайне.",
              link: "/catalog?brand=Kerama+Marazzi",
              linkText: "Kerama Marazzi в каталоге →",
            },
            {
              title: "Gracia Ceramica — разнообразие мраморных текстур",
              text: "Gracia Ceramica делает акцент на разнообразии мраморных паттернов. В ассортименте более 30 коллекций с имитацией различных видов мрамора: от белоснежного Каррары до зелёного Верде и чёрного Неро. Формат 30×60, 60×60 и 60×120. Цены — 800–2000 ₽/м². Особенно стоит обратить внимание на коллекцию Carrara Premium (60×120, полированный) — один из лучших вариантов по соотношению цены и реалистичности рисунка.",
              link: "/catalog?brand=Gracia+Ceramica",
              linkText: "Gracia Ceramica в каталоге →",
            },
            {
              title: "Как выбрать плитку под мрамор: практические советы",
              text: "Во-первых, определитесь с зоной применения: для пола нужна плитка с матовой или структурированной поверхностью (коэффициент скольжения R9+), для стен — можно глянцевую. Во-вторых, учитывайте размер помещения: маленькие ванные (до 5 м²) лучше смотрятся с форматом 30×60, большие — 60×60 или 60×120. В-третьих, обратите внимание на «матч» — есть ли в коллекции версия для пола и стен из одной серии. Если есть — интерьер получится цельным.",
            },
            {
              title: "Сочетания мраморной плитки в интерьере",
              text: "Белый мрамор (Calacatta, Carrara) — сочетается с деревянными акцентами (дуб, орех), медью/золотом в аксессуарах, антрацитовой затиркой. Серый мрамор (Монте Тиберио, Барdiglio) — прекрасно работает с черной сантехникой, белыми стенами и нержавеющей сталью. Бежевый травертин — тёплый и уютный, сочетается с терракотой, деревом и бронзой. Во всех случаях не перегружайте интерьер: мрамор уже сам по себе декоративный материал.",
            },
          ].map((item) => (
            <section key={item.title}>
              <h2 className="text-xl font-bold text-foreground mb-3">{item.title}</h2>
              <p className="leading-relaxed mb-3">{item.text}</p>
              {item.link && (
                <Link href={item.link} className="text-primary text-sm hover:underline font-medium">
                  {item.linkText}
                </Link>
              )}
            </section>
          ))}

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="font-semibold text-foreground mb-2">Плитка под мрамор от 650 ₽/м² — на складе в Янино</p>
            <p className="text-muted-foreground text-sm mb-4">Cersanit, Kerama Marazzi, Gracia Ceramica — более 200 позиций</p>
            <Link
              href="/plitka-pod-mramor-spb"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Смотреть плитку под мрамор →
            </Link>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/kerama-marazzi-kollektsii" className="text-primary hover:underline text-sm">→ Плитка Kerama Marazzi: обзор коллекций</Link>
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="text-primary hover:underline text-sm">→ Как выбрать плитку для ванной комнаты</Link>
              <Link href="/blog/trendy-plitki-2025" className="text-primary hover:underline text-sm">→ Тренды плитки 2025: что выбирают дизайнеры</Link>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <h3 className="text-base font-semibold text-foreground mb-4">Популярные варианты из наличия</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href="/catalog/plitka-calacatta-belyy-30x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/77c/KTL051st.jpg&w=300&output=webp&q=80" alt="Плитка Calacatta белый 30x60" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <span className="text-xs text-muted-foreground line-clamp-2">Calacatta белый 30×60 (Cersanit)</span>
                <span className="mt-2 block text-base font-bold text-foreground">780 ₽/м²</span>
              </div>
            </Link>
            <Link href="/catalog/keramogranit-royal-stone-belyy-42x42" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/77d/RS4R052D_1.jpg&w=300&output=webp&q=80" alt="Керамогранит Royal Stone белый 42x42" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <span className="text-xs text-muted-foreground line-clamp-2">Royal Stone белый 42×42 (Cersanit)</span>
                <span className="mt-2 block text-base font-bold text-foreground">1122 ₽/м²</span>
              </div>
            </Link>
            <Link href="/catalog/keramogranit-gold-venice-belyy-60x120" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/0da/uefsnr25qfuu5b7khlor2mmc0oorecum/A17121_01.jpg&w=300&output=webp&q=80" alt="Керамогранит Gold Venice 60x120" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <span className="text-xs text-muted-foreground line-clamp-2">Gold Venice 60×120 (Cersanit)</span>
                <span className="mt-2 block text-base font-bold text-foreground">2213 ₽/м²</span>
              </div>
            </Link>
          </div>
          <Link href="/plitka-pod-mramor-spb" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Все варианты плитки под мрамор →</Link>
        </section>
      </article>
    </div>
  )
}
