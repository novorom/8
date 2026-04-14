import { NextResponse } from "next/server"
import { products } from "@/lib/products-data"

export async function GET() {
  const SITE_URL = "https://plitki-spb.ru"

  const xmlHeader = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE yml_catalog SYSTEM "shops.dtd">
<yml_catalog date="${new Date().toISOString().substring(0, 16)}">
  <shop>
    <name>Плитки СПб</name>
    <company>ООО "Плитки СПб"</company>
    <url>${SITE_URL}</url>
    <currencies>
      <currency id="RUB" rate="1"/>
    </currencies>
    <categories>
      <category id="1">Керамическая плитка</category>
      <category id="2">Керамогранит</category>
      <category id="3">Мозаика</category>
      <category id="4">Ступени</category>
      <category id="5">Прочее</category>
    </categories>
    <offers>
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


  const offers = products.filter(p => p.price_retail > 0).map((product) => {
    let categoryId = "5"
    if (product.product_type?.toLowerCase().includes("гранит")) categoryId = "2"
    else if (product.product_type?.toLowerCase().includes("плитка")) categoryId = "1"
    else if (product.product_type?.toLowerCase().includes("мозаика")) categoryId = "3"
    else if (product.product_type?.toLowerCase().includes("ступень")) categoryId = "4"

    const rawImage = product.main_image || (product.images && product.images[0])
    const picture = rawImage ? `\n        <picture>${escapeXml(rawImage)}</picture>` : ""
    const oldPrice = product.price_official && product.price_official > product.price_retail 
      ? `\n        <oldprice>${product.price_official}</oldprice>` : ""
    const stock = (product.stock_yanino || 0) + (product.stock_factory || 0)
    const available = stock > 0 ? "true" : "false"

    return `      <offer id="${escapeXml(product.id)}" available="${available}">
        <url>${escapeXml(`${SITE_URL}/catalog/${product.slug || product.id}`)}</url>
        <price>${product.price_retail}</price>${oldPrice}
        <currencyId>RUB</currencyId>
        <categoryId>${categoryId}</categoryId>${picture}
        <store>true</store>
        <pickup>true</pickup>
        <delivery>true</delivery>
        <name>${escapeXml(product.name)}</name>
        <vendor>${escapeXml(product.brand || "Cersanit")}</vendor>
        <description><![CDATA[${product.name} коллекции ${product.collection || ""} формата ${product.format || ""}. ${stock > 0 ? "В наличии на складе в Янино." : ""}]]></description>
      </offer>`
  }).join("\n");

  const xmlFooter = `
    </offers>
  </shop>
</yml_catalog>`;

  return new NextResponse(xmlHeader + offers + xmlFooter, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  })
}
