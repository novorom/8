import { NextResponse } from "next/server"
import { products } from "@/lib/products-data"

export async function GET(request: Request) {
  const host = request.headers.get("host") || "plitki-spb.ru"
  const protocol = host.includes("localhost") ? "http" : "https"
  const dynamicSiteUrl = `${protocol}://${host}`

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Плитки СПб</title>
    <link>${dynamicSiteUrl}</link>
    <description>Магазин плитки и керамогранита в Санкт-Петербурге. Kerama Marazzi, Cersanit, Азори и другие бренды со склада в СПб.</description>
`;

  const escapeXml = (unsafe: string | undefined | null) => {
    if (!unsafe) return "";
    return String(unsafe).replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };

  const items = products.filter(p => p.price_retail > 0).map((product) => {
    const stock = (product.stock_yanino || 0) + (product.stock_factory || 0)
    const availability = stock > 0 ? "in_stock" : "out_of_stock"
    const image = product.main_image || (product.images && product.images[0])
    
    // Google product category (Home & Garden > Tile)
    const googleCategory = "536" // Home & Garden > Decor > Wall Decals (or Tiles if available)
    
    const hasIdentifier = Boolean(product.sku)

    return `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${escapeXml(product.name)}</g:title>
      <g:description>${escapeXml(product.description || `${product.name} коллекции ${product.collection || ""} от ${product.brand || "Плитки СПб"}. Купить в Санкт-Петербурге.`)}</g:description>
      <g:link>${escapeXml(`${dynamicSiteUrl}/catalog/${product.slug}`)}</g:link>
      <g:image_link>${escapeXml(image || "")}</g:image_link>
      <g:brand>${escapeXml(product.brand || "Плитки СПб")}</g:brand>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${product.price_retail} RUB</g:price>
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:shipping>
        <g:country>RU</g:country>
        <g:service>Standard</g:service>
        <g:price>1500 RUB</g:price>
      </g:shipping>
      ${hasIdentifier ? `<g:mpn>${escapeXml(product.sku)}</g:mpn>` : ""}
      <g:identifier_exists>${hasIdentifier ? "yes" : "no"}</g:identifier_exists>
    </item>`
  }).join("\n");

  const xmlFooter = `
  </channel>
</rss>`;

  return new NextResponse(xmlHeader + items + xmlFooter, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  })
}
