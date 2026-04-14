"use client"

import { useState, useEffect } from "react"
import { X, MessageSquare, Zap, Calculator } from "lucide-react"

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Already shown in this session
    const shownSession = sessionStorage.getItem("exit_intent_shown")
    if (shownSession) {
      setHasShown(true)
      return
    }

    const handleMouseOut = (e: MouseEvent) => {
      // If pointer leaves the top of the viewport (y < 10)
      if (e.clientY < 10 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem("exit_intent_shown", "true")
      }
    }

    document.addEventListener("mouseleave", handleMouseOut)
    return () => document.removeEventListener("mouseleave", handleMouseOut)
  }, [hasShown])

  if (!isVisible) return null

  const handleClose = () => setIsVisible(false)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-foreground/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg bg-background rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 text-foreground/60 hover:bg-muted hover:text-foreground transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Background Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-blue-600 to-primary" />

        <div className="p-8 pt-10 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <Calculator className="h-8 w-8" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
            Подождите! ✋
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Не уходите без <span className="text-primary font-semibold">индивидуального 3D-проекта</span> и персональной скидки. Напишите нам, и мы поможем сэкономить до 15% на заказе!
          </p>

          <div className="grid grid-cols-1 gap-4">
            <a
              href="https://wa.me/79052050900?text=Здравствуйте! Я хочу получить бесплатный 3D проект и скидку на плитку."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 h-14 bg-[#25D366] text-white rounded-2xl font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
            >
              <MessageSquare className="h-6 w-6 fill-current" />
              Получить скидку в WhatsApp
            </a>
            
            <button
              onClick={handleClose}
              className="h-14 bg-accent text-foreground rounded-2xl font-semibold hover:bg-accent/80 transition-all active:scale-[0.98]"
            >
              Я просто смотрю
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/30 py-3 px-4 rounded-xl">
             <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
             <span>Отвечаем за 5 минут</span>
          </div>
        </div>
      </div>
    </div>
  )
}
