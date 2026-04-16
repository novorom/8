import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Доставка плитки Cersanit по СПб и ЛО -- самовывоз со склада Янино",
  description:
    "Доставка керамической плитки и керамогранита Cersanit по Санкт-Петербургу и Ленинградской области от 1 дня. Бесплатный самовывоз со склада в Янино. Доставка по всей России.",
  openGraph: {
    title: "Доставка плитки по Санкт-Петербургу и Ленинградской области",
    description: "Быстрая доставка керамической плитки со склада в Янино. Собственный транспорт, грузчики. Условия и стоимость.",
  },
}

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
