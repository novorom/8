import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"
import { getCollectionSeo } from "@/lib/collection-seo"

// Прокси-CDN: бесплатный, конвертирует в WebP и кэширует
function optimizeImage(url: string | undefined | null, width = 800): string {
  if (!url || typeof url !== "string" || url.startsWith("/")) return url ?? ""
  const clean = url.replace("https://", "").replace("http://", "")
  return `https://images.weserv.nl/?url=${clean}&w=${width}&output=webp&q=80&il`
}

// Переопределённые главные изображения для конкретных коллекций
const COLLECTION_IMAGE_OVERRIDES: Record<string, string> = {
  "CALACATTA": "https://pvi.cersanit.ru/upload/uf/ae8/Calacatta_large_1.jpg",
  "NORTHWOOD": "https://pvi.cersanit.ru/upload/uf/a08/INT_Northwood_012_2_2.jpg",
  "DECO": "https://pvi.cersanit.ru/upload/uf/b22/DEL232.jpg",
}

const SITE_URL = "https://cersanit-spb.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

interface CollectionPageProps {
  params: Promise<{ collection: string }>
}

export async function generateStaticParams() {
  const allCollectionNames = [
    ...new Set(
      products
        .filter((p) => p.collection && p.collection.trim() && p.collection.toLowerCase() !== "other")
        .map((p) => p.collection as string)
    ),
  ]
  return allCollectionNames.map((name) => ({
    collection: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zа-яё0-9-]/gi, ""),
  }))
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { collection } = await params
  const collectionName = findCollectionName(collection)
  if (!collectionName) return { title: "Коллекция не найдена | Дом Плитки" }

  const seo = getCollectionSeo(collectionName)
  const collectionProducts = getCollectionProducts(collectionName)
  const prices = collectionProducts.map(p => p.price_retail).filter(Boolean)
  const priceFrom = prices.length ? Math.min(...prices) : null

  const title = seo?.title || `Плитка ${collectionName} Cersanit купить в Санкт-Петербурге | Дом Плитки`
  const description = seo?.description ||
    `Коллекция ${collectionName} Cersanit — ${collectionProducts.length} товаров в наличии на складе Янино.${priceFrom ? ` От ${priceFrom} ₽/м².` : ""} Доставка по СПб и ЛО от 1 дня.`

  const firstImage = collectionProducts[0]?.main_image || collectionProducts[0]?.collection_image

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/collections/${collection}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/collections/${collection}`,
      siteName: "Дом Плитки CERSANIT",
      locale: "ru_RU",
      type: "website",
      images: firstImage ? [{ url: firstImage, alt: collectionName }] : [],
    },
  }
}

function findCollectionName(slug: string): string | undefined {
  return [
    ...new Set(
      products
        .filter((p) => p.collection && p.collection.trim() && p.collection.toLowerCase() !== "other")
        .map((p) => p.collection as string)
    ),
  ].find(
    (name) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zа-яё0-9-]/gi, "") === slug.toLowerCase()
  )
}

function getCollectionProducts(collectionName: string) {
  return products.filter(
    (p) => p.collection === collectionName && p.slug && p.name && p.price_retail > 0
  )
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collection } = await params
  const collectionName = findCollectionName(collection)

  if (!collectionName) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Коллекция не найдена</h1>
          <Link href="/collections" className="text-primary hover:text-primary/80 transition-colors">
            Вернуться к коллекциям
          </Link>
        </div>
      </div>
    )
  }

  const collectionProducts = getCollectionProducts(collectionName)
  const seo = getCollectionSeo(collectionName)
  // Собираем все интерьерные фото коллекции
  const interiorImages = [
    ...new Set(
      collectionProducts.flatMap((p) => (p.interior_images as string[] | undefined) || []).filter(Boolean)
    )
  ]
  const heroImage = COLLECTION_IMAGE_OVERRIDES[collectionName.toUpperCase()] || interiorImages[0] || collectionProducts[0]?.collection_image || collectionProducts[0]?.main_image || null
  const prices = collectionProducts.map(p => p.price_retail).filter(Boolean)
  const priceFrom = prices.length ? Math.min(...prices) : null
  const priceTo = prices.length ? Math.max(...prices) : null
  const formats = [...new Set(collectionProducts.map(p => p.format).filter(Boolean))]
  const designs = [...new Set(collectionProducts.map(p => p.design).filter(Boolean))]

  // Schema.org ItemList
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Коллекция ${collectionName} Cersanit`,
    description: seo?.about || `Коллекция ${collectionName} от Cersanit в наличии в Санкт-Петербурге`,
    url: `${SITE_URL}/collections/${collection}`,
    numberOfItems: collectionProducts.length,
    itemListElement: collectionProducts.slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        url: `${SITE_URL}/catalog/${p.slug}`,
        offers: {
          "@type": "Offer",
          price: p.price_retail,
          priceCurrency: "RUB",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  }

  // Связанные коллекции
  const relatedCollections = seo?.relatedSlugs
    ? [...new Set(
        products
          .filter(p => p.collection && p.collection !== collectionName)
          .map(p => p.collection as string)
      )].filter(name => {
        const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zа-яё0-9-]/gi, "")
        return seo.relatedSlugs!.includes(slug)
      }).slice(0, 4)
    : []

  return (
    <div className="bg-background min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumbs */}
      <div className="border-b border-border bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm flex-wrap text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/collections" className="hover:text-primary transition-colors">Коллекции</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{collectionName}</span>
          </nav>
        </div>
      </div>

      {/* Hero with interior image */}
      <div className="relative min-h-[320px] lg:min-h-[420px] flex items-end bg-primary overflow-hidden">
        {heroImage && (
          <img
            src={optimizeImage(heroImage, 1200)}
            alt={`Интерьер с плиткой ${collectionName}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 lg:py-14 w-full">
          <h1 className="text-3xl lg:text-4xl font-bold text-white text-balance drop-shadow">
            {seo?.title
              ? seo.title.replace(" купить в СПб", "").replace(" купить в Санкт-Петербурге", "")
              : `Коллекция ${collectionName} Cersanit`}
          </h1>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-white/80 text-sm">
            <span>{collectionProducts.length} позиций в наличии</span>
            {priceFrom && <span>от {priceFrom.toLocaleString("ru-RU")} ₽/м²</span>}
            {formats.length > 0 && <span>Формат: {formats.join(", ")} см</span>}
            {seo?.design && <span>Дизайн: {seo.design}</span>}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#products" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-foreground font-medium text-sm hover:bg-white/90 transition-colors">
              Смотреть товары <ChevronRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/40 text-white font-medium text-sm hover:bg-white/10 transition-colors">
              <Phone className="h-4 w-4" /> Задать вопрос
            </a>
          </div>
        </div>
      </div>

      {/* Products */}
      <div id="products" className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {collectionName} — {collectionProducts.length} позиций
          </h2>
          <p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино, Ленинградская обл.</p>
          {collectionProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {collectionProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 4} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-6">В этой коллекции пока нет товаров</p>
              <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Смотреть все товары
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* SEO text */}
      {seo && (
        <div className="py-12 lg:py-16 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-6">
              О коллекции {collectionName}
            </h2>
            <div className="flex flex-col gap-4 text-foreground/80 leading-relaxed">
              <p>{seo.about}</p>
              <p>{seo.application}</p>
              {priceFrom && (
                <p>
                  <strong>Цена</strong> коллекции {collectionName} в нашем магазине — от {priceFrom.toLocaleString("ru-RU")} до {priceTo?.toLocaleString("ru-RU")} ₽/м².
                  Все товары в наличии на складе в Янино-1. Бесплатный самовывоз на следующий рабочий день.
                  Доставка по Санкт-Петербургу и Ленинградской области 1–2 рабочих дня.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fallback SEO text */}
      {!seo && (
        <div className="py-12 lg:py-16 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Коллекция {collectionName} Cersanit
            </h2>
            <div className="flex flex-col gap-4 text-foreground/80 leading-relaxed">
              <p>
                Коллекция {collectionName} — высококачественная продукция польского производителя Cersanit.
                Все товары имеют сертификаты качества и соответствуют российским стандартам.
                {priceFrom && ` Цены от ${priceFrom.toLocaleString("ru-RU")} до ${priceTo?.toLocaleString("ru-RU")} ₽/м².`}
              </p>
              <p>
                В наличии на складе в Янино-1 (15–20 мин от КАД). Самовывоз бесплатный.
                Доставка по СПб и ЛО 1–2 рабочих дня. Для консультации звоните: {PHONE}.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Related collections */}
      {relatedCollections.length > 0 && (
        <div className="py-10 lg:py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-xl font-bold text-foreground mb-6">Похожие коллекции</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedCollections.map(name => {
                const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zа-яё0-9-]/gi, "")
                const relatedProducts = products.filter(p => p.collection === name)
                const count = relatedProducts.length
                const relatedInterior = COLLECTION_IMAGE_OVERRIDES[name.toUpperCase()] ||
                  relatedProducts
                  .flatMap(p => (p.interior_images as string[] | undefined) || [])
                  .filter(Boolean)[0] ||
                  relatedProducts[0]?.collection_image ||
                  relatedProducts[0]?.main_image
                return (
                  <Link key={name} href={`/collections/${slug}`}
                    className="group rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-md transition-all">
                    <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                      {relatedInterior && (
                        <img
                          src={optimizeImage(relatedInterior, 600)}
                          alt={`Коллекция ${name}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-3">
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">{name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{count} позиций</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="py-12 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-xl lg:text-2xl font-bold mb-3">Нужна помощь с выбором?</h2>
          <p className="text-primary-foreground/80 mb-6">Бесплатная консультация и расчёт количества плитки</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10">
              Весь каталог <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
