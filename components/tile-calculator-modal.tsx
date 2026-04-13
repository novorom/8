"use client"

import { useState } from "react"
import { X, Calculator } from "lucide-react"

interface TileCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  pricePerSqm: number
  onApplyQuantity: (qty: number) => void
}

export function TileCalculatorModal({
  isOpen,
  onClose,
  productName,
  pricePerSqm,
  onApplyQuantity,
}: TileCalculatorModalProps) {
  const [width, setWidth] = useState("")
  const [length, setLength] = useState("")
  const [reserve, setReserve] = useState(10) // 10% reserve by default

  if (!isOpen) return null

  const calculateArea = () => {
    const w = parseFloat(width.replace(",", "."))
    const l = parseFloat(length.replace(",", "."))
    if (isNaN(w) || isNaN(l) || w <= 0 || l <= 0) return 0
    return w * l
  }

  const baseArea = calculateArea()
  const totalArea = baseArea * (1 + reserve / 100)
  // Round up to nearest whole integer for simplicity of ordering (or 1 decimal if needed, but our input uses whole meters usually? No, our cart accepts integers. Wait, quantity is integer in the UI. So round up)
  const finalQuantity = Math.ceil(totalArea)
  const finalPrice = finalQuantity * pricePerSqm

  const handleApply = () => {
    if (finalQuantity > 0) {
      onApplyQuantity(finalQuantity)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl border border-border p-6 flex flex-col gap-5">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-muted-foreground hover:bg-accent rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 text-foreground">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Калькулятор плитки</h2>
            <p className="text-sm text-muted-foreground line-clamp-1">{productName}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">Длина поверхности, м</label>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Например: 3.5"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="h-11 rounded-xl border border-input bg-background px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">Ширина/Высота, м</label>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Например: 2.8"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="h-11 rounded-xl border border-input bg-background px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">Запас на подрезку</label>
            <div className="flex gap-2">
              {[0, 5, 10, 15].map((percent) => (
                <button
                  key={percent}
                  onClick={() => setReserve(percent)}
                  className={`flex-1 h-10 rounded-lg text-sm font-medium transition-colors border ${
                    reserve === percent
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {percent}%
                </button>
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground mt-1">
              Рекомендуем брать 10% запаса при прямой укладке и 15% при диагональной.
            </span>
          </div>

          <div className="mt-2 p-4 rounded-xl bg-accent/50 border border-border flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Чистая площадь:</span>
              <span className="font-medium">{baseArea.toFixed(2)} м²</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Площадь с запасом:</span>
              <span className="font-medium">{totalArea.toFixed(2)} м²</span>
            </div>
            <div className="h-px bg-border my-1" />
            <div className="flex justify-between items-end">
              <span className="text-foreground font-medium">Итого к заказу:</span>
              <div className="flex flex-col items-end">
                <span className="text-xl font-bold text-primary">{finalQuantity} м²</span>
                {finalQuantity > 0 && pricePerSqm > 0 && (
                  <span className="text-xs text-muted-foreground mt-0.5">
                    ≈ {finalPrice.toLocaleString("ru-RU")} ₽
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleApply}
            disabled={finalQuantity <= 0}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            Применить количество
          </button>
        </div>
      </div>
    </div>
  )
}
