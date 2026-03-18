"use client"

import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full">

      {/* КАРТИНКА 1:1 БЕЗ ОБРЕЗКИ */}
      <img
        src="/hero.jpg"
        alt="hero"
        className="w-full h-auto block"
      />

      {/* КНОПКА "СМОТРЕТЬ КАТАЛОГ" */}
      <Link
        href="/catalog"
        className="absolute left-[7.5%] top-[60%] w-[22%] h-[10%]"
      />

      {/* КНОПКА "ВСЕ КОЛЛЕКЦИИ" */}
      <Link
        href="/collections"
        className="absolute left-[31%] top-[60%] w-[20%] h-[10%]"
      />

    </section>
  )
}
