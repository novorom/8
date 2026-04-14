import type { MetadataRoute } from "next"
import { products } from "@/lib/products-data"

const SITE_URL = "https://plitki-spb.ru"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/catalog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/collections`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/delivery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contacts`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ]

  // SEO landing pages
  const seoPages: MetadataRoute.Sitemap = [
    "spb",
    "keramicheskaya-plitka-spb",
    "keramogranit-spb",
    "plitka-dlya-vannoj-spb",
    "mozaika-spb",
    "dostavka-plitki-spb",
    "magazin-plitki-spb",
    "plitka-pod-derevo-spb",
    "plitka-pod-mramor-spb",
    "plitka-pod-beton-spb",
    "plitka-pod-kamen-spb",
    "plitka-dlya-kuhni-spb",
    "plitka-dlya-prihozhej-spb",
    "plitka-dlya-balkona-spb",
    "keramogranit-60x120-spb",
    "keramogranit-60x60-spb",
    "plitka-30x60-spb",
    "blog",
    "blog/kak-ukladyvat-plitku",
    "blog/kak-ukladyvat-mozaiku",
    "blog/rekomendatsii-po-zatirke",
    "blog/sertifikaty-kachestva",
    "keramogranit-pod-derevo-spb",
    "keramogranit-pod-mramor-spb",
    "downloads",
    "faq",
    "blog/kak-vybrat-plitku-dlya-vannoj",
    "blog/skolko-plitki-nuzhno-kupit",
    "blog/keramogranit-ili-laminat",
    "blog/formaty-plitki",
    "blog/plitka-dlya-kuhni-kak-vybrat",
    "blog/kak-uhazhivat-za-keramogranitom",
    "blog/kak-rezat-keramogranit",
    "blog/trendy-plitki-2025",
    "blog/keramogranit-dlya-balkona-i-terraisy",
    "blog/plitka-pod-mramor-v-interere",
    "blog/kak-sozdat-dizajn-vannoj-v-stile-loft",
    "blog/kerama-marazzi-kollektsii",
    "blog/azori-plitka-obzor",
    "blog/nefrit-keramika-obzor",
    "plitka-seraya-spb",
    "plitka-belaya-spb",
    "keramogranit-matovyy-spb",
    "plitka-dlya-dushi-spb",
    "plitka-nastennaya-spb",
    "keramogranit-45x90-spb",
    "plitka-dlya-ofisa-spb",
    "plitka-yanino-spb",
    "kafelnaya-plitka-spb",
    "plitka-dlya-fartuka-spb",
    "rasprodazha-plitki-spb",
    "keramogranit-optom-spb",
    "napolnaya-plitka-spb",
    "plitka-pod-kirpich-spb",
    "plitka-monokolor-spb",
  ].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
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
    lastModified: now,
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
  ].map((path) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: now,
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
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        images: allImages.length > 0 ? allImages : undefined,
      }
    })

  return [...staticPages, ...seoPages, ...brandPages, ...collectionPages, ...productPages]
}

// NOTE: brands pages are added automatically via the brands array above
// Add manually: /brands, /brands/kerama-marazzi, /brands/cersanit, etc.
