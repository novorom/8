import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { products } from "@/lib/products-data"

const SITE_URL = "https://plitki-spb.ru"

interface BrandInfo {
  name: string
  brandField: string
  title: string
  description: string
  h1: string
  about: string
  advantages: string[]
  blogLink?: string
  blogTitle?: string
  logoUrl?: string
}

const brandData: Record<string, BrandInfo> = {
  "kerama-marazzi": {
    name: "Kerama Marazzi",
    brandField: "Kerama Marazzi",
    title: "Плитка Kerama Marazzi в СПб — купить на складе Янино | Плитки СПб",
    description: "Kerama Marazzi в Санкт-Петербурге: 400+ позиций на складе в Янино. Керамогранит, настенная плитка, мозаика. Самовывоз и доставка по СПб от 1 дня.",
    h1: "Плитка Kerama Marazzi в Санкт-Петербурге",
    about: "Kerama Marazzi — крупнейший российский производитель керамической плитки и керамогранита. Основан в 1996 году, заводы в Орле, Новомосковске и Сызрани. В ассортименте более 3000 коллекций: от бюджетной плитки до дизайнерских серий в итальянском стиле. Прямые поставки — цены без наценки посредников.",
    advantages: ["400+ позиций на складе", "Самовывоз из Янино бесплатно", "Доставка по СПб от 1 дня", "Помощь в расчёте количества"],
    blogLink: "/blog/kerama-marazzi-kollektsii",
    blogTitle: "Читать: обзор коллекций Kerama Marazzi →",
    logoUrl: "https://res.cloudinary.com/de1sotnld/image/upload/v1773526445/plitki-spb/logos/kerama-marazzi.png",
  },
  "azori": {
    name: "Азори",
    brandField: "Азори",
    title: "Плитка Азори в СПб — 1000+ позиций на складе Янино | Плитки СПб",
    description: "Азори в Санкт-Петербурге: коллекции РИВЕР, ПАТАГОНИЯ, САЛЬВАДОР и другие. Более 1000 позиций на складе в Янино. Самовывоз и доставка по СПб.",
    h1: "Плитка Азори в Санкт-Петербурге",
    about: "Азори (AZORI) — российский бренд дизайнерской керамической плитки с богатой палитрой коллекций. Широкий выбор фактур и цветов: от спокойных нейтральных оттенков до выразительных орнаментов. Форматы 20×60, 31,5×63, 42×42 см. Идеально для ванных комнат и кухонь любого стиля.",
    advantages: ["1000+ позиций на складе", "Коллекции РИВЕР, ПАТАГОНИЯ, САЛЬВАДОР", "Форматы от 20×60 до 42×42", "Доставка по СПб от 1 дня"],
    blogLink: "/blog/azori-plitka-obzor",
    blogTitle: "Читать: обзор коллекций Азори →",
    logoUrl: "https://res.cloudinary.com/de1sotnld/image/upload/v1773526448/plitki-spb/logos/azori.png",
  },
  "cersanit": {
    name: "Cersanit",
    brandField: "Cersanit",
    title: "Плитка Cersanit в СПб — купить на складе Янино | Плитки СПб",
    description: "Cersanit в Санкт-Петербурге: керамогранит, настенная плитка, мозаика. Calacatta, Wood Concept, Lofthouse. Склад Янино, доставка по СПб.",
    h1: "Плитка Cersanit в Санкт-Петербурге",
    about: "Cersanit — польский производитель керамической плитки и керамогранита с мировым именем. Производство в России, Польше и Румынии. Известен коллекциями под мрамор (Calacatta, Gold Venice), дерево (Wood Concept, Northwood) и бетон (Soft Concrete, Lofthouse). Официальные поставки, сертификаты качества.",
    advantages: ["Коллекции Calacatta, Wood Concept", "Польское качество от 626 ₽/м²", "Все форматы: 22×90, 30×60, 60×120", "Склад Янино, доставка от 1 дня"],
    blogLink: "/blog/plitka-pod-mramor-v-interere",
    blogTitle: "Читать: плитка под мрамор — сравнение →",
    logoUrl: "https://res.cloudinary.com/de1sotnld/image/upload/v1773526446/plitki-spb/logos/cersanit.png",
  },
  "nefrit-keramika": {
    name: "Нефрит-Керамика",
    brandField: "Нефрит-Керамика",
    title: "Плитка Нефрит-Керамика в СПб — склад Янино | Плитки СПб",
    description: "Нефрит-Керамика в Санкт-Петербурге: российский производитель, большой ассортимент на складе в Янино. Самовывоз и доставка по СПб.",
    h1: "Плитка Нефрит-Керамика в Санкт-Петербурге",
    about: "Нефрит-Керамика — один из крупнейших российских производителей керамической плитки. Заводы в Санкт-Петербурге и Новосибирске. Специализируется на настенной плитке для ванных и кухонь, а также керамограните для пола. Хорошее соотношение цены и качества, широкий выбор цветовых решений.",
    advantages: ["Российский производитель", "Широкий выбор для ванной и кухни", "Доступные цены", "Доставка по СПб от 1 дня"],
    blogLink: "/blog/kak-vybrat-plitku-dlya-vannoj",
    blogTitle: "Читать: как выбрать плитку для ванной →",
  },
  "granitea": {
    name: "Гранитея",
    brandField: "Гранитея",
    title: "Керамогранит Гранитея в СПб — купить на складе | Плитки СПб",
    description: "Гранитея (Уральский гранит) в Санкт-Петербурге: Allaki, Arkaim, Iremel. Морозостойкий керамогранит. Склад Янино, доставка по СПб.",
    h1: "Керамогранит Гранитея в Санкт-Петербурге",
    about: "Гранитея — торговая марка Уральского гранита, одного из крупнейших российских производителей керамогранита. Заводы на Урале. Специализируется на крупноформатном керамограните с имитацией природного камня: коллекции Allaki, Arkaim, Iremel, Kirety, Sinara. Морозостойкий, подходит для открытых площадок.",
    advantages: ["Уральское производство", "Морозостойкий керамогранит", "Форматы 600×600, 1200×600", "Коллекции под природный камень"],
    blogLink: "/blog/keramogranit-dlya-balkona-i-terraisy",
    blogTitle: "Читать: керамогранит для балкона →",
    logoUrl: "https://res.cloudinary.com/de1sotnld/image/upload/v1773526454/plitki-spb/logos/ural.jpg",
  },
  "gracia-ceramica": {
    name: "Gracia Ceramica",
    brandField: "Gracia Ceramica",
    title: "Плитка Gracia Ceramica в СПб — 500+ позиций | Плитки СПб",
    description: "Gracia Ceramica в Санкт-Петербурге: более 500 позиций на складе в Янино. Широкий выбор коллекций, доступные цены. Доставка по СПб.",
    h1: "Плитка Gracia Ceramica в Санкт-Петербурге",
    about: "Gracia Ceramica — российский бренд с очень широким ассортиментом коллекций. Более 170 серий: классика, современный минимализм, имитация дерева, камня, мрамора, бетона и терраццо. Форматы от 125×500 до 600×1200 мм. Один из лучших выборов по разнообразию дизайнов в доступном ценовом сегменте.",
    advantages: ["170+ коллекций на выбор", "Форматы от 125×500 до 600×1200", "Доступные цены", "Склад Янино, доставка от 1 дня"],
    logoUrl: "https://res.cloudinary.com/de1sotnld/image/upload/v1773526447/plitki-spb/logos/gracia.png",
  },
  "idalgo": {
    name: "Идальго",
    brandField: "Идальго",
    title: "Плитка Идальго в СПб — купить на складе Янино | Плитки СПб",
    description: "Идальго в Санкт-Петербурге: керамогранит и плитка уральского производителя. Коллекции Concepta, Anna, Siena. Склад Янино, доставка по СПб.",
    h1: "Плитка Идальго в Санкт-Петербурге",
    about: "Идальго — торговая марка Уральского гранита, специализирующаяся на современных дизайнерских коллекциях керамогранита. Особенность бренда — большой формат 1200×600 мм и разнообразие имитаций: мрамор, камень, бетон, дерево. Коллекции Concepta, Anna, Siena, Dolomiti и другие.",
    advantages: ["Большой формат 1200×600", "Коллекции под мрамор и камень", "Уральское производство", "Доставка по СПб от 1 дня"],
    logoUrl: "https://res.cloudinary.com/de1sotnld/image/upload/v1773526453/plitki-spb/logos/idalgo.jpg",
  },
  "bonapart": {
    name: "Бонапарт",
    brandField: "Бонапарт",
    title: "Плитка Бонапарт в СПб — купить на складе Янино | Плитки СПб",
    description: "Бонапарт в Санкт-Петербурге: широкий ассортимент керамической плитки на складе в Янино. Самовывоз и доставка по СПб от 1 дня.",
    h1: "Плитка Бонапарт в Санкт-Петербурге",
    about: "Бонапарт — российский производитель керамической плитки с широким ассортиментом для ванных комнат и кухонь. Разнообразие коллекций в разных ценовых сегментах. Хорошее качество российского производства по доступным ценам.",
    advantages: ["Российский производитель", "Широкий выбор коллекций", "Доступные цены", "Доставка по СПб от 1 дня"],
    logoUrl: "https://res.cloudinary.com/de1sotnld/image/upload/v1773526455/plitki-spb/logos/bonapart.png",
  },
  "dako": {
    name: "Dako",
    brandField: "Dako",
    title: "Плитка Dako в СПб — купить на складе Янино | Плитки СПб",
    description: "Dako в Санкт-Петербурге: керамогранит формата 60×60. Коллекции Genio, Harmony, Prime и другие. Склад Янино, доставка по СПб.",
    h1: "Плитка Dako в Санкт-Петербурге",
    about: "Dako — производитель керамогранита формата 60×60 см. В ассортименте коллекции Genio, Harmony, Liberty, Prime, Vita, City, Supreme, Season, Level, Extreme, Gold Sand, Mirage, Rock, Cosmos, Travertine. Практичный и доступный керамогранит для пола в квартирах и офисах.",
    advantages: ["Керамогранит 60×60", "Более 15 коллекций", "Доступные цены", "Склад Янино"],
    logoUrl: "https://res.cloudinary.com/de1sotnld/image/upload/v1773526452/plitki-spb/logos/dako.jpg",
  },
}

export const dynamicParams = true

export async function generateStaticParams() {
  return Object.keys(brandData).map((slug) => ({ brand: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>
}): Promise<Metadata> {
  const { brand } = await params
  const info = brandData[brand]
  if (!info) return {}
  return {
    title: info.title,
    description: info.description,
    alternates: { canonical: `${SITE_URL}/brands/${brand}` },
    openGraph: {
      title: info.title,
      description: info.description,
      url: `${SITE_URL}/brands/${brand}`,
      siteName: "Плитки СПб",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>
}) {
  const { brand } = await params
  const info = brandData[brand]
  if (!info) notFound()

  const brandProducts = products.filter(
    (p) =>
      p.brand?.toLowerCase() === info.brandField.toLowerCase() &&
      p.slug &&
      p.name
  )

  const withImages = brandProducts.filter((p) => p.main_image)
  const priceList = brandProducts
    .map((p) => (p as any).price_retail ?? (p as any).price ?? 0)
    .filter(Boolean)
  const priceFrom = priceList.length ? Math.min(...priceList) : null

  return (
    <div className="min-h-screen bg-background">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Плитка ${info.name} в Санкт-Петербурге`,
            description: info.description,
            url: `${SITE_URL}/brands/${brand}`,
            numberOfItems: brandProducts.length,
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/brands" className="hover:text-primary transition-colors">Бренды</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{info.name}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {info.logoUrl && (
              <div className="shrink-0 h-16 w-40 bg-white rounded-xl border border-border flex items-center justify-center p-3 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={info.logoUrl} alt={`Логотип ${info.name}`} className="max-h-full max-w-full object-contain" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{info.h1}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{brandProducts.length} позиций</span>
                {priceFrom && <span>от {priceFrom.toLocaleString("ru-RU")} ₽/м²</span>}
                <span className="text-green-600 font-medium">• На складе Янино</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href={`/catalog?brand=${encodeURIComponent(info.brandField)}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Смотреть каталог
              </Link>
              <a
                href="tel:+79052050900"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background text-foreground font-medium text-sm hover:bg-accent transition-colors"
              >
                +7 (905) 205-09-00
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
        {/* About + advantages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-foreground mb-3">О бренде {info.name}</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">{info.about}</p>
            {info.blogLink && (
              <Link href={info.blogLink} className="text-primary text-sm font-medium hover:underline">
                {info.blogTitle}
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Почему у нас</h3>
            {info.advantages.map((adv) => (
              <div key={adv} className="flex items-center gap-2.5 text-sm text-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {adv}
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        {brandProducts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-2">Товары скоро появятся</p>
            <p className="text-sm mb-6">Позвоните — уточним наличие и цены</p>
            <a href="tel:+79052050900" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
              +7 (905) 205-09-00
            </a>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Все товары {info.name}
                <span className="ml-2 text-base font-normal text-muted-foreground">({brandProducts.length})</span>
              </h2>
              <Link
                href={`/catalog?brand=${encodeURIComponent(info.brandField)}`}
                className="text-sm text-primary font-medium hover:underline"
              >
                Открыть в каталоге с фильтрами →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {brandProducts.slice(0, 40).map((product) => (
                <Link
                  key={product.slug}
                  href={`/catalog/${product.slug}`}
                  className="group block border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all bg-card"
                >
                  <div className="aspect-square bg-muted overflow-hidden">
                    {product.main_image ? (
                      <img
                        src={`https://images.weserv.nl/?url=${encodeURIComponent(product.main_image)}&w=300&h=300&fit=cover&output=webp`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-muted-foreground text-center px-2">{product.collection || product.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground mb-1 truncate">{product.collection}</p>
                    <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </p>
                    {((product as any).price_retail > 0) && (
                      <p className="text-sm font-bold text-primary mt-1.5">
                        {((product as any).price_retail).toLocaleString("ru-RU")} ₽/м²
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {brandProducts.length > 40 && (
              <div className="mt-8 text-center">
                <Link
                  href={`/catalog?brand=${encodeURIComponent(info.brandField)}`}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Смотреть все {brandProducts.length} товаров →
                </Link>
              </div>
            )}
          </>
        )}

        {/* CTA block */}
        <div className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Нужна помощь с выбором {info.name}?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Бесплатно рассчитаем количество плитки по размерам вашего помещения и подберём коллекцию.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+79052050900"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              +7 (905) 205-09-00
            </a>
            <a
              href="https://t.me/flyroman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-background font-medium hover:bg-accent transition-colors"
              style={{ color: "#2AABEE" }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.01 9.47c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.16 14.26l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.326z"/>
              </svg>
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
