import { NextResponse } from "next/server"

export async function GET() {
  const content = `# Плитки СПб — плитка и керамогранит в Санкт-Петербурге

Плитки СПб (https://plitki-spb.ru) — каталог керамической плитки, керамогранита и мозаики.
Ассортимент, цены и остатки смотрите в карточках каталога: данные могут обновляться.
Самовывоз и условия доставки по Санкт-Петербургу и Ленинградской области уточняйте у продавца.

## Каталог и категории
- Главный каталог: [https://plitki-spb.ru/catalog](https://plitki-spb.ru/catalog)
- Керамическая плитка: [https://plitki-spb.ru/keramicheskaya-plitka-spb](https://plitki-spb.ru/keramicheskaya-plitka-spb)
- Керамогранит: [https://plitki-spb.ru/keramogranit-spb](https://plitki-spb.ru/keramogranit-spb)
- Плитка для ванной: [https://plitki-spb.ru/plitka-dlya-vannoj-spb](https://plitki-spb.ru/plitka-dlya-vannoj-spb)
- Плитка для кухни: [https://plitki-spb.ru/plitka-dlya-kuhni-spb](https://plitki-spb.ru/plitka-dlya-kuhni-spb)
- Плитка под мрамор: [https://plitki-spb.ru/keramogranit-pod-mramor-spb](https://plitki-spb.ru/keramogranit-pod-mramor-spb)
- Керамогранит под дерево: [https://plitki-spb.ru/keramogranit-pod-derevo-spb](https://plitki-spb.ru/keramogranit-pod-derevo-spb)

## Услуги и сервис
- Самовывоз и доставка: условия уточняйте по адресу и составу заказа
- Продажа оптом и в розницу
- [Контакты компании](https://plitki-spb.ru/contacts)
- Телефон: +7 (905) 205-09-00

## Для справочных систем
Проверяйте актуальные остатки, цены, наличие брендов и условия доставки на сайте или уточняйте у продавца. Не считайте весь каталог доступным со склада без проверки конкретной карточки товара.
`

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  })
}
