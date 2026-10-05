import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Плитка и керамогранит для строителей в СПб — ТФ Керамика",
  description: "Плитка и керамогранит для строительных бригад в Санкт-Петербурге и Ленинградской области. Склад в Войскорово, цены с НДС, оплата по счёту, самовывоз и доставка. Бесплатно рассчитаем количество.",
  alternates: {
    canonical: "https://plitki-spb.ru/stroy",
  },
}

export default function StroyPage() {
  return (
    <div 
      style={{
        '--bg': '#e9e8e4',
        '--card': '#f6f5f2',
        '--ink': '#1f2429',
        '--mut': '#5d646b',
        '--line': '#c6c5be',
        '--tag': '#f4c400',
        '--btn': '#1f2429',
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
        .terms { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 22px 28px; margin: 0; padding: 0; }
        .terms div { border-top: 3px solid #1f2429; padding-top: 10px; }
        .terms dt { font-weight: 700; margin-bottom: 4px; }
        .terms dd { margin: 0; color: #5d646b; font-size: 0.95rem; }
        section { padding: 36px 0 8px; }
        .contact { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; background: #1f2429; color: #f2f2ee; border-radius: 10px; padding: 24px; margin: 8px 0 28px; }
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
        <div dangerouslySetInnerHTML={{ __html: `
<header><div class="wrap"><span class="brand">ТФ Керамика</span><button class="btn" id="hcall" type="button">Заказать звонок</button></div></header>

<main class="wrap">
<div class="hero">
<h1>Плитка и керамогранит для строителей в Санкт-Петербурге и Ленинградской области</h1>
<p>Для строительных бригад и подрядчиков. Склад в Войскорово: цены с НДС, оплата по счёту, самовывоз и доставка. Бесплатно рассчитаем количество плитки для объекта. Цены действуют до 31 октября 2026 года или до окончания остатков.</p>
<div class="btns"><a class="btn" href="#prices">Смотреть цены</a><a class="btn alt" id="htg" href="#">Написать в Telegram</a></div>
</div>

<section id="prices">
<h2>Цены и остатки</h2>
<div class="tools">
<button class="tab" data-cat="all" aria-pressed="true">Всё</button>
<button class="tab" data-cat="tile" aria-pressed="false">Плитка</button>
<button class="tab" data-cat="gres" aria-pressed="false">Керамогранит</button>
<input type="search" id="q" placeholder="Название или размер" aria-label="Поиск по названию или размеру">
<select id="sort" aria-label="Сортировка"><option value="stock">Сначала больше остаток</option><option value="asc">Сначала дешевле</option><option value="desc">Сначала дороже</option></select>
</div>
<div class="tools" id="chips" role="group" aria-label="Размер"></div>
<p class="note">Нажмите на позицию, чтобы открыть карточку. Цены за м², с НДС. В списке остатки от 30 м². Обновлено: <span id="upd"></span>.</p>
<p class="note" id="count" aria-live="polite" style="font-weight:700;color:#1f2429">Найдено: 191 позиция</p>
<div class="list" id="list"></div>
<p style="text-align:center"><button class="btn alt" id="more" hidden>Показать ещё</button><button class="btn alt" id="up" type="button" hidden>Наверх, к фильтрам</button></p>
</section>

<section>
<h2>Как мы работаем</h2>
<dl class="terms">
<div><dt>Оплата по счёту</dt><dd>Безналичный расчёт для организаций, цены с НДС.</dd></div>
<div><dt>Самовывоз</dt><dd>Забираете со склада в Войскорово в рабочие дни.</dd></div>
<div><dt>Расчёт количества</dt><dd>Посчитаем нужный объём под ваш объект бесплатно.</dd></div>
<div><dt>Фото и сертификаты</dt><dd>Пришлём по любой позиции по запросу.</dd></div>
</dl>
</section>

<section>
<h2>Нужна плитка на объект?</h2>
<div class="contact">
<div>
<p>Назовите объём, подберём, зарезервируем и выставим счёт.</p>
<p><button class="btn" id="ccall" type="button">Заказать звонок</button></p>
<p><a class="btn alt" id="ctg" href="#">Написать в Telegram</a></p>
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

<footer class="wrap">ООО «ТФ Керамика». Цены и наличие актуальны на дату обновления, остатки по позициям уточняйте у менеджера.</footer>

<dialog id="cb" aria-labelledby="cbt"><button class="x" id="cbx" aria-label="Закрыть">×</button>
<div class="dbody"><h3 id="cbt">Заказать звонок</h3>
<p class="sub">Оставьте номер, перезвоним в рабочее время: Пн–Пт, с 08:00 до 18:00.</p>
<p class="sub" id="cbitem"></p>
<form id="cbform" class="f" novalidate>
<label class="qty">Телефон<input id="cbphone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 900 000-00-00" required></label>
<label class="qty">Имя (по желанию)<input id="cbname" type="text" autocomplete="name"></label>
<input id="cbbot" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
<button class="btn" id="cbsend" type="submit">Перезвоните мне</button>
<p class="hint" id="cbst" aria-live="polite"></p>
<p class="hint">Нажимая кнопку, вы соглашаетесь на обработку персональных данных для связи с вами.</p>
</form>
<p id="cbok" hidden><strong>Спасибо! Заявка принята.</strong> Перезвоним в рабочее время.</p>
</div></dialog>
<dialog id="lb" aria-label="Фото плитки"><button class="x" id="lbx" aria-label="Закрыть">×</button><img id="lbi" alt=""><p id="lbc"></p></dialog>
<dialog id="dlg" aria-labelledby="dt">
<button class="x" id="dx" aria-label="Закрыть">×</button>
<div class="dsw" id="dsw"></div>
<div class="dbody">
<h3 id="dt"></h3><div class="sub" id="dbrand"></div>
<dl class="spec" id="dspec"></dl>
<div class="price" style="display:inline-block" id="dprice"></div>
<label class="qty">Сколько нужно, м² (по желанию)<input type="number" id="dqty" min="1" step="any" inputmode="decimal" placeholder="например, 100"></label>
<div class="dact"><button class="btn" id="dcall" type="button">Заказать звонок</button><a class="btn alt" id="dtg" href="#" target="_blank" rel="noopener">Написать в Telegram</a><button class="btn alt" id="dcopy" type="button">Скопировать запрос</button></div>
<p class="hint">В Telegram откроется готовое сообщение с названием, размером и количеством.</p>
</div>
</dialog>
        `}} />

        <script dangerouslySetInnerHTML={{ __html: `
/* Меняйте только этот блок: контакты. Данные ITEMS собираются из таблицы остатков. t: tile или gres, q: остаток в м², p: цена (null показывает «Цена по запросу»), img: локальная картинка товара; официальное фото производителя используется только после отдельной проверки. */
const CFG={web3formsKey:'15b32313-a149-4439-8169-15ec9f6669fe' /* ключ с web3forms.com: заявки придут на вашу почту */,phone:'+7 905 205-09-00',tg:'https://t.me/flyroman',updated:'1 октября 2026',
address:'Ленинградская область, Тосненский район, Тельмановское городское поселение, посёлок Войскорово, 14В',hours:'Пн–Пт, с 08:00 до 18:00'};
const ITEMS=[{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":7848,"p":null,"img":"/img-stroy/products/001-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/001.jpg","a":"DD638520R"},{"t":"tile","b":"Нефрит-Керамика","n":"Джойс Светлый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":7293,"p":null,"img":"/img-stroy/products/002-нефрит-керамика-джойс-светлый.svg","ph":"/img-stroy/photos/002.jpg","a":"00-00-5-10-00-20-3030"},{"t":"gres","b":"М-Квадрат","n":"Bianco Белый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":6708,"p":650,"img":"/img-stroy/products/003-м-квадрат-bianco-белый.svg","ph":"/img-stroy/photos/003.jpg","a":"731200"},{"t":"gres","b":"М-Квадрат","n":"Terrazzo mix Бежевый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":7380,"p":650,"img":"/img-stroy/products/004-м-квадрат-terrazzo-mix-бежевый.svg","ph":"/img-stroy/photos/004.jpg","a":"730671"},{"t":"gres","b":"М-Квадрат","n":"Astaria Ice Белый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":6309,"p":650,"img":"/img-stroy/products/005-м-квадрат-astaria-ice-белый.svg","ph":"/img-stroy/photos/005.jpg","a":"737113"},{"t":"gres","b":"М-Квадрат","n":"Hornito Amber Коричневый Светлый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":5197,"p":650,"img":"/img-stroy/products/006-м-квадрат-hornito-amber-коричневый-светлый.svg","ph":"/img-stroy/photos/006.jpg","a":"736183"},{"t":"gres","b":"Квадро Декор","n":"Керамогранит технический Соль-Перец Серый Матовая","s":"300 × 300 × 7 мм","k":"300×300","g":"","q":4912,"p":610,"img":"/img-stroy/products/007-квадро-декор-керамогранит-технический-соль-перец-серый-матовая.svg","ph":"/img-stroy/photos/007.jpg","a":"DD638512R"},{"t":"gres","b":"М-Квадрат","n":"Toronto Betton Grey","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":4841,"p":650,"img":"/img-stroy/products/008-м-квадрат-toronto-betton-grey.svg","ph":"/img-stroy/photos/008.jpg","a":"732886"},{"t":"gres","b":"М-Квадрат","n":"Ferrum Коричневый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":4017,"p":900,"img":"/img-stroy/products/009-м-квадрат-ferrum-коричневый.svg","ph":"/img-stroy/photos/009.jpg","a":"732835"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Тёмный Матовый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"1 сорт","q":3342,"p":null,"img":"/img-stroy/products/010-kerama-marazzi-мирабо-серый-тёмный-матовый-обрезной.svg","ph":"/img-stroy/photos/010.jpg","a":"DD638550R"},{"t":"gres","b":"М-Квадрат","n":"Терраццо Серый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":3126,"p":950,"img":"/img-stroy/products/011-м-квадрат-терраццо-серый.svg","ph":"/img-stroy/photos/011.jpg","a":"732887"},{"t":"gres","b":"М-Квадрат","n":"Каньон Серый Светлый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":2780,"p":650,"img":"/img-stroy/products/012-м-квадрат-каньон-серый-светлый.svg","ph":"/img-stroy/photos/012.jpg","a":"731847"},{"t":"gres","b":"М-Квадрат","n":"Терраццо Бежевый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":2683,"p":950,"img":"/img-stroy/products/013-м-квадрат-терраццо-бежевый.svg","ph":"/img-stroy/photos/013.jpg","a":"732888"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"300 × 600 × 9 мм","k":"300×600","g":"1 сорт","q":2634,"p":null,"img":"/img-stroy/products/014-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/014.jpg","a":"DD638530R"},{"t":"gres","b":"М-Квадрат","n":"Marble line dark grey Серый Тёмный","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":2472,"p":950,"img":"/img-stroy/products/015-м-квадрат-marble-line-dark-grey-серый-тёмный.svg","ph":"/img-stroy/photos/015.jpg","a":"731876"},{"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Серый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":2424,"p":null,"img":"/img-stroy/products/016-kerama-marazzi-монте-тиберио-серый-светлый-обрезной.svg","ph":"/img-stroy/photos/016.jpg","a":"DD638496R"},{"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Серый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":2424,"p":null,"img":"/img-stroy/products/017-kerama-marazzi-монте-тиберио-серый-светлый-обрезной.svg","ph":"/img-stroy/photos/017.jpg","a":"DD638496R"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":2249,"p":null,"img":"/img-stroy/products/018-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/018.jpg","a":"DD638520R"},{"t":"gres","b":"Kerama Marazzi","n":"Ковёр Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":2030,"p":null,"img":"/img-stroy/products/019-kerama-marazzi-ковёр-серый-обрезной.svg","ph":"/img-stroy/photos/019.jpg","a":"DD638478R"},{"t":"gres","b":"М-Квадрат","n":"Sahara Desert Коричневый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":2029,"p":900,"img":"/img-stroy/products/020-м-квадрат-sahara-desert-коричневый.svg","ph":"/img-stroy/photos/020.jpg","a":"732876"},{"t":"gres","b":"М-Квадрат","n":"Marble line Кремовый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":1946,"p":950,"img":"/img-stroy/products/021-м-квадрат-marble-line-кремовый.svg","ph":"/img-stroy/photos/021.jpg","a":"731877"},{"t":"gres","b":"Казахстан","n":"ВAITEREK BEJ","s":"600 × 600 × 9,5 мм","k":"600×600","g":"","q":1946,"p":1080,"img":"/img-stroy/products/028-казахстан-вaiterek-bej.svg","ph":"/img-stroy/photos/baiterek-bej.jpg","a":""},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"300 × 600 × 9 мм","k":"300×600","g":"1 сорт","q":1918,"p":null,"img":"/img-stroy/products/022-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/022.jpg","a":"DD638530R"},{"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Коричневый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":1875,"p":null,"img":"/img-stroy/products/023-kerama-marazzi-монте-тиберио-коричневый-светлый-обрезной.svg","ph":"/img-stroy/photos/023.jpg","a":"DD638497R"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1863,"p":null,"img":"/img-stroy/products/024-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/024.jpg","a":"DD638520R"},{"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Коричневый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":1860,"p":null,"img":"/img-stroy/products/025-kerama-marazzi-монте-тиберио-коричневый-светлый-обрезной.svg","ph":"/img-stroy/photos/025.jpg","a":"DD638497R"},{"t":"gres","b":"Kerama Marazzi","n":"Королевская Дорога Черный Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":1788,"p":null,"img":"/img-stroy/products/026-kerama-marazzi-королевская-дорога-черный-обрезной.svg","ph":"/img-stroy/photos/026.jpg","a":"DD638503R"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1782,"p":null,"img":"/img-stroy/products/027-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/027.jpg","a":"DD638520R"},{"t":"gres","b":"М-Квадрат","n":"Calacatta Белый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":1696,"p":950,"img":"/img-stroy/products/029-м-квадрат-calacatta-белый.svg","ph":"/img-stroy/photos/029.jpg","a":"731852"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1656,"p":null,"img":"/img-stroy/products/030-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/030.jpg","a":"DD638520R"},{"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Коричневый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":1644,"p":null,"img":"/img-stroy/products/031-kerama-marazzi-монте-тиберио-коричневый-светлый-обрезной.svg","ph":"/img-stroy/photos/031.jpg","a":"DD638497R"},{"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Коричневый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":1609,"p":null,"img":"/img-stroy/products/032-kerama-marazzi-монте-тиберио-коричневый-светлый-обрезной.svg","ph":"/img-stroy/photos/032.jpg","a":"DD638497R"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1569,"p":null,"img":"/img-stroy/products/033-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/033.jpg","a":"DD638520R"},{"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Коричневый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":1538,"p":null,"img":"/img-stroy/products/034-kerama-marazzi-монте-тиберио-коричневый-светлый-обрезной.svg","ph":"/img-stroy/photos/034.jpg","a":"DD638497R"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1526,"p":null,"img":"/img-stroy/products/035-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/035.jpg","a":"DD638520R"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1525,"p":null,"img":"/img-stroy/products/036-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/036.jpg","a":"DD638520R"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1489,"p":null,"img":"/img-stroy/products/037-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/037.jpg","a":"DD638520R"},{"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Коричневый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":1486,"p":null,"img":"/img-stroy/products/038-kerama-marazzi-монте-тиберио-коричневый-светлый-обрезной.svg","ph":"/img-stroy/photos/038.jpg","a":"DD638497R"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1440,"p":null,"img":"/img-stroy/products/039-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/039.jpg","a":"DD638520R"},{"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Коричневый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":1408,"p":null,"img":"/img-stroy/products/040-kerama-marazzi-монте-тиберио-коричневый-светлый-обрезной.svg","ph":"/img-stroy/photos/040.jpg","a":"DD638497R"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1400,"p":null,"img":"/img-stroy/products/041-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/041.jpg","a":"DD638520R"},{"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Коричневый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":1394,"p":null,"img":"/img-stroy/products/042-kerama-marazzi-монте-тиберио-коричневый-светлый-обрезной.svg","ph":"/img-stroy/photos/042.jpg","a":"DD638497R"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1389,"p":null,"img":"/img-stroy/products/043-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/043.jpg","a":"DD638520R"},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1353,"p":null,"img":"/img-stroy/products/044-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/044.jpg","a":"DD638520R"},{"t":"gres","b":"Нефрит-Керамика","n":"Лия Бежевый","s":"600 × 300 × 9 мм","k":"600×300","g":"Стандарт","q":1152,"p":null,"img":"/img-stroy/products/046-нефрит-керамика-лия-бежевый.svg","ph":"/img-stroy/photos/лия-бежевый.jpg","a":""},{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1351,"p":null,"img":"/img-stroy/products/047-kerama-marazzi-мирабо-серый-обрезной.svg","ph":"/img-stroy/photos/047.jpg","a":"DD638520R"},{"t":"gres","b":"М-Квадрат","n":"Калакатта Серые","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":1134,"p":700,"img":"/img-stroy/products/048-м-квадрат-калакатта-серые.svg","ph":"/img-stroy/photos/kalakatta-serye.jpg","a":"731849"},{"t":"gres","b":"Unitile (г. Шахты)","n":"НОРДЛАНД Бежевый 01","s":"125 × 500 мм","k":"125×500","g":"Стандарт","q":1133,"p":null,"img":"/img-stroy/products/049-unitile-г-шахты-нордланд-бежевый-01.svg","ph":"/img-stroy/photos/nordland-bejevyj-01.jpg","a":""},{"t":"gres","b":"Unitile (г. Шахты)","n":"СМОУК Серый 01","s":"125 × 500 мм","k":"125×500","g":"Стандарт","q":1133,"p":null,"img":"/img-stroy/products/050-unitile-г-шахты-смоук-серый-01.svg","ph":"/img-stroy/photos/smouk-seryj-01.jpg","a":""},{"t":"gres","b":"Kerama Marazzi","n":"Радуга Белый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1085,"p":null,"img":"/img-stroy/products/051-kerama-marazzi-радуга-белый-обрезной.svg","ph":"/img-stroy/photos/raduga-belyj-obreznoj.jpg","a":"DD638464R"},{"t":"gres","b":"Unitile (г. Шахты)","n":"ВАРДИ Бежевый 01","s":"125 × 500 мм","k":"125×500","g":"Стандарт","q":1070,"p":null,"img":"/img-stroy/products/052-unitile-г-шахты-варди-бежевый-01.svg","ph":"/img-stroy/photos/vardi-bejevyj-01.jpg","a":""},{"t":"gres","b":"Нефрит-Керамика","n":"Роял Ноэль Эмперадор Коричневый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":1044,"p":null,"img":"/img-stroy/products/053-нефрит-керамика-роял-ноэль-эмперадор-коричневый.svg","ph":"/img-stroy/photos/rojal-noel-emperor-korichnevyj.jpg","a":""},{"t":"gres","b":"М-Квадрат","n":"Marble line dark grey Серый Тёмный","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":1042,"p":950,"img":"/img-stroy/products/054-м-квадрат-marble-line-dark-grey-серый-тёмный.svg","ph":"/img-stroy/photos/marble-line-dark-grey-seryj-temnyj.jpg","a":"731876"},{"t":"gres","b":"М-Квадрат","n":"Магма Коричневый Темный","s":"600 × 600 × 10 мм","k":"600×600","g":"Стандарт","q":961,"p":null,"img":"/img-stroy/products/058-м-квадрат-магма-коричневый-темный.svg","ph":"/img-stroy/photos/magma-korichnevyj-temnyj.jpg","a":"732878"},{"t":"gres","b":"Нефрит-Керамика","n":"Моногамма Серый","s":"600 × 200 × 9 мм","k":"600×200","g":"ПК","q":840,"p":null,"img":"/img-stroy/products/059-нефрит-керамика-моногамма-серый.svg","ph":"/img-stroy/photos/monogamma-seryj.jpg","a":""},{"t":"gres","b":"Нефрит-Керамика","n":"Глэдис Бежевый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":828,"p":null,"img":"/img-stroy/products/061-нефрит-керамика-глэдис-бежевый.svg","ph":"/img-stroy/photos/gledis-bejevyj.jpg","a":""},{"t":"gres","b":"Нефрит-Керамика","n":"Хитроу Синий","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":804,"p":null,"img":"/img-stroy/products/062-нефрит-керамика-хитроу-синий.svg","ph":"/img-stroy/photos/hitrou-sinij.jpg","a":""},{"t":"gres","b":"Нефрит-Керамика","n":"Прайм Цемент Светло-Серый","s":"600 × 300 × 9 мм","k":"600×300","g":"Сортовая","q":802,"p":null,"img":"/img-stroy/products/063-нефрит-керамика-прайм-цемент-светло-серый.svg","ph":"/img-stroy/photos/prajj-cement-svetlo-seryj.jpg","a":""},{"t":"gres","b":"Kerama Marazzi","n":"Королевская Дорога Черный Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":763,"p":null,"img":"/img-stroy/products/064-kerama-marazzi-королевская-дорога-черный-обрезной.svg","ph":"/img-stroy/photos/korolevskaya-doroga-chernyj-obreznoj.jpg","a":"DD638503R"},{"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Серый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"2 сорт","q":762,"p":null,"img":"/img-stroy/products/065-kerama-marazzi-монте-тиберио-серый-светлый-обрезной.svg","ph":"/img-stroy/photos/monte-tiberio-seryj-svetlyj-obreznoj.jpg","a":"DD638496R"},{"t":"gres","b":"Казахстан","n":"NATURA WHITE РЫЖИЕ ПРОЖИЛКИ","s":"600 × 600 × 9,5 мм","k":"600×600","g":"","q":761,"p":980,"img":"/img-stroy/products/066-казахстан-natura-white-рыжие-прожилки.svg","ph":"/img-stroy/photos/natura-white-ryzhie-prozhilki.jpg","a":""},{"t":"gres","b":"Kerama Marazzi","n":"Калейдоскоп Белый","s":"200 × 200 мм","k":"200×200","g":"1 сорт","q":742,"p":null,"img":"/img-stroy/products/067-kerama-marazzi-калейдоскоп-белый.svg","ph":"/img-stroy/photos/kaleidoskope-belyj.jpg","a":"DD638457R"},{"t":"gres","b":"Kerama Marazzi","n":"Королевская Дорога Серый Светлый","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":732,"p":null,"img":"/img-stroy/products/069-kerama-marazzi-королевская-дорога-серый-светлый.svg","ph":"/img-stroy/photos/korolevskaya-doroga-seryj-svetlyj.jpg","a":"DD638500R"},{"t":"gres","b":"М-Квадрат","n":"Ривьера Серый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":707,"p":null,"img":"/img-stroy/products/070-м-квадрат-ривьера-серый.svg","ph":"/img-stroy/photos/rivera-seryj.jpg","a":"731861"},{"t":"gres","b":"Грани Таганая","n":"Грани Таганая GTF422M РЖАВЧИНА","s":"1200 × 600 мм","k":"1200×600","g":"","q":680,"p":null,"img":"/img-stroy/products/071-грани-таганая-gtf422m-ржавчина.svg","ph":"/img-stroy/photos/grani-taganaya-gtf422m-rzhavchina.jpg","a":""},{"t":"gres","b":"Нефрит-Керамика","n":"Мадра Коричневый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":642,"p":null,"img":"/img-stroy/products/072-нефрит-керамика-мадра-коричневый.svg","ph":"/img-stroy/photos/madra-korichnevyj.jpg","a":""},{"t":"gres","b":"Unitile (г. Шахты)","n":"ГЕРМЕС Белый Терраццо 02","s":"400 × 400 × 8 мм","k":"400×400","g":"Стандарт","q":640,"p":null,"img":"/img-stroy/products/073-unitile-г-шахты-гермес-белый-терраццо-02.svg","ph":"/img-stroy/photos/germes-belyj-terraczo-02.jpg","a":""},{"t":"gres","b":"Нефрит-Керамика","n":"Mono smoke Серый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":633,"p":null,"img":"/img-stroy/products/074-нефрит-керамика-mono-smoke-серый.svg","ph":"/img-stroy/photos/mono-smoke-seryj.jpg","a":""},{"t":"gres","b":"Kerama Marazzi","n":"Королевская Дорога Серый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"600×1200","g":"1 сорт","q":567,"p":null,"img":"/img-stroy/products/076-kerama-marazzi-королевская-дорога-серый-светлый-обрезной.svg","ph":"/img-stroy/photos/korolevskaya-doroga-seryj-svetlyj-obreznoj.jpg","a":"DD638501R"},{"t":"gres","b":"Нефрит-Керамика","n":"Луксор Вуд Коричневый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":563,"p":null,"img":"/img-stroy/products/077-нефрит-керамика-луксор-вуд-коричневый.svg","ph":"/img-stroy/photos/luksor-vud-korichnevyj.jpg","a":""},{"t":"gres","b":"Нефрит-Керамика","n":"Джойс Синий","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":562,"p":null,"img":"/img-stroy/products/078-нефрит-керамика-джойс-синий.svg","ph":"/img-stroy/photos/dzhojs-sinij.jpg","a":""},{"t":"gres","b":"Нефрит-Керамика","n":"Джойс Розовый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":546,"p":null,"img":"/img-stroy/products/079-нефрит-керамика-джойс-розовый.svg","ph":"/img-stroy/photos/dzhojs-rozovyj.jpg","a":""},{"t":"gres","b":"Нефрит-Керамика","n":"Palette Skin Бежевый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":534,"p":null,"img":"/img-stroy/products/080-нефрит-керамика-palette-skin-бежевый.svg","ph":"/img-stroy/photos/palette-skin-bejevyj.jpg","a":""},{"t":"gres","b":"Kerama Marazzi","n":"Королевская Дорога Коричневый Светлый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":521,"p":null,"img":"/img-stroy/products/082-kerama-marazzi-королевская-дорога-коричневый-светлый-обрезной.svg","ph":"/img-stroy/photos/korolevskaya-doroga-korichnevyj-svetlyj-obreznoj.jpg","a":"DD638502R"},{"t":"gres","b":"Нефрит-Керамика","n":"Джойс Бирюзовый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":498,"p":null,"img":"/img-stroy/products/083-нефрит-керамика-джойс-бирюзовый.svg","ph":"/img-stroy/photos/dzhojs-birjuzovyj.jpg","a":""},{"t":"gres","b":"Нефрит-Керамика","n":"Alcor Светлый","s":"600 × 200 × 9 мм","k":"600×200","g":"ПК","q":498,"p":null,"img":"/img-stroy/products/084-нефрит-керамика-alcor-светлый.svg","ph":"/img-stroy/photos/alcor-svetlyj.jpg","a":""}];

const $=s=>document.querySelector(s), tel='tel:'+CFG.phone.replace(/[^+\\d]/g,'');
$('#phone').href=tel;$('#phone').textContent=CFG.phone;
['htg','ctg','dtg'].forEach(i=>$('#'+i).href=CFG.tg);
$('#upd').textContent=CFG.updated;$('#addr').textContent=CFG.address;$('#hrs').textContent=CFG.hours;
$('#map').href='https://yandex.ru/maps/?text='+encodeURIComponent(CFG.address);

const COL=[['бел','#eeeeea'],['беж','#d9c7a5'],['песоч','#dccbb0'],['графит','#4a4f54'],['перец','#b9b9b6'],['сер','#9ea3a6'],['чер','#2b2e31'],['чёр','#2b2e31'],['корич','#8a6a4f'],['терракот','#b5654a'],['гол','#9cc3dc'],['син','#4a6fa5'],['navy','#4a6fa5'],['бирюз','#6fc1c0'],['зел','#7fae7a'],['салат','#a9c97a'],['жел','#e6c84a'],['жёл','#e6c84a'],['оранж','#e69a4a'],['красн','#c0504a'],['роз','#e5a9b5'],['лил','#b9a0d0'],['фиол','#8b6bb0']];
const col=n=>{n=n.toLowerCase();for(const[k,v]of COL)if(n.includes(k))return v;return'#cfcac0'};
const fmt=n=>n.toLocaleString('ru-RU');
function swatch(it,big){
 if(it.img) return '<img src="'+(it.ph||it.img)+'" data-fb="'+it.img+'" alt="'+it.n+'" title="Увеличить" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="if(this.dataset.fb&&this.src.indexOf(this.dataset.fb)<0){this.src=this.dataset.fb}else{this.style.display=\\'none\\'}">';
 const m=it.s.match(/(\\d+)\\s*×\\s*(\\d+)/), w=+m[1], h=+m[2], k=(big?120:30)/Math.max(w,h);
 return '<div style="width:100%;height:100%;background-color:'+col(it.n)+';background-image:linear-gradient(90deg,rgba(255,255,255,.7) 2px,transparent 2px),linear-gradient(0deg,rgba(255,255,255,.7) 2px,transparent 2px);background-size:'+Math.max(w*k,6).toFixed(1)+'px '+Math.max(h*k,6).toFixed(1)+'px"></div>';
}
const sub=it=>it.s+(it.b?', '+it.b:'')+(it.g?', '+it.g:'');
const priceHtml=it=>it.p?fmt(it.p)+' <small>₽/м²</small>':'Цена по запросу';

const cnt={};ITEMS.forEach(i=>cnt[i.k]=(cnt[i.k]||0)+1);
Object.keys(cnt).forEach(k=>{const btn=document.createElement('button');btn.className='chip';btn.textContent=k+' ('+cnt[k]+')';btn.dataset.s=k;btn.onclick=()=>{document.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed','false'));btn.setAttribute('aria-pressed','true');render(k);};document.getElementById('chips').appendChild(btn);});

let cat='all',sort='stock',shown=50,offset=0;
function render(sizeFilter=null){
 let list=ITEMS.filter(i=>sizeFilter?i.k===sizeFilter:i.k);
 if(cat!=='all') list=list.filter(i=>i.t===cat);
 const q=$('#q').value.toLowerCase();
 if(q) list=list.filter(i=>i.n.toLowerCase().includes(q)||i.s.toLowerCase().includes(q)||i.b.toLowerCase().includes(q));
 if(sort==='stock') list.sort((a,b)=>b.q-a.q);
 if(sort==='asc') list.sort((a,b)=>(a.p||Infinity)-(b.p||Infinity));
 if(sort==='desc') list.sort((a,b)=>(b.p||0)-(a.p||0));
 const result=list.slice(offset,offset+shown);
 $('#list').innerHTML=result.map((it,i)=>'<button class="row" data-i="'+(offset+i)+'"><div class="sw" aria-label="Изображение товара">'+swatch(it)+'</div><div><div class="nm">'+it.n+'</div><div class="sub">'+it.s+', '+it.b+(it.g?', '+it.g:'')+'</div><div class="sub">В наличии '+fmt(it.q)+' м²</div></div><div class="price'+(it.p?'':' ask')+'">'+priceHtml(it)+'</div></button>').join('');
 $('#count').textContent='Найдено: '+list.length+' позиций';
 $('#more').hidden=offset+shown>=list.length;
 $('#up').hidden=offset===0;
 result.forEach((it,i)=>{const row=$('#list').children[i];row.onclick=()=>openItem(it);});
}
document.querySelectorAll('.tab').forEach(btn=>{btn.onclick=()=>{document.querySelectorAll('.tab').forEach(t=>t.setAttribute('aria-pressed','false'));btn.setAttribute('aria-pressed','true');cat=btn.dataset.cat;offset=0;render();};});
$('#q').oninput=()=>{offset=0;render();};
$('#sort').onchange=()=>{sort=$('#sort').value;offset=0;render();};
$('#more').onclick=()=>{offset+=shown;render();};
$('#up').onclick=()=>{offset=0;render();};

function openItem(it){
 $('#dt').textContent=it.n;$('#dbrand').textContent=it.b;$('#dsw').innerHTML=swatch(it,true);$('#dprice').innerHTML=priceHtml(it);$('#dspec').innerHTML='<dt>Размер</dt><dd>'+it.s+'</dd><dt>Производитель</dt><dd>'+it.b+'</dd><dt>Сорт</dt><dd>'+(it.g||'—')+'</dd><dt>Остаток</dt><dd>'+fmt(it.q)+' м²</dd>'+(it.a?'<dt>Артикул</dt><dd>'+it.a+'</dd>':'');
 $('#dcall').onclick=()=>{$('#cbitem').textContent=it.n;showCb();};
 $('#dtg').href=CFG.tg+'?text='+encodeURIComponent('Здравствуйте! Интересует '+it.n+', '+it.s+'. Сколько в наличии?');
 $('#dcopy').onclick=()=>{navigator.clipboard.writeText(it.n+', '+it.s+', '+it.b+'. '+CFG.phone);};
 $('#dqty').value='';
 $('#dlg').showModal();
}
$('#dx').onclick=()=>$('#dlg').close();
$('#lbx').onclick=()=>$('#lb').close();
document.querySelectorAll('.row .sw img').forEach(img=>{img.onclick=(e)=>{e.stopPropagation();$('#lbi').src=img.src;$('#lbc').textContent=img.alt;$('#lb').showModal();};});

function showCb(){$('#cb').showModal();$('#cbok').hidden=true;$('#cbform').hidden=false;}
$('#hcall').onclick=$('#ccall').onclick=showCb;
$('#cbx').onclick=()=>$('#cb').close();
$('#cbsend').onclick=async(e)=>{
 e.preventDefault();
 const phone=$('#cbphone').value,name=$('#cbname').value;
 if(!phone||!/^\\+7\\s?\\d{3}\\s?\\d{3}\\s?\\d{2}\\s?\\d{2}$/.test(phone)){$('#cbst').textContent='Неверный формат телефона';return;}
 $('#cbsend').disabled=true;$('#cbst').textContent='Отправка...';
 try{
  const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({access_key:CFG.web3formsKey,phone,name,subject:'Заявка со страницы ТФ Керамика',from_name:'ТФ Керамика'})});
  if(res.ok){$('#cbform').hidden=true;$('#cbok').hidden=false;$('#cbst').textContent='';}
  else{$('#cbst').textContent='Ошибка отправки';}
 }catch{$('#cbst').textContent='Ошибка сети';}
 $('#cbsend').disabled=false;
};
render();
        `}} />
      </div>
    </div>
  )
}
