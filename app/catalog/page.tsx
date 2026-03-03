import type { Metadata } from "next"
import { CatalogClient } from "./catalog-client"
import { products } from "@/lib/products-data"
import type { Product } from "@/lib/products-data"

export const metadata: Metadata = {
  title: "Каталог плитки Cersanit в СПб — купить керамогранит и керамическую плитку со склада",
  description: "Каталог керамической плитки и керамогранита Cersanit в Санкт-Петербурге. 200+ моделей в наличии на складе Янино. Цены от 850 ₽/м². Доставка по СПб и ЛО от 1 дня. Самовывоз бесплатно.",
  alternates: { canonical: "/catalog" },
  openGraph: {
    title: "Каталог плитки Cersanit в СПб — 200+ моделей в наличии",
    description: "Керамическая плитка и керамогранит Cersanit со склада в Янино. Доставка по СПб от 1 дня.",
    url: "https://cersanit-spb.ru/catalog",
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "website",
  },
}

export default function CatalogPage() {
  const initialProducts: Product[] = products
    .filter((p) => p.name && p.name.trim() && p.price_retail && p.price_retail > 0 && p.slug)
    .slice(0, 60)

  return <CatalogClient initialProducts={initialProducts} />
}
