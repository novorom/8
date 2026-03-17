import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://plitki-spb.ru"

export const metadata: Metadata = {
  title: "Плитка Азори: коллекции, цены, где купить в СПб | Плитки СПб",
  description: "Обзор коллекций плитки Азори: РИВЕР, ПАТАГОНИЯ, САЛЬВАДОР и другие. Купить Азори в Санкт-Петербурге со склада в Янино. 1000+ позиций в наличии.",
  alternates: { canonical: `${SITE_URL}/blog/azori-plitka-obzor` },
  openGraph: {
    title: "Плитка Азори: коллекции, цены, где купить в СПб",
    url: `${SITE_URL}/blog/azori-plitka-obzor`,
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
            headline: "Плитка Азори: коллекции, цены и где купить в Санкт-Петербурге",
            description: "Полный обзор ассортимента плитки Азори с описанием коллекций и ценами.",
            publisher: { "@type": "Organization", name: "Плитки СПб", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}/blog/azori-plitka-obzor`,
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
            <span className="text-foreground font-medium">Плитка Азори: обзор коллекций</span>
          </nav>
        </div>
      </div>

      <div className="p-5 bg-primary/5 border-b border-primary/10">
        <div className="mx-auto max-w-3xl flex flex-wrap gap-2">
          <Link href="/catalog?brand=Азори" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Все товары Азори</Link>
          <Link href="/plitka-nastennaya-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Настенная плитка</Link>
          <Link href="/plitka-dlya-vannoj-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для ванной</Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">7 минут чтения · Обзор бренда</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            Плитка Азори: обзор лучших коллекций для ванной и кухни
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Азори — российский производитель дизайнерской керамической плитки с ярким характером. 
            Более 1000 позиций в наличии на складе Плитки СПб в Янино.
          </p>
        </header>

        <div className="flex flex-col gap-8 text-foreground/80">
          {[
            {
              title: "О бренде Азори",
              text: "Азори (AZORI) — российский бренд, специализирующийся на дизайнерской настенной плитке и керамограните. Производство расположено в России, продукция соответствует российским и европейским стандартам качества. Отличительная черта бренда — богатая палитра декоров, фактур и цветов, которая позволяет создавать выразительные интерьеры. В нашем каталоге Плитки СПб представлено более 1000 позиций Азори из разных коллекций.",
            },
            {
              title: "Коллекция РИВЕР — природная свежесть",
              text: "РИВЕР — одна из самых продаваемых коллекций Азори. Имитация камня с характерными прожилками в светло-серых и бежевых тонах. Формат 31,5×63 см идеально подходит для ванных комнат средней площади. В коллекции есть базовая плитка, декор с рельефным рисунком (РИВЕР ДЕКОР) и вставки. Сочетается как с натуральными материалами (дерево, камень), так и с минималистичными интерьерами в скандинавском стиле.",
              link: "/plitka-pod-kamen-spb",
              linkText: "Плитка под камень →",
            },
            {
              title: "Коллекция ПАТАГОНИЯ — дикая природа в вашем доме",
              text: "ПАТАГОНИЯ вдохновлена скалистыми пейзажами южного материка. Глубокий рельеф, сложная текстура с вариациями рисунка в каждой плитке — не найдёте двух одинаковых. Формат 31,5×63 и 42×42 см. Особенно эффектно смотрится в сочетании с деревянными деталями и медными аксессуарами. Плитка чуть дороже базовых коллекций Азори, но создаёт ощущение штучного дорогого материала.",
            },
            {
              title: "Коллекция САЛЬВАДОР — испанские мотивы",
              text: "САЛЬВАДОР — это яркая дизайнерская серия с геометрическими орнаментами в духе испанской и марокканской керамики. Подходит для создания акцентной стены: одна стена в САЛЬВАДОР, остальные в нейтральном однотонном. Формат 31,5×63 см, матовая поверхность. Хорошо смотрится на кухонном фартуке — добавляет характер скромным кухням.",
              link: "/plitka-dlya-kuhni-spb",
              linkText: "Плитка для кухни →",
            },
            {
              title: "Размеры и форматы плитки Азори",
              text: "В ассортименте Азори несколько базовых форматов: 31,5×63 см — самый популярный для ванных и кухонь; 42×42 см — для полов и крупных ванных комнат; 20×60 см — современный вертикальный формат для визуального увеличения высоты; 25×40 см — классический формат для небольших помещений. При выборе формата ориентируйтесь на площадь комнаты: маленьким помещениям (до 6 м²) подойдут плитки 20×40 или 25×40, просторным — 31,5×63 или 42×42.",
            },
            {
              title: "Как купить плитку Азори в Санкт-Петербурге",
              text: "Весь ассортимент Азори из нашего каталога находится на складе в Янино-1 (Ленинградская область). Приедете посмотреть вживую — шоурум открыт ежедневно с 10:00 до 17:00. Самовывоз бесплатный, загружаем в транспорт сами. Доставка по Санкт-Петербургу и ЛО 1–2 рабочих дня. Помогаем рассчитать количество с учётом 10% запаса на подрезку.",
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
            <p className="font-semibold text-foreground mb-2">1000+ позиций Азори на складе в Янино</p>
            <p className="text-muted-foreground text-sm mb-4">Самовывоз и доставка по СПб и Ленинградской области</p>
            <Link
              href="/catalog?brand=Азори"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Смотреть каталог Азори →
            </Link>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/kerama-marazzi-kollektsii" className="text-primary hover:underline text-sm">→ Плитка Kerama Marazzi: обзор коллекций</Link>
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="text-primary hover:underline text-sm">→ Как выбрать плитку для ванной</Link>
              <Link href="/blog/plitka-dlya-kuhni-kak-vybrat" className="text-primary hover:underline text-sm">→ Плитка для кухни: как выбрать фартук</Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
