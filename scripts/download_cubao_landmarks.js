const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = path.join(__dirname, '..', 'public', 'images', 'cubao');
const dirs = ['neighborhood', 'schools', 'hospitals', 'features', 'specs', 'facilities'];
dirs.forEach(d => {
  const p = path.join(baseDir, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

const neighborhoodItems = [
  { id: 'mrt-cubao', name: 'MRT-3 Cubao Station', distance: '200 m (3 mins walk)', url: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=800&q=80' },
  { id: 'farmers-market', name: 'Farmer’s Market', distance: '290 m (4 mins walk)', url: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80' },
  { id: 'novotel-araneta', name: 'Novotel Araneta City', distance: '350 m (5 mins walk)', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' },
  { id: 'farmers-plaza', name: 'Farmers Plaza', distance: '400 m', url: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=800&q=80' },
  { id: 'cyberpark-tower', name: 'Cyberpark Towers (Araneta)', distance: '400 m', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { id: 'sm-cubao', name: 'SM Cubao', distance: '450 m', url: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80' },
  { id: 'gateway-mall', name: 'Gateway Mall & Gateway 2', distance: '600 m', url: 'https://images.unsplash.com/photo-1555529771-7888783a18d3?auto=format&fit=crop&w=800&q=80' },
  { id: 'spark-place', name: 'Spark Place P. Tuazon', distance: '700 m', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80' },
  { id: 'araneta-coliseum', name: 'Smart Araneta Coliseum', distance: '750 m', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80' },
  { id: 'ali-mall', name: 'Ali Mall (First Mall in PH)', distance: '750 m', url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80' },
  { id: 'camp-crame', name: 'Camp Crame (PNP Headquarters)', distance: '1.6 km', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80' },
  { id: 'camp-aguinaldo', name: 'Camp Aguinaldo (AFP Headquarters)', distance: '2.5 km', url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80' },
];

const schoolItems = [
  { id: 'samson-college', name: 'Samson College of Science & Technology', distance: '230 m', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80' },
  { id: 'aclc-cubao', name: 'ACLC College Cubao', distance: '400 m', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
  { id: 'abe-college', name: 'ABE International Business College', distance: '950 m', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80' },
  { id: 'roosevelt-college', name: 'Roosevelt College', distance: '1.2 km', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80' },
  { id: 'immaculate-conception-cathedral', name: 'Immaculate Conception Cathedral School', distance: '1.3 km', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80' },
  { id: 'ramon-magsaysay-high', name: 'Ramon Magsaysay High School Cubao', distance: '1.4 km', url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80' },
  { id: 'tip-cubao', name: 'Technological Institute of the Philippines (TIP)', distance: '1.8 km', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80' },
  { id: 'world-citi-colleges', name: 'World CITI Colleges', distance: '2.1 km', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80' },
  { id: 'asian-college', name: 'Asian College of Journalism / Asian College', distance: '2.5 km', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80' },
  { id: 'metro-business', name: 'Metro Business Computer College', distance: '2.6 km', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
  { id: 'st-josephs-college', name: 'St. Joseph’s College of Quezon City', distance: '3.2 km', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' },
  { id: 'central-colleges', name: 'Central Colleges of the Philippines', distance: '4.2 km', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80' },
  { id: 'st-monique', name: 'St. Monique College School', distance: '4.9 km', url: 'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?auto=format&fit=crop&w=800&q=80' }
];

const hospitalItems = [
  { id: 'medical-city-clinic', name: 'The Medical City Clinic (Araneta City)', distance: '700 m', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80' },
  { id: 'pnp-general-hosp', name: 'PNP General Hospital', distance: '1.7 km', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },
  { id: 'world-citi-med', name: 'World Citi Medical Center', distance: '2.0 km', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80' },
  { id: 'v-luna-hospital', name: 'V. Luna Medical Center (AFP Hospital)', distance: '2.7 km', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80' },
  { id: 'east-avenue-med', name: 'East Avenue Medical Center', distance: '3.3 km', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80' },
  { id: 'philippine-heart', name: 'Philippine Heart Center', distance: '3.5 km', url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80' },
  { id: 'cardinal-santos', name: 'Cardinal Santos Medical Center', distance: '3.7 km', url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80' },
  { id: 'st-lukes-qc', name: 'St. Luke’s Medical Center Quezon City', distance: '4.0 km', url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80' },
  { id: 'uerm-hospital', name: 'UERM Memorial Medical Center', distance: '4.1 km', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80' },
  { id: 'providence-hosp', name: 'Providence Hospital (Quezon Ave)', distance: '4.1 km', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80' },
  { id: 'lung-center', name: 'Lung Center of the Philippines', distance: '4.2 km', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80' },
  { id: 'delos-santos-med', name: 'Delos Santos Medical Center', distance: '4.2 km', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },
  { id: 'capitol-medical', name: 'Capitol Medical Center', distance: '4.3 km', url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80' },
];

const featureItems = [
  { id: '12-elevators', name: '12 High-Speed Elevators', url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80' },
  { id: 'commercial-floors', name: '2 Commercial Floors & Laundromat', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80' },
  { id: 'backup-power', name: '100% Emergency Backup Power', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80' },
  { id: 'cctv-security', name: '24/7 CCTV & Security Monitoring', url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80' },
  { id: 'fdas-protection', name: 'FDAS Fire Alarm (GF to 46th Floor)', url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80' },
  { id: 'edsa-dropoff', name: 'Dedicated EDSA Gated Drop-Off', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80' },
  { id: 'lounge-coworking', name: 'Resident Lounge & Coworking', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
  { id: 'mrt-connectivity', name: 'Direct MRT-3 Cubao Transit Access', url: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=800&q=80' },
];

const specItems = [
  { id: 'painted-walls', name: 'Painted Concrete & Drywall Partitions', url: 'https://images.unsplash.com/photo-1502005229762-ee152da92e06?auto=format&fit=crop&w=800&q=80' },
  { id: 'tiled-floors', name: 'Vitrified Ceramic Floor & CR Wall Tiles', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80' },
  { id: 'granite-kitchen', name: 'Base Cabinet with Solid Granite Counter', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80' },
  { id: 'tiled-bathroom', name: 'Tiled Bathroom with Sanitary Fixtures', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80' },
  { id: 'ac-provision', name: '0.75 HP AC Provision & Power Socket', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' },
  { id: 'exhaust-fans', name: 'Provision for Mechanical Exhaust Fans', url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80' },
  { id: 'window-blinds', name: 'Grease Trap & Pre-Installed Window Blinds', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' },
];

const facilityItems = [
  { id: '12-tower-elevators', name: '12 High-Speed Passenger Elevators', url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80' },
  { id: 'afss-sprinklers', name: 'Automatic Fire Suppression System (AFSS)', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
  { id: 'fdas-alarm', name: 'Fire Detection & Alarm System (FDAS)', url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80' },
  { id: 'stp-plant', name: 'Modern Sewage Treatment Plant (STP)', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80' },
  { id: 'emergency-genset', name: '100% Emergency Power Generators', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80' },
  { id: 'property-management', name: 'Professional Property Management Desk', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
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
  console.log(`Processing Cubao ${subfolder}...`);
  for (const item of items) {
    const dest = path.join(baseDir, subfolder, `${item.id}.jpg`);
    if (item.url) {
      try {
        await download(item.url, dest);
        console.log(`Downloaded ${subfolder}/${item.id}.jpg`);
      } catch (e) {
        console.error(`Error downloading ${item.id}:`, e.message);
      }
    }
  }
}

async function main() {
  await processCategory(neighborhoodItems, 'neighborhood');
  await processCategory(schoolItems, 'schools');
  await processCategory(hospitalItems, 'hospitals');
  await processCategory(featureItems, 'features');
  await processCategory(specItems, 'specs');
  await processCategory(facilityItems, 'facilities');
  console.log('All Cubao landmark and card images ready!');
}

main();
