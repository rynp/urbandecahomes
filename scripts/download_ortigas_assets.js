const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'ortigas');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/udco-presmat-page-43_orig.png', filename: 'vicinity-map.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/slide10_orig.png', filename: 'location-map.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/slide9_orig.png', filename: 'access-routes.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/slide11_orig.png', filename: 'site-development-plan.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/slide12_orig.png', filename: 'building-phases.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/udhortigas-updated-presentation_orig.png', filename: 'typical-floor-plan.png' },
  // Unit Layouts
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/2br-a_orig.jpg', filename: 'unit-layout-2br-a.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/2br-b_orig.jpg', filename: 'unit-layout-2br-b.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/2br-c_orig.jpg', filename: 'unit-layout-2br-c.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/3br-a_orig.jpg', filename: 'unit-layout-3br-a.jpg' },
  // Additional Floor Plan cuts
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-2br-a_orig.png', filename: 'floor-cut-2br-a.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-2br-b_orig.png', filename: 'floor-cut-2br-b.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-2br-c_orig.png', filename: 'floor-cut-2br-c.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-3br-a_orig.png', filename: 'floor-cut-3br-a.png' },
  // Amenities & Model Unit Photos
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/376385591-3450021981924843-6019567595268753468-n.jpg', filename: 'amenity-pool-lagoon.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/viber-image-2023-09-28-16-04-46-501.jpg', filename: 'amenity-clubhouse-exterior.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/viber-image-2023-09-28-16-04-47-578.jpg', filename: 'amenity-basketball-court.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/viber-image-2023-09-28-16-04-47-862.jpg', filename: 'amenity-outdoor-gym.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/viber-image-2023-09-28-16-04-48-153.jpg', filename: 'amenity-playground.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/viber-image-2023-09-28-16-04-48-433.jpg', filename: 'amenity-pocket-parks.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/viber-image-2023-09-28-16-04-48-806.jpg', filename: 'amenity-water-feature.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/viber-image-2023-09-28-16-04-49-074.jpg', filename: 'amenity-admin-office.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/viber-image-2023-09-28-16-04-50-691.jpg', filename: 'amenity-community-mall.jpg' },
  // Model unit & Actual Turnover photos
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-309636004-1169423023677728-2106456401835093794-n.jpg', filename: 'model-unit-living.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-314380683-1110953016198622-3300626235883007414-n.jpg', filename: 'model-unit-kitchen.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-314748136-1414706638936632-4305074859178325846-n.jpg', filename: 'model-unit-bedroom.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-viber-image-2023-03-31-10-12-59-902.jpg', filename: 'turnover-living-dining.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-viber-image-2023-03-31-10-13-03-556.jpg', filename: 'turnover-kitchen-counter.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-viber-image-2023-03-31-10-14-04-644.jpg', filename: 'turnover-bedroom-1.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-viber-image-2023-03-31-10-14-05-271.jpg', filename: 'turnover-bedroom-2.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-viber-image-2023-03-31-10-14-05-838.jpg', filename: 'turnover-bathroom.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-viber-image-2023-03-31-10-14-06-670.jpg', filename: 'turnover-flooring.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-viber-image-2023-03-31-10-14-07-692.jpg', filename: 'turnover-balcony.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/copy-of-viber-image-2023-03-31-10-14-09-231.jpg', filename: 'turnover-windows.jpg' },
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
  console.log(`Downloading ${assets.length} Ortigas assets...`);
  for (const item of assets) {
    const dest = path.join(targetDir, item.filename);
    try {
      await download(item.url, dest);
    } catch (e) {
      console.error(`Error downloading ${item.filename}:`, e.message);
    }
  }
  console.log('Finished downloading all Ortigas assets!');
}

run();
