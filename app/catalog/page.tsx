import type { Metadata } from "next"
import { CatalogClient } from "./catalog-client"
import { products } from "@/lib/products-data"
import type { Product } from "@/lib/products-data"

type CatalogPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export async function generateMetadata({ searchParams }: CatalogPageProps): Promise<Metadata> {
  const params = await searchParams
  const hasFilters = Object.values(params).some((value) => value !== undefined)
  const title = "Каталог плитки и керамогранита в Санкт-Петербурге — цены и наличие"
  const description = `Каталог керамической плитки, керамогранита и мозаики в Санкт-Петербурге. ${products.length} товаров; цена, артикул и актуальный остаток указаны в карточках.`
  return {
    title,
    description,
    alternates: { canonical: "/catalog" },
    ...(hasFilters ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: "https://plitki-spb.ru/catalog",
      siteName: "Плитки СПб",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export default function CatalogPage() {
  const initialProducts: Product[] = products
    .filter((p) => p.name && p.name.trim() && p.slug)

  return <CatalogClient initialProducts={initialProducts} />
}
