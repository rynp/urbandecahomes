const fs = require('fs');
const html = fs.readFileSync(__dirname + '/cubao.html', 'utf8');

const regex = /<strong[^>]*>([\s\S]*?)<\/strong>/gi;
let m;
const headings = [];
while ((m = regex.exec(html)) !== null) {
  headings.push({ title: m[1].replace(/<[^>]+>/g, '').replace(/&#8203;/g, '').trim(), index: m.index });
}

headings.forEach((h, i) => {
  const nextIdx = i < headings.length - 1 ? headings[i + 1].index : html.indexOf('<div id="footer">');
  const slice = html.substring(h.index, nextIdx > h.index ? nextIdx : h.index + 2000);
  console.log(`\n=================== ${h.title} ===================`);
  
  // Extract images
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let im;
  const imgs = [];
  while ((im = imgRegex.exec(slice)) !== null) {
    imgs.push(im[1]);
  }
  console.log('Images:', imgs);

  // Extract list items <li>
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let li;
  const items = [];
  while ((li = liRegex.exec(slice)) !== null) {
    items.push(li[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&#8203;/g, ' ').replace(/\s+/g, ' ').trim());
  }
  if (items.length) {
    console.log('List Items:');
    items.forEach(it => console.log(' • ' + it));
  } else {
    const text = slice.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 300);
    console.log('Text preview:', text);
  }
});
