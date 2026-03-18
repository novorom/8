"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-white via-slate-50 to-white">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/de1sotnld/image/upload/v1773594838/plitki-spb/hero-main.png"
          alt="Интерьер с керамической плиткой"
          className="w-full h-full object-cover object-right-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-28 flex items-center min-h-[520px]">
        <div className="max-w-xl">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-slate-500 mb-4 tracking-wide"
          >
            Склад в Янино — Санкт-Петербург
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6"
          >
            <span className="text-slate-900">Керамическая</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">плитка</span>{" "}
            <span className="text-slate-900">в СПб</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-500 text-base leading-relaxed mb-8 max-w-md"
          >
            Kerama Marazzi, Cersanit, Азори, Гранитея, Idalgo, Gracia Ceramica и другие.
            Более <span className="font-semibold text-slate-800">4000 позиций</span> на складе. Доставка от 1 дня.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/catalog"
              className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200 font-semibold text-sm"
            >
              Смотреть каталог →
            </Link>

            <Link
              href="/collections"
              className="px-7 py-3.5 bg-white/70 backdrop-blur-md border border-white/40 rounded-xl text-slate-800 hover:bg-white/90 hover:scale-[1.03] transition-all duration-200 font-medium text-sm"
            >
              Все коллекции
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="relative max-w-6xl mx-auto px-6 -mt-10 pb-10">
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-2xl px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">

          {[
            { title: "Доставка", sub: "от 1 дня" },
            { title: "Гарантия", sub: "производителя" },
            { title: "4000+", sub: "позиций" },
            { title: "11", sub: "брендов" },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-base font-semibold text-slate-900">{f.title}</div>
              <div className="text-sm text-slate-500">{f.sub}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
