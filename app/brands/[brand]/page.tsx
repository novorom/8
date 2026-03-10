import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { products } from "@/lib/products-data"

const brandMeta: Record<string, { name: string; description: string }> = {
  "kerama-marazzi": {
    name: "Kerama Marazzi",
    description: "Купить плитку Kerama Marazzi в СПб. Широкий ассортимент коллекций на складе в Янино. Доставка по СПб и ЛО.",
  },
  "cersanit": {
    name: "Cersanit",
    description: "Купить плитку Cersanit в СПб. Керамическая плитка и керамогранит польского бренда на складе в Янино.",
  },
  "azori": {
    name: "Азори",
    description: "Купить плитку Азори в СПб. Большой выбор коллекций на складе. Доставка по СПб и Ленобласти.",
  },
  "nefrit-keramika": {
    name: "Нефрит-Керамика",
    description: "Купить плитку Нефрит-Керамика в СПб на складе в Янино. Доставка по СПб и ЛО.",
  },
  "ural-granit": {
    name: "Урал Гранит / Гранитея",
    description: "Купить керамогранит Урал Гранит в СПб. Морозостойкий керамогранит для улицы и помещений.",
  },
  "bonaparte": {
    name: "Бонапарт",
    description: "Купить плитку Бонапарт в СПб. Большой выбор на складе Янино.",
  },
  "gracia-keramika": {
    name: "Грация Керамика",
    description: "Купить плитку Грация Керамика (Шахты) в СПб. Доступные цены, склад Янино.",
  },
  "idalgo": {
    name: "Идальго",
    description: "Купить плитку Идальго в СПб. Современный дизайн, склад Янино.",
  },
}

// Map brand slugs to product brand field values
const brandSlugToName: Record<string, string> = {
  "kerama-marazzi": "Kerama Marazzi",
  "cersanit": "Cersanit",
  "azori": "Азори",
  "nefrit-keramika": "Нефрит-Керамика",
  "ural-granit": "Урал Гранит",
  "bonaparte": "Бонапарт",
  "gracia-keramika": "Грация Керамика",
  "idalgo": "Идальго",
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand } = await params
  const meta = brandMeta[brand]
  if (!meta) return {}
  return {
    title: `Плитка ${meta.name} в СПб — купить на складе Янино`,
    description: meta.description,
    alternates: { canonical: `/brands/${brand}` },
  }
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params
  const meta = brandMeta[brand]
  if (!meta) notFound()

  const brandName = brandSlugToName[brand]
  const brandProducts = products.filter(
    (p) => p.brand?.toLowerCase() === brandName?.toLowerCase()
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Главная</Link>
        <span className="mx-2">/</span>
        <Link href="/brands" className="hover:text-primary">Бренды</Link>
        <span className="mx-2">/</span>
        <span>{meta.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-foreground mb-3">
        Плитка {meta.name} в СПб
      </h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">{meta.description}</p>

      {brandProducts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-2">Товары этого бренда скоро появятся</p>
          <p className="text-sm mb-6">Позвоните нам — уточним наличие и цены</p>
          <a
            href="tel:+79052050900"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            +7 (905) 205-09-00
          </a>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-6">{brandProducts.length} товаров</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {brandProducts.map((product) => (
              <Link
                key={product.id}
                href={`/catalog/${product.slug}`}
                className="group block border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all"
              >
                {product.main_image && (
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img
                      src={`https://images.weserv.nl/?url=${encodeURIComponent(product.main_image)}&w=300&h=300&fit=cover&output=webp`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-3">
                  <p className="text-xs text-muted-foreground mb-1">{product.collection}</p>
                  <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </p>
                  {product.price_retail > 0 && (
                    <p className="text-sm font-semibold text-primary mt-1">
                      {product.price_retail.toLocaleString("ru-RU")} ₽/м²
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
