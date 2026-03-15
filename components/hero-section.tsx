"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-slate-100" style={{ minHeight: "580px" }}>

      {/* Декоративная плитка фон */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `linear-gradient(rgba(30,100,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,100,200,1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      {/* Акцент кружки плиток */}
      <div className="absolute top-6 right-[38%] w-48 h-48 rounded-2xl bg-gradient-to-br from-sky-200/40 to-blue-300/30 rotate-12 hidden lg:block" />
      <div className="absolute bottom-10 right-[42%] w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-100/50 to-sky-200/40 -rotate-6 hidden lg:block" />

      {/* Фото ванной комнаты */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <Image
          src="https://res.cloudinary.com/de1sotnld/image/upload/v1773592208/plitki-spb/hero-main.png"
          alt="Интерьер ванной с керамической плиткой"
          fill
          className="object-cover object-left"
          priority
        />
        {/* Плавный переход слева */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-50 via-sky-50/60 to-transparent" />
      </div>

      {/* Контент */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20 flex items-center" style={{ minHeight: "580px" }}>
        <div className="max-w-xl flex flex-col gap-6">

          {/* Бейдж */}
          <div className="inline-flex items-center gap-2 bg-white/80 border border-blue-100 rounded-full px-4 py-1.5 w-fit shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <span className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
              Склад в Янино — Санкт-Петербург
            </span>
          </div>

          {/* Заголовок */}
          <h1 className="text-5xl lg:text-6xl font-bold leading-[1.08] text-slate-900">
            Керамическая<br />
            <span className="text-blue-600">плитка</span>
            <span className="text-slate-900"> в СПб</span>
          </h1>

          {/* Подзаголовок */}
          <p className="text-lg text-slate-600 leading-relaxed">
            Kerama Marazzi, Cersanit, Азори, Гранитея и 8 других брендов.<br className="hidden sm:block" />
            Более <span className="font-semibold text-slate-800">4000 позиций</span> на складе.{" "}
            <span className="font-semibold text-slate-800">Доставка от 1 дня.</span>
          </p>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base text-white transition-all"
              style={{ background: "linear-gradient(135deg, #1d6ec6 0%, #1a5aaf 100%)", boxShadow: "0 4px 16px rgba(29,110,198,0.35)" }}
            >
              Смотреть каталог
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white font-semibold text-base text-blue-700 border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm"
            >
              Все коллекции
            </Link>
          </div>

          {/* Преимущества */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { icon: "🚚", label: "Доставка", value: "от 1 дня" },
              { icon: "🛡️", label: "Гарантия", value: "производителя" },
              { icon: "📦", label: "В наличии", value: "4000+ позиций" },
              { icon: "🏷️", label: "Бренды", value: "11 брендов" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 bg-white/70 rounded-xl px-3 py-2.5 border border-blue-100/80">
                <span className="text-lg shrink-0">{s.icon}</span>
                <div>
                  <div className="text-xs text-slate-500 leading-none">{s.label}</div>
                  <div className="text-xs font-semibold text-slate-800 mt-0.5">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Мобильная картинка */}
      <div className="relative h-48 lg:hidden">
        <Image
          src="https://res.cloudinary.com/de1sotnld/image/upload/v1773592208/plitki-spb/hero-main.png"
          alt="Интерьер ванной с керамической плиткой"
          fill
          className="object-cover object-top"
          priority
        />
      </div>
    </section>
  )
}
