'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { CheckoutModal, type OrderData } from '@/components/checkout-modal'

const UPSELL_ITEMS = [
  {
    id: "upsell-1",
    name: "Клей плиточный усиленный (25 кг)",
    price: 650,
    unit: "шт",
    image: "https://plitburg.ru/image/cache/catalog/klej/litokol/kley-litokol-litoflex-k80-belyy-25-kg_5587788-228x228.jpg"
  },
  {
    id: "upsell-2",
    name: "Система выравнивания плитки (100 зажимов)",
    price: 350,
    unit: "уп",
    image: "https://plitburg.ru/image/cache/catalog/svp/svp-3d-krestiki-osnova-15mm-500-sht-zazhim_10777594-228x228.png"
  },
  {
    id: "upsell-3",
    name: "Затирка цементная влагостойкая (2 кг)",
    price: 450,
    unit: "шт",
    image: "https://plitburg.ru/image/cache/catalog/zatirki/kiilto/zatirka-cementnaya-kiilto-saumalaasti-20-40-chernyy-3-kg_5587841-228x228.jpg"
  }
]

export default function CartPage() {
  const router = useRouter()
  const { items, addItem, removeItem, updateQuantity, clearCart, total } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const generateWhatsAppCartLink = () => {
    let text = `Здравствуйте! Хочу оформить заказ:\n\n`
    items.forEach((item, i) => {
      text += `${i + 1}. ${item.name} — ${item.quantity} шт/м² (по ${item.price} руб.)\n`
    })
    text += `\n*Итого: ${total.toLocaleString('ru-RU')} ₽*\n\nЖду информацию по доставке и подтверждение.`
    return `https://wa.me/79052050900?text=${encodeURIComponent(text)}`
  }

  const handleCheckout = async (orderData: OrderData) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total,
          ...orderData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit order')
      }

      // Clear cart and show success message
      clearCart()
      setIsCheckoutOpen(false)
      
      // Show success message
      alert('Спасибо! Ваш заказ принят. Мы свяжемся с вами в ближайшее время.')
      router.push('/catalog')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при отправке заказа. Пожалуйста, попробуйте позже.'
      alert(errorMessage)
    }
  }

  if (items.length === 0) {
    return (
      <div className="bg-muted/30 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="h-5 w-5" />
            Вернуться
          </button>

          <div className="bg-background rounded-2xl border border-border p-8 md:p-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Корзина пуста</h1>
            <p className="text-foreground/60 mb-8">Добавьте товары, чтобы начать покупку</p>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="h-5 w-5" />
          Вернуться
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-background rounded-2xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h1 className="text-2xl font-bold text-foreground">Корзина</h1>
                <p className="text-sm text-foreground/60 mt-1">
                  {items.length} {items.length === 1 ? 'товар' : 'товаров'}
                </p>
              </div>

              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex gap-4 hover:bg-muted/30 transition-colors"
                  >
                    {item.image && (
                      <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <p className="text-sm text-foreground/60 mt-1">
                        {(item.price).toLocaleString('ru-RU')} ₽ за м²
                      </p>

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 rounded-lg border border-border hover:bg-accent transition-colors flex items-center justify-center"
                        >
                          <Minus className="h-4 w-4 text-foreground/70" />
                        </button>
                        <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-lg border border-border hover:bg-accent transition-colors flex items-center justify-center"
                        >
                          <Plus className="h-4 w-4 text-foreground/70" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <p className="font-semibold text-foreground">
                        {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-foreground/60 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UPSELL / CROSS-SELL SECTION: INCREASES AOV (AVERAGE ORDER VALUE) */}
            <div className="mt-8 bg-background rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-4">Не забудьте добавить к заказу:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {UPSELL_ITEMS.map((upsell) => {
                  const inCart = items.find(i => i.id === upsell.id)
                  return (
                    <div key={upsell.id} className="border border-border rounded-xl p-4 flex flex-col gap-3 hover:border-primary/50 transition-colors bg-muted/10">
                      <div className="relative h-24 w-full rounded-lg bg-white overflow-hidden mix-blend-multiply">
                        <Image
                          src={upsell.image}
                          alt={upsell.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium leading-snug line-clamp-2">{upsell.name}</h3>
                        <p className="text-primary font-bold mt-1">{upsell.price} ₽ / {upsell.unit}</p>
                      </div>
                      {inCart ? (
                        <div className="flex items-center justify-between border border-primary/20 bg-primary/5 rounded-lg p-1 mt-auto">
                          <button
                            onClick={() => updateQuantity(upsell.id, inCart.quantity - 1)}
                            className="h-8 w-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-md"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-sm font-medium text-primary">{inCart.quantity}</span>
                          <button
                            onClick={() => updateQuantity(upsell.id, inCart.quantity + 1)}
                            className="h-8 w-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-md"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addItem({ id: upsell.id, name: upsell.name, price: upsell.price, quantity: 1, image: upsell.image })}
                          className="h-10 w-full bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors mt-auto text-sm"
                        >
                          В корзину
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-2xl border border-border p-6 sticky top-20">
              <h2 className="text-lg font-bold text-foreground mb-6">Итоги</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Подитог:</span>
                  <span className="font-medium text-foreground">
                    {total.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Доставка:</span>
                  <span className="font-medium text-foreground">
                    По договорённости
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-semibold text-foreground">Итого:</span>
                <span className="text-xl font-bold text-primary">
                  {total.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              <button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors mb-3"
              >
                Оформить стандартно
              </button>

              <a
                href={generateWhatsAppCartLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 flex items-center justify-center gap-2 rounded-xl text-white font-medium transition-colors mb-3"
                style={{ background: "#25D366" }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Оформить в WhatsApp
              </a>

              <button
                onClick={() => router.push('/catalog')}
                className="w-full h-11 rounded-xl border border-border text-foreground font-medium hover:bg-accent transition-colors mb-3"
              >
                Продолжить покупки
              </button>

              <button
                onClick={clearCart}
                className="w-full h-11 rounded-xl border border-destructive/30 text-destructive font-medium hover:bg-destructive/5 transition-colors"
              >
                Очистить корзину
              </button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckout}
        total={total}
        itemCount={items.length}
      />
    </div>
  )
}
