"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Logo } from "./logo"

const footerLinks = {
  catalog: [
    { label: "Керамическая плитка", href: "/catalog?product_type=Керамическая плитка" },
    { label: "Керамогранит", href: "/catalog?product_type=Керамогранит" },
    { label: "Мозаика", href: "/catalog?product_type=Мозаика" },
    { label: "Ступени", href: "/catalog?product_type=Ступени" },
  ],
  brands: [
    { label: "Kerama Marazzi", href: "/brands/kerama-marazzi" },
    { label: "Cersanit", href: "/brands/cersanit" },
    { label: "Азори", href: "/brands/azori" },
    { label: "Нефрит-Керамика", href: "/brands/nefrit-keramika" },
    { label: "Урал Гранит", href: "/brands/ural-granit" },
    { label: "Все бренды", href: "/brands" },
  ],
  info: [
    { label: "О компании", href: "/about" },
    { label: "Отзывы", href: "/reviews" },
    { label: "Доставка", href: "/delivery" },
    { label: "Контакты", href: "/contacts" },
    { label: "Блог", href: "/blog" },
    { label: "Вопросы и ответы", href: "/faq" },
  ],
  seo: [
    { label: "Плитка в СПб", href: "/spb" },
    { label: "Керамическая плитка СПб", href: "/keramicheskaya-plitka-spb" },
    { label: "Керамогранит СПб", href: "/keramogranit-spb" },
    { label: "Плитка для ванной СПб", href: "/plitka-dlya-vannoj-spb" },
    { label: "Плитка для кухни СПб", href: "/plitka-dlya-kuhni-spb" },
    { label: "Керамогранит 60x60 СПб", href: "/keramogranit-60x60-spb" },
    { label: "Керамогранит 60x120 СПб", href: "/keramogranit-60x120-spb" },
    { label: "Плитка под дерево СПб", href: "/plitka-pod-derevo-spb" },
    { label: "Плитка под мрамор СПб", href: "/plitka-pod-mramor-spb" },
    { label: "Магазин плитки СПб", href: "/magazin-plitki-spb" },
    { label: "Доставка плитки СПб", href: "/dostavka-plitki-spb" },
    { label: "Плитка Янино", href: "/plitka-yanino-spb" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-slate-400 mb-4 max-w-xs">
              Многобрендовый магазин керамической плитки и керамогранита в Санкт-Петербурге. Склад и шоурум в Янино.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+79052050900" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                +7 (905) 205-09-00
              </a>
              <a href="mailto:novorom@mail.ru" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                novorom@mail.ru
              </a>
              <a href="https://t.me/plitki_spb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.47c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.16 14.26l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.326z"/></svg>
                Telegram
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>п. Янино-1, Ленинградская область</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Склад: Пн–Пт 10:00–16:45<br />Шоурум: ежедн. 10:00–17:00</span>
              </div>
            </div>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="text-white font-semibold mb-3">Каталог</h3>
            <ul className="space-y-2">
              {footerLinks.catalog.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Бренды */}
          <div>
            <h3 className="text-white font-semibold mb-3">Бренды</h3>
            <ul className="space-y-2">
              {footerLinks.brands.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-white font-semibold mb-3">Информация</h3>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO links */}
        <div className="border-t border-slate-700 pt-6 mb-6">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {footerLinks.seo.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Плитки СПб. Все права защищены.</span>
          <span>Склад: п. Янино-1, Ленинградская обл. | ИНН по запросу</span>
        </div>
      </div>
    </footer>
  )
}
