import type { Metadata } from "next"
import { SeoLandingPage } from "@/components/seo-landing-page"
import { seoPages, SITE_URL } from "@/lib/seo-data"

const data = seoPages["deshevaya-plitka-spb"]

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  alternates: { canonical: `${SITE_URL}/deshevaya-plitka-spb` },
  openGraph: {
    title: data.title,
    description: data.description,
    url: `${SITE_URL}/deshevaya-plitka-spb`,
    siteName: "Плитки СПб",
    locale: "ru_RU",
    type: "website",
  },
}

export default function Page() {
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
                item: `${SITE_URL}/deshevaya-plitka-spb`,
              },
            ],
          }),
        }}
      />
      <SeoLandingPage data={data} />
    </>
  )
}
