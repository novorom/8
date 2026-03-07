import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: "Блог о плитке и керамограните Cersanit | Дом Плитки СПб",
  description: "Инструкции по укладке плитки и мозаики, советы по затирке швов, сертификаты качества Cersanit. Полезные статьи от официального дилера в Санкт-Петербурге.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Блог о плитке и керамограните Cersanit | Дом Плитки СПб",
    description: "Инструкции по укладке, советы по уходу, сертификаты качества — полезные материалы от официального дилера Cersanit в Санкт-Петербурге.",
    url: `${SITE_URL}/blog`,
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "website",
  },
}

const articles = [
  { href: "/blog/kak-ukladyvat-plitku", title: "Как укладывать плитку своими руками", desc: "Официальная инструкция Cersanit: подготовка основания, выбор клея и затирки, пошаговая укладка настенной плитки и керамогранита.", date: "2025-01-15", time: "7 мин" },
  { href: "/blog/kak-ukladyvat-mozaiku", title: "Как укладывать керамическую мозаику", desc: "Инструкция по укладке мозаики Cersanit на сетке: подготовка, нанесение клея, затирка, рекомендации по размеру рабочей зоны.", date: "2025-01-20", time: "4 мин" },
  { href: "/blog/rekomendatsii-po-zatirke", title: "Рекомендации по затирке швов плитки", desc: "Как выбрать затирку, подготовить швы и нанести состав. Как удалить остатки затирки с поверхности плитки без повреждений.", date: "2025-02-01", time: "5 мин" },
  { href: "/blog/sertifikaty-kachestva", title: "Сертификаты качества и безопасности Cersanit", desc: "Все продукты Cersanit сертифицированы в России. Рассказываем какие сертификаты подтверждают качество плитки и керамогранита.", date: "2025-02-10", time: "3 мин" },
  { href: "/blog/trendy-plitki-2025", title: "Тренды плитки и керамогранита 2025", desc: "Какие форматы, цвета и фактуры плитки популярны в 2025 году. Обзор актуальных коллекций Cersanit для ванной, кухни и гостиной.", date: "2025-02-15", time: "6 мин" },
  { href: "/blog/kak-rezat-keramogranit", title: "Как резать керамогранит в домашних условиях", desc: "Какой инструмент выбрать для резки керамогранита. Плиткорез, болгарка или гидроабразивная резка — плюсы и минусы каждого метода.", date: "2025-02-20", time: "5 мин" },
  { href: "/blog/formaty-plitki", title: "Форматы плитки: как выбрать размер для комнаты", desc: "30x60, 60x60, 60x120 — чем отличаются форматы и как размер плитки влияет на восприятие пространства в ванной и на кухне.", date: "2025-03-01", time: "4 мин" },
  { href: "/blog/kak-vybrat-plitku-dlya-vannoj", title: "Как выбрать плитку для ванной комнаты", desc: "На что обратить внимание при выборе плитки для ванной: скользкость, влагостойкость, размер, дизайн. Советы от официального дилера Cersanit.", date: "2025-03-05", time: "6 мин" },
  { href: "/blog/plitka-dlya-kuhni-kak-vybrat", title: "Плитка для кухни: как выбрать фартук и пол", desc: "Какую плитку выбрать для кухонного фартука и пола. Требования к износостойкости, простоте ухода и сочетанию с интерьером.", date: "2025-03-10", time: "5 мин" },
  { href: "/blog/keramogranit-ili-laminat", title: "Керамогранит или ламинат: что лучше для пола", desc: "Сравниваем керамогранит и ламинат по долговечности, уходу, цене и внешнему виду. Что выбрать для квартиры в СПб.", date: "2025-03-15", time: "5 мин" },
  { href: "/blog/kak-uhazhivat-za-keramogranitom", title: "Как ухаживать за керамогранитом", desc: "Правила ежедневного и генерального ухода за керамогранитом Cersanit. Чем мыть, что нельзя использовать, как убрать известковый налёт.", date: "2025-03-20", time: "4 мин" },
  { href: "/blog/skolko-plitki-nuzhno-kupit", title: "Сколько плитки нужно купить: расчёт с запасом", desc: "Как рассчитать количество плитки для ванной или кухни. Формула расчёта, процент на подрезку, рекомендации по запасу.", date: "2025-03-25", time: "4 мин" },
  { href: "/blog/kak-vybrat-plitku-dlya-prihozhej", title: "Как выбрать плитку для прихожей: советы дизайнеров", desc: "Читайте на нашем сайте.", date: "2026-03-07", time: "5 мин" },
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
