import type { Metadata } from "next"
import { products } from "@/lib/products-data"
import { ProductPageClient } from "./product-client"

const SITE_URL = "https://cersanit-spb.ru"

export async function generateStaticParams() {
  return products
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return {
      title: "Товар не найден | Дом Плитки CERSANIT",
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
      siteName: "Дом Плитки CERSANIT",
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

  // Preload главного фото через weserv — браузер качает картинку
  // одновременно с JS, не дожидаясь гидрации клиентского компонента
  const rawImage = product?.main_image || (product?.images && product.images[0])
  const preloadUrl = rawImage
    ? `https://images.weserv.nl/?url=${rawImage.replace("https://", "").replace("http://", "")}&w=900&output=webp&q=80&il`
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
