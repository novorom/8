import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SeoLandingPage } from "@/components/seo-landing-page"
import { seoPages, SITE_URL } from "@/lib/seo-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(seoPages).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = seoPages[slug]

  if (!data) {
    return {}
  }

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `${SITE_URL}/${slug}` },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${SITE_URL}/${slug}`,
      siteName: "Плитки СПб",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export default async function DynamicSeoPage({ params }: PageProps) {
  const { slug } = await params
  const data = seoPages[slug]

  if (!data) {
    notFound()
  }

  return (
    <>

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
                item: `${SITE_URL}/${slug}`,
              },
            ],
          }),
        }}
      />
      <SeoLandingPage data={data} />
    </>
  )
}
