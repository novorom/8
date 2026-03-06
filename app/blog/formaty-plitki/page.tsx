import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: "Форматы плитки: какой размер выбрать для комнаты? | Дом Плитки СПб",
  description: "Гид по форматам плитки: 30х60, 60х60, 60х120, 45х90. Какой размер подходит для маленькой и большой комнаты, ванной, кухни, гостиной. Советы дизайнеров.",
  alternates: { canonical: `${SITE_URL}/blog/formaty-plitki` },
  openGraph: { title: "Форматы плитки: какой размер выбрать?", url: `${SITE_URL}/blog/formaty-plitki`, siteName: "Дом Плитки CERSANIT", locale: "ru_RU", type: "article" },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Форматы плитки: какой размер выбрать для комнаты?",
        description: "Гид по форматам плитки от 30х60 до 60х120.",
        publisher: { "@type": "Organization", name: "Дом Плитки CERSANIT", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/formaty-plitki`,
        datePublished: "2025-03-01",
        author: { "@type": "Organization", name: "Дом Плитки CERSANIT" },
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-primary">Блог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Форматы плитки</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">6 минут чтения · Гид по выбору</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Форматы плитки: какой размер выбрать?</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Размер плитки сильно влияет на восприятие пространства. Разбираем каждый формат — когда применять и в чём плюсы.</p>
        </header>

        <div className="flex flex-col gap-8 text-foreground/80">

          {[
            {
              format: "30×60 см — универсальный формат",
              desc: "Самый популярный формат в России. Подходит для любого помещения. На стенах укладывается горизонтально (спокойный вид) или вертикально (визуально вытягивает потолок). На полу — смещение на 1/3 создаёт эффект паркета. Лёгкий в укладке, меньше подрезки.",
              best: "Ванная, кухня, коридор, небольшие помещения",
              collections: "Lofthouse, Calacatta, Wood Concept, Northwood",
            },
            {
              format: "42×42 см — квадрат для пола",
              desc: "Классический квадратный формат. Хорошо смотрится на полу в шахматном порядке или по диагонали. Создаёт упорядоченный, аккуратный вид. Удобен в укладке — нет нужды определять верх/низ.",
              best: "Пол в ванной, кухне, прихожей, небольшой гостиной",
              collections: "Palitra, Vera, Colorwood",
            },
            {
              format: "60×60 см — современная классика",
              desc: "Квадрат среднего размера — баланс между крупным форматом и практичностью. Хорошо смотрится на полу просторных помещений. На стенах создаёт строгий геометричный вид. Требует ровного основания.",
              best: "Гостиная, прихожая, коридор, просторная ванная",
              collections: "Silvia, Stilo, Cento, Manzolino",
            },
            {
              format: "45×90 см — прямоугольник среднего формата",
              desc: "Набирает популярность как промежуточный вариант между 30×60 и 60×120. Длинный прямоугольник визуально вытягивает пространство. Укладка со смещением создаёт эффект крупного кирпича.",
              best: "Гостиная, спальня, прихожая",
              collections: "Asher, Velvet, Terrazzo",
            },
            {
              format: "60×120 см — крупный формат, главный тренд",
              desc: "Флагман современного интерьера. Минимум швов, эффект монолитного покрытия. Визуально увеличивает любое помещение. Требует идеально ровного основания и профессиональной укладки с эластичным клеем. Вес одной плитки — 6–8 кг.",
              best: "Гостиная от 15 м², холл, просторная ванная, открытые пространства",
              collections: "Deep Calacatta, Gold Venice, Soft Concrete, Grigio Nuovalato",
            },
            {
              format: "18×60 и 22×90 см — планки под дерево",
              desc: "Длинный узкий формат имитирует паркетную доску. Чем длиннее планка — тем реалистичнее эффект. Укладывается параллельно (как доски) или ёлочкой. При ёлочке перерасход 15–20%, но результат очень эффектный.",
              best: "Пол в гостиной, спальне, коридоре — там, где хотят вид паркета",
              collections: "Wood Concept Natural/Prime, Northwood, Amberwood",
            },
          ].map(item => (
            <section key={item.format}>
              <h2 className="text-xl font-bold text-foreground mb-3">{item.format}</h2>
              <p className="leading-relaxed mb-3">{item.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3 text-sm">
                  <span className="font-medium text-foreground">Где применять:</span>
                  <p className="text-muted-foreground mt-1">{item.best}</p>
                </div>
                <div className="bg-primary/5 rounded-lg p-3 text-sm">
                  <span className="font-medium text-foreground">Коллекции Cersanit:</span>
                  <p className="text-muted-foreground mt-1">{item.collections}</p>
                </div>
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Главное правило выбора формата</h2>
            <p className="leading-relaxed">Чем меньше помещение — тем меньше риск ошибиться с крупным форматом. Для комнаты до 6 м² лучше остановиться на 30×60 или 42×42 см. Для больших пространств — смело берите 60×120, эффект будет впечатляющим. При сомнениях — приезжайте в шоурум в Янино, покажем образцы вживую и поможем с выбором.</p>
          </section>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="font-semibold text-foreground mb-2">Все форматы в наличии на складе</p>
            <p className="text-muted-foreground text-sm mb-4">193 позиции — от 30×30 до 60×120 см</p>
            <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              Перейти в каталог →
            </Link>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/keramogranit-60x120-spb" className="text-primary hover:underline text-sm">→ Керамогранит 60×120 — каталог</Link>
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="text-primary hover:underline text-sm">→ Как выбрать плитку для ванной</Link>
              <Link href="/blog/skolko-plitki-nuzhno-kupit" className="text-primary hover:underline text-sm">→ Как рассчитать количество плитки</Link>
            </div>
          </div>
        </div>
      
              {/* Товары по теме */}
              <div className="mt-10 p-5 rounded-xl bg-muted/50 border border-border">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="flex flex-col gap-2">
                  {<Link key="/catalog/keramogranit-soft-concrete-svetlo-seryy-60x120" href="/catalog/keramogranit-soft-concrete-svetlo-seryy-60x120" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Керамогранит Soft Concrete 60x120</span><span className="text-primary font-medium ml-3">2213 ₽/м²</span></Link>
                  <Link key="/catalog/plitka-calacatta-belyy-30x60" href="/catalog/plitka-calacatta-belyy-30x60" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Плитка Calacatta 30x60</span><span className="text-primary font-medium ml-3">780 ₽/м²</span></Link>
                  <Link key="/catalog/keramogranit-northwood-bezhevyy-18x60" href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Керамогранит Northwood 18x60</span><span className="text-primary font-medium ml-3">1098 ₽/м²</span></Link>}
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </div>
              </article>
    </div>
  )
}
