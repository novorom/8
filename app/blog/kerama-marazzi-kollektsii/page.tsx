import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://plitki-spb.ru"

export const metadata: Metadata = {
  title: "Плитка Kerama Marazzi: обзор коллекций и цены в СПб | Плитки СПб",
  description: "Обзор лучших коллекций Kerama Marazzi: керамогранит, настенная плитка, мозаика. Где купить в Санкт-Петербурге со склада в Янино. Цены и характеристики.",
  alternates: { canonical: `${SITE_URL}/blog/kerama-marazzi-kollektsii` },
  openGraph: {
    title: "Плитка Kerama Marazzi: обзор коллекций и цены в СПб",
    url: `${SITE_URL}/blog/kerama-marazzi-kollektsii`,
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
            headline: "Плитка Kerama Marazzi: обзор коллекций и цены в Санкт-Петербурге",
            description: "Полный обзор коллекций Kerama Marazzi с ценами и характеристиками.",
            publisher: { "@type": "Organization", name: "Плитки СПб", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}/blog/kerama-marazzi-kollektsii`,
            datePublished: "2026-03-17",
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
            <span className="text-foreground font-medium">Kerama Marazzi: обзор коллекций</span>
          </nav>
        </div>
      </div>

      <div className="mt-0 p-5 bg-primary/5 border-b border-primary/10">
        <div className="mx-auto max-w-3xl flex flex-wrap gap-2">
          <Link href="/catalog?brand=Kerama+Marazzi" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Все товары Kerama Marazzi</Link>
          <Link href="/collections" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Коллекции плитки</Link>
          <Link href="/keramogranit-60x120-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит 60×120</Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">8 минут чтения · Обзор бренда</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            Плитка Kerama Marazzi: лучшие коллекции, цены и где купить в СПб
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Kerama Marazzi — крупнейший российский производитель керамической плитки и керамогранита. 
            Разбираем самые популярные коллекции, которые есть на складе в Янино.
          </p>
        </header>

        <div className="flex flex-col gap-8 text-foreground/80">
          {[
            {
              title: "Кто такие Kerama Marazzi",
              text: "Kerama Marazzi основана в 1996 году и сегодня является лидером российского рынка керамической плитки. Производство расположено в Орле, Новомосковске и Сызрани — это позволяет держать конкурентные цены и сокращать сроки поставки. В ассортименте более 3000 артикулов: от бюджетной плитки до дизайнерских коллекций в итальянском стиле. В нашем магазине Плитки СПб на складе в Янино представлено более 400 позиций Kerama Marazzi.",
            },
            {
              title: "Топ-коллекции для ванной комнаты",
              text: "Для ванной комнаты особенно популярны коллекции с имитацией мрамора: Скарлетт (белый мрамор, 30×60), Монте Тиберио (серый мрамор, 60×60) и Буонарроти (классический белый, 30×60). Все три коллекции имеют матчинг — напольную и настенную плитку из одной серии, что позволяет создать цельный интерьер без подбора. Коэффициент скольжения напольных версий соответствует R9, что безопасно для влажных зон.",
              link: "/plitka-dlya-vannoj-spb",
              linkText: "Плитка для ванной из наличия →",
            },
            {
              title: "Керамогранит под дерево: коллекция Сортино",
              text: "Сортино — один из флагманских продуктов Kerama Marazzi. Имитация состаренного дуба с рельефной поверхностью, формат 15×90 см. Подходит для укладки ёлочкой, что визуально увеличивает пространство. Производится в четырёх оттенках: натуральный, серый, бежевый и тёмный. Морозостойкость позволяет использовать на лоджиях. Цена — одна из самых доступных в этом сегменте.",
              link: "/plitka-pod-derevo-spb",
              linkText: "Плитка под дерево в каталоге →",
            },
            {
              title: "Большой формат: коллекции 60×120 и 60×120",
              text: "Для современных интерьеров с минимальным количеством швов Kerama Marazzi выпускает коллекции формата 60×120: Ардезия (имитация сланца), Ламира (под бетон) и Перфетто (однотонный матовый). Крупный формат укладывается быстрее, создаёт ощущение монолитного пола и визуально увеличивает комнату. На складе в Янино эти позиции всегда в наличии, заказ через сайт — доставка в течение 1–2 дней.",
              link: "/keramogranit-60x120-spb",
              linkText: "Керамогранит 60×120 →",
            },
            {
              title: "Мозаика Kerama Marazzi",
              text: "Мозаика Kerama Marazzi — один из самых разнообразных разделов ассортимента. Стеклянная мозаика на сетке 30×30, керамическая мозаика, мозаичные панно и бордюры. Коллекция Ньюпорт (морская тематика), Матрикс (геометрический рисунок), Мозаика ГС (классика) — более 50 вариантов для акцентных стен и фартуков. Мозаика отлично сочетается с плиткой из основных коллекций бренда.",
              link: "/mozaika-spb",
              linkText: "Мозаика в каталоге →",
            },
            {
              title: "Цены в 2025–2026 году",
              text: "Диапазон цен на плитку Kerama Marazzi в нашем магазине: базовые коллекции от 650 ₽/м², средний сегмент 900–1800 ₽/м², дизайнерские серии 2000–3500 ₽/м². Керамогранит в среднем на 20–40% дороже настенной плитки того же уровня. По сравнению с итальянскими и испанскими аналогами, Kerama Marazzi выигрывает по цене при сопоставимом качестве печати и прочности.",
            },
            {
              title: "Как купить Kerama Marazzi в Санкт-Петербурге",
              text: "Магазин Плитки СПб — склад в Янино-1 (Ленинградская область, 15–20 минут от КАД по Мурманскому шоссе). В наличии более 400 позиций Kerama Marazzi. Самовывоз бесплатный, доставка по СПб и ЛО от 1 рабочего дня. Можно приехать и посмотреть образцы вживую в шоуруме — менеджеры помогут подобрать коллекцию и рассчитать нужное количество с учётом подрезки.",
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
            <p className="font-semibold text-foreground mb-2">Более 400 позиций Kerama Marazzi на складе</p>
            <p className="text-muted-foreground text-sm mb-4">Янино-1, Ленинградская область · Самовывоз и доставка</p>
            <Link
              href="/catalog?brand=Kerama+Marazzi"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Открыть каталог Kerama Marazzi →
            </Link>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/trendy-plitki-2025" className="text-primary hover:underline text-sm">→ Тренды плитки 2025–2026: что выбирают дизайнеры</Link>
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="text-primary hover:underline text-sm">→ Как выбрать плитку для ванной комнаты</Link>
              <Link href="/blog/formaty-plitki" className="text-primary hover:underline text-sm">→ Форматы плитки: как выбрать правильный размер</Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
