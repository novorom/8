import type { Metadata } from "next"
import StroyLandingClient from "./stroy-landing-client"
import stroyItemsData from "./items-data.json"

export const metadata: Metadata = {
  title: "Плитка и керамогранит для строителей в СПб — ТФ Керамика",
  description: "Плитка и керамогранит для строительных бригад в Санкт-Петербурге и Ленинградской области. Склад в Войскорово, цены с НДС, оплата по счёту, самовывоз и доставка. Бесплатно рассчитаем количество.",
  alternates: {
    canonical: "https://plitki-spb.ru/stroy",
  },
  openGraph: {
    title: "Плитка и керамогранит для строителей в СПб — ТФ Керамика",
    description: "191 позиция плитки и керамогранита в наличии на складе в Войскорово. Цены с НДС, расчёт для организаций, самовывоз и доставка по Санкт-Петербургу и Ленинградской области.",
    url: "https://plitki-spb.ru/stroy",
    siteName: "ТФ Керамика",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Плитка и керамогранит для строителей в СПб — ТФ Керамика",
    description: "191 позиция в наличии. Склад в Войскорово, цены с НДС, самовывоз и доставка по СПб и Ленинградской области.",
  },
}

export default function StroyPage() {
  const products = stroyItemsData as Array<{
    t: string
    b?: string
    n: string
    s: string
    k: string
    g?: string
    q: number
    p: number | null
    img?: string
    ph?: string
  }>
  const itemPayload = JSON.stringify(stroyItemsData).replace(/</g, "\\u003c")

  return (
    <>
      <script id="stroy-items-data" type="application/json" dangerouslySetInnerHTML={{ __html: itemPayload }} />
      <StroyLandingClient initialItems={products.slice(0, 40)} />
    </>
  )
}
