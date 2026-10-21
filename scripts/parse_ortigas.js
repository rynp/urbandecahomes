const fs = require('fs');
const html = fs.readFileSync(__dirname + '/ortigas.html', 'utf8');

const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  const tag = m[0];
  const src = m[1];
  const altMatch = tag.match(/alt=["']([^"']*)["']/i);
  const alt = altMatch ? altMatch[1] : '';
  const idx = m.index;
  const snippet = html.substring(Math.max(0, idx - 150), Math.min(html.length, idx + 150))
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  console.log(`SRC: ${src}`);
  console.log(`ALT: ${alt}`);
  console.log(`CONTEXT: ${snippet}\n---`);
}
