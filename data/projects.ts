export interface UnitType {
  id: string;
  name: string;
  category: 'Studio' | '1-Bedroom' | '2-Bedroom' | '3-Bedroom';
  areaSqm: number;
  bedrooms: number;
  bathrooms: number;
  balcony: boolean;
  priceMinPhp: number;
  priceMaxPhp: number;
  estMonthlyPagIbigPhp: number;
  status: 'Available' | 'Limited Availability' | 'Sold Out';
  features: string[];
  description: string;
}

export interface Amenity {
  name: string;
  description: string;
  iconName: string;
}

export interface ProjectLocation {
  address: string;
  barangay: string;
  city: string;
  province: string;
  region: string;
  landmarks: { name: string; distance: string; type: 'Transit' | 'Mall' | 'School' | 'Hospital' | 'CBD' }[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  propertyType: 'Mid-Rise Condominium' | 'High-Rise Tower';
  constructionStatus: 'Ready for Occupancy (RFO)' | 'Pre-Selling & RFO';
  priceRangeFormatted: string;
  reservationFeePhp: number;
  priceMinPhp: number;
  priceMaxPhp: number;
  location: ProjectLocation;
  heroImage: string;
  galleryImages: { url: string; alt: string; caption: string }[];
  overview: string[];
  specifications: { label: string; value: string }[];
  unitTypes: UnitType[];
  amenities: Amenity[];
  deliverables: string[];
  financingSchemes: string[];
  faqs: { question: string; answer: string }[];
}

export const projects: Project[] = [
  {
    id: 'manila',
    slug: 'manila',
    name: 'Urban Deca Homes Manila',
    badge: 'Move-In Ready Promo',
    tagline: 'Affordable Waterfront City Living with On-Site Mall in Tondo',
    headline: 'Urban Deca Homes Manila – Rent-to-Own Condos in Tondo, Manila',
    metaTitle: 'Urban Deca Homes Manila | Condos in Tondo with DECA Mall',
    metaDescription: 'Explore Urban Deca Homes Manila on Vitas Street, Tondo. Move-in ready 2-bedroom condos with an on-site DECA Mall, Pag-IBIG financing, and low cash-out promos.',
    propertyType: 'Mid-Rise Condominium',
    constructionStatus: 'Ready for Occupancy (RFO)',
    priceRangeFormatted: '₱2,300,000 – ₱2,800,000',
    reservationFeePhp: 10000,
    priceMinPhp: 2300000,
    priceMaxPhp: 2800000,
    location: {
      address: 'Vitas Street, Tondo, Manila City',
      barangay: 'Brgy. 105',
      city: 'Manila City',
      province: 'Metro Manila',
      region: 'NCR',
      coordinates: { lat: 14.6225, lng: 120.9575 },
      landmarks: [
        { name: 'DECA Mall (Ground Level)', distance: '0 mins (On-Site)', type: 'Mall' },
        { name: 'Tutuban Center & Divisoria', distance: '10–15 mins', type: 'Mall' },
        { name: 'Manila Port Area / North Harbor', distance: '8 mins', type: 'CBD' },
        { name: 'LRT-1 Tayuman Station', distance: '12 mins', type: 'Transit' },
        { name: 'Tondo Medical Center', distance: '5 mins', type: 'Hospital' },
        { name: 'University of Santo Tomas (UST)', distance: '20 mins', type: 'School' },
      ],
    },
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        alt: 'Urban Deca Homes Manila building exterior facade',
        caption: 'Mid-rise residential buildings with gated perimeter and landscaped courtyards',
      },
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        alt: '2-Bedroom model unit living room layout',
        caption: 'Functional 2-bedroom living and dining area with fully tiled floors',
      },
      {
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
        alt: 'Fully finished kitchen cabinet and countertop fixtures',
        caption: 'Modular kitchen base cabinet with durable stainless steel sink and granite countertop',
      },
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        alt: 'Complete bathroom fixtures and shower area',
        caption: 'Tiled toilet and bath with ceramic finishes and provision for water heater',
      },
    ],
    overview: [
      'Urban Deca Homes Manila is a flagship masterplanned residential development in Tondo, Manila, engineered by 8990 Holdings, Inc. to provide quality urban homes to hardworking Filipino families.',
      'Unlike traditional high-rise developments with steep condominium association dues, Urban Deca Homes Manila offers medium-rise buildings equipped with elevators, expansive open courtyards, and immediate pedestrian access to DECA Mall right at the community doorstep.',
      'Units are delivered fully finished with painted walls, complete bathroom fixtures, ceramic tile flooring, and integrated smoke detection and sprinkler systems, making them truly move-in ready upon loan approval.',
    ],
    specifications: [
      { label: 'Total Land Area', value: '8.4 Hectares' },
      { label: 'Building Type', value: '13-Storey Mid-Rise with Elevators' },
      { label: 'Unit Deliverable', value: 'Fully Finished (Turnkey)' },
      { label: 'Financing Accepted', value: 'Pag-IBIG Fund, Bank Financing, In-House' },
      { label: 'Target Turnover', value: 'Ready for Occupancy (RFO)' },
    ],
    unitTypes: [
      {
        id: 'manila-2br-a',
        name: '2-Bedroom Regular (Unit A)',
        category: '2-Bedroom',
        areaSqm: 30.6,
        bedrooms: 2,
        bathrooms: 1,
        balcony: true,
        priceMinPhp: 2300000,
        priceMaxPhp: 2500000,
        estMonthlyPagIbigPhp: 12500,
        status: 'Available',
        features: ['2 Private Bedrooms', 'Living & Dining Area', 'Kitchen Countertop with Base Cabinet', 'Tiled Bathroom', 'Balcony Area', 'Window AC Provision'],
        description: 'Optimized 2-bedroom floor layout ideal for start-up families and young working couples wanting independent bedrooms and privacy.',
      },
      {
        id: 'manila-2br-b',
        name: '2-Bedroom Deluxe (Unit B)',
        category: '2-Bedroom',
        areaSqm: 32.17,
        bedrooms: 2,
        bathrooms: 1,
        balcony: true,
        priceMinPhp: 2450000,
        priceMaxPhp: 2650000,
        estMonthlyPagIbigPhp: 13800,
        status: 'Available',
        features: ['Expanded Master Bedroom', 'Second Bedroom or Home Office', 'Full Bathroom', 'Modular Kitchen Fixtures', 'Smoke Detector & Sprinkler'],
        description: 'Enhanced mid-unit layout with generous closet niches and spacious central dining zone.',
      },
      {
        id: 'manila-2br-corner',
        name: '2-Bedroom Corner Unit (Unit C)',
        category: '2-Bedroom',
        areaSqm: 35.57,
        bedrooms: 2,
        bathrooms: 1,
        balcony: true,
        priceMinPhp: 2600000,
        priceMaxPhp: 2800000,
        estMonthlyPagIbigPhp: 15200,
        status: 'Limited Availability',
        features: ['Corner Dual-Window Exposure', 'Maximum Natural Cross Ventilation', 'Generous Balcony Access', 'Separate Dining & Living Zone'],
        description: 'Premium corner unit boasting superior airflow, double window exposure, and enhanced natural daylighting throughout the home.',
      },
      {
        id: 'manila-studio',
        name: 'Studio Unit',
        category: 'Studio',
        areaSqm: 22.95,
        bedrooms: 0,
        bathrooms: 1,
        balcony: false,
        priceMinPhp: 1800000,
        priceMaxPhp: 1950000,
        estMonthlyPagIbigPhp: 9800,
        status: 'Sold Out',
        features: ['Open Studio Living Concept', 'Kitchen Area', 'Full Bathroom', 'AC Provision'],
        description: 'Previously offered compact studio cut. Currently sold out in general inventory (Check the 4PH program page for specialized government allocations).',
      },
      {
        id: 'manila-1br',
        name: '1-Bedroom Unit',
        category: '1-Bedroom',
        areaSqm: 27.42,
        bedrooms: 1,
        bathrooms: 1,
        balcony: true,
        priceMinPhp: 2100000,
        priceMaxPhp: 2250000,
        estMonthlyPagIbigPhp: 11200,
        status: 'Sold Out',
        features: ['Private Enclosed Bedroom', 'Living Area', 'Kitchen Countertop', 'Balcony'],
        description: 'Standard 1-bedroom configuration. All standard retail units currently marked sold out.',
      },
    ],
    amenities: [
      { name: 'DECA Mall Tondo', description: 'Two-level integrated shopping center featuring grocery stores, dining, and daily essentials right at your doorstep.', iconName: 'ShoppingBag' },
      { name: 'Resort Swimming Pool', description: 'Central community lap pool and kiddie wading area for weekends with the family.', iconName: 'Waves' },
      { name: 'Covered Basketball Court', description: 'Full-court covered basketball court for community leagues and weekend sports.', iconName: 'Activity' },
      { name: 'Multipurpose Clubhouse', description: 'Air-conditioned community hall for private birthday celebrations, meetings, and reunions.', iconName: 'Home' },
      { name: 'Children’s Playground', description: 'Safe outdoor playground with slides, swings, and rubberized turf padding.', iconName: 'Smile' },
      { name: '24/7 Security & CCTV', description: 'Manned entry guardhouses, perimeter walls, and continuous CCTV surveillance across all corridors.', iconName: 'ShieldCheck' },
    ],
    deliverables: [
      'Painted interior walls and concrete ceilings',
      'Ceramic tile flooring throughout living, dining, kitchen, and bedrooms',
      'Tiled toilet and bath with ceramic fixtures, flush water closet, shower head, and lavatory',
      'Kitchen base cabinet with stainless steel sink and granite/tile countertop',
      'Provision for window-type air conditioning unit in bedrooms',
      'Individual electric sub-meter and water meter provisions',
      'Automatic fire sprinkler heads and ceiling-mounted smoke detectors',
    ],
    financingSchemes: [
      'Pag-IBIG Fund Housing Loan (Up to 30-year tenure, lowest monthly payments)',
      'Bank Financing with accredited Philippine commercial banks (BDO, BPI, Security Bank)',
      'In-House Developer Financing (Minimal documentation requirement)',
      'Rent-to-Own Low Equity / Zero Equity Promotional Schemes',
    ],
    faqs: [
      { question: 'Is Urban Deca Homes Manila Ready for Occupancy (RFO)?', answer: 'Yes, multiple residential towers at Urban Deca Homes Manila are complete, fully finished, and ready for immediate move-in upon loan approval and clearance from Pag-IBIG or your financing partner.' },
      { question: 'What is the required reservation fee for a 2-bedroom unit?', answer: 'The initial reservation fee is only ₱10,000, which is deducted directly from the total selling contract price.' },
      { question: 'Can Overseas Filipino Workers (OFWs) apply?', answer: 'Absolutely. OFWs are eligible for Pag-IBIG and bank financing with a Special Power of Attorney (SPA) representative in the Philippines and valid POEA/OWWA employment contracts.' },
    ],
  },
  {
    id: 'ortigas',
    slug: 'ortigas',
    name: 'Urban Deca Homes Ortigas',
    badge: '13-Hectare Masterplan',
    tagline: 'Resort-Style Community along Ortigas Avenue Extension, Pasig City',
    headline: 'Urban Deca Homes Ortigas – Affordable Condominiums in Pasig City',
    metaTitle: 'Urban Deca Homes Ortigas | Affordable Pasig Condos with Lagoon Park',
    metaDescription: 'Discover Urban Deca Homes Ortigas along Ortigas Ave. Ext., Pasig. Featuring a 1.3-ha Lagoon Park, move-in ready 2-bedroom units, low equity, and fast Pag-IBIG loan approval.',
    propertyType: 'Mid-Rise Condominium',
    constructionStatus: 'Ready for Occupancy (RFO)',
    priceRangeFormatted: '₱2,900,000 – ₱4,200,000',
    reservationFeePhp: 10000,
    priceMinPhp: 2900000,
    priceMaxPhp: 4200000,
    location: {
      address: 'Ortigas Avenue Extension, Brgy. Rosario, Pasig City',
      barangay: 'Brgy. Rosario',
      city: 'Pasig City',
      province: 'Metro Manila',
      region: 'NCR',
      coordinates: { lat: 14.5888, lng: 121.0925 },
      landmarks: [
        { name: 'Ortigas Center CBD', distance: '15–20 mins (5.8 km)', type: 'CBD' },
        { name: 'Eastwood City Libis', distance: '10–15 mins (3.5 km)', type: 'CBD' },
        { name: 'SM City East Ortigas', distance: '5 mins (1.2 km)', type: 'Mall' },
        { name: 'Bonifacio Global City (BGC)', distance: '25–30 mins via C-5', type: 'CBD' },
        { name: 'Medical City Pasig', distance: '15 mins', type: 'Hospital' },
        { name: 'Rizal Transport Terminals', distance: '5 mins', type: 'Transit' },
      ],
    },
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        alt: 'Urban Deca Homes Ortigas 1.3-Hectare Lagoon Park and Open Space',
        caption: 'Sprawling 1.3-hectare landscaped open grounds featuring reflection ponds and tree-lined jogging paths',
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        alt: 'Urban Deca Homes Ortigas Grand Multipurpose Clubhouse',
        caption: 'Contemporary clubhouse and active community zone designed for social gatherings',
      },
      {
        url: 'https://images.unsplash.com/photo-1502005229762-ee1b2b809cb8?auto=format&fit=crop&w=800&q=80',
        alt: '2-Bedroom Model Unit at Urban Deca Homes Ortigas',
        caption: 'Turnkey finished living area designed with modern neutral color schemes and ceramic tiles',
      },
      {
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        alt: 'Functional kitchen area with modular cabinetry',
        caption: 'High-utility kitchen with granite countertops, sink, and safety provisions',
      },
    ],
    overview: [
      'Urban Deca Homes Ortigas is a massive 13-hectare residential enclave situated right along Ortigas Avenue Extension in Rosario, Pasig City. It is one of the largest self-contained affordable communities in eastern Metro Manila.',
      'Designed with 22 mid-rise buildings, each building is equipped with 4 modern high-speed elevators, ensuring fast and hassle-free transit for residents. The low building density creates breathable spaces with 1.3 hectares exclusively dedicated to parks, water features, and leisure amenities.',
      'Strategically positioned between Ortigas Center, Eastwood City, and the growing Rizal province corridor, residents enjoy quick access to major business districts, business process outsourcing (BPO) hubs, and premier hospitals like The Medical City.',
    ],
    specifications: [
      { label: 'Masterplan Scale', value: '13 Hectares (22 Mid-Rise Towers)' },
      { label: 'Green & Open Space', value: '1.3 Hectares (Lagoon Park & Courtyards)' },
      { label: 'Elevators', value: '4 High-Capacity Elevators per Building' },
      { label: 'Turnover Condition', value: 'Complete Finished Turnkey' },
      { label: 'Financing Accepted', value: 'Pag-IBIG, Bank, and In-House Loan' },
    ],
    unitTypes: [
      {
        id: 'ortigas-2br-inner',
        name: '2-Bedroom Inner Unit (Type B)',
        category: '2-Bedroom',
        areaSqm: 30.6,
        bedrooms: 2,
        bathrooms: 1,
        balcony: true,
        priceMinPhp: 2900000,
        priceMaxPhp: 3250000,
        estMonthlyPagIbigPhp: 15800,
        status: 'Available',
        features: ['Master Bedroom', 'Second Bedroom', 'Living and Dining Area', 'Kitchen Countertop', 'Private Balcony', 'Ceramic Tiled Flooring'],
        description: 'Practical 30.60 sqm 2-bedroom home providing independent bedrooms, quiet mid-corridor location, and excellent heat insulation.',
      },
      {
        id: 'ortigas-2br-corner',
        name: '2-Bedroom Corner / Deluxe (Type A/C)',
        category: '2-Bedroom',
        areaSqm: 35.57,
        bedrooms: 2,
        bathrooms: 1,
        balcony: true,
        priceMinPhp: 3400000,
        priceMaxPhp: 4200000,
        estMonthlyPagIbigPhp: 18500,
        status: 'Available',
        features: ['Dual-Aspect Windows', 'Expanded Master Suite', 'Spacious Living Room', 'Generous Kitchen Counter', 'Panoramic Balcony View'],
        description: 'Corner 35.57 sqm cut designed for young families requiring extra room for children or a dedicated remote-work station.',
      },
      {
        id: 'ortigas-3br',
        name: '3-Bedroom Executive Unit',
        category: '3-Bedroom',
        areaSqm: 42.0,
        bedrooms: 3,
        bathrooms: 2,
        balcony: true,
        priceMinPhp: 4100000,
        priceMaxPhp: 4600000,
        estMonthlyPagIbigPhp: 23500,
        status: 'Sold Out',
        features: ['3 Private Bedrooms', '2 Full Bathrooms', 'Corner Exposure', 'Large Balcony'],
        description: 'Executive 3-bedroom unit format. All units in this category are completely sold out across all phases.',
      },
    ],
    amenities: [
      { name: '1.3-Hectare Lagoon Park', description: 'Expansive scenic open park with waterscape features, lush gardens, and walking circuits.', iconName: 'TreePine' },
      { name: 'Community Deca Mall', description: 'Convenient commercial complex with groceries, cafes, laundromats, and daily service shops.', iconName: 'ShoppingBag' },
      { name: 'Grand Clubhouse', description: 'Spacious recreation center with multi-purpose halls for family celebrations and community events.', iconName: 'Home' },
      { name: 'Covered Basketball Court', description: 'Standard basketball court shielded from sun and rain for community games.', iconName: 'Activity' },
      { name: 'Children’s Playground', description: 'Outdoor play equipment set amidst soft safety turfing and shade trees.', iconName: 'Smile' },
      { name: '4 Elevators Per Tower', description: 'Ensures minimal waiting times during morning rush hours across all 22 towers.', iconName: 'ArrowUpCircle' },
    ],
    deliverables: [
      'Finished interior walls with two coats of semi-gloss acrylic paint',
      'Ceramic floor tiles in living, dining, kitchen, and bedroom spaces',
      'Complete ceramic tile wall and floor finishes in toilet and bath',
      'Granite kitchen countertop with stainless steel under-mount sink and base cabinet',
      'Fire suppression sprinkler heads and smoke alarm system connected to main panel',
      'Provision for window-type AC units with dedicated power outlets',
    ],
    financingSchemes: [
      'Pag-IBIG Fund Housing Loan (Lowest 3-year fixed interest rates up to 30 years)',
      'Bank Financing with flexible downpayment amortization terms',
      'Special Low Cash-Out Promo terms with reservation from ₱10,000',
    ],
    faqs: [
      { question: 'How close is Urban Deca Homes Ortigas to Ortigas CBD?', answer: 'The project is approximately 5.8 km from the center of Ortigas CBD (around 15 to 25 minutes depending on traffic). Public jeepneys, UV express vans, and bus routes pass directly outside the gate along Ortigas Ave. Ext.' },
      { question: 'Are pets allowed in the condominium?', answer: 'Yes, standard residential pet guidelines allow small domesticated pets subject to property management association rules.' },
      { question: 'How much is the typical downpayment?', answer: 'Under prevailing promotional campaigns, downpayment schemes can be structured with minimal initial equity or amortized over flexible monthly installments.' },
    ],
  },
  {
    id: 'cubao',
    slug: 'cubao',
    name: 'Urban Deca Towers Cubao',
    badge: 'Transit-Oriented High-Rise',
    tagline: 'High-Speed Urban Micro-Condos Directly Along EDSA, Cubao',
    headline: 'Urban Deca Towers Cubao – High-Rise Studio Condominiums in Quezon City',
    metaTitle: 'Urban Deca Towers Cubao | Affordable EDSA Quezon City Condos',
    metaDescription: 'Urban Deca Towers Cubao along EDSA, QC. Micro-condos and 1-BR units with direct access to MRT-3 & LRT-2 transit, 12 elevators, commercial floors, and low monthly amortization.',
    propertyType: 'High-Rise Tower',
    constructionStatus: 'Ready for Occupancy (RFO)',
    priceRangeFormatted: '₱1,900,000 – ₱4,400,000',
    reservationFeePhp: 10000,
    priceMinPhp: 1900000,
    priceMaxPhp: 4400000,
    location: {
      address: 'EDSA corner Ignacio Diaz St., Cubao, Quezon City',
      barangay: 'Brgy. San Martin de Porres',
      city: 'Quezon City',
      province: 'Metro Manila',
      region: 'NCR',
      coordinates: { lat: 14.6185, lng: 121.0535 },
      landmarks: [
        { name: 'MRT-3 Cubao Station', distance: '3 mins walk (Direct Footbridge)', type: 'Transit' },
        { name: 'LRT-2 Cubao Station', distance: '6 mins walk', type: 'Transit' },
        { name: 'Araneta City / Gateway Mall', distance: '5 mins walk', type: 'Mall' },
        { name: 'Farmers Market & Plaza', distance: '4 mins walk', type: 'Mall' },
        { name: 'EDSA Bus Carousel Terminal', distance: '3 mins walk', type: 'Transit' },
        { name: 'Smart Araneta Coliseum', distance: '6 mins walk', type: 'CBD' },
      ],
    },
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        alt: 'Urban Deca Towers Cubao Micro Studio Unit Concept',
        caption: 'High-efficiency micro-studio designed with built-in bed platform, study desk, and storage',
      },
      {
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
        alt: 'Commercial retail ground floor at Urban Deca Towers Cubao',
        caption: 'Convenience stores, laundry shops, and quick dining choices located right on the ground floor',
      },
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        alt: 'Modern bathroom fixtures in Studio Unit',
        caption: 'Ergonomic toilet, ceramic sink, overhead shower fixtures, and exhaust ventilation',
      },
    ],
    overview: [
      'Urban Deca Towers Cubao represents a modern micro-living revolution located right on the pulse of EDSA in Quezon City. Tailored specifically for young professionals, BPO specialists, and daily commuters who spend hours in traffic, this high-rise tower brings you minutes away from work and entertainment.',
      'With direct pedestrian connectivity to both MRT-3 and LRT-2 transit lines at Araneta City, residents can effortlessly travel across North EDSA, Makati CBD, Ortigas, and Manila without touching a car steering wheel.',
      'The tower is fortified with 12 high-capacity elevators to ensure rapid movement across floors, 100% emergency backup power generator for common areas, and two commercial floors featuring 24/7 convenience stores, quick dining, and laundromats.',
    ],
    specifications: [
      { label: 'Tower Structure', value: '45-Storey High-Rise Landmark' },
      { label: 'Elevators', value: '12 High-Speed Elevators' },
      { label: 'Backup Power', value: '100% Emergency Backup Generator' },
      { label: 'Retail Levels', value: 'Ground & 2nd Floor Commercial Strip' },
      { label: 'Turnover Condition', value: 'Fully Finished with Fixtures' },
    ],
    unitTypes: [
      {
        id: 'cubao-studio',
        name: 'Micro-Studio Unit',
        category: 'Studio',
        areaSqm: 12.12,
        bedrooms: 0,
        bathrooms: 1,
        balcony: false,
        priceMinPhp: 1900000,
        priceMaxPhp: 2200000,
        estMonthlyPagIbigPhp: 12800,
        status: 'Available',
        features: ['Smart Modular Space Concept', 'Kitchen Sink with Base Cabinet', 'Complete Toilet and Bath', 'Window AC Ready', 'Smoke Detector & Sprinkler'],
        description: 'Compact 12.12–13.0 sqm city base engineered for solo professionals who want an affordable home close to office and transit instead of renting an expensive dorm.',
      },
      {
        id: 'cubao-1br',
        name: '1-Bedroom Executive Unit',
        category: '1-Bedroom',
        areaSqm: 26.12,
        bedrooms: 1,
        bathrooms: 1,
        balcony: false,
        priceMinPhp: 4100000,
        priceMaxPhp: 4400000,
        estMonthlyPagIbigPhp: 21500,
        status: 'Available',
        features: ['Enclosed Master Bedroom', 'Dedicated Living Area', 'Dining Kitchenette', 'Tiled Bathroom with Exhaust', 'Panoramic City Skyline Views'],
        description: 'Spacious 26.12 sqm 1-bedroom configuration combining two studio cuts into an expansive urban condo overlooking the Quezon City skyline.',
      },
    ],
    amenities: [
      { name: '12 High-Speed Elevators', description: 'Twelve commercial-grade elevators drastically reduce transit wait times throughout peak commuting hours.', iconName: 'ArrowUpCircle' },
      { name: 'Commercial & Retail Floors', description: 'Convenience stores, laundry hubs, coffee shops, and daily necessities on the lower levels.', iconName: 'ShoppingBag' },
      { name: 'Direct Transit Access', description: 'Walking distance to MRT-3, LRT-2, and EDSA Carousel bus platforms.', iconName: 'MapPin' },
      { name: '100% Generator Backup', description: 'Reliable backup power keeps elevators, water pumps, common areas, and security systems functioning 24/7.', iconName: 'Zap' },
      { name: '24/7 Monitored Security', description: 'Trained security staff, biometric access points, and continuous CCTV recording in hallways.', iconName: 'ShieldCheck' },
      { name: 'Lobby Lounge & Concierge', description: 'Modern double-height ground reception lobby welcoming residents and package deliveries.', iconName: 'Home' },
    ],
    deliverables: [
      'Painted drywall and concrete ceilings with modern neutral tones',
      'Ceramic floor tiling with anti-skid bathroom surfaces',
      'Toilet and bath complete with ceramic fixtures, lavatory, and shower set',
      'Kitchenette base cabinet with stainless sink and single faucet',
      'Provision for window-type air conditioning unit',
      'Electronic fire alarm and suppression systems',
    ],
    financingSchemes: [
      'Pag-IBIG Housing Loan (Subject to loan approval and qualification)',
      'Bank Financing with accredited Philippine banks',
      'Special Rent-to-Own and low cash-out reservation options',
    ],
    faqs: [
      { question: 'Is Urban Deca Towers Cubao suitable for rental investment or Airbnb?', answer: 'Yes! Due to its proximity to Araneta Coliseum, Gateway Mall, and MRT/LRT transit hubs, many unit owners enjoy strong demand from short-term travelers, concertgoers, and BPO call center workers.' },
      { question: 'Are there parking slots available?', answer: 'Yes, multi-level basement parking slots are available for separate purchase or monthly lease subject to availability.' },
      { question: 'What is the required monthly income to qualify for the studio unit?', answer: 'For Pag-IBIG financing on a ~₱1.9M studio unit, a gross combined monthly household income of approximately ₱35,000–₱40,000 is typically recommended.' },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
