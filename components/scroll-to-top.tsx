"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled up to given distance
  useEffect(() => {
    const handleScroll = () => {
      // Show after 400px of scrolling
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Наверх"
      className={`fixed bottom-24 right-5 z-50 p-3 rounded-full bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      } sm:bottom-8 sm:right-8 md:bottom-10 md:right-10`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
