import type { Metadata } from "next"
import { CatalogClient } from "./catalog-client"
import { products } from "@/lib/products-data"
import type { Product } from "@/lib/products-data"

export const metadata: Metadata = {
  title: "Каталог плитки в СПб — Цены, фото, купить недорого со склада",
  description: "Огромный каталог керамической плитки и керамогранита в Санкт-Петербурге. Купить плитку недорого оптом и в розницу со склада в Янино. Цены, фото, наличие.",
  alternates: { canonical: "/catalog" },
  openGraph: {
    title: "Каталог плитки в СПб — 3000+ позиций на складе Янино",
    description: "Керамическая плитка и керамогранит от ведущих брендов. Склад в Янино, доставка по СПб от 1 дня.",
    url: "https://plitki-spb.ru/catalog",
    siteName: "Плитки СПб",
    locale: "ru_RU",
    type: "website",
  },
}

export default function CatalogPage() {
  const initialProducts: Product[] = products
    .filter((p) => p.name && p.name.trim() && p.slug)

  return <CatalogClient initialProducts={initialProducts} />
}
