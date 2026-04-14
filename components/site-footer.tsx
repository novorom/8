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
    { label: "Доставка плитки СПб", href: "/dostavka-plitki-spb" },
    { label: "Плитка Янино", href: "/plitka-yanino-spb" },
    { label: "Кафельная плитка СПб", href: "/kafelnaya-plitka-spb" },
    { label: "Плитка для фартука", href: "/plitka-dlya-fartuka-spb" },
    { label: "Распродажа плитки", href: "/rasprodazha-plitki-spb" },
    { label: "Керамогранит оптом", href: "/keramogranit-optom-spb" },
    { label: "Напольная плитка", href: "/napolnaya-plitka-spb" },
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
              Ведущий поставщик керамической плитки и керамогранита в Санкт-Петербурге и Ленинградской области. Складской терминал и пункт выдачи в Янино.
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
              <div className="flex gap-4 mt-2">
                <a href="https://t.me/flyroman" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-primary/20 transition-colors text-slate-300 hover:text-primary">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.47c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.16 14.26l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.326z"/></svg>
                </a>
                <a href="https://vk.com/tilebox" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-primary/20 transition-colors text-slate-300 hover:text-primary">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.162 18.994c-5.674 0-8.913-3.898-9.052-10.384h2.82c.1 4.739 2.182 6.745 3.841 7.161V8.61h2.66v4.088c1.631-.174 3.311-2.011 3.891-4.088h2.66c-.439 2.509-2.28 4.351-3.565 5.105 1.285.599 3.425 2.211 4.225 5.279h2.899c-.739-2.31-2.936-4.088-4.225-4.821 1.285-.733 3.031-2.739 3.425-4.505h-2.66c-.347.954-1.258 2.394-2.203 3.123V8.61h.001v.001z"/></svg>
                </a>
                <a href="https://www.avito.ru/brands/i1860592" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-primary/20 transition-colors text-slate-300 hover:text-primary flex items-center gap-1.5 text-[10px] font-bold uppercase">
                  Avito ⭐⭐⭐⭐⭐
                </a>
              </div>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-white font-semibold mb-3">Каталог</h3>
            <ul className="space-y-2">
              {footerLinks.catalog.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trusted Badges */}
          <div>
            <h3 className="text-white font-semibold mb-6">Официальный дилер</h3>
            <div className="grid grid-cols-2 gap-6 opacity-80 filter grayscale hover:grayscale-0 transition-all duration-500">
              <div className="bg-white/5 p-3 rounded-xl flex items-center justify-center h-12 border border-white/5">
                <img src="https://res.cloudinary.com/de1sotnld/image/upload/v1776174048/brands/cersanit.png" alt="Cersanit" className="max-h-6 w-auto" />
              </div>
              <div className="bg-white/5 p-3 rounded-xl flex items-center justify-center h-12 border border-white/5">
                <img src="https://res.cloudinary.com/de1sotnld/image/upload/v1776174049/brands/kerama-marazzi.png" alt="Kerama Marazzi" className="max-h-6 w-auto" />
              </div>
              <div className="bg-white/5 p-3 rounded-xl flex items-center justify-center h-12 border border-white/5">
                <img src="https://res.cloudinary.com/de1sotnld/image/upload/v1776174046/brands/azori.png" alt="Azori" className="max-h-6 w-auto" />
              </div>
              <div className="bg-white/5 p-3 rounded-xl flex items-center justify-center h-12 border border-white/5">
                <img src="https://res.cloudinary.com/de1sotnld/image/upload/v1776174051/brands/ural-granit.jpg" alt="Ural Granit" className="max-h-6 w-auto" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">Информация</h3>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO links */}
        <div className="border-t border-slate-700 pt-6 mb-6">
          <h4 className="text-slate-500 text-[10px] font-bold uppercase mb-3">Популярные запросы</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {footerLinks.seo.map((link) => (
              <Link key={link.href} href={link.href} className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} Плитики СПб. Все права защищены.</span>
            <span>Склад: п. Янино-1, Ленинградская обл., мкр. Кольцевой, участок 37</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end gap-1">
              <div className="flex gap-2 items-center grayscale contrast-125 opacity-50">
                <div className="w-8 h-5 bg-slate-700 rounded flex items-center justify-center font-bold text-[8px] text-white">VISA</div>
                <div className="w-8 h-5 bg-slate-700 rounded flex items-center justify-center font-bold text-[8px] text-white">MIR</div>
                <div className="w-8 h-5 bg-slate-700 rounded flex items-center justify-center font-bold text-[8px] text-white">QR</div>
              </div>
              <span>Оплата картой, наличными, QR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
