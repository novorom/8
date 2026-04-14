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
  const title = `${product.name} — купить по цене ${product.price_retail} ${priceUnit} на портале Плитки СПб`
  const description = `Заказывайте ${product.name} в Плитки СПб по цене ${product.price_retail} ${priceUnit}. ${product.collection ? ` Коллекция: ${product.collection}.` : ""} ${product.format ? `Размер: ${product.format} см.` : ""} Быстрая отгрузка со складского хаба в Янино. В наличии более ${product.stock_yanino || "3000"} единиц продукции. Артикул: ${product.sku}.`

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
    ? (rawImage.includes(".ru") || rawImage.includes("cloudinary.com") 
        ? rawImage 
        : `https://images.weserv.nl/?url=${rawImage.replace("https://", "").replace("http://", "")}&w=900&output=webp&q=80&il`)
    : null

  return (
    <>
      {preloadUrl && (
        <link rel="preload" as="image" href={preloadUrl} fetchPriority="high" />
      )}
      <ProductPageClient slug={slug} />
    </>
  )
}
