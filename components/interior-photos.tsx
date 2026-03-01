"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

interface InteriorPhotosProps {
  images: string[]
  productName: string
  collectionName: string
}

export function InteriorPhotos({ images, productName, collectionName }: InteriorPhotosProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  const shown = images.slice(0, 8)

  return (
    <section className="mt-12 lg:mt-16" aria-labelledby="interior-heading">
      <h2 id="interior-heading" className="text-xl lg:text-2xl font-bold text-foreground mb-6">
        {collectionName} в интерьере
      </h2>

      <div
        className={`grid gap-3 ${
          shown.length === 1 ? "grid-cols-1 max-w-md" :
          shown.length === 2 ? "grid-cols-2" :
          shown.length === 3 ? "grid-cols-3" :
          "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {shown.map((url, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="group relative overflow-hidden rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ aspectRatio: "4/3" }}
            aria-label={`Интерьер ${i + 1}`}
          >
            <img
              src={url}
              alt={`${productName} в интерьере — фото ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
              <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 drop-shadow-lg transition-opacity" />
            </div>
          </button>
        ))}
      </div>

      {/* Лайтбокс */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={shown[lightbox]}
              alt={`${productName} в интерьере — фото ${lightbox + 1}`}
              className="w-full h-full object-contain max-h-[80vh] rounded-xl"
            />

            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              aria-label="Закрыть"
            >
              <X className="h-8 w-8" />
            </button>

            {shown.length > 1 && (
              <>
                <button
                  onClick={() => setLightbox((lightbox - 1 + shown.length) % shown.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  aria-label="Предыдущее"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setLightbox((lightbox + 1) % shown.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  aria-label="Следующее"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
              {lightbox + 1} / {shown.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
