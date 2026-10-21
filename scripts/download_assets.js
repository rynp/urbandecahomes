const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'manila');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/units-ready_orig.jpg', filename: 'units-ready.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/community-mall_orig.jpg', filename: 'community-mall.jpg' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/updates-pks-page-08_orig.png', filename: 'vicinity-map.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/establishment_orig.png', filename: 'establishment.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/schools_orig.png', filename: 'schools.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/hospitals_orig.png', filename: 'hospitals.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/updates-pks-page-13_orig.png', filename: 'project-features-pks.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/updates-pks-page-15_orig.png', filename: 'site-development-plan.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/updates-pks-page-16_orig.png', filename: 'typical-floor-plan.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/updates-pks-page-17_orig.png', filename: 'unit-layout-studio.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/updates-pks-page-18_orig.png', filename: 'unit-layout-1br.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/updates-pks-page-19_orig.png', filename: 'unit-layout-2br-a.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/updates-pks-page-20_orig.png', filename: 'unit-layout-2br-b.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/unit-specs_orig.png', filename: 'unit-specs.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/facilities_orig.png', filename: 'facilities.png' },
  { url: 'https://www.decahomes.com.ph/uploads/5/4/9/5/5495221/updates-pks-page-24_orig.png', filename: 'facilities-details.png' },
  { url: 'https://www.weebly.com/uploads/b/5495221-198798233623668699/studio_22.95_905.jpg', filename: 'video-studio.jpg' },
  { url: 'https://www.weebly.com/uploads/b/5495221-198798233623668699/1-bedroom_27.42sqm_288.jpg', filename: 'video-1br.jpg' },
  { url: 'https://www.weebly.com/uploads/b/5495221-198798233623668699/2br_regular_30.60_248.jpg', filename: 'video-2br-regular.jpg' },
  { url: 'https://www.weebly.com/uploads/b/5495221-198798233623668699/2-bedroom_corner_unit_32.17sqm__2__940.jpg', filename: 'video-2br-corner.jpg' },
  { url: 'https://www.weebly.com/uploads/b/5495221-198798233623668699/2br_-c_45.90_974.jpg', filename: 'video-2br-c.jpg' },
  { url: 'https://www.weebly.com/uploads/b/5495221-198798233623668699/2br_-d_34.42_425.jpg', filename: 'video-2br-d.jpg' },
  { url: 'https://www.weebly.com/uploads/b/5495221-198798233623668699/manila_aireal_view_733.jpg', filename: 'video-aerial.jpg' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status code ${res.statusCode}`));
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
  console.log(`Downloading ${assets.length} assets...`);
  for (const item of assets) {
    const dest = path.join(targetDir, item.filename);
    try {
      await download(item.url, dest);
    } catch (e) {
      console.error(`Error downloading ${item.filename}:`, e.message);
    }
  }
  console.log('Finished downloading all assets!');
}

run();
