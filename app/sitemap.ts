import type { MetadataRoute } from "next"
import { products } from "@/lib/products-data"
import { seoPages } from "@/lib/seo-data"

const SITE_URL = "https://plitki-spb.ru"

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/stroy`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/catalog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/collections`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/brands`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/delivery`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/reviews`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contacts`, changeFrequency: "monthly", priority: 0.7 },
  ]

  // SEO landing pages
  const seoPagesList: MetadataRoute.Sitemap = Object.keys(seoPages).map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Only include collection pages with enough distinct products to be useful in search.
  // Several differently cased source names normalize to the same URL, so deduplicate by slug.
  const collectionCounts = new Map<string, number>()
  for (const product of products) {
    if (!product.slug || !product.name?.trim() || !product.collection?.trim() || product.collection.toLowerCase() === "other") continue
    const slug = product.collection
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-zа-яё0-9-]/gi, "")
      .slice(0, 80)
    collectionCounts.set(slug, (collectionCounts.get(slug) || 0) + 1)
  }
  const collectionPages: MetadataRoute.Sitemap = [...collectionCounts.entries()]
    .filter(([, count]) => count >= 3)
    .map(([slug]) => ({
      url: `${SITE_URL}/collections/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))

  // Brand pages
  const brandPages: MetadataRoute.Sitemap = [
    { slug: "kerama-marazzi", brand: "Kerama Marazzi" },
    { slug: "cersanit", brand: "Cersanit" },
    { slug: "azori", brand: "Азори" },
    { slug: "nefrit-keramika", brand: "Нефрит-Керамика" },
    { slug: "granitea", brand: "Гранитея" },
    { slug: "bonapart", brand: "Бонапарт" },
    { slug: "gracia-ceramica", brand: "Gracia Ceramica" },
    { slug: "idalgo", brand: "Идальго" },
    { slug: "dako", brand: "Dako" },
    { slug: "eletto", brand: "Элетто" },
    { slug: "alma-ceramica", brand: "Alma Ceramica" },
    { slug: "pieza-rosa", brand: "Pieza ROSA" },
  ]
    .filter(({ brand }) => products.filter((product) => product.brand?.toLowerCase() === brand.toLowerCase() && product.slug && product.name).length >= 3)
    .map(({ slug }) => ({
    url: `${SITE_URL}/brands/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))
  brandPages.push({ url: `${SITE_URL}/brands`, changeFrequency: "monthly", priority: 0.7 })

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
            changeFrequency: "weekly" as const,
        priority: 0.8,
        images: allImages.length > 0 ? allImages : undefined,
      }
    })

  return [...staticPages, ...seoPagesList, ...brandPages, ...collectionPages, ...productPages]
}

// NOTE: brands pages are added automatically via the brands array above
// Add manually: /brands, /brands/kerama-marazzi, /brands/cersanit, etc.
