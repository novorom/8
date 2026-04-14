import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CartProvider } from "@/lib/cart-context"
import { ProductsProvider } from "@/lib/products-context"
import { ExitIntentPopup } from "@/components/exit-intent"
import { AbandonedCartNotification } from "@/components/abandoned-cart-notification"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

const SITE_URL = "https://plitki-spb.ru"

export const metadata: Metadata = {
  title: {
    default: "Купить плитку в СПб и Ленинградской области — Kerama Marazzi, Cersanit, Азори",
    template: "%s | Плитки СПб",
  },
  description:
    "Магазин керамической плитки в Санкт-Петербурге и ЛО. Официальный дилер Kerama Marazzi, Cersanit, Азори. Пункт самовывоза на складе в Янино. Быстрая доставка по всему региону от 1 дня.",
  metadataBase: new URL(SITE_URL),
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
    "google-site-verification": "v-K-h-z-r-S-w-E-L-I-f-i-c-a-t-i-o-n", // Replace with real one if available
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
  alternateName: ["Плитки СПб", "Plitki SPb", "Магазин плитки Cersanit"],
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7 (905) 205-09-00",
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
  telephone: "+7 (905) 205-09-00",
  email: "novorom@mail.ru",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(99155021, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
              });
            `,
          }}
        />
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://mc.yandex.ru/watch/99155021" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
      </head>
      <body className={`${inter.className} antialiased`}>
        <ProductsProvider>
          <CartProvider>
            <SiteHeader />
            <main className="min-h-screen">{children}</main>
            <SiteFooter />
            <FloatingWhatsApp />
            <ScrollToTop />
            <ExitIntentPopup />
            <AbandonedCartNotification />
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  )
}
