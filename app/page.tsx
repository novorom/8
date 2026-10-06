import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "Купить плитку в СПб и ЛО — Керамогранит, Кафель, Мозаика со склада",
  description: "Керамическая плитка, керамогранит и мозаика в Санкт-Петербурге. Подберите товар по бренду, коллекции, размеру или артикулу; проверьте цену и остаток в каталоге.",
  alternates: {
    canonical: "https://plitki-spb.ru",
  },
}

const HomeContent = dynamic(() => import("@/components/home-content").then(mod => ({ default: mod.HomeContent })), {
  loading: () => <div className="min-h-screen bg-background" />
})

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Какие бренды плитки есть в наличии?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "В каталоге представлены плитка и керамогранит разных брендов, включая Kerama Marazzi, Cersanit, Азори и Нефрит-Керамика. Ассортимент, цена и остаток указаны в карточке каждого товара.",
      },
    },
      {
        "@type": "Question",
        name: "Где находится склад и пункт выдачи?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Перед самовывозом уточните у менеджера адрес склада, наличие выбранных товаров и время отгрузки.",
        },
      },
    {
      "@type": "Question",
      name: "Как быстро доставляете по Санкт-Петербургу?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Доставка по СПб и Ленинградской области — от 1–2 рабочих дней. Самовывоз со склада СПб бесплатный в день оплаты. Стоимость доставки рассчитывается индивидуально.",
      },
    },
      {
        "@type": "Question",
        name: "Помогаете подобрать плитку жителям области?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, мы работаем со всем регионом. Бесплатно рассчитаем нужное количество и поможем подобрать коллекцию удаленно. Склад в СПб удобно расположен для быстрой отгрузки в любой район СПб и ЛО.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <HomeContent />
      </Suspense>
    </div>
  )
}
