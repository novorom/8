const fs = require('fs');
const https = require('https');

const data = JSON.parse(fs.readFileSync('lib/products-data.json', 'utf8'));
console.log(`Loaded ${data.length} products`);

let linksToCheck = new Set();
data.forEach(p => {
  if (p.main_image) linksToCheck.add(p.main_image);
  if (p.collection_image) linksToCheck.add(p.collection_image);
});

const linksArray = Array.from(linksToCheck);
console.log(`Found ${linksArray.length} unique main/collection images`);

// Let's test the first 50 randomly to see the pattern of failures
const sample = linksArray.slice(0, 50);
let broken = [];

let completed = 0;
sample.forEach(urlStr => {
  if (!urlStr.startsWith('http')) {
    completed++;
    return;
  }
  
  const req = https.request(urlStr, { method: 'HEAD', timeout: 5000 }, (res) => {
    if (res.statusCode >= 400) {
      broken.push({ url: urlStr, status: res.statusCode });
    }
    completed++;
    if (completed === sample.length) printResult();
  });
  
  req.on('error', (e) => {
    broken.push({ url: urlStr, error: e.message });
    completed++;
    if (completed === sample.length) printResult();
  });
  req.end();
});

function printResult() {
  console.log(`Tested 50 urls. Broken: ${broken.length}`);
  console.log(broken);
}
