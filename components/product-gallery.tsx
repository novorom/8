"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

interface ProductGalleryProps {
  images?: string[]
  videoUrl?: string | null
  name: string
}

function getYtId(embedUrl: string): string {
  const m = embedUrl.match(/embed\/([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : ""
}


function optimizeImage(url: string | undefined | null, width = 900): string {
  if (!url || typeof url !== "string" || url.startsWith("/")) return url ?? ""
  const clean = url.replace("https://", "").replace("http://", "")
  return `https://images.weserv.nl/?url=${clean}&w=${width}&output=webp&q=80&il`
}

export function ProductGallery({ images = [], videoUrl, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  // Исправляем legacy images — некоторые могут быть строкой через ";"
  const normalizedImages = images.flatMap((img) =>
    img.includes(";") ? img.split(";").map((s) => s.trim()).filter(Boolean) : [img]
  ).filter(Boolean)

  const galleryImages = normalizedImages.length > 0
    ? normalizedImages
    : ["/images/tiles/placeholder.jpg"]

  const total = galleryImages.length + (videoUrl ? 1 : 0)
  const isVideo = videoUrl && activeIndex === galleryImages.length

  const prev = () => { setShowVideo(false); setActiveIndex((activeIndex - 1 + total) % total) }
  const next = () => { setShowVideo(false); setActiveIndex((activeIndex + 1) % total) }

  // Preload первой картинки — браузер начнёт загрузку сразу
  useEffect(() => {
    if (galleryImages[0] && galleryImages[0].startsWith("http")) {
      const clean = galleryImages[0].replace("https://", "").replace("http://", "")
      const preloadUrl = `https://images.weserv.nl/?url=${clean}&w=900&output=webp&q=80&il`
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = preloadUrl
      document.head.appendChild(link)
      return () => { document.head.removeChild(link) }
    }
  }, [galleryImages[0]])


  return (
    <div className="flex flex-col gap-3">
      {/* Главный экран */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-border">
        {isVideo ? (
          showVideo ? (
            <iframe
              src={videoUrl + "?autoplay=1"}
              title={`Видео ${name}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => setShowVideo(true)}
              className="relative w-full h-full flex items-center justify-center"
              aria-label="Смотреть видео"
            >
              <img
                src={`https://img.youtube.com/vi/${getYtId(videoUrl!)}/hqdefault.jpg`}
                alt="Превью видео"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-xl hover:bg-red-700 transition-colors">
                  <Play className="h-7 w-7 fill-white text-white ml-1" />
                </div>
                <span className="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                  Смотреть видео
                </span>
              </div>
            </button>
          )
        ) : (
          <img
            src={optimizeImage(galleryImages[activeIndex], 900)}
            alt={`${name} — фото ${activeIndex + 1}`}
            className="w-full h-full object-contain p-4"
            loading={activeIndex === 0 ? "eager" : "lazy"}
            fetchPriority={activeIndex === 0 ? "high" : "auto"}
            decoding="async"
          />
        )}

        {/* Стрелки */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 border border-border flex items-center justify-center shadow hover:bg-white transition-colors"
              aria-label="Предыдущее"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 border border-border flex items-center justify-center shadow hover:bg-white transition-colors"
              aria-label="Следующее"
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>
          </>
        )}

        {/* Счётчик */}
        {total > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
            {activeIndex + 1}/{total}
          </div>
        )}
      </div>

      {/* Миниатюры */}
      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => { setShowVideo(false); setActiveIndex(i) }}
              className={`relative h-16 w-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors bg-white ${
                i === activeIndex && !isVideo
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
              aria-label={`Фото ${i + 1}`}
            >
              <img
                src={optimizeImage(img, 120)}
                alt={`${name} — миниатюра ${i + 1}`}
                className="w-full h-full object-contain p-1"
                loading="lazy"
              />
            </button>
          ))}
          {videoUrl && (
            <button
              onClick={() => setActiveIndex(galleryImages.length)}
              className={`relative h-16 w-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
                isVideo ? "border-primary" : "border-border hover:border-primary/50"
              }`}
              aria-label="Видео"
            >
              <img
                src={`https://img.youtube.com/vi/${getYtId(videoUrl)}/default.jpg`}
                alt="Видео"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="h-5 w-5 fill-white text-white" />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
