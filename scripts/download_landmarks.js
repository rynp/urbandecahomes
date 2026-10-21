const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = path.join(__dirname, '..', 'public', 'images', 'manila');
const dirs = ['neighborhood', 'schools', 'hospitals', 'features', 'specs', 'facilities'];
dirs.forEach(d => {
  const p = path.join(baseDir, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Curated reliable Unsplash images tailored to each Philippine landmark type
const neighborhoodItems = [
  { id: 'deca-mall', name: 'Deca Mall', distance: '550 m', localCopy: path.join(baseDir, 'community-mall.jpg') },
  { id: 'vitas-aquatic', name: 'Vitas Aquatic Sports Complex', distance: '400 m', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80' },
  { id: 'vitas-skatepark', name: 'Vitas Skatepark', distance: '350 m', url: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=800&q=80' },
  { id: 'north-harbor', name: 'Manila North Harbor', distance: '1.4 km', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80' },
  { id: 'puregold-tayuman', name: 'Puregold Tayuman', distance: '1.5 km', url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80' },
  { id: 'tayuman-lrt', name: 'Tayuman LRT Station', distance: '2.8 km', url: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=800&q=80' },
  { id: 'divisoria', name: 'Divisoria & Tutuban Center', distance: '3.1 km', url: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80' },
  { id: 'sm-san-lazaro', name: 'SM City San Lazaro', distance: '3.1 km', url: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80' },
  { id: 'navotas-fish-port', name: 'Navotas Fisheries Port Complex', distance: '3.7 km', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
  { id: 'binondo', name: 'Binondo Chinatown', distance: '4.5 km', url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80' },
  { id: 'intramuros', name: 'Intramuros Historic Walled City', distance: '5.1 km', url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80' },
  { id: 'rizal-park', name: 'Rizal Park (Luneta)', distance: '5.9 km', url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80' },
  { id: 'nlex-harbor-link', name: 'NLEX Harbor Link', distance: 'Direct Access', url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80' }
];

const schoolItems = [
  { id: 'ica-manila', name: 'Immaculate Conception Academy of Manila', distance: '900 m', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80' },
  { id: 'emilio-jacinto', name: 'Emilio Jacinto Elementary School', distance: '900 m', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80' },
  { id: 'juan-nolasco', name: 'Dr. Juan G. Nolasco High School', distance: '1.3 km', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80' },
  { id: 'jose-rizal-elem', name: 'Jose Rizal Elementary School', distance: '1.6 km', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80' },
  { id: 'mlq-elem', name: 'Manuel L. Quezon Elementary School', distance: '1.6 km', url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80' },
  { id: 'tondo-high', name: 'Tondo High School', distance: '1.8 km', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80' },
  { id: 'lakan-dula-high', name: 'Lakan Dula High School', distance: '1.8 km', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80' },
  { id: 'st-joseph-gagalangin', name: 'St. Joseph School of Gagalangin Tondo', distance: '1.9 km', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
  { id: 'st-paul-grade', name: 'St. Paul Grade School', distance: '2.0 km', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
  { id: 'andres-bonifacio', name: 'Andres Bonifacio Elementary School', distance: '2.4 km', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' },
  { id: 'holy-child', name: 'Holy Child Catholic School', distance: '2.5 km', url: 'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?auto=format&fit=crop&w=800&q=80' },
  { id: 'holy-heart', name: 'Holy Heart Christian Academy', distance: '3.5 km', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80' }
];

const hospitalItems = [
  { id: 'tondo-med', name: 'Tondo Medical Center', distance: '1.3 km', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80' },
  { id: 'santos-med', name: 'Santos Medical Clinic & Gen Hospital', distance: '1.7 km', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },
  { id: 'mary-johnston', name: 'Mary Johnston Hospital', distance: '2.4 km', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80' },
  { id: 'tondo-hospital', name: 'Tondo Hospital', distance: '2.6 km', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80' },
  { id: 'magsaysay-health', name: 'R. Magsaysay Health Center', distance: '2.1 km', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80' },
  { id: 'amisola-maternity', name: 'Amisola Maternity Hospital', distance: '2.7 km', url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80' },
  { id: 'emmanuel-comm', name: 'Emmanuel Community Hospital', distance: '2.7 km', url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80' },
  { id: 'mcu-hospital', name: 'MCU Hospital', distance: '2.8 km', url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80' },
  { id: 'gat-andres', name: 'Gat Andres Bonifacio Memorial Medical Center', distance: '3.0 km', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80' },
  { id: 'ospital-ng-tondo', name: 'Ospital ng Tondo', distance: '3.1 km', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80' },
  { id: 'san-lazaro', name: 'San Lazaro Hospital', distance: '3.4 km', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80' },
  { id: 'chinese-gen', name: 'Chinese General Hospital & Medical Center', distance: '3.4 km', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },
  { id: 'fatima-univ', name: 'Our Lady of Fatima University Hospital', distance: '4.5 km', url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80' },
  { id: 'perpetual-succor', name: 'Perpetual Succor Hospital', distance: '4.6 km', url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80' }
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
      stream.on('finish', () => {
        stream.close(() => resolve());
      });
    }).on('error', reject);
  });
}

// Generate fallback SVG if image fails
function createFallbackImage(name, distance, category, dest) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1f2937" />
        <stop offset="100%" stop-color="#111827" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#bg)" />
    <circle cx="400" cy="240" r="80" fill="#f59e0b" fill-opacity="0.2" />
    <text x="400" y="250" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="28" font-weight="bold">${category.toUpperCase()}</text>
    <text x="400" y="340" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="32" font-weight="bold">${name}</text>
    <text x="400" y="380" text-anchor="middle" fill="#9ca3af" font-family="sans-serif" font-size="20">Distance from Urban Deca Homes Manila: ${distance}</text>
  </svg>`;
  fs.writeFileSync(dest.replace('.jpg', '.svg'), svg, 'utf8');
}

async function processCategory(items, subfolder, catName) {
  console.log(`Processing ${catName}...`);
  for (const item of items) {
    const dest = path.join(baseDir, subfolder, `${item.id}.jpg`);
    if (item.localCopy && fs.existsSync(item.localCopy)) {
      fs.copyFileSync(item.localCopy, dest);
      console.log(`Copied local: ${item.id}.jpg`);
      continue;
    }
    if (item.url) {
      try {
        await download(item.url, dest);
        console.log(`Downloaded ${subfolder}/${item.id}.jpg`);
      } catch (e) {
        console.error(`Error downloading ${item.id}, creating fallback:`, e.message);
        createFallbackImage(item.name, item.distance, catName, dest);
      }
    }
  }
}

async function main() {
  await processCategory(neighborhoodItems, 'neighborhood', 'Neighborhood Landmark');
  await processCategory(schoolItems, 'schools', 'School Nearby');
  await processCategory(hospitalItems, 'hospitals', 'Hospital Nearby');
  console.log('All landmark images ready!');
}

main();
