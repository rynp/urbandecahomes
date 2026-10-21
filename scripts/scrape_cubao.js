const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://www.decahomes.com.ph/urban-deca-towers-cubao.html';

https.get(url, {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync(path.join(__dirname, 'cubao.html'), html, 'utf8');
    console.log('Saved cubao.html, size:', html.length);

    // Extract all image sources
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match;
    const images = [];
    while ((match = imgRegex.exec(html)) !== null) {
      images.push(match[1]);
    }
    console.log('Images found in HTML:', images);

    // Extract headings
    const regex = /<(h1|h2|h3|h4|strong)[^>]*>([\s\S]*?)<\/\1>/gi;
    let m;
    while ((m = regex.exec(html)) !== null) {
      const text = m[2].replace(/<[^>]+>/g, '').trim();
      if (text) console.log(m[1].toUpperCase() + ':', text);
    }
  });
}).on('error', err => console.error(err));
