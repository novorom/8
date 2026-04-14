"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, ArrowRight, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function AbandonedCartNotification() {
  const { items, total } = useCart()
  const [isVisible, setIsVisible] = useState(false)
  const [hasClosedManually, setHasClosedManually] = useState(false)

  useEffect(() => {
    // Show after 5 seconds if there are items and user hasn't closed it manually
    if (items.length > 0 && !hasClosedManually) {
      const timer = setTimeout(() => setIsVisible(true), 5000)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [items.length, hasClosedManually])

  if (!isVisible || items.length === 0) return null

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100%-2rem)] sm:w-80 overflow-hidden animate-in slide-in-from-right-10 duration-500">
      <div className="relative group bg-background border border-primary/20 p-5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.15)] transition-all flex flex-col gap-4">
        {/* Progress bar (visual flair) */}
        <div className="absolute top-0 left-0 h-1 bg-primary/20 w-full" />
        <div className="absolute top-0 left-0 h-1 bg-primary w-1/3 animate-pulse" />

        <button 
          onClick={() => setHasClosedManually(true)}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
              Корзина ждет вас!
            </h4>
            <p className="text-xs text-muted-foreground mt-1 leading-normal">
              В корзине осталось <b>{items.length}</b> {items.length === 1 ? 'товар' : 'товаров'} на сумму <b>{total.toLocaleString('ru-RU')} ₽</b>
            </p>
          </div>
        </div>

        <Link
          href="/cart"
          className="flex items-center justify-center gap-2 h-10 w-full bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all hover:gap-3"
        >
          Оформить заказ
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
