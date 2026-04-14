import { SeoLandingPage } from "@/components/seo-landing-page"
import { seoPages } from "@/lib/seo-data"
import { Metadata } from "next"
import { notFound } from "next/navigation"

const slug = "keramogranit-60x120-spb"

export async function generateMetadata(): Promise<Metadata> {
  const data = seoPages[slug as keyof typeof seoPages]
  if (!data) return {}

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://plitki-spb.ru/${slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://plitki-spb.ru/${slug}`,
      siteName: "Плитки СПб",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export default function Page() {
  const data = seoPages[slug as keyof typeof seoPages]
  if (!data) notFound()

  return <SeoLandingPage data={data} />
}
