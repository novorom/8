import Link from "next/link"
import type { Metadata } from "next"
import { BrandLogo } from "./brand-logo"

export const metadata: Metadata = {
  title: "Все бренды плитки в СПб — Kerama Marazzi, Cersanit, Азори",
  description: "Каталог плитки по брендам. Kerama Marazzi, Cersanit, Азори, Нефрит-Керамика, Урал Гранит и другие. Склад в Янино, доставка по СПб и ЛО.",
  alternates: { canonical: "/brands" },
}

const brands = [
  {
    slug: "kerama-marazzi",
    name: "Kerama Marazzi",
    description: "Крупнейший российский производитель керамической плитки и керамогранита. Широкий ассортимент коллекций для любого интерьера.",
    count: "456+ позиций",
    color: "#c8102e",
    logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174049/brands/kerama-marazzi.png",
  },
  {
    slug: "cersanit",
    name: "Cersanit",
    description: "Польский бренд с европейским качеством. Керамическая плитка и керамогранит для ванных комнат, кухонь и общественных пространств.",
    count: "116+ позиций",
    color: "#1e3a8a",
    logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174048/brands/cersanit.png",
  },
  {
    slug: "azori",
    name: "Азори",
    description: "Российский производитель керамической плитки с богатой палитрой дизайнов. Стильные коллекции по доступным ценам.",
    count: "661+ позиций",
    color: "#0f766e",
    logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174046/brands/azori.png",
  },
  {
    slug: "nefrit-keramika",
    name: "Нефрит-Керамика",
    description: "Один из крупнейших отечественных производителей. Широкий выбор плитки для ванной, кухни и жилых помещений.",
    count: "200+ позиций",
    color: "#166534",
    logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174050/brands/nefrit-keramika.jpg",
  },
  {
    slug: "ural-granit",
    name: "Урал Гранит / Гранитея",
    description: "Российский керамогранит. Прочный, морозостойкий, подходит для улицы и промышленных помещений.",
    count: "300+ позиций",
    color: "#7c3aed",
    logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174051/brands/ural-granit.jpg",
  },
  {
    slug: "bonaparte",
    name: "Бонапарт",
    description: "Широкий ассортимент керамической плитки различных форматов и дизайнов для любых помещений.",
    count: "400+ позиций",
    color: "#b45309",
    logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174047/brands/bonaparte.png",
  },
  {
    slug: "gracia-keramika",
    name: "Грация Керамика",
    description: "Доступная керамическая плитка российского производства. Большой выбор цветов и форматов.",
    count: "300+ позиций",
    color: "#0369a1",
    logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174048/brands/gracia-keramika.png",
  },
  {
    slug: "idalgo",
    name: "Идальго",
    description: "Керамогранит и керамическая плитка. Современные дизайны под дерево, камень и бетон.",
    count: "100+ позиций",
    color: "#92400e",
    logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174049/brands/idalgo.jpg",
  },
  {
    slug: "eletto",
    name: "Элетто",
    description: "Современный бренд с актуальными дизайнами. Плитка высокого качества для стильных интерьеров.",
    count: "217+ позиций",
    color: "#be123c",
    logo: "",
  },
  {
    slug: "alma-ceramica",
    name: "Alma Ceramica",
    description: "Один из крупнейших российских производителей. Огромный выбор коллекций в европейском стиле.",
    count: "500+ позиций",
    color: "#0369a1",
    logo: "",
  },
  {
    slug: "pieza-rosa",
    name: "Pieza ROSA",
    description: "Надежный производитель керамической плитки с широким ассортиментом и доступными ценами.",
    count: "372+ позиций",
    color: "#4d7c0f",
    logo: "",
  },
  {
    slug: "dako",
    name: "Dako",
    description: "Практичный керамогранит популярных форматов для жилых и коммерческих помещений.",
    count: "24+ позиции",
    color: "#475569",
    logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174052/brands/dako.jpg",
  },
]

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Главная</Link>
        <span className="mx-2">/</span>
        <span>Бренды</span>
      </nav>

      <h1 className="text-3xl font-bold text-foreground mb-3">Бренды плитки в наличии</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Работаем напрямую с поставщиком — Линкер СПб. Весь ассортимент ведущих брендов на складе в Янино.
        Самовывоз бесплатно, доставка по СПб и Ленобласти.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="group block border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all bg-card"
          >
            {/* Logo area */}
            <div className="h-28 flex items-center justify-center p-5 bg-white">
              <BrandLogo src={brand.logo} alt={brand.name} color={brand.color} />
            </div>
            {/* Color bar */}
            <div className="h-1" style={{ backgroundColor: brand.color }} />
            {/* Content */}
            <div className="p-4">
              <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {brand.name}
              </h2>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{brand.description}</p>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {brand.count}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
