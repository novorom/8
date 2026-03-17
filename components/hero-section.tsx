"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50">
      {/* 3:2 aspect ratio — shows full image without any cropping */}
      <div className="relative w-full" style={{ paddingBottom: "min(66.67%, 620px)", minHeight: "360px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/de1sotnld/image/upload/v1773594838/plitki-spb/hero-main.png"
          alt="Керамическая плитка в Санкт-Петербурге — Плитки СПб"
          className="absolute inset-0 w-full h-full object-cover object-top"
          fetchPriority="high"
          decoding="async"
        />

        {/* Soft gradient so real buttons stand out over the drawn ones */}
        <div
          className="absolute"
          style={{
            left: 0,
            right: "45%",
            bottom: 0,
            height: "32%",
            background: "linear-gradient(to top, rgba(245,249,255,0.88) 0%, rgba(245,249,255,0) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Real clickable buttons — positioned over the drawn buttons in the image */}
        <div
          className="absolute flex flex-wrap gap-3"
          style={{ bottom: "10%", left: "4%" }}
        >
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-white shadow-lg hover:opacity-90 active:scale-[0.98] transition-all"
            style={{
              background: "#1a4f9c",
              padding: "clamp(10px, 1.2vw, 16px) clamp(18px, 2.5vw, 32px)",
              fontSize: "clamp(13px, 1.1vw, 16px)",
              minWidth: "clamp(150px, 14vw, 210px)",
            }}
          >
            Смотреть каталог
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/collections"
            className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold shadow-sm hover:bg-white active:scale-[0.98] transition-all"
            style={{
              background: "rgba(255,255,255,0.92)",
              color: "#1e3a5f",
              border: "1.5px solid #c8d9f0",
              padding: "clamp(10px, 1.2vw, 16px) clamp(18px, 2.5vw, 32px)",
              fontSize: "clamp(13px, 1.1vw, 16px)",
              minWidth: "clamp(130px, 12vw, 185px)",
            }}
          >
            Все коллекции
          </Link>
        </div>
      </div>
    </section>
  )
}
