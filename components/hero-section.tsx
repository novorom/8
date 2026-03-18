"use client"

import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full">

      {/* КАРТИНКА БЕЗ ОБРЕЗКИ */}
      <img
        src="/hero.jpg"
        alt="hero"
        className="w-full h-auto block"
      />

      {/* КНОПКА "СМОТРЕТЬ КАТАЛОГ" */}
      <Link
        href="/catalog"
        className="absolute left-[6.8%] top-[63.5%] w-[26%] h-[11%]"
      />

      {/* КНОПКА "ВСЕ КОЛЛЕКЦИИ" */}
      <Link
        href="/collections"
        className="absolute left-[34%] top-[63.5%] w-[22%] h-[11%]"
      />

    </section>
  )
}
