"use client"

import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto">
      <div className="relative w-full aspect-[1440/620]">

        <img
          src="/hero.jpg"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* КНОПКА 1 — ПОДНЯТА И ВЫШЕ */}
        <Link
          href="/catalog"
          className="absolute left-[80px] top-[340px] w-[380px] h-[110px]"
        />

        {/* КНОПКА 2 — ПОДНЯТА И ВЫШЕ */}
        <Link
          href="/collections"
          className="absolute left-[430px] top-[340px] w-[360px] h-[110px]"
        />

      </div>
    </section>
  )
}
