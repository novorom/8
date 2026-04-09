interface SpecItem {
  key: string
  label: string
  icon: React.ReactNode
}

interface ProductSpecIconsProps {
  surface?: string
  rectified?: boolean
  frostResistant?: boolean
  wearClass?: string | number
  slipClass?: string | number
  waterAbs?: string | number
}

const IconSurface = () => (
  <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
    <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 16h24M16 4v24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
  </svg>
)

const IconRectified = () => (
  <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
    <rect x="3" y="3" width="26" height="26" rx="1.5" stroke="currentColor" strokeWidth="2"/>
    <rect x="7" y="7" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
  </svg>
)

const IconFrost = () => (
  <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
    <path d="M16 4v24M4 16h24M7.5 7.5l17 17M24.5 7.5l-17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="2.5" fill="currentColor"/>
    <circle cx="16" cy="5" r="1.5" fill="currentColor"/>
    <circle cx="16" cy="27" r="1.5" fill="currentColor"/>
    <circle cx="5" cy="16" r="1.5" fill="currentColor"/>
    <circle cx="27" cy="16" r="1.5" fill="currentColor"/>
  </svg>
)

const IconWear = () => (
  <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
    <path d="M6 26h20M6 26V10l10-6 10 6v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 26v-7h6v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const IconSlip = () => (
  <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
    <rect x="4" y="20" width="24" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 20v-7l6-5 6 5v7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M8 25v3M16 25v3M24 25v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const IconWater = () => (
  <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
    <path d="M16 4C16 4 8 14 8 19.5a8 8 0 0016 0C24 14 16 4 16 4z" stroke="currentColor" strokeWidth="2"/>
    <path d="M11 22c1.5 2 3.5 3 5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export function ProductSpecIcons({
  surface, rectified, frostResistant, wearClass, slipClass, waterAbs
}: ProductSpecIconsProps) {
  const items: SpecItem[] = []

  if (surface && typeof surface === "string" && surface.trim()) {
    const label =
      surface.includes("полир") ? "Полированная" :
      surface.includes("мат") ? "Матовая" :
      surface.includes("глаз") || surface.includes("гл") ? "Глазурованная" :
      surface.includes("сатин") ? "Сатинированная" :
      surface.includes("рельеф") ? "Рельефная" :
      surface.includes("структур") ? "Структурная" :
      surface
    items.push({ key: "surface", label, icon: <IconSurface /> })
  }
  if (rectified) items.push({ key: "rectified", label: "Ректификат", icon: <IconRectified /> })
  if (frostResistant) items.push({ key: "frost", label: "Морозостойкость", icon: <IconFrost /> })
  if (wearClass !== undefined && wearClass !== null && String(wearClass).trim())
    items.push({ key: "wear", label: `Износостойкость кл. ${wearClass}`, icon: <IconWear /> })
  if (slipClass !== undefined && slipClass !== null && String(slipClass).trim())
    items.push({ key: "slip", label: `Антискольжение ${slipClass}`, icon: <IconSlip /> })
  if (waterAbs !== undefined && waterAbs !== null && String(waterAbs).trim())
    items.push({ key: "water", label: "Низкое водопоглощение", icon: <IconWater /> })

  if (items.length === 0) return null

  return (
    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Характеристики
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-3 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-default"
            style={{ minWidth: "72px", maxWidth: "88px" }}
            title={item.label}
          >
            <span className="text-muted-foreground">{item.icon}</span>
            <span className="text-[10px] leading-tight text-foreground/70 font-medium text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
