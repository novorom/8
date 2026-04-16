import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "Купить плитку в СПб и ЛО — Керамогранит, Кафель, Мозаика со склада",
  description: "Огромный выбор керамической плитки и керамогранита в Санкт-Петербурге. Официальный дилер мировых брендов. Склад в Янино, доставка от 1 дня. Низкие цены, фото в интерьере.",
  alternates: {
    canonical: "https://plitki-spb.ru",
  },
}

const HomeContent = dynamic(() => import("@/components/home-content").then(mod => ({ default: mod.HomeContent })), {
  loading: () => <div className="min-h-screen bg-background" />
})

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://plitki-spb.ru/#localbusiness",
  name: "Плитки СПб — плитка и керамогранит в СПб и Ленобласти",
  description: "Крупнейший поставщик керамической плитки и керамогранита в Санкт-Петербурге и Ленинградской области. Официальный дилер Kerama Marazzi, Cersanit, Азори. Складский хаб в Янино.",
  url: "https://plitki-spb.ru",
  telephone: "+7 (905) 205-09-00",
  email: "novorom@mail.ru",
  address: {
    "@type": "PostalAddress",
    streetAddress: "п. Янино-1",
    addressLocality: "Санкт-Петербург",
    addressRegion: "Ленинградская область",
    postalCode: "188679",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 59.9765,
    longitude: 30.6132,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "16:45",
    },
  ],
  priceRange: "₽₽",
  currenciesAccepted: "RUB",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  hasMap: "https://yandex.ru/maps/-/CDeFRsEL",
  sameAs: [
    "https://www.avito.ru/brands/i1860592/all/remont_i_stroitelstvo?src=sharing&sellerId=1175db1d93c4ba564bc712e7e695d5b5",
  ],
}

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Какие бренды плитки есть в наличии?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "На складе в Янино представлены ведущие бренды: Kerama Marazzi, Cersanit, Азори, Нефрит-Керамика, Бонапарт, Элетто, Идальго, Dako, Квадро Декор. Более 3000 позиций для любых задач и бюджетов.",
      },
    },
      {
        "@type": "Question",
        name: "Где находится склад и пункт выдачи?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Наш складской терминал и шоурум расположены в п. Янино-1, Ленинградская область (рядом с КАД). Это удобная точка отгрузки для жителей Санкт-Петербурга и всей области. Режим работы: Пн–Пт 10:00–16:45, шоурум ежедневно 10:00–17:00.",
        },
      },
    {
      "@type": "Question",
      name: "Как быстро доставляете по Санкт-Петербургу?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Доставка по СПб и Ленинградской области — от 1–2 рабочих дней. Самовывоз со склада Янино бесплатный в день оплаты. Стоимость доставки рассчитывается индивидуально.",
      },
    },
      {
        "@type": "Question",
        name: "Помогаете подобрать плитку жителям области?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, мы работаем со всем регионом. Бесплатно рассчитаем нужное количество и поможем подобрать коллекцию удаленно. Склад в Янино удобно расположен для быстрой отгрузки в любой район СПб и ЛО.",
        },
      },
    {
      "@type": "Question",
      name: "Работаете с юридическими лицами и строителями?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, работаем с юридическими лицами, ремонтными бригадами и строительными компаниями. Предоставляем полный пакет документов: счета-фактуры, накладные, сертификаты. Оплата по безналичному расчёту с НДС.",
      },
    },
  ],
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <HomeContent />
      </Suspense>
    </div>
  )
}
