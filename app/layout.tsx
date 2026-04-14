import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CartProvider } from "@/lib/cart-context"
import { ProductsProvider } from "@/lib/products-context"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

const SITE_URL = "https://plitki-spb.ru"

export const metadata: Metadata = {
  title: {
    default: "Купить плитку в СПб — Kerama Marazzi, Cersanit, Азори | Плитки СПб",
    template: "%s | Плитки СПб",
  },
  description:
    "Магазин плитки в Санкт-Петербурге. Kerama Marazzi, Cersanit, Азори, Нефрит-Керамика и другие бренды. Более 2000 позиций на складе в Янино. Доставка по СПб и ЛО от 1 дня.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Купить плитку в СПб — Kerama Marazzi, Cersanit, Азори",
    description: "Магазин плитки в Санкт-Петербурге. 2000+ позиций на складе Янино. Все ведущие бренды.",
    url: SITE_URL,
    siteName: "Плитки СПб",
    locale: "ru_RU",
    type: "website",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  other: {
    "geo.region": "RU-SPE",
    "geo.placename": "Санкт-Петербург",
    "yandex-verification": "1f85757551ab6b60",
  },
}

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Плитки СПб",
  alternateName: ["Дом Плитки", "Plitki SPb", "Магазин плитки Cersanit"],
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-905-205-09-00",
    contactType: "sales",
    areaServed: ["RU-SPE", "RU-LEN"],
    availableLanguage: "Russian",
  },
  sameAs: [
    "https://vk.com/tilebox",
    "https://www.avito.ru/brands/i1860592/all/remont_i_stroitelstvo?src=sharing&sellerId=1175db1d93c4ba564bc712e7e695d5b5",
    "https://t.me/flyroman",
  ],
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Плитки СПб",
  description: "Крупный магазин кафельной и керамической плитки, керамогранита в СПб. Оптом и в розницу. Склад в Янино. Доставка от 1 дня.",
  url: SITE_URL,
  telephone: "+7-905-205-09-00",
  email: "info@plitki-spb.ru",
  priceRange: "₽₽",
  address: {
    "@type": "PostalAddress",
    streetAddress: "п. Янино-1",
    addressLocality: "Санкт-Петербург",
    addressRegion: "Ленинградская область",
    postalCode: "188679",
    addressCountry: "RU",
  },
  geo: { "@type": "GeoCoordinates", latitude: "59.9765", longitude: "30.6132" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      description: "Склад и отгрузка",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "16:45",
    },
    {
      "@type": "OpeningHoursSpecification",
      description: "Шоурум",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "17:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Санкт-Петербург" },
    { "@type": "State", name: "Ленинградская область" },
  ],
}

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Плитки СПб",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/catalog?search={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
        <link rel="preconnect" href="https://images.weserv.nl" />
        <link rel="dns-prefetch" href="https://images.weserv.nl" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ProductsProvider>
          <CartProvider>
            <SiteHeader />
            <main className="min-h-screen">{children}</main>
            <SiteFooter />
            <FloatingWhatsApp />
            <ScrollToTop />
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  )
}
