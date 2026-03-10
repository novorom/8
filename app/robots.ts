import type { MetadataRoute } from "next"

const SITE_URL = "https://plitki-spb.ru"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/cart", "/*.json$", "/checkout"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/admin/", "/api/", "/cart", "/*.json$", "/checkout"],
        crawlDelay: 1,
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
