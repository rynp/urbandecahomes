const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = path.join(__dirname, '..', 'public', 'images', 'manila');

const featureItems = [
  { id: 'gated-entrance', name: 'Gated Entrance', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80' },
  { id: 'guardhouse-security', name: 'Guardhouse and 24/7 Security', url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80' },
  { id: 'swimming-pool', name: 'Resort Swimming Pool', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80' },
  { id: 'basketball-court', name: 'Covered Basketball Court', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80' },
  { id: 'children-playground', name: 'Children’s Playground', url: 'https://images.unsplash.com/photo-1508873696983-2df570464756?auto=format&fit=crop&w=800&q=80' },
  { id: 'pocket-parks', name: 'Pocket Parks & Green Courtyards', url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80' },
  { id: 'multipurpose-hall', name: 'Multipurpose Community Clubhouse', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80' },
  { id: 'community-mall', name: 'Deca Community Mall', localCopy: path.join(baseDir, 'community-mall.jpg') }
];

const specItems = [
  { id: 'painted-walls', name: 'Painted Walls & Drywall Partitions', url: 'https://images.unsplash.com/photo-1502005229762-ee152da92e06?auto=format&fit=crop&w=800&q=80' },
  { id: 'exhaust-fans', name: 'Provision for Exhaust Fans', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80' },
  { id: 'ac-provision', name: 'Provision for 0.75 HP Air Conditioner', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' },
  { id: 'kitchen-counter', name: 'Granite Countertop, Base Cabinet & Sink', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80' },
  { id: 'tiled-floors', name: 'Tiled Ceramic Floors & CR Wall Tiles', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80' },
  { id: 'grease-trap', name: 'Under-Sink Plumbing Grease Trap', url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80' },
  { id: 'window-blinds', name: 'Pre-Installed Window Blinds', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' }
];

const facilityItems = [
  { id: 'elevators', name: 'High-Speed Elevators', url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80' },
  { id: 'afss-sprinklers', name: 'Automatic Fire Suppression System (AFSS)', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
  { id: 'fdas-alarm', name: 'Fire Detection & Alarm System (FDAS)', url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80' },
  { id: 'stp-plant', name: 'Sewage Treatment Plant (STP)', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80' },
  { id: 'emergency-genset', name: 'Emergency Backup Power Generator', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80' },
  { id: 'property-management', name: 'Professional Property Management Desk', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => stream.close(() => resolve()));
    }).on('error', reject);
  });
}

async function processCategory(items, subfolder) {
  for (const item of items) {
    const dest = path.join(baseDir, subfolder, `${item.id}.jpg`);
    if (item.localCopy && fs.existsSync(item.localCopy)) {
      fs.copyFileSync(item.localCopy, dest);
      console.log(`Copied ${subfolder}/${item.id}.jpg`);
      continue;
    }
    try {
      await download(item.url, dest);
      console.log(`Downloaded ${subfolder}/${item.id}.jpg`);
    } catch (e) {
      console.error(`Error downloading ${item.id}:`, e.message);
    }
  }
}

async function main() {
  await processCategory(featureItems, 'features');
  await processCategory(specItems, 'specs');
  await processCategory(facilityItems, 'facilities');
  console.log('Features, specs, and facilities assets ready!');
}

main();
