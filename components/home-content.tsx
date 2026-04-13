"use client"

import { HeroSection } from "@/components/hero-section"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Truck, ShieldCheck, Award, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { useProducts } from "@/lib/products-context"

const homeFaq = [
  {
    question: "Какие бренды плитки есть в наличии?",
    answer:
      "На складе в Янино представлены ведущие бренды: Kerama Marazzi, Cersanit, Азори, Нефрит-Керамика, Бонапарт, Элетто, Идальго, Dako, Квадро Декор. Более 3000 позиций для любых задач и бюджетов.",
  },
  {
    question: "Где находится склад и шоурум?",
    answer:
      "Склад и шоурум в п. Янино-1, Ленобласть — 15–20 минут от КАД по Мурманскому шоссе. Приезжайте, чтобы увидеть плитку вживую. Режим работы: Пн–Пт 10:00–16:45.",
  },
  {
    question: "Как быстро доставляете по Санкт-Петербургу?",
    answer:
      "Доставка по СПб и Ленинградской области — от 1–2 рабочих дней. Самовывоз со склада Янино бесплатный в день оплаты. Стоимость доставки рассчитывается индивидуально.",
  },
  {
    question: "Помогаете подобрать плитку под проект?",
    answer:
      "Да, бесплатно рассчитаем нужное количество по размерам помещения и поможем подобрать коллекцию. Звоните +7 (905) 205-09-00 или пишите в Telegram @flyroman — ответим быстро.",
  },
  {
    question: "Работаете с юридическими лицами и строителями?",
    answer:
      "Да, работаем с юридическими лицами, ремонтными бригадами и строительными компаниями. Предоставляем полный пакет документов: счета-фактуры, накладные, сертификаты. Оплата по безналичному расчёту с НДС.",
  },
]

const BRANDS = [
  { name: "Kerama Marazzi", slug: "kerama-marazzi", desc: "425+ позиций", logo: "https://kerama-marazzi.com/template/img/logo.svg" },
  { name: "Азори", slug: "azori", desc: "1000+ позиций", logo: "https://azoriceramica.ru/local/templates/main/dist/images/logo.svg" },
  { name: "Нефрит-Керамика", slug: "nefrit-keramika", desc: "914 позиций", logo: "https://www.nefrit.ru/local/templates/nefrit/img/logo.svg" },
  { name: "Cersanit", slug: "cersanit", desc: "116+ позиций", logo: "https://www.cersanit.ru/local/templates/main/img/logo.svg" },
  { name: "Бонапарт", slug: "bonapart", desc: "400+ позиций", logo: "https://bonapart.pro/local/templates/bonn/images/logo.svg" },
  { name: "Элетто", slug: "eletto", desc: "233 позиции", logo: "https://elettoceramica.ru/wp-content/themes/eletto/img/logo.svg" },
]

export function HomeContent() {
  const { products } = useProducts()
  const popularProducts = products.filter((p) => p.is_bestseller).slice(0, 8)
  const inStockProducts = products
    .filter((p: any) => p.stock_yanino && p.stock_yanino > 0 && p.main_image)
    .slice(0, 8)

  return (
    <>
      <HeroSection />

      {/* USP bar */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary shrink-0" />
              <span>Доставка по СПб от 1 дня</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span>Гарантия производителя</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary shrink-0" />
              <span>В продаже с 2006 года</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary shrink-0" />
              <span>3000+ позиций на складе</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Бренды в наличии</h2>
            <Link href="/brands" className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Все бренды <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-background border border-border hover:border-primary/40 hover:shadow-md transition-all text-center"
              >
                <div className="h-10 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={brand.logo} alt={brand.name} className="max-h-10 max-w-full object-contain" />
                </div>
                <span className="text-xs text-muted-foreground leading-snug">{brand.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Categories / Popular requests */}
      <section className="py-12 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Часто ищут</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Плитка под кирпич", desc: "Хит для лофта", href: "/plitka-pod-kirpich-spb", bg: "bg-orange-500/10 text-orange-600" },
              { title: "Плитка моноколор", desc: "Яркие акценты", href: "/plitka-monokolor-spb", bg: "bg-blue-500/10 text-blue-600" },
              { title: "Плитка для фартука", desc: "Легкий уход", href: "/plitka-dlya-fartuka-spb", bg: "bg-emerald-500/10 text-emerald-600" },
              { title: "Керамогранит оптом", desc: "Спеццены для бригад", href: "/keramogranit-optom-spb", bg: "bg-indigo-500/10 text-indigo-600" },
              { title: "Кафельная плитка", desc: "Классика", href: "/kafelnaya-plitka-spb", bg: "bg-pink-500/10 text-pink-600" },
              { title: "Напольная плитка", desc: "Толщина от 8мм", href: "/napolnaya-plitka-spb", bg: "bg-slate-500/10 text-slate-600" },
              { title: "Распродажа", desc: "Скидки до 40%", href: "/rasprodazha-plitki-spb", bg: "bg-destructive/10 text-destructive" },
              { title: "Плитка для ванной", desc: "Стойкая к влаге", href: "/plitka-dlya-vannoj-spb", bg: "bg-cyan-500/10 text-cyan-600" },
            ].map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{cat.title}</h3>
                  <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${cat.bg}`}>
                    {cat.desc}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular products */}
      {(popularProducts.length > 0 || inStockProducts.length > 0) && (
        <section className="py-12 bg-background">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Товары в наличии</h2>
              <Link href="/catalog" className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Весь каталог <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {(popularProducts.length > 0 ? popularProducts : inStockProducts).map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 4} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Часто задаваемые вопросы</h2>
          <div className="grid gap-4 max-w-3xl">
            {homeFaq.map((item, i) => (
              <div key={i} className="bg-background rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
