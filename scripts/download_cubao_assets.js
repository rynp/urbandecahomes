const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'cubao');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/presmat-udt-cubao-april-5-2024-page-03_orig.png', filename: 'tower-exterior.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/presmat-udt-cubao-april-5-2024-page-07_orig.png', filename: 'vicinity-map.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/neighborhood_orig.png', filename: 'neighborhood-map.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/schools_orig.png', filename: 'schools-map.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/hospitals_orig.png', filename: 'hospitals-map.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/presmat-udt-cubao-april-5-2024-page-11_orig.png', filename: 'medical-vicinity.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/published/sdp.png?1715776208', filename: 'site-development-plan.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/published/building-floor-plans.png?1715776383', filename: 'building-floor-plan.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/presmat-udt-cubao-april-5-2024-page-17_orig.png', filename: 'floor-plan-low.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/presmat-udt-cubao-april-5-2024-page-18_orig.png', filename: 'floor-plan-mid.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/presmat-udt-cubao-april-5-2024-page-19_orig.png', filename: 'floor-plan-high.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/published/presmat-udt-cubao-april-5-2024-page-23.png?1715776721', filename: 'unit-layout-studio-a.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/presmat-udt-cubao-april-5-2024-page-24_orig.png', filename: 'unit-layout-studio-b.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/published/presmat-udt-cubao-april-5-2024-page-25.png?1715776781', filename: 'unit-layout-1br-a.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/presmat-udt-cubao-april-5-2024-page-26_orig.png', filename: 'unit-layout-1br-b.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/presmat-udt-cubao-april-5-2024-page-45_orig.png', filename: 'facilities-overview.png' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${url}: HTTP ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => {
          console.log(`Downloaded: ${path.basename(dest)} (${fs.statSync(dest).size} bytes)`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Downloading ${assets.length} Cubao assets...`);
  for (const item of assets) {
    const dest = path.join(targetDir, item.filename);
    try {
      await download(item.url, dest);
    } catch (e) {
      console.error(`Error downloading ${item.filename}:`, e.message);
    }
  }
  console.log('Finished downloading all Cubao assets!');
}

run();
