'use client'

import { useState } from 'react'
import { X, Phone, MessageCircle, Loader2, CheckCircle } from 'lucide-react'

interface QuickBuyModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  productPrice: number
  productSku: string
}

export function QuickBuyModal({
  isOpen,
  onClose,
  productName,
  productPrice,
  productSku,
}: QuickBuyModalProps) {
  const [contactMethod, setContactMethod] = useState<'phone' | 'telegram'>('phone')
  const [contactValue, setContactValue] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Введите ваше имя')
      return
    }
    if (!contactValue.trim()) {
      setError(contactMethod === 'phone' ? 'Введите номер телефона' : 'Введите Telegram (@username)')
      return
    }
    if (contactMethod === 'phone') {
      const phoneRegex = /^\+?[\d\s\-(]{10,}$/
      if (!phoneRegex.test(contactValue)) {
        setError('Введите корректный номер телефона')
        return
      }
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ id: productSku, name: productName, price: productPrice, quantity: 1 }],
          total: productPrice,
          contactMethod,
          contactValue: contactValue.trim(),
          name: name.trim(),
          quickBuy: true,
        }),
      })
      if (!res.ok) throw new Error('Ошибка отправки')
      setIsSuccess(true)
    } catch {
      setError('Не удалось отправить заявку. Попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setContactValue('')
    setName('')
    setError('')
    setIsSuccess(false)
    setContactMethod('phone')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-background rounded-2xl border border-border shadow-xl w-full max-w-sm p-6">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4 text-foreground/60" />
        </button>

        {isSuccess ? (
          <div className="text-center py-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-1">Заявка отправлена!</h3>
            <p className="text-sm text-muted-foreground">
              Мы свяжемся с вами в ближайшее время
            </p>
            <button
              onClick={handleClose}
              className="mt-5 w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-foreground mb-1">Купить в 1 клик</h2>
            <p className="text-sm text-muted-foreground mb-4 leading-snug">
              {productName}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Name */}
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
              />

              {/* Contact method toggle */}
              <div className="flex gap-2">
                {([
                  { value: 'phone', label: 'Телефон', icon: Phone },
                  { value: 'telegram', label: 'Telegram', icon: MessageCircle },
                ] as const).map(({ value, label, icon: Icon }) => (
                  <label
                    key={value}
                    className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg border cursor-pointer text-sm font-medium transition-colors ${
                      contactMethod === value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={value}
                      checked={contactMethod === value}
                      onChange={() => { setContactMethod(value); setContactValue('') }}
                      className="sr-only"
                    />
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </label>
                ))}
              </div>

              {/* Contact input */}
              <input
                type={contactMethod === 'phone' ? 'tel' : 'text'}
                placeholder={contactMethod === 'phone' ? '+7 (___) ___-__-__' : '@username'}
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
              />

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="h-11 w-full rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Отправляем...</>
                ) : (
                  'Оставить заявку'
                )}
              </button>

              <p className="text-[11px] text-center text-muted-foreground">
                Менеджер перезвонит и согласует детали
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
