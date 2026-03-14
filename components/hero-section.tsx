"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      draw()
    }

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      // Фон градиент — тёплый серо-бежевый
      const bg = ctx.createLinearGradient(0, 0, W, H)
      bg.addColorStop(0, "#1a1a18")
      bg.addColorStop(0.5, "#2a2420")
      bg.addColorStop(1, "#1a1a18")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // Плиточная сетка
      const tileW = 80
      const tileH = 80
      const gap = 2

      for (let row = 0; row < Math.ceil(H / tileH) + 1; row++) {
        for (let col = 0; col < Math.ceil(W / tileW) + 1; col++) {
          const x = col * (tileW + gap)
          const y = row * (tileH + gap)

          // Расстояние от центра-левого блока текста
          const cx = W * 0.75
          const cy = H * 0.5
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
          const maxDist = Math.sqrt(W ** 2 + H ** 2)
          const t = 1 - dist / maxDist

          // Цвет плитки — от светлого (ближе к центру) до тёмного
          const lightness = 30 + t * 25
          const alpha = 0.15 + t * 0.35

          ctx.fillStyle = `hsla(35, 15%, ${lightness}%, ${alpha})`
          ctx.fillRect(x, y, tileW - gap, tileH - gap)

          // Блик на некоторых плитках
          if (Math.random() < 0.1 * t) {
            const shine = ctx.createLinearGradient(x, y, x + tileW, y + tileH)
            shine.addColorStop(0, "rgba(255,240,220,0.08)")
            shine.addColorStop(0.5, "rgba(255,240,220,0.02)")
            shine.addColorStop(1, "rgba(255,240,220,0)")
            ctx.fillStyle = shine
            ctx.fillRect(x, y, tileW - gap, tileH - gap)
          }
        }
      }

      // Правый акцент — вертикальная полоса
      const accent = ctx.createLinearGradient(W * 0.55, 0, W, 0)
      accent.addColorStop(0, "rgba(180,140,100,0)")
      accent.addColorStop(0.3, "rgba(180,140,100,0.06)")
      accent.addColorStop(1, "rgba(180,140,100,0.02)")
      ctx.fillStyle = accent
      ctx.fillRect(W * 0.55, 0, W * 0.45, H)
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <section className="relative h-[520px] lg:h-[600px] overflow-hidden bg-[#1a1a18]">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* Декоративная сетка overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,240,210,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,240,210,1) 1px, transparent 1px)
          `,
          backgroundSize: "82px 82px",
        }}
      />

      {/* Градиент слева для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a18]/95 via-[#1a1a18]/70 to-transparent" />

      {/* Контент */}
      <div className="relative mx-auto max-w-7xl px-4 h-full flex items-center">
        <div className="max-w-xl flex flex-col gap-6">

          {/* Бейдж */}
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-amber-400/70" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-300/80">
              Склад в Янино — Санкт-Петербург
            </span>
          </div>

          {/* Заголовок */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Керамическая{" "}
            <span className="relative">
              <span className="text-amber-300">плитка</span>
            </span>
            {" "}в&nbsp;СПб
          </h1>

          {/* Подзаголовок */}
          <p className="text-base lg:text-lg text-white/60 leading-relaxed max-w-md">
            Kerama Marazzi, Cersanit, Азори, Гранитея и 8 других брендов.{" "}
            Более&nbsp;4000 позиций на складе. Доставка от 1 дня.
          </p>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-400 text-stone-900 font-semibold text-sm hover:bg-amber-300 transition-colors shadow-lg shadow-amber-900/20"
            >
              Смотреть каталог
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white font-medium text-sm border border-white/20 hover:bg-white/15 transition-colors"
            >
              Все коллекции
            </Link>
          </div>

          {/* Цифры */}
          <div className="flex gap-6 pt-2">
            {[
              { num: "4000+", label: "позиций" },
              { num: "11", label: "брендов" },
              { num: "1 день", label: "доставка" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xl font-bold text-white">{s.num}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Декор — вертикальные линии справа */}
      <div className="absolute right-0 top-0 h-full w-48 opacity-20 hidden lg:block">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-300/50 to-transparent"
            style={{ right: `${i * 48 + 24}px` }}
          />
        ))}
      </div>
    </section>
  )
}
