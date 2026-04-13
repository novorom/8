const fs = require('fs');
const content = fs.readFileSync('lib/products-data.ts', 'utf8');
const match = content.match(/export const products\s*[:\s\w\[\]]*\s*=\s*(\[.*\]);/s);
if (!match) {
    console.log("Could not parse products array.");
    process.exit(1);
}
let products = [];
try {
    // using eval to parse the array since it's a TS object, not pure JSON
    // A bit risky but safe for local data
    const tsCode = content.replace(/^.*?export const products[^=]*=/s, '').replace(/;?$/, '');
    products = eval(tsCode);
} catch (e) {
    console.log("Eval failed, trying rudimentary regex matching...");
    const missingMains = (content.match(/main_image:\s*null/g) || []).length;
    const missingCollections = (content.match(/collection_image:\s*null/g) || []).length;
    console.log(`Missing main images: ${missingMains}`);
    console.log(`Missing collection images: ${missingCollections}`);
    process.exit(0);
}

let missingMain = 0;
let missingCollection = 0;
let plitburgImages = 0;

products.forEach(p => {
    if (!p.main_image) missingMain++;
    else if (p.main_image.includes('plitburg.ru')) plitburgImages++;

    if (!p.collection_image) missingCollection++;
    else if (p.collection_image.includes('plitburg.ru')) plitburgImages++;
});

console.log(`Total Products: ${products.length}`);
console.log(`Missing main_image: ${missingMain}`);
console.log(`Missing collection_image: ${missingCollection}`);
console.log(`Images still referencing plitburg.ru: ${plitburgImages}`);
