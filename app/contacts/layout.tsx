import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Контакты магазина плитки Cersanit в СПб -- телефон, Telegram, адрес",
  description:
    "Свяжитесь с нами: +7 (905) 205-09-00, Telegram @flyroman, email novorom@mail.ru. Склад в Янино-1 (СПб). Режим работы: Пн-Пт 10:00-16:45. Доставка плитки по СПб и ЛО.",
  openGraph: {
    title: "Контакты магазина Плитки СПб",
    description: "Наш склад, шоурум и пункт самовывоза в Янино-1. Телефоны, режим работы, схема проезда.",
  },
}

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
