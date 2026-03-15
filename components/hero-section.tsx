import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-[520px] lg:h-[620px] overflow-hidden">
      <Image
        src="https://res.cloudinary.com/de1sotnld/image/upload/v1773592208/plitki-spb/hero-main.png"
        alt="Керамическая плитка в Санкт-Петербурге — Плитки СПб"
        fill
        className="object-cover object-top"
        priority
      />
    </section>
  )
}
