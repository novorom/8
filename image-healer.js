const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const filePath = path.join(__dirname, 'lib', 'products-data.json');
let products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

console.log(`[Healer] Загружено товаров: ${products.length}`);

// Сбор всех уникальных картинок
let urlsToTest = new Set();
products.forEach(p => {
  if (p.main_image) urlsToTest.add(p.main_image);
  if (p.images && Array.isArray(p.images)) {
    p.images.forEach(img => urlsToTest.add(img));
  }
});

let uniqueUrls = Array.from(urlsToTest);
console.log(`[Healer] Найдено уникальныхURL для проверки: ${uniqueUrls.length}`);

const brokenUrls = new Set();
let completed = 0;
let currentIndex = 0;
const CONCURRENCY = 150; // Высокий лимит потоков

function checkUrl(urlStr, callback) {
  if (!urlStr || !urlStr.startsWith('http')) {
    brokenUrls.add(urlStr);
    return callback();
  }
  
  const client = urlStr.startsWith('https') ? https : http;
  
  const req = client.request(urlStr, { 
    method: 'HEAD', 
    timeout: 3000, // 3 сек на ответ вполне достаточно
    rejectUnauthorized: false
  }, (res) => {
    // 403 от cersanit или 404 от cloudinary / plitburg
    if (res.statusCode >= 400) {
      brokenUrls.add(urlStr);
    }
    // destroy stream immediately
    res.resume();
    callback();
  });
  
  req.on('error', (e) => {
    brokenUrls.add(urlStr);
    callback();
  });
  
  req.on('timeout', () => {
    brokenUrls.add(urlStr);
    req.destroy();
  });

  req.end();
}

function next() {
  if (currentIndex >= uniqueUrls.length) return;
  const url = uniqueUrls[currentIndex++];
  
  checkUrl(url, () => {
    completed++;
    if (completed % 500 === 0) {
      console.log(`[Healer] Проверено: ${completed} / ${uniqueUrls.length}. Бито: ${brokenUrls.size}`);
    }
    
    if (completed === uniqueUrls.length) {
      processResults();
    } else {
      next();
    }
  });
}

function processResults() {
  console.log(`\n[Healer] Проверка завершена! Всего битых ссылок: ${brokenUrls.size}`);
  
  let healedCount = 0;
  let stillBrokenCount = 0;

  for (let i = 0; i < products.length; i++) {
    let p = products[i];
    let needsHeal = false;

    // Очищаем массив картинок от битых
    if (p.images && Array.isArray(p.images)) {
      p.images = p.images.filter(img => !brokenUrls.has(img));
    }

    // Проверяем main_image
    if (!p.main_image || brokenUrls.has(p.main_image)) {
      needsHeal = true;
    }

    if (needsHeal) {
      // Пытаемся спасти интерьерной коллекцией, если она жива
      if (p.collection_image && !brokenUrls.has(p.collection_image)) {
        p.main_image = p.collection_image;
        if (!p.images) p.images = [];
        if (!p.images.includes(p.collection_image)) {
           p.images.unshift(p.collection_image);
        }
        healedCount++;
      } else {
        // Увы, пациент скорее всего пуст или fallback
        p.main_image = "/placeholder.jpg"; // заглушка-квадрат логотипа
        stillBrokenCount++;
      }
    }
  }

  console.log(`[Healer] Восстановлено с помощью интерьеров: ${healedCount}`);
  console.log(`[Healer] Заменено на общую заглушку (placeholder): ${stillBrokenCount}`);

  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`[Healer] Файл JSON успешно перезаписан!`);
}

console.log('[Healer] Запуск пула HTTP запросов...');
for (let i = 0; i < Math.min(CONCURRENCY, uniqueUrls.length); i++) {
  next();
}
