"use client"


import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-white to-slate-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/de1sotnld/image/upload/v1773594838/plitki-spb/hero-main.png"
          alt="Интерьер с керамической плиткой"
          className="w-full h-full object-cover object-right"
          style={{ transform: "scale(1.03)" }}
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-28 flex items-center min-h-[520px]">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-sm text-slate-500 mb-4 tracking-wide"
          >
            <svg className="h-3.5 w-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Склад в Янино — Санкт-Петербург
          </p>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            <span className="text-slate-800">Керамическая</span>
            <br />
            <span className="text-blue-600">плитка</span>{" "}
            <span className="text-slate-800">в СПб</span>
          </h1>

          <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md"
          >
            Kerama Marazzi, Cersanit, Азори, Гранитея, Idalgо, Gracia Ceramica и другие.
            Более{" "}
            <span className="font-semibold text-slate-700">4000 позиций</span>{" "}
            на складе. Доставка от 1 дня.
          </p>

          <div className="flex flex-wrap gap-3"
          >
            <Link
              href="/catalog"
              className="px-7 py-3.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5 transition-all duration-200 font-semibold text-sm"
            >
              Смотреть каталог →
            </Link>
            <Link
              href="/collections"
              className="px-7 py-3.5 border border-slate-300 rounded-xl text-slate-700 bg-white/80 backdrop-blur-sm hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm"
            >
              Все коллекции
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Glassmorphism features bar */}
      <div className="relative max-w-7xl mx-auto px-6 pb-8 -mt-4">
        <div className="backdrop-blur-md bg-white/70 border border-white/50 shadow-xl shadow-slate-200/60 rounded-2xl px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: "🚚", title: "Доставка", sub: "от 1 дня" },
            { icon: "✅", title: "Гарантия", sub: "производителя" },
            { icon: "📦", title: "4000+", sub: "позиций" },
            { icon: "⭐", title: "11", sub: "брендов" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <span className="text-xl">{f.icon}</span>
              <div>
                <div className="text-sm font-bold text-slate-800">{f.title}</div>
                <div className="text-xs text-slate-500">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
