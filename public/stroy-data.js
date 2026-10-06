(()=>{

/* Меняйте только этот блок: контакты. Данные ITEMS собираются из таблицы остатков. t: tile или gres, q: остаток в м², p: цена (null показывает «Цена по запросу»), img: локальная картинка товара; официальное фото производителя используется только после отдельной проверки. */
const CFG={web3formsKey:'15b32313-a149-4439-8169-15ec9f6669fe' /* ключ с web3forms.com: заявки придут на вашу почту */,phone:'+7 905 205-09-00',tg:'https://t.me/flyroman',updated:'1 октября 2026',
address:'Ленинградская область, Тосненский район, Тельмановское городское поселение, посёлок Войскорово, 14В',hours:'Пн–Пт, с 08:00 до 18:00'};
const ITEMS=JSON.parse(document.getElementById("stroy-items-data")?.textContent||"[]");
const $=s=>document.querySelector(s), tel='tel:'+CFG.phone.replace(/[^+\d]/g,'');
$('#phone').href=tel;$('#phone').textContent=CFG.phone;
['htg','ctg','dtg'].forEach(i=>$('#'+i).href=CFG.tg);
$('#upd').textContent=CFG.updated;$('#addr').textContent=CFG.address;$('#hrs').textContent=CFG.hours;
$('#map').href='https://yandex.ru/maps/?text='+encodeURIComponent(CFG.address);

const COL=[['бел','#eeeeea'],['беж','#d9c7a5'],['песоч','#dccbb0'],['графит','#4a4f54'],['перец','#b9b9b6'],['сер','#9ea3a6'],['чер','#2b2e31'],['чёр','#2b2e31'],['корич','#8a6a4f'],['терракот','#b5654a'],['гол','#9cc3dc'],['син','#4a6fa5'],['navy','#4a6fa5'],['бирюз','#6fc1c0'],['зел','#7fae7a'],['салат','#a9c97a'],['жел','#e6c84a'],['жёл','#e6c84a'],['оранж','#e69a4a'],['красн','#c0504a'],['роз','#e5a9b5'],['лил','#b9a0d0'],['фиол','#8b6bb0']];
const col=n=>{n=n.toLowerCase();for(const[k,v]of COL)if(n.includes(k))return v;return'#cfcac0'};
const fmt=n=>n.toLocaleString('ru-RU');
function swatch(it,big){
 if(it.img) return '<img src="'+(it.ph||it.img)+'" data-fb="'+it.img+'" alt="'+it.n+'" title="Увеличить" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="if(this.dataset.fb&&this.src.indexOf(this.dataset.fb)<0){this.src=this.dataset.fb}else{this.style.display=\'none\'}">';
 const m=it.s.match(/(\d+)\s*×\s*(\d+)/), w=+m[1], h=+m[2], k=(big?120:30)/Math.max(w,h);
 return '<div style="width:100%;height:100%;background-color:'+col(it.n)+';background-image:linear-gradient(90deg,rgba(255,255,255,.7) 2px,transparent 2px),linear-gradient(0deg,rgba(255,255,255,.7) 2px,transparent 2px);background-size:'+Math.max(w*k,6).toFixed(1)+'px '+Math.max(h*k,6).toFixed(1)+'px"></div>';
}
const sub=it=>it.s+(it.b?', '+it.b:'')+(it.g?', '+it.g:'');
const priceHtml=it=>it.p?fmt(it.p)+' <small>₽/м²</small>':'Цена по запросу';

const cnt={};ITEMS.forEach(i=>cnt[i.k]=(cnt[i.k]||0)+1);
const keys=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]);
const FORCE=['400×400','400×250','200×200'];
const TOP=keys.slice(0,8);FORCE.forEach(k=>{if(cnt[k]&&!TOP.includes(k))TOP.push(k)});
const hasOther=keys.length>TOP.length;
let cat='all', sel=new Set(), shown=40;
$('#chips').innerHTML=TOP.map(k=>'<button class="chip" data-k="'+k+'" aria-pressed="false">'+k+'</button>').join('')+(hasOther?'<button class="chip" data-k="other" aria-pressed="false">Другие размеры</button>':'');
function ok(it){
 const q=$('#q').value.trim().toLowerCase();
 return (cat==='all'||it.t===cat)&&(!sel.size||sel.has(it.k)||(sel.has('other')&&!TOP.includes(it.k)))&&(it.n+' '+it.s+' '+it.b).toLowerCase().includes(q);
}
function render(){
 let rows=ITEMS.map((it,i)=>({it,i})).filter(({it})=>ok(it));
 const so=$('#sort').value;
 if(so!=='stock'){const d=so==='asc'?1:-1;rows.sort((a,b)=>{const pa=a.it.p,pb=b.it.p;if(!pa&&!pb)return b.it.q-a.it.q;if(!pa)return 1;if(!pb)return -1;return d*(pa-pb)||b.it.q-a.it.q})}
 const n=rows.length,m10=n%10,m100=n%100;
 const w=(m10===1&&m100!==11)?'позиция':(m10>=2&&m10<=4&&(m100<10||m100>=20))?'позиции':'позиций';
 $('#count').textContent='Найдено: '+n+' '+w;
 $('#list').innerHTML=rows.length?rows.slice(0,shown).map(({it,i})=>
  '<button class="row" data-i="'+i+'"><div class="sw">'+swatch(it,false)+'</div><div><div class="nm">'+it.n+'</div><div class="sub">'+sub(it)+'</div><div class="sub">В наличии '+fmt(it.q)+' м²</div></div><div class="price'+(it.p?'':' ask')+'">'+priceHtml(it)+'</div></button>').join('')
  :'<div class="empty">Ничего не найдено. Позвоните, подберём аналог.</div>';
 const left=rows.length-shown;$('#up').hidden=!(rows.length>40&&left<=0);$('#more').hidden=left<=0;$('#more').textContent='Показать ещё ('+Math.min(40,Math.max(left,0))+')';
}
const reset=()=>{shown=40;render()};
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{cat=b.dataset.cat;document.querySelectorAll('.tab').forEach(t=>t.setAttribute('aria-pressed',t===b));reset()});
document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{const k=b.dataset.k;sel.has(k)?sel.delete(k):sel.add(k);b.setAttribute('aria-pressed',sel.has(k));reset()});
$('#q').oninput=reset;
$('#sort').onchange=reset;
$('#more').onclick=()=>{shown+=40;render()};
$('#up').onclick=()=>$('#prices').scrollIntoView();
let cur=null;
function msg(it,q){
 let t='Здравствуйте! Интересует: '+it.n+', '+it.s+(it.b?', '+it.b:'')+(it.g?', '+it.g:'')+'.';
 t+=q>0?' Нужное количество: '+q+' м².':' Подскажите, пожалуйста, остаток.';
 t+=it.p?' Цена на сайте: '+fmt(it.p)+' ₽/м².':' Назовите, пожалуйста, цену.';
 return t+' Счёт на организацию, самовывоз или доставка.';
}
function upd(){
 if(!cur)return;
 const q=parseFloat(($('#dqty').value||'').replace(',','.'))||0;
 $('#dtg').href=CFG.tg+'?text='+encodeURIComponent(msg(cur,q));
 $('#dcopy').dataset.t=msg(cur,q);
}
$('#dqty').oninput=upd;
$('#dcopy').onclick=async()=>{
 const t=$('#dcopy').dataset.t,b=$('#dcopy'),o='Скопировать запрос';
 try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}
 b.textContent='Скопировано';setTimeout(()=>b.textContent=o,1800);
};
function openLb(it){
 $('#lbi').onerror=function(){if(this.src.indexOf(it.img)<0)this.src=it.img};$('#lbi').src=it.ph||it.img;$('#lbi').alt=it.n;
 $('#lbc').textContent=it.n+', '+it.s+(it.b?', '+it.b:'');
 $('#lb').showModal();
}
$('#lbx').onclick=()=>$('#lb').close();
$('#lb').onclick=e=>{if(e.target!==$('#lbi'))$('#lb').close()};
$('#dsw').onclick=()=>{if(cur&&cur.img)openLb(cur)};
$('#list').onclick=e=>{const r=e.target.closest('.row');if(!r)return;const it=ITEMS[+r.dataset.i];
 if(it.img&&e.target.closest('.sw')){openLb(it);return}
 $('#dsw').innerHTML=swatch(it,true);$('#dt').textContent=it.n;$('#dbrand').textContent=it.b;
 $('#dspec').innerHTML='<dt>Размер</dt><dd>'+it.s+'</dd>'+(it.g?'<dt>Сорт</dt><dd>'+it.g+'</dd>':'')+'<dt>Наличие</dt><dd>'+fmt(it.q)+' м²</dd>';
 $('#dprice').innerHTML=it.p?fmt(it.p)+' <small>₽/м² с НДС</small>':'Цена по запросу';
 cur=it;$('#dqty').value='';upd();
 $('#dlg').showModal()};
let ctx=null;
function openCb(it,q){
 ctx=it?{it,q}:null;
 $('#cbitem').textContent=it?('Позиция: '+it.n+', '+it.s+(q>0?', '+q+' м²':'')):'';
 $('#cbst').textContent='';$('#cbform').hidden=false;$('#cbok').hidden=true;
 $('#cb').showModal();setTimeout(()=>$('#cbphone').focus(),50);
}
['hcall','ccall'].forEach(i=>$('#'+i).onclick=()=>openCb(null,0));
$('#dcall').onclick=()=>{const q=parseFloat(($('#dqty').value||'').replace(',','.'))||0;$('#dlg').close();openCb(cur,q)};
$('#cbx').onclick=()=>$('#cb').close();
$('#cb').onclick=e=>{if(e.target===$('#cb'))$('#cb').close()};
$('#cbform').onsubmit=async e=>{
 e.preventDefault();
 const st=$('#cbst'),phone=$('#cbphone').value.trim();
 if(phone.replace(/\D/g,'').length<10){st.textContent='Проверьте номер телефона';return}
 if($('#cbbot').value)return;
 const name=$('#cbname').value.trim();
 const what=ctx?('Позиция: '+ctx.it.n+', '+ctx.it.s+(ctx.it.b?', '+ctx.it.b:'')+(ctx.it.g?', '+ctx.it.g:'')+(ctx.q>0?'. Нужно: '+ctx.q+' м²':'')+(ctx.it.p?'. Цена на сайте: '+fmt(ctx.it.p)+' ₽/м²':'')):'Запрос с главной страницы';
 const text='Заказ звонка: '+phone+(name?' ('+name+')':'')+'. '+what;
 const tg=CFG.tg+'?text='+encodeURIComponent(text);
 if(!CFG.web3formsKey){window.open(tg,'_blank');$('#cb').close();return}
 const btn=$('#cbsend');btn.disabled=true;st.textContent='Отправляем…';
 try{
  const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:CFG.web3formsKey,subject:'Заказ звонка: ТФ Керамика',from_name:'Сайт ТФ Керамика',name:name||'Не указано',phone:phone,message:what})});
  const d=await r.json();
  if(!d.success)throw 0;
  $('#cbform').hidden=true;$('#cbok').hidden=false;$('#cbform').reset();
 }catch(_){st.innerHTML='Не удалось отправить. Напишите нам в <a href="'+tg+'" target="_blank" rel="noopener">Telegram</a>.'}
 btn.disabled=false;
};
$('#dx').onclick=()=>$('#dlg').close();
$('#dlg').onclick=e=>{if(e.target===$('#dlg'))$('#dlg').close()};
render();

})();
