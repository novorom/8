import type { Metadata } from "next"
import { products } from "@/lib/products-data"
import { ProductPageClient } from "./product-client"

const SITE_URL = "https://plitki-spb.ru"

// Генерируем статически только топ-300 товаров с картинками и ценой
// Остальные рендерятся динамически при первом запросе и кешируются
export async function generateStaticParams() {
  return products
    .filter((p) => p.slug && p.main_image && p.price_retail > 0)
    .slice(0, 300)
    .map((p) => ({ slug: p.slug as string }))
}

// Разрешаем динамический рендеринг для остальных страниц
export const dynamicParams = true

// Кешируем динамически сгенерированные страницы на 1 час
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return {
      title: "Товар не найден | Плитки СПб",
    }
  }

  const priceUnit = ["Мозаика", "Ступень", "Плинтус", "Вставка"].includes(product.product_type ?? "") ? "₽/шт" : "₽/м²"
  const title = `${product.name} — купить в СПб ${product.price_retail} ${priceUnit}`
  const priceUnitDesc = ["Мозаика", "Ступень", "Плинтус", "Вставка"].includes(product.product_type ?? "") ? "₽/шт" : "₽/м²"
  const description = `Купить ${product.name} в Санкт-Петербурге. Цена ${product.price_retail} ${priceUnitDesc}.${product.collection ? ` Коллекция ${product.collection}.` : ""}${product.format ? ` Формат ${product.format} см.` : ""} В наличии на складе Янино. Доставка по СПб и ЛО от 1 дня. Артикул: ${product.sku}.`

  return {
    title,
    description,
    alternates: { canonical: `/catalog/${product.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/catalog/${product.slug}`,
      siteName: "Плитки СПб",
      locale: "ru_RU",
      type: "website",
      images: product.main_image
        ? [{ url: product.main_image, alt: product.name }]
        : [],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  const rawImage = product?.main_image || (product?.images && product.images[0])
  const preloadUrl = rawImage
    ? `https://images.weserv.nl/?url=${rawImage.replace("https://", "").replace("http://", "")}&w=900&output=webp&q=80&il`
    : null

  const productJsonLd = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images?.length ? product.images : (product.main_image ? [product.main_image] : []),
    "description": `Купить ${product.name} в Санкт-Петербурге. В наличии на складе в Янино по цене ${product.price_retail} руб.`,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Неизвестно"
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": `${SITE_URL}/catalog/${product.slug}`,
      "priceCurrency": "RUB",
      "lowPrice": product.price_retail,
      "highPrice": product.price_official && product.price_official > product.price_retail ? product.price_official : product.price_retail,
      "offerCount": "1",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  } : null;

  return (
    <>
      {preloadUrl && (
        <link rel="preload" as="image" href={preloadUrl} fetchPriority="high" />
      )}
      {productJsonLd && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Главная", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "Каталог", "item": `${SITE_URL}/catalog` },
                { "@type": "ListItem", "position": 3, "name": product?.name || "", "item": `${SITE_URL}/catalog/${product?.slug || ""}` }
              ]
            }) }}
          />
        </>
      )}
      <ProductPageClient slug={slug} />
    </>
  )
}
