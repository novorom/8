"use client"

import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto">

      {/* ОБЁРТКА С ПРОПОРЦИЕЙ КАК У КАРТИНКИ */}
      <div className="relative w-full aspect-[1440/620]">

        <img
          src="/hero.jpg"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* КНОПКА 1 */}
        <Link
          href="/catalog"
          className="absolute left-[110px] top-[385px] w-[320px] h-[70px]"
        />

        {/* КНОПКА 2 */}
        <Link
          href="/collections"
          className="absolute left-[460px] top-[385px] w-[300px] h-[70px]"
        />

      </div>
    </section>
  )
}
