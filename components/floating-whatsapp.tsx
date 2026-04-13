"use client"

import { Send } from "lucide-react"

export function FloatingWhatsApp() {
  return (
    <a
      href="https://t.me/flyroman"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
      style={{ backgroundColor: "#2AABEE", color: "white", boxShadow: "0 10px 25px -5px rgba(42, 171, 238, 0.5)" }}
      aria-label="Написать в Telegram для быстрого расчета"
    >
      <Send className="h-6 w-6 -ml-1 mt-1" />
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-background text-foreground text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
        Написать нам
      </span>
    </a>
  )
}
