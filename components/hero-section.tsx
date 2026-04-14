"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900 py-20 lg:py-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Interior Tiles"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-6">
            Склад и выдача: Янино (рядом с КАД)
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 leading-tight">
            Плитка в Санкт-Петербурге <br className="hidden sm:block" />
            <span className="text-primary text-3xl sm:text-5xl">и Ленинградской области</span>
          </h1>
          <p className="text-lg leading-8 text-slate-300 mb-10">
            Официальный дилер ведущих брендов: Kerama Marazzi, Cersanit, Azori. 
            Более 5000 позиций в наличии. Честные цены и быстрая доставка по всему региону.
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
              href="https://wa.me/79052050900?text=Здравствуйте! Хочу заказать бесплатный 3D-дизайн проект ванной."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-green-500 hover:bg-green-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all"
            >
              🎁 Бесплатный 3D-дизайн
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
              <div className="text-2xl font-bold text-white">5000+</div>
              <div className="text-sm text-slate-400">Товаров в наличии</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24ч</div>
              <div className="text-sm text-slate-400">Быстрая доставка</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">12%</div>
              <div className="text-sm text-slate-400">Скидка на объем</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
