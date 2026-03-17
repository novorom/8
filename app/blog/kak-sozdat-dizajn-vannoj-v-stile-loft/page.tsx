import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://plitki-spb.ru"

export const metadata: Metadata = {
  title: "Дизайн ванной в стиле лофт: плитка под бетон и кирпич | Плитки СПб",
  description: "Как создать ванную в стиле лофт: плитка под бетон, кирпич и металл. Лучшие коллекции разных брендов. Советы дизайна от магазина плитки в Янино, СПб.",
  alternates: { canonical: `${SITE_URL}/blog/kak-sozdat-dizajn-vannoj-v-stile-loft` },
  openGraph: {
    title: "Дизайн ванной в стиле лофт: плитка под бетон и кирпич",
    url: `${SITE_URL}/blog/kak-sozdat-dizajn-vannoj-v-stile-loft`,
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
            headline: "Дизайн ванной в стиле лофт: плитка под бетон и кирпич",
            description: "Как создать ванную в стиле лофт с плиткой под бетон, кирпич и металл.",
            publisher: { "@type": "Organization", name: "Плитки СПб", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}/blog/kak-sozdat-dizajn-vannoj-v-stile-loft`,
            datePublished: "2025-10-15",
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
            <span className="text-foreground font-medium">Дизайн ванной в стиле лофт</span>
          </nav>
        </div>
      </div>

      <div className="p-5 bg-primary/5 border-b border-primary/10">
        <div className="mx-auto max-w-3xl flex flex-wrap gap-2">
          <Link href="/plitka-pod-beton-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка под бетон в СПб</Link>
          <Link href="/plitka-seraya-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Серая плитка</Link>
          <Link href="/plitka-dlya-vannoj-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для ванной</Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">7 минут чтения · Дизайн интерьера</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            Ванная в стиле лофт: как выбрать плитку под бетон и кирпич
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Лофт в ванной — это баланс между индустриальной грубостью и современным комфортом.
            Разбираем какую плитку выбрать, как комбинировать и какие бренды дают лучший результат.
          </p>
        </header>

        <div className="flex flex-col gap-8 text-foreground/80">
          {[
            {
              title: "Главные элементы лофта в ванной",
              text: "Лофт строится на трёх китах: фактурные поверхности (бетон, кирпич, металл), нейтральная палитра (серый, чёрный, белый, терракота) и открытая геометрия. В ванной к этому добавляется влагостойкость. Плитка — идеальный материал: имитирует любую фактуру, не боится влаги, легко моется. Стекло, открытые трубы, металлические аксессуары завершают образ.",
            },
            {
              title: "Плитка под бетон: какие коллекции выбрать",
              text: "Для имитации бетона ищите плитку с мелким рельефом и неравномерным рисунком — это добавляет реалистичности. Лучшие варианты в нашем каталоге: Soft Concrete (Cersanit, 60×120, светло-серый, очень реалистичная текстура), Lofthouse (Cersanit, несколько форматов, тёмный и светлый варианты), коллекция Cement от Gracia Ceramica (300×900, хороший выбор оттенков). Для акцентной стены с контрастом попробуйте тёмный Concretehouse или Effecta.",
              link: "/plitka-pod-beton-spb",
              linkText: "Смотреть плитку под бетон в каталоге →",
            },
            {
              title: "Кирпич в ванной: акцент без перегруза",
              text: "Плитка под кирпич — классический лофт-приём. Главное правило: одна акцентная стена, остальные — нейтральный бетон или однотонная плитка. Красный кирпич даёт тепло и уют, белый — индустриальный минимализм, тёмный графитный — максималистский лофт. В нашем каталоге есть несколько вариантов имитации кирпича от разных брендов, уточните у менеджера — некоторые позиции меняются сезонно.",
            },
            {
              title: "Схемы комбинирования для ванной 4–8 м²",
              text: "Три рабочие схемы. Первая: светлый бетон на полу и двух стенах, белый кирпич на стене за раковиной — получается light loft, не тяжёлый. Вторая: тёмный бетон на полу, светлый на стенах, металлические аксессуары — строгий индустриальный. Третья: полностью серая плитка + мозаика в душевой зоне с металлическим отливом — самый современный вариант. В маленькой ванной (до 4 м²) избегайте слишком тёмной гаммы — светлый бетон визуально расширяет пространство.",
            },
            {
              title: "Форматы плитки для лофта",
              text: "Крупный формат 60×120 см создаёт монолитность и минимум швов — это лофт-эстетика в чистом виде. Для стен подходит 30×60 или 30×90 (вертикальная укладка добавляет высоту). Для пола в мокрых зонах — матовый керамогранит 60×60 или 45×90 с коэффициентом скольжения R10+. Мозаика 5×5 или 10×10 в душевой зоне — добавляет деталей без потери стиля.",
              link: "/blog/formaty-plitki",
              linkText: "Подробнее о форматах плитки →",
            },
            {
              title: "Аксессуары и свет — финальный штрих",
              text: "Плитка задаёт основу, аксессуары завершают образ. Для лофта: краны и смесители в матовом чёрном или нержавейке (не золото — это другой стиль), открытые полки из металлических труб или состаренного дерева, лампы-«эдисон» или настенные индустриальные светильники. Зеркало в металлической раме вместо стандартного. Избегайте декора в пастельных тонах — это разрушает концепцию.",
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
            <p className="font-semibold text-foreground mb-2">Подберём плитку для ванной лофт бесплатно</p>
            <p className="text-muted-foreground text-sm mb-4">Покажите фото или опишите задачу — предложим варианты из наличия на складе Янино</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/plitka-dlya-vannoj-spb" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                Каталог для ванной →
              </Link>
              <a href="https://t.me/flyroman" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-background font-medium text-sm hover:bg-accent transition-colors"
                style={{ color: "#2AABEE" }}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.01 9.47c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.16 14.26l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.326z"/></svg>
                Написать в Telegram
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/trendy-plitki-2025" className="text-primary hover:underline text-sm">→ Тренды плитки 2025–2026</Link>
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="text-primary hover:underline text-sm">→ Как выбрать плитку для ванной</Link>
              <Link href="/blog/formaty-plitki" className="text-primary hover:underline text-sm">→ Форматы плитки: как не ошибиться с размером</Link>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <h3 className="text-base font-semibold text-foreground mb-4">Плитка под бетон из наличия</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href="/catalog/mozaika-lofthouse-seryy-28x25" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/1d7/LS6O096.jpg&w=300&output=webp&q=80" alt="Мозаика Lofthouse серый 28x25" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <span className="text-xs text-muted-foreground line-clamp-2">Мозаика Lofthouse серый 28×25 (Cersanit)</span>
                <span className="mt-2 block text-base font-bold text-foreground">1680 ₽/м²</span>
              </div>
            </Link>
            <Link href="/catalog/keramogranit-soft-concrete-svetlo-seryy-60x120" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/068/gcqu8u24rft50mgxzpbijnh33k074vg0/A17122_01.jpg&w=300&output=webp&q=80" alt="Керамогранит Soft Concrete 60x120" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <span className="text-xs text-muted-foreground line-clamp-2">Soft Concrete 60×120 (Cersanit)</span>
                <span className="mt-2 block text-base font-bold text-foreground">2213 ₽/м²</span>
              </div>
            </Link>
            <Link href="/catalog/plitka-deco-chernyy-30x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/b22/DEL232.jpg&w=300&output=webp&q=80" alt="Плитка Deco черный 30x60" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <span className="text-xs text-muted-foreground line-clamp-2">Deco черный 30×60 (Cersanit)</span>
                <span className="mt-2 block text-base font-bold text-foreground">750 ₽/м²</span>
              </div>
            </Link>
          </div>
          <Link href="/plitka-pod-beton-spb" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Все варианты плитки под бетон →</Link>
        </section>
      </article>
    </div>
  )
}
