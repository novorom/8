"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Truck,
  Package,
  ShieldCheck,
  Minus,
  Plus,
  MapPin,
} from "lucide-react"
import { ProductGallery } from "@/components/product-gallery"
import { ProductSpecIcons } from "@/components/product-spec-icons"
import { InteriorPhotos } from "@/components/interior-photos"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/lib/cart-context"
import { useProducts } from "@/lib/products-context"
import { QuickBuyModal } from "@/components/quick-buy-modal"

// Релевантные статьи блога для разных типов плитки
const BLOG_LINKS_BY_TYPE: Record<string, Array<{slug: string, title: string, desc: string}>> = {
  marble: [
    { slug: "plitka-pod-mramor-v-interere", title: "Плитка под мрамор в интерьере", desc: "Роскошь без больших затрат" },
    { slug: "trendy-plitki-2025", title: "Тренды плитки 2025", desc: "Актуальные дизайны" },
    { slug: "kak-vybrat-plitku-dlya-vannoj", title: "Как выбрать плитку для ванной", desc: "Полный гид" },
  ],
  wood: [
    { slug: "keramogranit-ili-laminat", title: "Керамогранит или ламинат?", desc: "Что лучше выбрать для пола" },
    { slug: "kak-uhazhivat-za-keramogranitom", title: "Уход за керамогранитом", desc: "Правила чистки и защиты" },
    { slug: "formaty-plitki", title: "Форматы плитки", desc: "Как выбрать нужный размер" },
  ],
  concrete: [
    { slug: "kak-sozdat-dizajn-vannoj-v-stile-loft", title: "Дизайн ванной в стиле лофт", desc: "Плитка под бетон и кирпич" },
    { slug: "trendy-plitki-2025", title: "Тренды плитки 2025", desc: "Актуальные дизайны" },
    { slug: "kak-ukladyvat-plitku", title: "Как укладывать плитку", desc: "Пошаговая инструкция" },
  ],
  mosaic: [
    { slug: "kak-ukladyvat-mozaiku", title: "Как укладывать мозаику", desc: "Пошаговая инструкция" },
    { slug: "rekomendatsii-po-zatirke", title: "Рекомендации по затирке", desc: "Как затирать швы правильно" },
    { slug: "kak-vybrat-plitku-dlya-vannoj", title: "Как выбрать плитку для ванной", desc: "Полный гид" },
  ],
  default: [
    { slug: "kak-vybrat-plitku-dlya-vannoj", title: "Как выбрать плитку для ванной", desc: "Полный гид" },
    { slug: "skolko-plitki-nuzhno-kupit", title: "Как рассчитать количество плитки", desc: "Формулы и советы" },
    { slug: "rekomendatsii-po-zatirke", title: "Рекомендации по затирке", desc: "Как затирать швы правильно" },
  ],
}

function getBlogLinks(name?: string) {
  if (!name) return BLOG_LINKS_BY_TYPE.default
  const n = name.toLowerCase()
  if (n.includes("calacatta") || n.includes("marble") || n.includes("мрамор") || n.includes("royal stone") || n.includes("travertino") || n.includes("limestone")) return BLOG_LINKS_BY_TYPE.marble
  if (n.includes("wood") || n.includes("дерево") || n.includes("oak") || n.includes("timber") || n.includes("loft") || n.includes("concrete") || n.includes("northwood") || n.includes("amberwood") || n.includes("woodhouse")) return BLOG_LINKS_BY_TYPE.wood
  if (n.includes("concrete") || n.includes("бетон") || n.includes("loft") || n.includes("soft")) return BLOG_LINKS_BY_TYPE.concrete
  if (n.includes("mozaika") || n.includes("mosaic") || n.includes("мозаик")) return BLOG_LINKS_BY_TYPE.mosaic
  return BLOG_LINKS_BY_TYPE.default
}

type TabId = "description" | "specs" | "delivery"

// Блог: подбираем релевантную статью по типу/коллекции
function getBlogLink(productType: string, collection: string): { href: string; label: string } | null {
  if (productType === "Мозаика") return { href: "/blog/kak-ukladyvat-mozaiku", label: "Как укладывать мозаику" }
  if (collection.toLowerCase().includes("calacatta") || collection.toLowerCase().includes("marble"))
    return { href: "/blog/kak-vybrat-plitku-dlya-vannoj", label: "Как выбрать плитку для ванной" }
  if (productType === "Керамогранит") return { href: "/blog/keramogranit-ili-laminat", label: "Керамогранит или ламинат — что лучше?" }
  if (productType === "Плитка") return { href: "/blog/kak-ukladyvat-plitku", label: "Как правильно укладывать плитку" }
  return { href: "/blog/kak-ukladyvat-plitku", label: "Советы по укладке" }
}

// Генерируем slug коллекции
function toCollectionSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zа-яё0-9-]/gi, "")
}

export function ProductPageClient({ slug }: { slug: string }) {
  const router = useRouter()
  const { addItem } = useCart()
  const { products } = useProducts()
  const product = products.find((p) => p.slug === slug) || products[0]
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>("description")

  // Сброс скролла при смене товара
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [slug])
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const relatedProducts = useMemo(() => {
    const same = products.filter(p => p.collection === product.collection && p.slug !== product.slug)
    if (same.length >= 4) return same.slice(0, 4)
    // Расширяем: по формату, цвету, типу
    const scored = products
      .filter(p => p.slug !== product.slug && p.collection !== product.collection)
      .map(p => {
        let score = 0
        if (p.format === product.format) score += 3
        if (p.color === product.color) score += 2
        if (p.product_type === product.product_type) score += 1
        return { p, score }
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ p }) => p)
    return [...same, ...scored].slice(0, 4)
  }, [products, product])

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price_retail,
      quantity,
      image: product.main_image || product.images?.[0],
    })
    router.push("/cart")
  }

  const totalStock = (product.stock_yanino ?? 0) + (product.stock_factory ?? 0)
  const hasDiscount = product.price_official && product.price_official > product.price_retail
  const priceUnit = ["Мозаика", "Ступень", "Плинтус", "Вставка", "Панно"].includes(product.product_type) ? "₽/шт" : "₽/м²"

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images || [],
    description:
      product.description ||
      `${product.name} — купить в Санкт-Петербурге со склада Янино. ${product.brand} коллекция ${product.collection}. Доставка по СПб и ЛО.`,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.sku,
    category: product.product_type,
    color: product.color,
    material: product.material_type,
    offers: {
      "@type": "Offer",
      url: `https://plitki-spb.ru/catalog/${product.slug}`,
      priceCurrency: "RUB",
      price: product.price_retail,
      availability:
        totalStock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      seller: { "@type": "Organization", name: "Плитки СПб" },
      areaServed: { "@type": "City", name: "Санкт-Петербург" },
      deliveryLeadTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 2,
        unitCode: "DAY",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "RUB",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "RU",
          addressRegion: "Санкт-Петербург",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
        },
      },
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "RU",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnMethod: "https://schema.org/ReturnByMail",
    },
    additionalProperty: [
      product.format && { "@type": "PropertyValue", name: "Формат", value: product.format },
      product.surface && { "@type": "PropertyValue", name: "Поверхность", value: product.surface },
      product.rectified && { "@type": "PropertyValue", name: "Ректификат", value: "Да" },
      product.frost_resistant && { "@type": "PropertyValue", name: "Морозостойкость", value: "Да" },
      product.wear_class && { "@type": "PropertyValue", name: "Класс износостойкости", value: product.wear_class },
      product.slip_class && { "@type": "PropertyValue", name: "Класс антискольжения", value: product.slip_class },
    ].filter(Boolean),
    ...(product.rating && product.rating > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(product.rating),
            reviewCount: String(product.reviews_count || 1),
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://plitki-spb.ru" },
      { "@type": "ListItem", position: 2, name: "Каталог", item: "https://plitki-spb.ru/catalog" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://plitki-spb.ru/catalog/${product.slug}` },
    ],
  }

  const tabs: { id: TabId; label: string }[] = [
    { id: "description", label: "Описание" },
    { id: "specs", label: "Характеристики" },
    { id: "delivery", label: "Доставка" },
  ]

  const specifications = [
    { label: "Артикул", value: product.sku },
    { label: "Бренд", value: product.brand },
    { label: "Коллекция", value: product.collection },
    { label: "Тип", value: product.product_type },
    { label: "Формат", value: product.format },
    { label: "Поверхность", value: product.surface },
    { label: "Цвет", value: product.color },
    { label: "Материал", value: product.material_type },
    { label: "Назначение", value: product.application },
    { label: "Толщина", value: product.thickness ? `${product.thickness} мм` : undefined },
    ...(product.pieces_per_box ? [{ label: "Штук в коробке", value: String(product.pieces_per_box) }] : []),
    ...(product.sqm_per_box ? [{ label: "М² в коробке", value: String(product.sqm_per_box) }] : []),
    { label: "Ректификат", value: product.rectified ? "Да" : undefined },
    { label: "Морозостойкость", value: product.frost_resistant ? "Да" : undefined },
    { label: "Класс износостойкости", value: product.wear_class || undefined },
    { label: "Класс антискольжения", value: product.slip_class || undefined },
    { label: "Водопоглощение", value: product.water_abs || undefined },
    { label: "Страна", value: product.country },
  ].filter((spec) => spec.value && spec.value !== "undefined" && spec.value !== "null")

  return (
    <>
    <div className="bg-muted/30 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
              Каталог
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-8">
        {/* Product top section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="lg:w-1/2">
            <ProductGallery
              images={product.images || []}
              videoUrl={product.video_url}
              name={product.name}
            />
          </div>

          {/* Product info */}
          <div className="lg:w-1/2 flex flex-col gap-5">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.is_new && (
                <span className="px-2.5 py-0.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">
                  Новинка
                </span>
              )}
              {product.is_bestseller && (
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-foreground text-xs font-medium">
                  Хит продаж
                </span>
              )}
              {product.rectified && (
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
                  Ректификат
                </span>
              )}
              {product.frost_resistant && (
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-50 text-cyan-700 text-xs font-medium border border-cyan-200">
                  Морозостойкий
                </span>
              )}
            </div>

            {/* Name */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {product.brand} / {product.collection}
              </p>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Арт. {product.sku}</p>
            </div>

            {/* ── ССЫЛКИ: коллекция + блог ── */}
            <div className="flex flex-wrap gap-2">
              {product.collection && (
                <Link
                  href={`/collections/${toCollectionSlug(product.collection)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted border border-border text-xs font-medium text-foreground hover:bg-accent hover:border-primary/30 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  Коллекция {product.collection}
                </Link>
              )}
              {(() => {
                const blog = getBlogLink(product.product_type, product.collection || "")
                return blog ? (
                  <Link
                    href={blog.href}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted border border-border text-xs font-medium text-foreground hover:bg-accent hover:border-primary/30 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    {blog.label}
                  </Link>
                ) : null
              })()}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                {product.price_retail.toLocaleString("ru-RU")} {priceUnit}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.price_official?.toLocaleString("ru-RU")} {"₽"}
                </span>
              )}
            </div>

            {/* Stock info */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${totalStock > 0 ? "bg-green-500" : "bg-destructive"}`} />
                <span className="text-sm font-medium text-foreground">
                  {totalStock > 0 ? "В наличии" : "Под заказ"}
                </span>
              </div>
              {totalStock > 0 && (
                <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  {(product.stock_yanino ?? 0) > 0 && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Склад Янино: {product.stock_yanino} м²</span>
                    </div>
                  )}
                  {(product.stock_factory ?? 0) > 0 && (
                    <div className="flex items-center gap-2">
                      <Package className="h-3.5 w-3.5" />
                      <span>Завод: {product.stock_factory} м²</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center border border-border rounded-xl overflow-hidden bg-background">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-11 w-11 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Уменьшить количество"
                >
                  <Minus className="h-4 w-4 text-foreground/70" />
                </button>
                <div className="h-11 w-14 flex items-center justify-center border-x border-border">
                  <span className="text-sm font-medium text-foreground">{quantity} м²</span>
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-11 w-11 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Увеличить количество"
                >
                  <Plus className="h-4 w-4 text-foreground/70" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                В корзину{" "}
                <span className="text-primary-foreground/70">
                  {(product.price_retail * quantity).toLocaleString("ru-RU")} {"₽"}
                </span>
              </button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`h-11 w-11 shrink-0 rounded-xl border flex items-center justify-center transition-colors ${
                  isFavorite
                    ? "border-destructive/30 bg-destructive/5"
                    : "border-border hover:bg-accent"
                }`}
                aria-label="Добавить в избранное"
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    isFavorite ? "fill-destructive text-destructive" : "text-foreground/60"
                  }`}
                />
              </button>
            </div>

            {/* Купить в 1 клик */}
            <button
              onClick={() => setIsQuickBuyOpen(true)}
              className="w-full h-11 rounded-xl border-2 border-primary text-primary font-medium text-sm hover:bg-primary/5 transition-colors"
            >
              Купить в 1 клик
            </button>

            {/* Messenger contacts — quick order */}
            <div className="flex gap-2">
              <a
                href={`https://t.me/flyroman?text=${encodeURIComponent(`Здравствуйте! Интересует плитка: ${product.name}${product.sku ? ` (арт. ${product.sku})` : ""}. Цена ${product.price_retail.toLocaleString("ru-RU")} ₽/м². Есть в наличии?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-11 inline-flex items-center justify-center gap-2 rounded-xl font-medium text-sm transition-colors text-white"
                style={{ background: "#2AABEE" }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.01 9.47c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.16 14.26l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.326z"/>
                </svg>
                Написать в Telegram
              </a>
              <a
                href={`https://wa.me/79052050900?text=${encodeURIComponent(`Здравствуйте! Интересует: ${product.name}${product.sku ? ` (арт. ${product.sku})` : ""}. Есть в наличии?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 shrink-0 inline-flex items-center justify-center rounded-xl text-white transition-colors"
                style={{ background: "#25D366" }}
                aria-label="Написать в WhatsApp"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>

            {/* ── ИКОНКИ ХАРАКТЕРИСТИК ── */}
            <ProductSpecIcons
              surface={product.surface}
              rectified={product.rectified}
              frostResistant={product.frost_resistant}
              wearClass={product.wear_class}
              slipClass={product.slip_class}
              waterAbs={product.water_abs}
            />

            {/* Quick info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {[
                { icon: Truck, label: "Доставка", value: "от 1-2 дней" },
                { icon: ShieldCheck, label: "Гарантия", value: "Сертификат" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border"
                >
                  <item.icon className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ИНТЕРЬЕРНЫЕ ФОТО ── */}
        {product.interior_images && product.interior_images.length > 0 && (
          <InteriorPhotos
            images={product.interior_images}
            productName={product.name}
            collectionName={product.collection}
          />
        )}

        {/* Tabs */}
        <div className="mt-12 lg:mt-16">
          <div className="border-b border-border">
            <div className="flex gap-0 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-6 lg:py-8">
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <p className="text-foreground/80 leading-relaxed">{product.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {(product.rooms ?? []).map((room) => (
                    <span
                      key={room}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      {room}
                    </span>
                  ))}
                </div>
                <div className="mt-8 p-5 rounded-xl bg-muted/50 border border-border">
                  <h3 className="text-base font-semibold text-foreground mb-3">
                    {`Купить ${product.name} в Санкт-Петербурге`}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {`${product.name} из коллекции ${product.collection} доступна к заказу в нашем магазине в Санкт-Петербурге. `}
                    {totalStock > 0
                      ? `В наличии на складе Янино${(product.stock_yanino ?? 0) > 0 ? ` — ${product.stock_yanino} м²` : ""}. Самовывоз бесплатно, доставка по СПб и ЛО от 1 рабочего дня. `
                      : "Доступно под заказ с завода Cersanit. "}
                    {"Бесплатный расчёт необходимого количества плитки. Оплата наличным и безналичным расчётом. Для юридических лиц — работа по счёту с НДС."}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-2xl">
                <div className="flex flex-col gap-0">
                  {specifications.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex items-center justify-between py-3 ${
                        i < specifications.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <span className="text-sm text-muted-foreground">{spec.label}</span>
                      <span className="text-sm font-medium text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="max-w-3xl flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Доставка</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { title: "Самовывоз со склада", desc: "Бесплатно. Склад в п. Янино-1 (Ленинградская обл.)", time: "Следующий рабочий день" },
                      { title: "Доставка по СПб и ЛО", desc: "Стоимость зависит от объёма заказа", time: "1-2 рабочих дня" },
                      { title: "Доставка по России", desc: "Транспортной компанией (СДЭК, Деловые линии)", time: "3-7 рабочих дней" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border">
                        <Truck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                          <p className="text-xs text-primary font-medium mt-1">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Оплата</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Наличный и безналичный расчёт. Для юридических лиц — оплата по счёту с НДС.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 lg:mt-12 pb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-6">Похожие товары</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
          {/* Полезные статьи */}
          <div className="mt-8 lg:mt-12 pb-4">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-6">Полезные статьи</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {getBlogLinks(product.collection).map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}
                  className="group flex flex-col bg-muted/40 rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all">
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2">{article.title}</span>
                  <span className="text-xs text-muted-foreground line-clamp-2">{article.desc}</span>
                  <span className="text-xs text-primary mt-3 group-hover:underline">Читать →</span>
                </Link>
              ))}
            </div>
          </div>
      </div>
    </div>
      <QuickBuyModal
        isOpen={isQuickBuyOpen}
        onClose={() => setIsQuickBuyOpen(false)}
        productName={product.name}
        productPrice={product.price_retail}
        productSku={product.sku || product.id}
      />
    </>
  )
}
