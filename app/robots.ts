import type { MetadataRoute } from "next"

const SITE_URL = "https://plitki-spb.ru"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/cart",
          "/*.json$",
          "/checkout",
          "*?search=",
          "*?sort=",
          "*?min_price=",
          "*?max_price=",
        ],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/cart",
          "/*.json$",
          "/checkout",
          "*?search=",
          "*?sort=",
          "*?min_price=",
          "*?max_price=",
          "*?utm_source=",
        ],
        crawlDelay: 1,
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
