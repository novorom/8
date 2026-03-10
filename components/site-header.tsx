"use client"

import { useState, KeyboardEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, Menu, X, Phone } from "lucide-react"
import { Logo } from "./logo"
import { useCart } from "@/lib/cart-context"

const navLinks = [
  { href: "/catalog", label: "Каталог" },
  { href: "/brands", label: "Бренды" },
  { href: "/blog", label: "Блог" },
  { href: "/delivery", label: "Доставка" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
]

export function SiteHeader() {
  const router = useRouter()
  const { items } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch()
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-auto py-2.5 text-sm flex-wrap gap-3">
          <span className="hidden sm:block">Kerama Marazzi, Cersanit, Азори — склад Янино, СПб</span>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+79052050900" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>+7 (905) 205-09-00</span>
            </a>
            <span className="text-primary-foreground/70 hidden lg:inline">Склад: Пн–Пт 10:00–16:45 | Шоурум: ежедн. 10:00–17:00</span>
            <span className="text-primary-foreground/70 lg:hidden">Пн–Пт 10:00–16:45</span>
            <a href="https://t.me/flyroman" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" title="Telegram" aria-label="Telegram @flyroman">
              <Image src="/images/telegram-logo.svg" alt="Telegram" width={32} height={32} className="h-7 w-7 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16 gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo className="h-11 md:h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Поиск по каталогу..."
                className="border border-border rounded-lg px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <button onClick={handleSearch} className="p-2 hover:bg-primary/5 rounded-lg transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button onClick={() => setSearchOpen(false)} className="p-2 hover:bg-primary/5 rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 hover:bg-primary/5 rounded-lg transition-colors" aria-label="Поиск">
              <Search className="h-5 w-5" />
            </button>
          )}

          {/* Cart */}
          <Link href="/cart" className="p-2 hover:bg-primary/5 rounded-lg transition-colors relative" aria-label="Корзина">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu */}
          <button
            className="lg:hidden p-2 hover:bg-primary/5 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
