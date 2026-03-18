"use client"

import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative h-[620px] flex items-center overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="Керамическая плитка"
          className="w-full h-full object-cover brightness-95"
        />

        {/* ГРАДИЕНТ КАК В МАКЕТЕ */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 via-[45%] to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        <p className="text-sm text-blue-700 mb-4">
          📍 Склад в Янино — Санкт-Петербург
        </p>

        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          Керамическая{" "}
          <span className="text-blue-600">плитка</span> в СПб
        </h1>

        <p className="text-lg text-gray-700 mb-8 max-w-xl">
          Kerama Marazzi, Cersanit, Азори, Idalgo, Gracia Ceramica и другие. 
          Более <b>4000 позиций</b> на складе. Доставка от 1 дня.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mb-10">
          <Link
            href="/catalog"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Смотреть каталог →
          </Link>

          <Link
            href="/collections"
            className="border border-gray-300 px-6 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Все коллекции
          </Link>
        </div>

        {/* FEATURES */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-6 py-5 flex gap-10 w-fit">
          <div>
            <div className="font-semibold text-gray-900">Доставка</div>
            <div className="text-sm text-gray-500">от 1 дня</div>
          </div>

          <div>
            <div className="font-semibold text-gray-900">Гарантия</div>
            <div className="text-sm text-gray-500">производителя</div>
          </div>

          <div>
            <div className="font-semibold text-gray-900">4000+</div>
            <div className="text-sm text-gray-500">позиций</div>
          </div>

          <div>
            <div className="font-semibold text-gray-900">11</div>
            <div className="text-sm text-gray-500">брендов</div>
          </div>
        </div>

      </div>
    </section>
  )
}
