import { NextRequest, NextResponse } from 'next/server'

interface OrderRequest {
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  total: number
  contactMethod: 'phone' | 'telegram' | 'email'
  contactValue: string
  name: string
}

async function sendTelegramMessage(message: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured')
    throw new Error('Telegram not configured')
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to send Telegram message')
  }
}



export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json()

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    if (!body.name || !body.contactValue) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Format order summary
    const itemsList = body.items
      .map((item) => `${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString('ru-RU')} ₽`)
      .join('\n')


    // Prepare message
    const contactMethodLabel = 
      body.contactMethod === 'phone' ? '📱 Телефон' : 
      body.contactMethod === 'telegram' ? '💬 Telegram' : 
      '📧 Email'

    const orderMessage = `🛒 <b>НОВЫЙ ЗАКАЗ</b>

👤 <b>Имя:</b> ${body.name}
${contactMethodLabel}: <code>${body.contactValue}</code>

<b>📦 ТОВАРЫ:</b>
${itemsList}

<b>💰 СУММА:</b>
Подитог: <code>${body.total.toLocaleString('ru-RU')} ₽</code>
Доставка: рассчитывается индивидуально
<b>ИТОГО (без доставки): ${body.total.toLocaleString('ru-RU')} ₽</b>

<i>Заказ поступил в ${new Date().toLocaleString('ru-RU')}</i>`

    // Send to Telegram
    await sendTelegramMessage(orderMessage)

    return NextResponse.json({
      success: true,
      message: 'Заказ успешно отправлен',
    })
  } catch (error) {
    console.error('Order processing error:', error)
    return NextResponse.json(
      { error: 'Ошибка при обработке заказа' },
      { status: 500 }
    )
  }
}
