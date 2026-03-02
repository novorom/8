import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: "Блог о плитке и керамограните Cersanit | Дом Плитки СПб",
  description: "Инструкции по укладке плитки и мозаики, советы по затирке швов, сертификаты качества Cersanit. Полезные статьи от официального дилера в Санкт-Петербурге.",
  alternates: { canonical: `${SITE_URL}/blog` },
}

const articles = [
  { href: "/blog/kak-ukladyvat-plitku", title: "Как укладывать плитку своими руками", desc: "Официальная инструкция Cersanit: подготовка основания, выбор клея и затирки, пошаговая укладка настенной плитки и керамогранита.", date: "2025-01-01", time: "7 мин" },
  { href: "/blog/kak-ukladyvat-mozaiku", title: "Как укладывать керамическую мозаику", desc: "Инструкция по укладке мозаики Cersanit на сетке: подготовка, нанесение клея, затирка, рекомендации по размеру рабочей зоны.", date: "2025-01-01", time: "4 мин" },
  { href: "/blog/rekomendatsii-po-zatirke", title: "Рекомендации по затирке швов плитки", desc: "Как выбрать затирку, подготовить швы и нанести состав. Как удалить остатки затирки с поверхности плитки без повреждений.", date: "2025-01-01", time: "5 мин" },
  { href: "/blog/sertifikaty-kachestva", title: "Сертификаты качества и безопасности Cersanit", desc: "Все продукты Cersanit сертифицированы в России. Рассказываем какие сертификаты подтверждают качество плитки и керамогранита.", date: "2025-01-01", time: "3 мин" },
]

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/50 border-b border-border"><div className="mx-auto max-w-7xl px-4 py-3"><nav className="flex items-center gap-1.5 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary transition-colors">Главная</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground font-medium">Блог</span></nav></div></div>
      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold">Блог о плитке и керамограните</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl">Инструкции по укладке, советы по уходу, сертификаты качества — полезные материалы от официального дилера Cersanit в Санкт-Петербурге.</p>
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map(a => (
              <Link key={a.href} href={a.href} className="group flex flex-col gap-3 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{a.time} чтения</span>
                </div>
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">{a.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{a.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Читать <ChevronRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
