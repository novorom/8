"use client"

import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full h-[620px]">

      {/* КАРТИНКА МАКЕТА */}
      <img
        src="/hero.jpg"
        alt="hero"
        className="w-full h-full object-cover"
      />

      {/* НЕВИДИМАЯ КНОПКА 1 */}
      <Link
        href="/catalog"
        className="absolute left-[120px] top-[360px] w-[220px] h-[56px]"
      />

      {/* НЕВИДИМАЯ КНОПКА 2 */}
      <Link
        href="/collections"
        className="absolute left-[360px] top-[360px] w-[220px] h-[56px]"
      />

    </section>
  )
}
