import type { MetadataRoute } from "next"
import { products } from "@/lib/products-data"
import { seoPages } from "@/lib/seo-data"

const SITE_URL = "https://plitki-spb.ru"

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable dated for sitemap (Yandex/Google prefers it over daily dynamic dates for unchanged content)
  const lastUpdate = "2026-04-16"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: lastUpdate, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/catalog`, lastModified: lastUpdate, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/collections`, lastModified: lastUpdate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/brands`, lastModified: lastUpdate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/delivery`, lastModified: lastUpdate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/reviews`, lastModified: lastUpdate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: lastUpdate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contacts`, lastModified: lastUpdate, changeFrequency: "monthly", priority: 0.7 },
  ]

  // SEO landing pages
  const seoPagesList: MetadataRoute.Sitemap = Object.keys(seoPages).map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: lastUpdate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Collection pages
  const collectionSlugs = [
    ...new Set(
      products
        .filter((p) => p.collection && p.collection.trim())
        .map((p) =>
          p.collection!
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-zа-яё0-9-]/gi, "")
        )
    ),
  ]
  const collectionPages: MetadataRoute.Sitemap = collectionSlugs.map((slug) => ({
    url: `${SITE_URL}/collections/${slug}`,
    lastModified: lastUpdate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }))


  // Brand pages
  const brandPages: MetadataRoute.Sitemap = [
    "brands",
    "brands/kerama-marazzi",
    "brands/cersanit",
    "brands/azori",
    "brands/nefrit-keramika",
    "brands/ural-granit",
    "brands/bonaparte",
    "brands/gracia-keramika",
    "brands/idalgo",
    "brands/dako",
    "brands/eletto",
    "brands/alma-ceramica",
    "brands/pieza-rosa",
  ].map((path) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: lastUpdate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Product pages — с image sitemap (все фото + интерьерные для Google/Яндекс Images)
  const productPages: MetadataRoute.Sitemap = products
    .filter((p) => p.slug)
    .map((product) => {
      const allImages: string[] = []

      // Основные фото товара
      if (product.images) {
        for (const img of product.images) {
          const urls = img.includes(";") ? img.split(";").map((s) => s.trim()).filter(Boolean) : [img]
          for (const url of urls) {
            if (url.startsWith("http") && !allImages.includes(url)) allImages.push(url)
          }
        }
      } else if (product.main_image) {
        allImages.push(product.main_image)
      }

      // Интерьерные фото
      if (product.interior_images) {
        for (const url of product.interior_images) {
          if (url.startsWith("http") && !allImages.includes(url)) allImages.push(url)
        }
      }

      return {
        url: `${SITE_URL}/catalog/${product.slug}`,
        lastModified: lastUpdate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        images: allImages.length > 0 ? allImages : undefined,
      }
    })

  return [...staticPages, ...seoPagesList, ...brandPages, ...collectionPages, ...productPages]
}

// NOTE: brands pages are added automatically via the brands array above
// Add manually: /brands, /brands/kerama-marazzi, /brands/cersanit, etc.
