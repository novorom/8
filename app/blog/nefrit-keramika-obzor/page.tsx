import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://plitki-spb.ru"

export const metadata: Metadata = {
  title: "Плитка Нефрит-Керамика: коллекции, цены, где купить в СПб | Плитки СПб",
  description: "Обзор плитки Нефрит-Керамика: коллекции для ванной и кухни, цены, форматы. Купить Нефрит-Керамика в Санкт-Петербурге на складе в Янино. Доставка от 1 дня.",
  alternates: { canonical: `${SITE_URL}/blog/nefrit-keramika-obzor` },
  openGraph: {
    title: "Плитка Нефрит-Керамика: коллекции, цены, где купить в СПб",
    url: `${SITE_URL}/blog/nefrit-keramika-obzor`,
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
            headline: "Плитка Нефрит-Керамика: коллекции, цены, где купить в Санкт-Петербурге",
            description: "Обзор ассортимента Нефрит-Керамика с описанием коллекций и ценами.",
            publisher: { "@type": "Organization", name: "Плитки СПб", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}/blog/nefrit-keramika-obzor`,
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
            <span className="text-foreground font-medium">Нефрит-Керамика: обзор</span>
          </nav>
        </div>
      </div>

      <div className="p-5 bg-primary/5 border-b border-primary/10">
        <div className="mx-auto max-w-3xl flex flex-wrap gap-2">
          <Link href="/catalog?brand=Нефрит-Керамика" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Все товары Нефрит-Керамика</Link>
          <Link href="/plitka-dlya-vannoj-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для ванной</Link>
          <Link href="/plitka-nastennaya-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Настенная плитка</Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">6 минут чтения · Обзор бренда</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            Плитка Нефрит-Керамика: обзор коллекций и где купить в СПб
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Нефрит-Керамика — один из крупнейших российских производителей. Разбираем лучшие коллекции,
            цены и особенности бренда. Большой ассортимент на складе Плитки СПб в Янино.
          </p>
        </header>

        <div className="flex flex-col gap-8 text-foreground/80">
          {[
            {
              title: "О производителе",
              text: "Нефрит-Керамика основана в 1992 году. Заводы расположены в Санкт-Петербурге (пос. Никольское) и Новосибирске — это делает их одним из немногих российских производителей плитки с двумя полноценными производственными площадками. Специализируются на настенной керамической плитке для жилых помещений и керамограните для пола. Продукция соответствует ГОСТ и имеет все необходимые сертификаты.",
            },
            {
              title: "Для чего подходит Нефрит-Керамика",
              text: "Нефрит-Керамика — это прежде всего настенная плитка для ванных комнат и кухонных фартуков. Бренд занимает устойчивое место в среднем ценовом сегменте: лучше бюджетных китайских аналогов по качеству, но доступнее итальянских и части отечественных премиальных линеек. Хорошие варианты для типовых квартир, где нужно качественно и без лишних трат.",
              link: "/plitka-nastennaya-spb",
              linkText: "Настенная плитка в каталоге →",
            },
            {
              title: "Форматы и размеры",
              text: "Базовые форматы Нефрит-Керамика: 20×40 см — классика для небольших ванных; 25×50 и 30×60 — современные форматы, хорошо смотрятся в ванных 4–8 м²; 25×40 с вертикальной укладкой — визуально поднимает потолок; 60×60 — напольный керамогранит. В отличие от некоторых других производителей, Нефрит предлагает широкий выбор именно в форматах 20×40 и 25×50 — популярных в российских квартирах стандартного класса.",
            },
            {
              title: "Палитра и дизайны",
              text: "Нефрит-Керамика делает упор на практичные нейтральные тона: белый, бежевый, серый, светло-голубой. Много имитаций: плитка под мрамор, под камень, под штукатурку. Декоры с геометрическими рисунками и флоральными орнаментами — для тех, кто хочет добавить характер без дорогих дизайнерских коллекций. Коллекции обновляются регулярно — каждый сезон появляются новые цвета в популярных форматах.",
            },
            {
              title: "Цены на плитку Нефрит-Керамика",
              text: "В нашем магазине цены на Нефрит-Керамика: настенная плитка от 450 до 1200 ₽/м², напольный керамогранит от 650 до 1500 ₽/м². Декоры и вставки — от 100 до 500 ₽/шт. По цене Нефрит немного ниже Kerama Marazzi и примерно на одном уровне с частью коллекций Азори. Хорошее соотношение для ремонта в бюджете.",
            },
            {
              title: "Как купить в Санкт-Петербурге",
              text: "Магазин Плитки СПб, склад в Янино-1 (Ленинградская область, 15–20 мин от КАД). В наличии более 900 позиций Нефрит-Керамика. Можно приехать и выбрать в шоуруме, работаем ежедневно 10:00–17:00. Самовывоз бесплатный, доставка по СПб и ЛО от 1 рабочего дня. Помогаем рассчитать количество с запасом на подрезку.",
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
            <p className="font-semibold text-foreground mb-2">Нефрит-Керамика — 900+ позиций на складе</p>
            <p className="text-muted-foreground text-sm mb-4">Самовывоз и доставка по СПб от 1 дня · Янино-1</p>
            <Link
              href="/catalog?brand=Нефрит-Керамика"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Открыть каталог Нефрит-Керамика →
            </Link>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/kerama-marazzi-kollektsii" className="text-primary hover:underline text-sm">→ Плитка Kerama Marazzi: обзор коллекций</Link>
              <Link href="/blog/azori-plitka-obzor" className="text-primary hover:underline text-sm">→ Плитка Азори: обзор коллекций</Link>
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="text-primary hover:underline text-sm">→ Как выбрать плитку для ванной комнаты</Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
