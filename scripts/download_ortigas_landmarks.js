const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = path.join(__dirname, '..', 'public', 'images', 'ortigas');
const dirs = ['neighborhood', 'schools', 'hospitals', 'features', 'specs', 'facilities'];
dirs.forEach(d => {
  const p = path.join(baseDir, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

const neighborhoodItems = [
  { id: 'sm-east-ortigas', name: 'SM City East Ortigas', distance: '1.2 km (5 mins)', url: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80' },
  { id: 'eastwood-city', name: 'Eastwood City Libis', distance: '3.5 km (10-15 mins)', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { id: 'ortigas-cbd', name: 'Ortigas Center CBD', distance: '5.8 km (15-20 mins)', url: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80' },
  { id: 'robinsons-galleria', name: 'Robinsons Galleria Ortigas', distance: '5.5 km', url: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=800&q=80' },
  { id: 'sm-megamall', name: 'SM Megamall & Shangri-La', distance: '6.0 km', url: 'https://images.unsplash.com/photo-1555529771-7888783a18d3?auto=format&fit=crop&w=800&q=80' },
  { id: 'tiendesitas', name: 'Tiendesitas & Frontera Verde', distance: '3.2 km', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80' },
  { id: 'bridgetowne', name: 'Bridgetowne Destination Estate', distance: '3.0 km', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80' },
  { id: 'arcovia-city', name: 'Arcovia City Megaworld', distance: '3.8 km', url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80' },
  { id: 'capitol-commons', name: 'Capitol Commons Pasig', distance: '5.0 km', url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80' },
  { id: 'pasig-mega-market', name: 'Pasig City Mega Market', distance: '3.5 km', url: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80' },
  { id: 'bgc-c5', name: 'Bonifacio Global City (BGC) via C-5', distance: '7.5 km', url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80' },
  { id: 'lrt-santolan', name: 'LRT-2 Santolan / Emerald Station', distance: '4.5 km', url: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=800&q=80' },
  { id: 'deca-mall-ortigas', name: 'Deca Community Mall (On-Site)', distance: 'On-Site (0 mins)', localCopy: path.join(baseDir, 'amenity-community-mall.jpg') }
];

const schoolItems = [
  { id: 'pasig-catholic', name: 'Pasig Catholic College', distance: '3.2 km', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80' },
  { id: 'st-paul-pasig', name: 'St. Paul College Pasig', distance: '4.5 km', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80' },
  { id: 'uap-ortigas', name: 'University of Asia and the Pacific (UA&P)', distance: '5.2 km', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80' },
  { id: 'reedley-intl', name: 'Reedley International School', distance: '3.0 km', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80' },
  { id: 'la-consolacion-pasig', name: 'La Consolacion College Pasig', distance: '3.8 km', url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80' },
  { id: 'rosario-elem', name: 'Rosario Elementary School', distance: '800 m', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80' },
  { id: 'eusebio-high', name: 'Eusebio High School', distance: '1.2 km', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80' },
  { id: 'de-castro-elem', name: 'De Castro Elementary School', distance: '1.0 km', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80' },
  { id: 'ateneo-med', name: 'Ateneo School of Medicine & Public Health', distance: '4.0 km', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
  { id: 'rizal-high', name: 'Rizal High School Pasig', distance: '3.6 km', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
  { id: 'plp-pasig', name: 'Pamantasan ng Lungsod ng Pasig (PLP)', distance: '4.2 km', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' },
  { id: 'brent-learning', name: 'Brent International Learning Center', distance: '3.5 km', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80' }
];

const hospitalItems = [
  { id: 'medical-city', name: 'The Medical City (Ortigas Ave)', distance: '3.8 km (15 mins)', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80' },
  { id: 'pasig-gen-hosp', name: 'Pasig City General Hospital', distance: '2.5 km', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },
  { id: 'mission-hospital', name: 'Mission Hospital Pasig', distance: '1.5 km', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80' },
  { id: 'salve-regina', name: 'Salve Regina General Hospital', distance: '2.8 km', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80' },
  { id: 'sabater-gen', name: 'Sabater General Hospital', distance: '3.0 km', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80' },
  { id: 'rizal-med-center', name: 'Rizal Medical Center (Pasig Blvd)', distance: '4.2 km', url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80' },
  { id: 'st-camillus', name: 'St. Camillus Medical Center', distance: '3.5 km', url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80' },
  { id: 'tricity-med', name: 'Tricity Medical Center', distance: '3.2 km', url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80' },
  { id: 'alfonso-hosp', name: 'Alfonso Specialist Hospital', distance: '2.0 km', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80' },
  { id: 'childs-hope', name: 'Child’s Hope Medical Center', distance: '3.4 km', url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80' },
  { id: 'mother-regina', name: 'Mother Regina Hospital', distance: '2.2 km', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80' },
  { id: 'pasig-doctors', name: 'Pasig Doctors Medical Center', distance: '4.0 km', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80' },
  { id: 'vrp-medical', name: 'VRP Medical Center (EDSA Ortigas)', distance: '6.5 km', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },
  { id: 'cardinal-santos', name: 'Cardinal Santos Medical Center', distance: '7.0 km', url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80' }
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
  console.log(`Processing Ortigas ${subfolder}...`);
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
        console.error(`Error downloading ${item.id}:`, e.message);
      }
    }
  }
}

async function main() {
  await processCategory(neighborhoodItems, 'neighborhood');
  await processCategory(schoolItems, 'schools');
  await processCategory(hospitalItems, 'hospitals');
  console.log('All Ortigas landmark images ready!');
}

main();
