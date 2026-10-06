import type { Metadata } from "next"
import { notFound } from "next/navigation"
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
      robots: { index: false, follow: false },
    }
  }

  const priceUnit = ["Мозаика", "Ступень", "Плинтус", "Вставка"].includes(product.product_type ?? "") ? "₽/шт" : "₽/м²"
  const title = [
    product.name,
    product.format ? `${product.format} см` : "",
    product.brand ? `— ${product.brand}` : "",
    product.price_retail > 0 ? `— ${product.price_retail} ${priceUnit}` : "",
    "| Плитки СПб",
  ].filter(Boolean).join(" ")
  const description = [
    `Купить ${product.name} в Санкт-Петербурге`,
    product.price_retail > 0 ? `Цена: ${product.price_retail} ${priceUnit}` : "",
    product.collection ? `Коллекция: ${product.collection}` : "",
    product.format ? `Размер: ${product.format} см` : "",
    (product.stock_yanino ?? 0) > 0 ? `Остаток на складе: ${product.stock_yanino}` : "",
    product.sku ? `Артикул: ${product.sku}` : "",
    "Уточните актуальное наличие и доставку у менеджера.",
  ].filter(Boolean).join(". ")

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
  if (!product) notFound()

  const rawImage = product.main_image || product.images?.[0]
  const preloadUrl = rawImage
    ? (rawImage.includes(".ru") || rawImage.includes("cloudinary.com") 
        ? rawImage 
        : `https://images.weserv.nl/?url=${rawImage.replace("https://", "").replace("http://", "")}&w=900&output=webp&q=80&il`)
    : null

  const stockAtWarehouse = Number(product.stock_yanino ?? 0)
  const stockAtFactory = Number(product.stock_factory ?? 0)
  const images = [...new Set([product.main_image, ...(product.images ?? [])].filter((image): image is string => Boolean(image)))]
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(images.length ? { image: images } : {}),
    ...(product.description ? { description: product.description } : {}),
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    ...(product.sku ? { sku: product.sku } : {}),
    ...(product.product_type ? { category: product.product_type } : {}),
    ...(product.color ? { color: product.color } : {}),
    ...(product.material_type ? { material: product.material_type } : {}),
    offers: product.price_retail > 0 ? {
      "@type": "Offer",
      url: `${SITE_URL}/catalog/${product.slug}`,
      priceCurrency: "RUB",
      price: product.price_retail,
      itemCondition: "https://schema.org/NewCondition",
      availability: stockAtWarehouse > 0
        ? "https://schema.org/InStock"
        : stockAtFactory > 0
          ? "https://schema.org/PreOrder"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Плитки СПб", url: SITE_URL },
    } : undefined,
    additionalProperty: [
      product.format && { "@type": "PropertyValue", name: "Формат", value: product.format },
      product.surface && { "@type": "PropertyValue", name: "Поверхность", value: product.surface },
      product.sqm_per_box && { "@type": "PropertyValue", name: "Площадь в упаковке, м²", value: product.sqm_per_box },
      product.pieces_per_box && { "@type": "PropertyValue", name: "Штук в упаковке", value: product.pieces_per_box },
    ].filter(Boolean),
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/catalog` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${SITE_URL}/catalog/${product.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {preloadUrl && (
        <link rel="preload" as="image" href={preloadUrl} fetchPriority="high" />
      )}
      <ProductPageClient slug={slug} initialProduct={product} />
    </>
  )
}
