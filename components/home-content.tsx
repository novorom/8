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
    question: "Помогаете подобрать плитку жителям области?",
    answer:
      "Да, мы работаем со всем регионом. Бесплатно рассчитаем нужное количество по вашим размерам и поможем подобрать коллекцию удаленно (WhatsApp/Telegram). Склад в Янино удобно расположен для отгрузки в любой район СПб и ЛО.",
  },
  {
    question: "Работаете с юридическими лицами и строителями?",
    answer:
      "Да, работаем с юридическими лицами, ремонтными бригадами и строительными компаниями. Предоставляем полный пакет документов: счета-фактуры, накладные, сертификаты. Оплата по безналичному расчёту с НДС.",
  },
]

const BRANDS = [
  { name: "Kerama Marazzi", slug: "kerama-marazzi", desc: "425+ позиций", logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174049/brands/kerama-marazzi.png" },
  { name: "Азори", slug: "azori", desc: "1000+ позиций", logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174046/brands/azori.png" },
  { name: "Нефрит-Керамика", slug: "nefrit-keramika", desc: "914 позиций", logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174050/brands/nefrit-keramika.jpg" },
  { name: "Cersanit", slug: "cersanit", desc: "116+ позиций", logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174048/brands/cersanit.png" },
  { name: "Бонапарт", slug: "bonapart", desc: "400+ позиций", logo: "https://res.cloudinary.com/de1sotnld/image/upload/v1776174047/brands/bonaparte.png" },
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
              <span>Доставка по СПб и ЛО от 1 дня</span>
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
      {/* ── НАШИ ПРОЕКТЫ (SOCIAL PROOF) ── */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Реализованные проекты
              </h2>
              <p className="text-lg text-muted-foreground">
                Посмотрите, как наша плитка и керамогранит выглядят в реальных интерьерах. Мы помогли обустроить более 1500 объектов в Санкт-Петербурге и ЛО.
              </p>
            </div>
            <Link href="/catalog" className="text-primary font-bold hover:underline">
              Смотреть весь каталог →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Ванная комната в ЖК «Приморский Квартал»", 
                image: "https://pvi.cersanit.ru/upload/uf/b00/Int_Calacatta_2.jpg", 
                collection: "Calacatta", 
                tags: ["Мрамор", "Классика"] 
              },
              { 
                title: "Современная кухня в Мурино", 
                image: "https://pvi.cersanit.ru/upload/uf/0db/INT_LOFTHOUSE_5_1.jpg", 
                collection: "Lofthouse", 
                tags: ["Бетон", "Лофт"] 
              },
              { 
                title: "Терраса загородного дома в Вырице", 
                image: "https://pvi.cersanit.ru/upload/uf/02e/Interior_WN4T013_1.jpg", 
                collection: "Wood Concept", 
                tags: ["Дерево", "Улица"] 
              }
            ].map((project, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-3xl bg-background border border-border hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">Использована коллекция: <span className="font-semibold text-foreground">{project.collection}</span></p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h4 className="text-xl font-bold text-foreground mb-2">Хотите такой же дизайн?</h4>
              <p className="text-muted-foreground">Нарисуем бесплатный 3D-проект вашей ванной комнаты прямо сейчас.</p>
            </div>
            <a 
              href="https://wa.me/79052050900?text=Здравствуйте! Хочу бесплатный 3D проект по мотивам ваших работ."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              Заказать 3D-проект (Бесплатно)
            </a>
          </div>
        </div>
      </section>

      {/* Free 3D Design Promo */}
      <section className="py-16 bg-slate-900 border-y border-white/5 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="mx-auto max-w-7xl px-4 relative flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
              Спецпредложение
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 !leading-tight">
              Бесплатный 3D-проект <br className="hidden xl:block" /> вашего интерьера
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Наши дизайнеры создадут фотореалистичный проект вашей ванной или кухни с учетом всех размеров и выбранной плитки. Это бесплатно и ни к чему вас не обязывает.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <span>Точный расчет количества коробок</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <span>Раскладка декора и бордюров</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <span>Вид сверху и 4 развертки стен</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <span>PDF-проект для мастера</span>
              </div>
            </div>
            <a
              href="https://wa.me/79052050900?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%AF%20%D1%85%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D1%8B%D0%B9%203D%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82."
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1"
            >
              Получить 3D проект в WhatsApp
              <ChevronRight className="h-6 w-6" />
            </a>
          </div>
          <div className="flex-1 w-full max-w-2xl">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800 aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.weserv.nl/?url=https://www.cersanit.ru/upload/iblock/c04/c04961553f1f3e098670da15c6020556.jpg&w=1000&q=80" alt="Example 3D Project" className="object-cover w-full h-full opacity-80" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary font-bold text-sm uppercase mb-1">Реальный проект</p>
                    <p className="text-xl font-bold">Ванная в ЖК "Ясно-Янино"</p>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold">
                    14.5 м² стены
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
