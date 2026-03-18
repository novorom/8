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

        {/* КНОПКА 1 — РАСШИРЕНА */}
        <Link
          href="/catalog"
          className="absolute left-[90px] top-[360px] w-[360px] h-[90px]"
        />

        {/* КНОПКА 2 — РАСШИРЕНА */}
        <Link
          href="/collections"
          className="absolute left-[440px] top-[360px] w-[340px] h-[90px]"
        />

      </div>
    </section>
  )
}
