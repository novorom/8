"use client"

import { useEffect, useRef } from "react"
type StroyItem = {
  t: string
  b?: string
  n: string
  s: string
  k: string
  g?: string
  q: number
  p: number | null
  img?: string
  ph?: string
}

type StroyLandingClientProps = { initialItems: StroyItem[] }

export default function StroyLandingClient({ initialItems }: StroyLandingClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const formatStock = (value: number) => value.toLocaleString("ru-RU")

  useEffect(() => {
    // Load external script with data and logic
    const script = document.createElement('script')
    script.src = '/stroy-data.js'
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#e9e8e4',
        color: '#1f2429',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
        fontSize: '16px',
        lineHeight: 1.5,
      }}
    >
      <style jsx global>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .wrap { max-width: 920px; margin: 0 auto; padding: 0 16px; }
        h1, h2, .brand, .price { font-family: "Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif; }
        header { position: sticky; top: 0; z-index: 5; background: #e9e8e4; border-bottom: 1px solid #c6c5be; }
        header .wrap { display: flex; align-items: center; justify-content: space-between; height: 56px; }
        .brand { font-weight: 800; font-size: 1.25rem; letter-spacing: 0.01em; }
        .btn { display: inline-block; padding: 11px 18px; border-radius: 6px; background: #1f2429; color: #fff; text-decoration: none; font-weight: 600; border: 2px solid #1f2429; cursor: pointer; font-size: 1rem; }
        .btn.alt { background: transparent; color: #1f2429; }
        .btn:focus-visible, .row:focus-visible, .tab:focus-visible, input:focus-visible { outline: 3px solid #1f5fbf; outline-offset: 2px; }
        .hero { padding: 40px 0 24px; }
        h1 { font-size: clamp(2rem, 6.4vw, 3.5rem); line-height: 1.04; font-weight: 800; margin: 0 0 16px; max-width: 15em; }
        .hero p { max-width: 34em; margin: 0 0 22px; color: #5d646b; font-size: 1.05rem; }
        .hero .btns { display: flex; gap: 10px; flex-wrap: wrap; }
        h2 { font-size: 1.7rem; margin: 0 0 14px; font-weight: 800; }
        .tools { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; align-items: center; }
        .tab { padding: 8px 14px; border: 1.5px solid #1f2429; border-radius: 999px; background: transparent; font-size: 0.95rem; cursor: pointer; color: #1f2429; }
        .tab[aria-pressed="true"] { background: #1f2429; color: #fff; }
        input[type="search"] { flex: 1; min-width: 160px; padding: 9px 12px; border: 1.5px solid #c6c5be; border-radius: 6px; background: #f6f5f2; font-size: 1rem; color: #1f2429; }
        .note { color: #5d646b; font-size: 0.9rem; margin: 0 0 12px; }
        .list { display: grid; gap: 8px; }
        .row { display: grid; grid-template-columns: 76px 1fr auto; gap: 14px; align-items: center; width: 100%; text-align: left; background: #f6f5f2; border: 1px solid #c6c5be; border-radius: 8px; padding: 10px 12px; cursor: pointer; color: #1f2429; font: inherit; }
        .row:hover { border-color: #1f2429; }
        .sw { width: 76px; height: 76px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.18); background-color: #ddd; overflow: hidden; }
        .sw img { width: 100%; height: 100%; object-fit: cover; display: block; cursor: zoom-in; transition: transform 0.15s; }
        .sw img:hover { transform: scale(1.06); }
        .nm { font-weight: 700; line-height: 1.25; }
        .sub { color: #5d646b; font-size: 0.9rem; }
        .price { background: #f4c400; color: #111; font-weight: 800; font-size: 1.35rem; padding: 6px 14px 6px 20px; clip-path: polygon(12px 0, 100% 0, 100% 100%, 12% 100%, 0 50%); white-space: nowrap; }
        .price small { font-size: 0.8rem; font-weight: 700; }
        .price.ask { background: transparent; color: #5d646b; clip-path: none; border: 1.5px dashed #c6c5be; font-size: 0.95rem; padding: 5px 10px; font-weight: 700; }
        .empty { padding: 18px; color: #5d646b; }
        .terms { display: grid; grid-template-columns: 1fr 1fr; gap: 22px 28px; margin: 0; padding: 0; }
        .terms div { border-top: 3px solid #1f2429; padding-top: 10px; }
        .terms dt { font-weight: 700; margin-bottom: 4px; }
        .terms dd { margin: 0; color: #5d646b; font-size: 0.95rem; }
        section { padding: 36px 0 8px; }
        .contact { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #1f2429; color: #f2f2ee; border-radius: 10px; padding: 24px; margin: 8px 0 28px; }
        .contact a { color: #fff; }
        .contact p { margin: 0 0 8px; }
        .contact .btn { background: #f4c400; border-color: #f4c400; color: #111; }
        .contact .btn.alt { background: transparent; color: #fff; border-color: #fff; }
        footer { color: #5d646b; font-size: 0.85rem; padding: 0 0 32px; }
        dialog { border: 0; border-radius: 12px; padding: 0; max-width: 440px; width: calc(100% - 24px); background: #f6f5f2; color: #1f2429; }
        dialog::backdrop { background: rgba(20,24,28,0.6); }
        .dsw { height: 190px; background-color: #ddd; }
        .dsw img { width: 100%; height: 100%; object-fit: cover; display: block; cursor: zoom-in; }
        .dbody { padding: 18px 20px 20px; }
        .dbody h3 { margin: 0 0 4px; font-size: 1.3rem; line-height: 1.2; }
        dl.spec { display: grid; grid-template-columns: auto 1fr; gap: 4px 14px; margin: 14px 0; }
        dl.spec dt { color: #5d646b; }
        dl.spec dd { margin: 0; font-weight: 600; }
        .dact { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 6px; }
        .x { position: absolute; right: 10px; top: 10px; width: 40px; height: 40px; border-radius: 50%; border: 0; background: #f6f5f2; font-size: 1.4rem; cursor: pointer; }
        @media (max-width: 480px) { .row { grid-template-columns: 60px 1fr; } .sw { width: 60px; height: 60px; } }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } .row .sw img { transition: none; } }
        .chip { padding: 6px 12px; border: 1.5px solid #c6c5be; border-radius: 6px; background: #f6f5f2; font-size: 0.9rem; cursor: pointer; color: #1f2429; }
        .chip[aria-pressed="true"] { background: #f4c400; border-color: #111; font-weight: 700; }
        .chip:focus-visible { outline: 3px solid #1f5fbf; outline-offset: 2px; }
        #sort { padding: 9px 10px; border: 1.5px solid #c6c5be; border-radius: 6px; background: #f6f5f2; font-size: 1rem; color: #1f2429; }
        #sort:focus-visible { outline: 3px solid #1f5fbf; outline-offset: 2px; }
        .qty { display: block; margin: 14px 0 12px; font-weight: 600; }
        .qty input { display: block; width: 100%; margin-top: 6px; padding: 10px 12px; border: 1.5px solid #c6c5be; border-radius: 6px; background: #fff; font-size: 1rem; color: #1f2429; }
        .qty input:focus-visible { outline: 3px solid #1f5fbf; outline-offset: 2px; }
        .hint { color: #5d646b; font-size: 0.85rem; margin: 8px 0 0; }
        table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
        th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid #c6c5be; }
        .f { display: grid; gap: 10px; }
        .f .qty { margin: 8px 0 0; }
        #cbst { min-height: 1.3em; color: #9b1c1c; }
        [hidden] { display: none !important; }
        #prices { scroll-margin-top: 64px; }
        #lb { max-width: min(96vw, 900px); background: #111; color: #eee; padding: 0; border-radius: 12px; overflow: visible; }
        #lb img { display: block; max-width: 100%; max-height: 78vh; margin: 0 auto; object-fit: contain; border-radius: 12px 12px 0 0; cursor: zoom-out; }
        #lb p { margin: 0; padding: 10px 16px 14px; font-size: 0.95rem; }
        #lb .x { background: #fff; z-index: 2; }
      `}</style>

      <div className="tf-keramika-landing">
        <header><div className="wrap"><span className="brand">ТФ Керамика</span><button className="btn" id="hcall" type="button">Заказать звонок</button></div></header>

        <main className="wrap">
          <div className="hero">
            <h1>Плитка и керамогранит для строителей в Санкт-Петербурге и Ленинградской области</h1>
            <p>Для строительных бригад и подрядчиков. Склад в Войскорово: цены с НДС, оплата по счёту, самовывоз и доставка. Бесплатно рассчитаем количество плитки для объекта. Цены действуют до 31 октября 2026 года или до окончания остатков.</p>
            <div className="btns"><a className="btn" href="#prices">Смотреть цены</a><a className="btn alt" id="htg" href="#">Написать в Telegram</a></div>
          </div>

          <section id="prices">
            <h2>Цены и остатки</h2>
            <div className="tools">
              <button className="tab" data-cat="all" aria-pressed="true">Всё</button>
              <button className="tab" data-cat="tile" aria-pressed="false">Плитка</button>
              <button className="tab" data-cat="gres" aria-pressed="false">Керамогранит</button>
              <input type="search" id="q" placeholder="Название или размер" aria-label="Поиск по названию или размеру"></input>
              <select id="sort" aria-label="Сортировка"><option value="stock">Сначала больше остаток</option><option value="asc">Сначала дешевле</option><option value="desc">Сначала дороже</option></select>
            </div>
            <div className="tools" id="chips" role="group" aria-label="Размер"></div>
            <p className="note">Нажмите на позицию, чтобы открыть карточку. Цены за м², с НДС. В списке остатки от 30 м². Обновлено: <span id="upd"></span>.</p>
            <p className="note" id="count" aria-live="polite" style={{fontWeight:700, color:'#1f2429'}}>Найдено: 191 позиция</p>
            <div className="list" id="list">
              {initialItems.map((item, index) => (
                <button className="row" data-i={index} key={`${item.n}-${index}`}>
                  <div className="sw">
                    {item.img && <img
                      src={item.ph || item.img}
                      data-fb={item.img}
                      alt={item.n}
                      title="Увеличить"
                      loading={index < 8 ? "eager" : "lazy"}
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        const image = event.currentTarget
                        const fallback = image.dataset.fb
                        if (fallback && !image.src.includes(fallback)) image.src = fallback
                        else image.style.display = "none"
                      }}
                    />}
                  </div>
                  <div>
                    <div className="nm">{item.n}</div>
                    <div className="sub">{item.s}{item.b ? `, ${item.b}` : ""}{item.g ? `, ${item.g}` : ""}</div>
                    <div className="sub">В наличии {formatStock(item.q)} м²</div>
                  </div>
                  <div className={`price${item.p ? "" : " ask"}`}>
                    {item.p ? <>{formatStock(item.p)} <small>₽/м²</small></> : "Цена по запросу"}
                  </div>
                </button>
              ))}
            </div>
            <p style={{textAlign:'center'}}><button className="btn alt" id="more" hidden>Показать ещё</button><button className="btn alt" id="up" type="button" hidden>Наверх, к фильтрам</button></p>
          </section>

          <section>
            <h2>Как мы работаем</h2>
            <dl className="terms">
              <div><dt>Оплата по счёту</dt><dd>Безналичный расчёт для организаций, цены с НДС.</dd></div>
              <div><dt>Самовывоз</dt><dd>Забираете со склада в Войскорово в рабочие дни.</dd></div>
              <div><dt>Расчёт количества</dt><dd>Посчитаем нужный объём под ваш объект бесплатно.</dd></div>
              <div><dt>Фото и сертификаты</dt><dd>Пришлём по любой позиции по запросу.</dd></div>
            </dl>
          </section>

          <section>
            <h2>Нужна плитка на объект?</h2>
            <div className="contact">
              <div>
                <p>Назовите объём, подберём, зарезервируем и выставим счёт.</p>
                <p><button className="btn" id="ccall" type="button">Заказать звонок</button></p>
                <p><a className="btn alt" id="ctg" href="#">Написать в Telegram</a></p>
              </div>
              <div>
                <p><strong>Наш склад</strong></p>
                <p>Телефон: <a id="phone" href="tel:+79052050900">+7 905 205-09-00</a></p>
                <p id="addr">Ленинградская область, Тосненский район, Тельмановское городское поселение, посёлок Войскорово, 14В</p>
                <p id="hrs">Пн–Пт, с 08:00 до 18:00</p>
                <p><a id="map" href="#" target="_blank" rel="noopener">Открыть на карте</a></p>
              </div>
            </div>
          </section>
        </main>

        <footer className="wrap">ООО «ТФ Керамика». Цены и наличие актуальны на дату обновления, остатки по позициям уточняйте у менеджера.</footer>

        <dialog id="cb" aria-labelledby="cbt"><button className="x" id="cbx" aria-label="Закрыть">×</button>
          <div className="dbody"><h3 id="cbt">Заказать звонок</h3>
            <p className="sub">Оставьте номер, перезвоним в рабочее время: Пн–Пт, с 08:00 до 18:00.</p>
            <p className="sub" id="cbitem"></p>
            <form id="cbform" className="f" noValidate>
              <label className="qty">Телефон<input id="cbphone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 900 000-00-00" required /></label>
              <label className="qty">Имя (по желанию)<input id="cbname" type="text" autoComplete="name" /></label>
              <input id="cbbot" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:'absolute',left:'-9999px'}}></input>
              <button className="btn" id="cbsend" type="submit">Перезвоните мне</button>
              <p className="hint" id="cbst" aria-live="polite"></p>
              <p className="hint">Нажимая кнопку, вы соглашаетесь на обработку персональных данных для связи с вами.</p>
            </form>
            <p id="cbok" hidden><strong>Спасибо! Заявка принята.</strong> Перезвоним в рабочее время.</p>
          </div></dialog>
        <dialog id="lb" aria-label="Фото плитки"><button className="x" id="lbx" aria-label="Закрыть">×</button><img id="lbi" alt=""></img><p id="lbc"></p></dialog>
        <dialog id="dlg" aria-labelledby="dt">
          <button className="x" id="dx" aria-label="Закрыть">×</button>
          <div className="dsw" id="dsw"></div>
          <div className="dbody">
            <h3 id="dt"></h3><div className="sub" id="dbrand"></div>
            <dl className="spec" id="dspec"></dl>
            <div className="price" style={{display:'inline-block'}} id="dprice"></div>
            <label className="qty">Сколько нужно, м² (по желанию)<input type="number" id="dqty" min="1" step="any" inputMode="decimal" placeholder="например, 100"></input></label>
            <div className="dact"><button className="btn" id="dcall" type="button">Заказать звонок</button><a className="btn alt" id="dtg" href="#" target="_blank" rel="noopener">Написать в Telegram</a><button className="btn alt" id="dcopy" type="button">Скопировать запрос</button></div>
            <p className="hint">В Telegram откроется готовое сообщение с названием, размером и количеством.</p>
          </div>
        </dialog>
      </div>
    </div>
  )
}
