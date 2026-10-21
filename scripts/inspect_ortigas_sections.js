const fs = require('fs');
const html = fs.readFileSync(__dirname + '/ortigas.html', 'utf8');

// Let's find sections
const sections = html.split(/<h2 class="wsite-content-title">/i);
console.log('Total sections separated by h2:', sections.length);
sections.forEach((s, i) => {
  const titleMatch = s.match(/^([^<]+)/);
  const title = titleMatch ? titleMatch[1].trim() : 'Section ' + i;
  console.log(`\n=== SECTION ${i}: ${title} ===`);
  const imgs = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let im;
  while ((im = imgRegex.exec(s)) !== null) {
    imgs.push(im[1]);
  }
  console.log('Images in this section:', imgs);
  const textClean = s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').substring(0, 300);
  console.log('Text preview:', textClean);
});
