import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
const SITE_URL = "https://cersanit-spb.ru"
export const metadata: Metadata = {
  title: "Тренды плитки 2025: что выбрать для ванной и кухни | Дом Плитки СПб",
  description: "Главные тренды керамической плитки и керамогранита в 2025 году: крупный формат, природные текстуры, нейтральные тона. Что в моде и как применить в интерьере.",
  alternates: { canonical: `${SITE_URL}/blog/trendy-plitki-2025` },
  openGraph: { title: "Тренды плитки 2025", url: `${SITE_URL}/blog/trendy-plitki-2025`, siteName: "Дом Плитки CERSANIT", locale: "ru_RU", type: "article" },
}
export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Тренды плитки 2025: что выбрать для ванной и кухни",
        description: "Обзор главных трендов керамики в 2025 году.",
        publisher: { "@type": "Organization", name: "Дом Плитки CERSANIT", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/trendy-plitki-2025`,
        datePublished: "2025-03-15",
        author: { "@type": "Organization", name: "Дом Плитки CERSANIT" },
      })}} />
      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-primary">Блог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Тренды плитки 2025</span>
          </nav>
        </div>
      </div>
      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">7 минут чтения · Тренды и дизайн</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Тренды плитки 2025: что выбирают дизайнеры</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">2025 год — это тотальный комфорт, природные материалы и крупный формат. Разбираем главные тенденции с примерами из каталога Cersanit.</p>
        </header>
        <div className="flex flex-col gap-8 text-foreground/80">
          {[
            {
              title: "1. Крупный формат 60×120 и больше",
              text: "Минимум швов, монолитный вид, ощущение роскоши — крупный формат продолжает доминировать. В 2025 это уже не роскошь, а стандарт для гостиных и просторных ванных. Коллекции Cersanit в формате 60×120: Deep Calacatta, Gold Venice, Soft Concrete, Silver Roots — все в наличии на складе.",
              link: "/keramogranit-60x120-spb",
              linkText: "Керамогранит 60×120 в каталоге →",
            },
            {
              title: "2. Природные текстуры: дерево, камень, бетон",
              text: "Желание окружить себя природными материалами в городской квартире — главный психологический тренд 2025. Керамогранит под дерево (Wood Concept, Northwood), под камень (Royal Stone, Lofthouse), под мрамор (Calacatta, Deep Calacatta) — всё это даёт природный вид без его недостатков: без ухода, без влагопоглощения, без царапин.",
              link: "/keramogranit-pod-derevo-spb",
              linkText: "Керамогранит под дерево →",
            },
            {
              title: "3. Нейтральная палитра — серый, бежевый, белый",
              text: "В 2025 возвращается интерес к сдержанной нейтральной палитре. Светло-серый (Soft Concrete, Polaris), тёплый бежевый (Travertino, Pamir), белый мрамор (Thassos, Neve) — это базовые тона, с которыми легко работать и которые не надоедают через год.",
              link: "/plitka-pod-mramor-spb",
              linkText: "Плитка под мрамор →",
            },
            {
              title: "4. Матовые поверхности вместо глянца",
              text: "Полированный керамогранит остаётся актуальным для люксового сегмента, но основной тренд — матовый и рельефный. Матовая поверхность практичнее: не видны следы пальцев и воды, не скользит. Коллекции Lofthouse, Wood Concept, Cambio — матовые с интересной текстурой.",
              link: "/keramogranit-spb",
              linkText: "Каталог керамогранита →",
            },
            {
              title: "5. Длинные форматы под паркет: 22×90 и 18×60",
              text: "Керамогранит в формате длинной доски имитирует дорогой паркет без его капризности. В 2025 особенно популярна укладка ёлочкой — создаёт динамичный, дизайнерский интерьер. Wood Concept Natural 21,8×89,8 см — топ продаж для этого сезона.",
              link: "/plitka-pod-derevo-spb",
              linkText: "Плитка под дерево →",
            },
            {
              title: "6. Единое покрытие пол-стены",
              text: "Один и тот же материал на полу и стенах создаёт визуальную цельность и 'бесконечное' пространство. Особенно популярно в душевых зонах без бортика. Lofthouse, Soft Concrete, Calacatta — коллекции, у которых есть позиции и для стен, и для пола.",
              link: "/plitka-dlya-vannoj-spb",
              linkText: "Плитка для ванной →",
            },
          ].map(item => (
            <section key={item.title}>
              <h2 className="text-xl font-bold text-foreground mb-3">{item.title}</h2>
              <p className="leading-relaxed mb-3">{item.text}</p>
              <Link href={item.link} className="text-primary text-sm hover:underline">{item.linkText}</Link>
            </section>
          ))}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="font-semibold text-foreground mb-2">Все трендовые коллекции в наличии</p>
            <p className="text-muted-foreground text-sm mb-4">193 позиции на складе Янино — доставка по СПб от 1 дня</p>
            <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              Перейти в каталог →
            </Link>
          </div>
          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/formaty-plitki" className="text-primary hover:underline text-sm">→ Форматы плитки: какой размер выбрать</Link>
              <Link href="/blog/keramogranit-ili-laminat" className="text-primary hover:underline text-sm">→ Керамогранит или ламинат</Link>
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="text-primary hover:underline text-sm">→ Как выбрать плитку для ванной</Link>
            </div>
          </div>
        </div>
      
              {/* Товары по теме */}
              <div className="mt-10 p-5 rounded-xl bg-muted/50 border border-border">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="flex flex-col gap-2">
                  {<Link key="/catalog/keramogranit-gold-venice-belyy-60x120" href="/catalog/keramogranit-gold-venice-belyy-60x120" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Керамогранит Gold Venice 60x120</span><span className="text-primary font-medium ml-3">2213 ₽/м²</span></Link>
                  <Link key="/catalog/plitka-calacatta-belyy-30x60-glyantsevaya" href="/catalog/plitka-calacatta-belyy-30x60-glyantsevaya" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Плитка Calacatta рельеф 30x60</span><span className="text-primary font-medium ml-3">795 ₽/м²</span></Link>
                  <Link key="/catalog/keramogranit-soft-concrete-svetlo-seryy-60x120" href="/catalog/keramogranit-soft-concrete-svetlo-seryy-60x120" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Керамогранит Soft Concrete 60x120</span><span className="text-primary font-medium ml-3">2213 ₽/м²</span></Link>}
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </div>
              </article>
    </div>
  )
}
