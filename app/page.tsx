import { Suspense } from "react"
import dynamic from "next/dynamic"

const HomeContent = dynamic(() => import("@/components/home-content").then(mod => ({ default: mod.HomeContent })), {
  loading: () => <div className="min-h-screen bg-background" />
})

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://plitki-spb.ru",
  name: "Плитки СПб — многобрендовый магазин керамической плитки",
  description: "Магазин керамической плитки и керамогранита в Санкт-Петербурге. Kerama Marazzi, Cersanit, Азори, Нефрит-Керамика и другие бренды. Склад в Янино.",
  url: "https://plitki-spb.ru",
  telephone: "+79052050900",
  email: "info@plitki-spb.ru",
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
      name: "Где находится склад и шоурум?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Склад и шоурум расположены в п. Янино-1, Ленинградская область — 15–20 минут от КАД по Мурманскому шоссе. Можно приехать и выбрать плитку вживую. Режим работы: Пн–Пт 10:00–16:45, шоурум ежедневно 10:00–17:00.",
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
      name: "Помогаете подобрать плитку под проект?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, бесплатно рассчитаем нужное количество по размерам помещения и поможем подобрать коллекцию. Звоните +7 (905) 205-09-00 или пишите в Telegram @flyroman — ответим быстро.",
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
