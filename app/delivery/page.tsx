'use client'

import Link from 'next/link'
import { Clock, MapPin, Truck, ChevronRight, Phone } from 'lucide-react'

// Metadata is defined in layout below

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-background pt-8 pb-16">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Доставка и самовывоз
          </h1>
          <p className="text-lg text-muted-foreground">
            Доставка плитки по Санкт-Петербургу и всей Ленинградской области
          </p>
        </div>

        {/* Two main options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Self-pickup */}
          <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Самовывоз</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Режим работы
                </h3>
                <div className="ml-7">
                  <div className="space-y-1 text-muted-foreground">
                    <p className="font-semibold text-foreground text-sm uppercase tracking-wide mb-2">Склад (отгрузка):</p>
                    <p><span className="font-medium text-foreground">Пн–Пт:</span> 10:00 — 16:45</p>
                    <p><span className="font-medium">Сб–Вс:</span> выходной</p>
                  </div>
                  <div className="space-y-1 text-muted-foreground mt-4">
                    <p className="font-semibold text-foreground text-sm uppercase tracking-wide mb-2">Шоурум:</p>
                    <p><span className="font-medium text-foreground">Ежедневно:</span> 10:00 — 17:00</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Где забрать</h3>
                <p className="text-muted-foreground ml-0">Наш складской терминал в Янино (ЛО) — удобный пункт выдачи рядом с КАД</p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Удобство для вас:</span> мы сами загружаем плитку в ваш транспорт, чтобы вам не пришлось беспокоиться о погрузке.
                </p>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Доставка</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Режим работы
                </h3>
                <div className="ml-7 space-y-1 text-muted-foreground">
                  <p><span className="font-medium">Пн-Пт:</span> по договоренности</p>
                  <p><span className="font-medium text-foreground">Сб-Вс:</span> <span className="text-muted-foreground">выходной</span></p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Варианты доставки</h3>
                <ul className="ml-0 space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>До подъезда вашего дома</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>С заносом в квартиру или дом</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Расчет стоимости:</span> определяется индивидуально для каждого заказа в зависимости от объема и удаленности.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── РЕГИОНАЛЬНЫЙ ОХВАТ (SEO & TRUST) ── */}
        <section className="mt-16 mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center md:text-left">
            География доставки: СПб и Ленобласть
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-muted/40 border border-border">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <div className="h-5 w-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-white">1</div>
                Районы Санкт-Петербурга
              </h3>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-muted-foreground">
                <li>Приморский</li>
                <li>Выборгский</li>
                <li>Калининский</li>
                <li>Московский</li>
                <li>Красногвардейский</li>
                <li>Центральный</li>
                <li>Невский</li>
                <li>Красносельский</li>
              </ul>
              <p className="mt-4 text-xs font-medium text-primary italic">Доставка в день заказа при наличии на складе!</p>
            </div>

            <div className="p-6 rounded-2xl bg-muted/40 border border-border">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <div className="h-5 w-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-white">2</div>
                Ближайший пригород
              </h3>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-muted-foreground">
                <li>Янино (быстро)</li>
                <li>Мурино</li>
                <li>Кудрово</li>
                <li>Всеволожск</li>
                <li>Сестрорецк</li>
                <li>Пушкин</li>
                <li>Колпино</li>
                <li>Петергоф</li>
              </ul>
              <p className="mt-4 text-xs font-medium text-primary italic">Складской хаб в Янино - отгрузка за 15 минут.</p>
            </div>

            <div className="p-6 rounded-2xl bg-muted/40 border border-border">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <div className="h-5 w-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-white">3</div>
                Ленинградская область
              </h3>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-muted-foreground">
                <li>Гатчина</li>
                <li>Выборг</li>
                <li>Сосновый Бор</li>
                <li>Кириши</li>
                <li>Тосно</li>
                <li>Волхов</li>
                <li>Луга</li>
                <li>Приозерск</li>
              </ul>
              <p className="mt-4 text-xs font-medium text-primary italic">Доставка по ЛО собственным транспортом.</p>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
            <p className="text-sm text-muted-foreground italic">
              Не нашли свой населенный пункт? Мы доставляем плитку в <b>любую точку</b> Ленинградской области. 
              Просто укажите адрес при оформлении заказа, и мы рассчитаем точное время и стоимость.
            </p>
          </div>
        </section>

        {/* Additional info */}
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-8 mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-4">Как заказать доставку?</h3>
          <p className="text-muted-foreground mb-4">
            После оформления заказа в каталоге наш менеджер свяжется с вами, чтобы согласовать удобный для вас способ доставки и рассчитать стоимость. Мы работаем быстро и надежно, чтобы ваша плитка прибыла в идеальном состоянии.
          </p>
          <div className="flex items-center gap-2 text-primary font-medium">
            <Phone className="h-5 w-5" />
            <span>Свяжитесь с нами: +7 (905) 205-09-00</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Перейти в каталог плитки
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>
  )
}
