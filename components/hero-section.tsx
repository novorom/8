"use client"

import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ height: "580px" }}>
      <Image
        src="https://res.cloudinary.com/de1sotnld/image/upload/v1773592208/plitki-spb/hero-main.png"
        alt="Керамическая плитка в Санкт-Петербурге"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0">
        <div className="mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-[140px]">
          <div className="flex gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white"
              style={{ background: "#1a4f9c", minWidth: "210px" }}
            >
              Смотреть каталог →
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-slate-800 border border-slate-300"
              style={{ background: "rgba(255,255,255,0.9)", minWidth: "180px" }}
            >
              Все коллекции
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
