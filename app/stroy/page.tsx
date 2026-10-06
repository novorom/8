import type { Metadata } from "next"
import StroyLandingClient from "./stroy-landing-client"

export const metadata: Metadata = {
  title: "Плитка и керамогранит для строителей в СПб — ТФ Керамика",
  description: "Плитка и керамогранит для строительных бригад в Санкт-Петербурге и Ленинградской области. Склад в Войскорово, цены с НДС, оплата по счёту, самовывоз и доставка. Бесплатно рассчитаем количество.",
  alternates: {
    canonical: "https://plitki-spb.ru/stroy",
  },
}

export default function StroyPage() {
  return <StroyLandingClient />
}
