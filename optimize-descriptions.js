const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib', 'products-data.json');
let rawData = fs.readFileSync(filePath, 'utf-8');
let products = JSON.parse(rawData);

let optimizedCount = 0;

function expandAbbreviation(name) {
  return name.replace(/^Глаз\./g, 'Глазурованный')
             .replace(/^Универсал\./g, 'Универсальный')
             .replace(/наст\./g, 'настенная')
             .replace(/напол\./g, 'напольная');
}

function generateRobustDescription(product) {
  let cleanName = expandAbbreviation(product.name || "");
  let brand = product.brand || "неизвестного бренда";
  let collection = product.collection || "";
  let format = product.format || "";
  let color = product.color ? product.color.toLowerCase() : "";
  let type = (product.product_type || "Керамическая плитка").toLowerCase();

  // Basic intro
  let desc = `${cleanName}. `;
  if (brand !== "неизвестного бренда") {
    desc += `Это высококачественн${type.includes("мозаика") ? "ая" : type.includes("керамогранит") ? "ый" : "ая"} ${type} от популярного бренда ${brand}`;
    if (collection) {
      desc += ` из дизайнерской коллекции ${collection}`;
    }
    desc += ". ";
  }

  // Commercial attributes
  let features = [];
  if (color) features.push(`Благородный ${color} оттенок продукта отлично впишется в современный интерьер`);
  if (format) features.push(`Формат изделия составляет ${format} см`);
  
  if (features.length > 0) {
    desc += features.join('. ') + '. ';
  }

  // Technical specs to human readable text
  let techSpecs = [];
  if (product.rectified) {
    techSpecs.push("Благодаря ректифицированным (ровно обрезанным) краям, укладка возможна с минимальным незаметным швом");
  }
  if (product.frost_resistant) {
    techSpecs.push("Материал морозостоек, поэтому его смело можно укладывать как внутри помещений, так и на открытых верандах или фасадах");
  }
  if (product.wear_class && product.wear_class >= 3) {
    techSpecs.push(`Высокий класс износостойкости (PEI ${product.wear_class}) позволяет использовать покрытие в местах с активной проходимостью`);
  }
  if (product.surface) {
    techSpecs.push(`Поверхность плитки — ${product.surface.toLowerCase()}`);
  }

  if (techSpecs.length > 0) {
    desc += techSpecs.join('. ') + '. ';
  }

  // Call to action
  let stockMsg = "в Санкт-Петербурге";
  if ((product.stock_yanino || 0) > 0) {
    stockMsg = "на нашем складе в Янино (СПб)";
  }
  
  desc += `Оформите заказ онлайн — товар доступен ${stockMsg} по выгодной цене с возможностью оперативной доставки!`;

  return desc;
}

for (let i = 0; i < products.length; i++) {
  let original = products[i].description;
  let optimized = generateRobustDescription(products[i]);
  
  products[i].description = optimized;
  optimizedCount++;

  if (i < 3) {
    console.log(`\n--- Product ${i + 1} ---`);
    console.log("OLD: " + original);
    console.log("NEW: " + optimized);
  }
}

fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');

console.log(`\nSuccessfully optimized ${optimizedCount} product descriptions!`);
