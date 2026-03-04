import type { Metadata } from "next"
import { CollectionsClient } from "./collections-client"
import { products } from "@/lib/products-data"

export const metadata: Metadata = {
  title: "Коллекции Cersanit -- керамическая плитка и керамогранит в СПб",
  description:
    "Все коллекции Cersanit в наличии на складе в Янино. Керамическая плитка, керамогранит, мозаика. Купить с доставкой по СПб и ЛО.",
  alternates: { canonical: "/collections" },
}

export default function CollectionsPage() {
  const allCollectionNames = [
    ...new Set(
      products
        .filter((p) => p.collection && p.collection.trim() && p.collection.toLowerCase() !== "other")
        .map((p) => p.collection as string)
    ),
  ]

  const initialCollections = allCollectionNames
    .map((collName) => {
      const collectionProducts = products.filter((p) => p.collection === collName)
      
      // Собираем все интерьерные фото коллекции
      const allInteriorImages = collectionProducts
        .flatMap((p) => (p.interior_images as string[] | undefined) || [])
        .filter(Boolean)

      // Берём первую интерьерку, или collection_image, или main_image
      const image =
        allInteriorImages[0] ||
        collectionProducts[0]?.collection_image ||
        collectionProducts[0]?.main_image ||
        ""

      return {
        id: collName,
        name: collName,
        slug: collName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zа-яё0-9-]/gi, ""),
        image,
        product_count: collectionProducts.length,
        types: [
          ...new Set(collectionProducts.map((p) => p.product_type).filter(Boolean)),
        ] as string[],
      }
    })
    .filter((c) => c.product_count > 0)

  return <CollectionsClient initialCollections={initialCollections} />
}
