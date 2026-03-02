import { Suspense } from "react"
import dynamic from "next/dynamic"

const HomeContent = dynamic(() => import("@/components/home-content").then(mod => ({ default: mod.HomeContent })), {
  loading: () => <div className="min-h-screen bg-background" />
})

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://cersanit-spb.ru",
  name: "Дом Плитки CERSANIT — официальный дилер в Санкт-Петербурге",
  description: "Официальный дилер Cersanit в СПб. Керамическая плитка и керамогранит в наличии на складе. Более 750 позиций.",
  url: "https://cersanit-spb.ru",
  telephone: "+79052050900",
  email: "info@cersanit-spb.ru",
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
    "https://www.avito.ru/user/cersanit-spb",
  ],
}

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Вы официальный дилер Cersanit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, мы являемся официальным дилером Cersanit в России. Все товары поставляются напрямую с заводов, имеют сертификаты качества и гарантию производителя. Работаем на рынке керамической плитки с 2011 года.",
      },
    },
    {
      "@type": "Question",
      name: "Где находится ваш склад?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Наш склад расположен в п. Янино-1, Ленинградская область (15-20 минут от КАД). Здесь хранится весь ассортимент -- более 750 наименований. Режим работы: Пн-Пт 10:00-16:45.",
      },
    },
    {
      "@type": "Question",
      name: "Как быстро доставляете по Санкт-Петербургу?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Доставка по СПб и Ленинградской области -- от 1-2 рабочих дней. Самовывоз со склада Янино бесплатный в день оплаты.",
      },
    },
    {
      "@type": "Question",
      name: "Помогаете рассчитать количество плитки?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, мы бесплатно рассчитаем нужное количество плитки по размерам вашего помещения. Свяжитесь с нами по телефону +7 (905) 205-09-00 или в Telegram @flyroman.",
      },
    },
    {
      "@type": "Question",
      name: "Работаете с юридическими лицами?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, работаем с юридическими лицами и строительными компаниями. Предоставляем все документы: сертификаты качества, счета-фактуры, товарные накладные. Оплата по безналичному расчёту с НДС.",
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
