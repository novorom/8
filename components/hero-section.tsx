"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection({ catalogCount, stockCount }: { catalogCount: number; stockCount: number }) {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900 py-20 lg:py-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Interior Tiles"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-primary-foreground ring-1 ring-inset ring-primary/30 mb-6">
            Склад и выдача: СПб (рядом с КАД)
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6 leading-tight drop-shadow-sm">
            Плитка в Санкт-Петербурге <br className="hidden sm:block" />
            <span className="text-primary text-3xl sm:text-5xl">и Ленинградской области</span>
          </h1>
          <p className="text-lg leading-8 text-slate-100 mb-10 font-medium">
            Керамическая плитка, керамогранит и мозаика разных брендов. Ищите по коллекции, размеру или артикулу; актуальные цена и остаток указаны в карточке.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all animate-pulse"
            >
              Перейти в каталог
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://t.me/flyroman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-green-500 hover:bg-green-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all"
            >
              Задать вопрос менеджеру
            </a>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all border border-white/20"
            >
              Смотреть коллекции
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div>
              <div className="text-2xl font-bold text-white">{catalogCount.toLocaleString("ru-RU")}</div>
              <div className="text-sm text-slate-400">товаров в каталоге</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stockCount.toLocaleString("ru-RU")}</div>
              <div className="text-sm text-slate-400">позиций с остатком по данным каталога</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Актуальные</div>
              <div className="text-sm text-slate-400">цены и остатки в карточках</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
