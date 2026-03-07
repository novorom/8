import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: "Как выбрать плитку для прихожей: советы дизайнеров | Дом Плитки СПб",
  description: "Полное руководство по выбору плитки для прихожей. Керамогранит, цвета, размеры, фактуры. Советы дизайнеров от официального дилера Cersanit в Санкт-Петербурге.",
  alternates: { canonical: `${SITE_URL}/blog/kak-vybrat-plitku-dlya-prihozhej` },
  openGraph: {
    title: "Как выбрать плитку для прихожей: советы дизайнеров | Дом Плитки СПб",
    url: `${SITE_URL}/blog/kak-vybrat-plitku-dlya-prihozhej`,
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "article",
  },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Главная
            </Link>
            <ChevronRight size={16} />
            <Link href="/blog" className="hover:text-primary">
              Блог
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900">Как выбрать плитку для прихожей</span>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Как выбрать плитку для прихожей: советы дизайнеров
          </h1>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Опубликовано: 15 января 2024</span>
            <span>Время чтения: 8 минут</span>
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-8 text-gray-700">
          <p className="mb-4 text-lg leading-relaxed">
            Прихожая — это первое помещение, которое видят гости при входе в дом или квартиру. Именно поэтому отделка этого пространства должна быть не только красивой, но и практичной. Одним из самых популярных и универсальных материалов для отделки прихожей является плитка. Она устойчива к влаге, загрязнениям и механическим повреждениям, а также легко чистится.
          </p>
          <p className="mb-4 leading-relaxed">
            В этой статье мы разберёмся, как правильно выбрать плитку для прихожей, какие типы материалов существуют, и какие критерии следует учитывать при выборе. Советы от опытных дизайнеров помогут вам создать гармоничный и функциональный интерьер, который прослужит вам много лет.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Особенности прихожей и требования к отделке
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            Прихожая — это помещение с особыми условиями. Через неё ежедневно проходят люди в уличной обуви, здесь скапливается влага от одежды и обуви в дождливую погоду, часто происходят механические воздействия.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700">
            Именно поэтому материал для отделки пола и стен в прихожей должен соответствовать следующим требованиям:
          </p>
          <ul className="mb-4 list-inside space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
              <span><strong>Влагостойкость</strong> — способность выдерживать повышенную влажность и брызги воды</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
              <span><strong>Износостойкость</strong> — устойчивость к истиранию при постоянном хождении</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
              <span><strong>Антискользящие свойства</strong> — безопасность при мокром полу</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
              <span><strong>Простота ухода</strong> — лёгкость в чистке и дезинфекции</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
              <span><strong>Эстетичность</strong> — материал должен хорошо выглядеть и вписываться в интерьер</span>
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700">
            Керамическая плитка и керамогранит в полной мере соответствуют всем этим требованиям, что делает их идеальным выбором для отделки прихожей в Санкт-Петербурге и других городах России.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Типы плитки: керамика vs керамогранит
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            При выборе плитки для прихожей стоит разобраться в различиях между керамической плиткой и керамогранитом. Оба материала отличаются качеством и долговечностью, но имеют свои особенности.
          </p>

          <div className="mb-6 rounded-lg bg-blue-50 p-6">
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Керамическая плитка</h3>
            <p className="mb-3 leading-relaxed text-gray-700">
              Керамика получается путём обжига глины при высокой температуре. Это традиционный материал, который используется в отделке уже многие десятилетия.
            </p>
            <p className="mb-3 leading-relaxed text-gray-700">
              <strong>Преимущества:</strong>
            </p>
            <ul className="mb-3 list-inside space-y-2 text-gray-700">
              <li>• Доступная цена</li>
              <li>• Широкий выбор цветов и узоров</li>
              <li>• Экологичность</li>
              <li>• Хорошая влагостойкость</li>
            </ul>
            <p className="leading-relaxed text-gray-700">
              <strong>Недостатки:</strong> менее прочна, чем керамогранит, может треснуть при ударе, пористость требует хорошей герметизации швов.
            </p>
          </div>

          <div className="mb-6 rounded-lg bg-amber-50 p-6">
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Керамогранит для прихожей</h3>
            <p className="mb-3 leading-relaxed text-gray-700">
              Керамогранит (или керамический гранит) — это улучшенная версия керамической плитки, полученная путём обжига при ещё более высоких температурах с использованием специальных методов прессования.
            </p>
            <p className="mb-3 leading-relaxed text-gray-700">
              <strong>Преимущества:</strong>
            </p>
            <ul className="mb-3 list-inside space-y-2 text-gray-700">
              <li>• Повышенная прочность и износостойкость</li>
              <li>• Водопоглощение близко к нулю</li>
              <li>• Стойкость к царапинам и сколам</li>
              <li>• Долгий срок службы (20+ лет)</li>
              <li>• Отличные теплопроводные свойства</li>
            </ul>
            <p className="leading-relaxed text-gray-700">
              <strong>Недостатки:</strong> выше стоимость, сложнее резать и подгонять при монтаже.
            </p>
          </div>

          <p className="leading-relaxed text-gray-700">
            Для прихожей в условиях высокой проходимости рекомендуется выбирать керамогранит — он прослужит значительно дольше и будет иметь более презентабельный вид на протяжении всего срока эксплуатации.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Выбор размера и формы плитки
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            Размер плитки — один из ключевых параметров, который влияет как на визуальное восприятие пространства, так и на практичность укладки.
          </p>

          <div className="mb-6 space-y-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-2 font-semibold text-gray-900">Маленькая плитка (10x10, 15x15 см)</h4>
              <p className="text-gray-700">
                Подходит для создания сложных узоров и мозаик. Зрительно увеличивает пространство благодаря большому количеству швов. Требует более тщательной укладки и большего расхода затирки.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-2 font-semibold text-gray-900">Средняя плитка (20x20, 25x25, 30x30 см)</h4>
              <p className="text-gray-700">
                Универсальный вариант для прихожей. Легко укладывается, имеет меньше швов, чем мелкая плитка. Подходит для большинства интерьеров и хорошо выглядит в коридорах любого размера.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-2 font-semibold text-gray-900">Крупная плитка (45x45, 60x60 см и более)</h4>
              <p className="text-gray-700">
                Визуально расширяет помещение и выглядит более современно. Минимум швов упрощает уход. Требует идеально ровного основания и профессиональной укладки. Подходит для больших прихожих и коридоров.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-2 font-semibold text-gray-900">Прямоугольная плитка (20x40, 25x50 см)</h4>
              <p className="text-gray-700">
                Идеальна для прихожей. Визуально вытягивает пространство, если укладывать вдоль длинной стены. Практична и актуальна в современном дизайне.
              </p>
            </div>
          </div>

          <p className="leading-relaxed text-gray-700">
            Совет дизайнера: для узкого коридора выбирайте среднюю или крупную прямоугольную плитку, уложенную вдоль или по диагонали — это визуально расширит пространство.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Цвет и фактура плитки для прихожей
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            Выбор цвета и фактуры — это вопрос как эстетики, так и практичности. Прихожая часто оказывается в зоне повышенной видимости пыли и грязи.
          </p>

          <h3 className="mb-4 text-lg font-semibold text-gray-900">Рекомендуемые цвета:</h3>


          <div className="mt-8 p-5 rounded-xl bg-muted/50 border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
            <div className="flex flex-col gap-2">
              <Link href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Керамогранит Northwood бежевый 18x60</span><span className="text-primary font-medium ml-3">1098 руб/м2</span></Link>
              <Link href="/catalog/keramogranit-soft-concrete-svetlo-seryy-60x120" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Керамогранит Soft Concrete 60x120</span><span className="text-primary font-medium ml-3">2213 руб/м2</span></Link>
              <Link href="/catalog/plitka-deco-chernyy-30x60" className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background border border-border hover:border-primary/40 hover:bg-accent transition-all text-sm"><span className="text-foreground">Плитка Deco черный 30x60</span><span className="text-primary font-medium ml-3">750 руб/м2</span></Link>
            </div>
            <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог</Link>
          </div>
          <div className="mb-6 space-y-3">
            <div className="flex items-start gap-3">