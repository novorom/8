"use client"

import { useState } from "react"

interface BrandLogoProps {
  src: string
  alt: string
  color: string
}

export function BrandLogo({ src, alt, color }: BrandLogoProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <span className="text-lg font-bold text-center" style={{ color }}>
        {alt}
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`Логотип ${alt}`}
      className="max-h-14 max-w-full object-contain"
      onError={() => setError(true)}
    />
  )
}
