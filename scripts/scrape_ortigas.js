const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://www.decahomes.com.ph/urban-deca-homes-ortigas.html';

https.get(url, {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync(path.join(__dirname, 'ortigas.html'), html, 'utf8');
    console.log('Saved ortigas.html, size:', html.length);

    // Extract all image sources
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match;
    const images = [];
    while ((match = imgRegex.exec(html)) !== null) {
      images.push(match[1]);
    }
    console.log('Images found in HTML:', images);

    // Extract all anchor links to images
    const aRegex = /<a[^>]+href=["']([^"']+\.(jpg|jpeg|png|webp|gif))["']/gi;
    const aImages = [];
    while ((match = aRegex.exec(html)) !== null) {
      aImages.push(match[1]);
    }
    console.log('Linked images in HTML:', aImages);

    // Extract text blocks
    const paragraphRegex = /<div class="paragraph"[^>]*>([\s\S]*?)<\/div>/gi;
    const paragraphs = [];
    while ((match = paragraphRegex.exec(html)) !== null) {
      paragraphs.push(match[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim());
    }
    console.log('\n--- Text Paragraphs ---');
    paragraphs.forEach((p, i) => console.log(`[${i}] ${p}`));
  });
}).on('error', err => console.error(err));
