import type { Metadata } from "next"
import { SeoLandingPage } from "@/components/seo-landing-page"
import { seoPages, SITE_URL } from "@/lib/seo-data"
import { TileCalculator } from "@/components/tile-calculator"

const data = seoPages["calculator-plitki-spb"]

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  alternates: { canonical: `${SITE_URL}/calculator-plitki-spb` },
  openGraph: {
    title: data.title,
    description: data.description,
    url: `${SITE_URL}/calculator-plitki-spb`,
    siteName: "Плитки СПб",
    locale: "ru_RU",
    type: "website",
  },
}

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: data.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: data.breadcrumbLabel,
                item: `${SITE_URL}/calculator-plitki-spb`,
              },
            ],
          }),
        }}
      />
      
      <SeoLandingPage data={data}>
        <div className="mt-8">
          <TileCalculator />
        </div>
      </SeoLandingPage>
    </>
  )
}
