const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://plitki-spb.ru';
const KEY = 'c02115ec66374092b376044399eab48b'; 
const KEY_FILE = path.resolve(__dirname, '../public/', `${KEY}.txt`);

// Ensure key file exists for verification
if (!fs.existsSync(KEY_FILE)) {
    try {
        fs.writeFileSync(KEY_FILE, KEY);
        console.log(`Created key file: public/${KEY}.txt`);
    } catch (e) {
        console.error('Failed to create key file:', e.message);
    }
}

async function submitToIndexNow(urls) {
    const data = {
        host: SITE_URL.replace('https://', ''),
        key: KEY,
        keyLocation: `${SITE_URL}/${KEY}.txt`,
        urlList: urls
    };

    try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log('IndexNow submission successful:', response.status);
    } catch (error) {
        console.error('IndexNow submission failed:', error.message);
    }
}

// Read products
try {
    const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../lib/products-data.json'), 'utf8'));
    const urls = products.filter(p => p.slug).map(p => `${SITE_URL}/catalog/${p.slug}`);

    // Submit in chunks
    async function run() {
        console.log(`Submitting ${urls.length} URLs to IndexNow...`);
        for (let i = 0; i < urls.length; i += 1000) {
            const chunk = urls.slice(i, i + 1000);
            await submitToIndexNow(chunk);
        }
    }

    run();
} catch (e) {
    console.error('Failed to read products-data.json:', e.message);
}
