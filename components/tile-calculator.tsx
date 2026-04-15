"use client"

import { useState } from "react"
import { Calculator, RefreshCw } from "lucide-react"

export function TileCalculator() {
  const [width, setWidth] = useState("")
  const [length, setLength] = useState("")
  const [reserve, setReserve] = useState(10)

  const calculateArea = () => {
    const w = parseFloat(width.replace(",", "."))
    const l = parseFloat(length.replace(",", "."))
    if (isNaN(w) || isNaN(l) || w <= 0 || l <= 0) return 0
    return w * l
  }

  const baseArea = calculateArea()
  const totalArea = baseArea * (1 + reserve / 100)
  const finalQuantity = Math.ceil(totalArea)

  const handleReset = () => {
    setWidth("")
    setLength("")
    setReserve(10)
  }

  return (
    <div className="w-full bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Calculator className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Рассчитать объем</h2>
            <p className="text-sm text-muted-foreground">Введите размеры площади для укладки</p>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
          title="Сбросить"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Длина поверхности, м</label>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="3.5"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="h-12 rounded-xl border border-input bg-background px-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Ширина/Высота, м</label>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="2.8"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="h-12 rounded-xl border border-input bg-background px-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-foreground flex justify-between">
              <span>Запас на подрезку</span>
              <span className="text-primary font-bold">{reserve}%</span>
            </label>
            <div className="flex gap-2">
              {[0, 5, 10, 15, 20].map((percent) => (
                <button
                  key={percent}
                  onClick={() => setReserve(percent)}
                  className={`flex-1 h-11 rounded-xl text-sm font-medium transition-all border ${
                    reserve === percent
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {percent}%
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Совет:</strong> 10% — стандарт для прямой укладки. 15-20% — для диагональной или при сложной геометрии помещения.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Calculator className="h-24 w-24" />
            </div>
            
            <div className="flex justify-between items-center transition-all">
              <span className="text-muted-foreground font-medium">Чистая площадь:</span>
              <span className="text-xl font-semibold">{baseArea.toFixed(2)} м²</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Площадь с запасом:</span>
              <span className="text-xl font-semibold">{totalArea.toFixed(2)} м²</span>
            </div>
            
            <div className="h-px bg-primary/20" />
            
            <div className="flex flex-col gap-2 items-center text-center">
              <span className="text-foreground font-medium uppercase tracking-wider text-xs">Итого к покупке</span>
              <span className="text-5xl font-black text-primary tracking-tighter">
                {finalQuantity} <span className="text-2xl font-bold">м²</span>
              </span>
              <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">
                Округляем до целых метров для гарантии наличия нужного объема.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
