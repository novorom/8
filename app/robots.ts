import type { MetadataRoute } from "next"

const SITE_URL = "https://cersanit-spb.ru"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/cart", "/*.json$", "/checkout"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/cart", "/*.json$", "/checkout"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/admin/", "/api/", "/cart", "/*.json$", "/checkout"],
        crawlDelay: 1,
      },
      // AI bots — разрешаем для видимости в AI-ответах
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // llms.txt: `${SITE_URL}/llms.txt`,
    host: SITE_URL,
  }
}
