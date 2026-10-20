export interface CompanyMilestone {
  year: string;
  title: string;
  description: string;
  category: 'Expansion' | 'Innovation' | 'Finance' | 'Milestone';
  stats?: string;
  badge?: string;
}

export interface GroupCompany {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  logo: string;
  badge: string;
  description: string;
  highlights: string[];
  projects: string[];
  website?: string;
}

export const companyOverview = {
  name: '8990 Holdings, Inc.',
  subsidiary: 'Urban Deca Homes',
  foundingYear: 2002,
  tickerSymbol: 'PSE: HOUSE',
  motto: 'Price, Quality, Service.',
  missionStatement: 'Housing the Filipino People',
  vision:
    'To be the leading mass housing developer in the Philippines, empowering everyday Filipino families and overseas workers with accessible, structurally sound, and dignified homeownership.',
  coreStats: [
    { value: '100,000+', label: 'Homes Delivered', sublabel: 'Across Luzon, Visayas & Mindanao' },
    { value: '24+ Years', label: 'Development Legacy', sublabel: 'Pioneering Affordable Housing' },
    { value: 'PSE: HOUSE', label: 'Publicly Listed', sublabel: 'Philippine Stock Exchange' },
    { value: '8 Days', label: 'Precast Construction', sublabel: 'Fast-Track Industrial Building' },
  ],
  pillars: [
    {
      title: 'Structural Durability',
      description:
        'Industrialized pre-cast concrete technology designed by veteran structural engineers to withstand typhoons and seismic forces.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Accessible Financing',
      description:
        'Accredited Top Developer with Pag-IBIG Fund (up to 30 years) and proprietary CTS Gold in-house mortgage solutions.',
      icon: 'Percent',
    },
    {
      title: 'Strategic Urban Locations',
      description:
        'Properties built within commuting distance to business hubs, major transport terminals, schools, and commercial centers.',
      icon: 'MapPin',
    },
    {
      title: 'Complete Integrated Living',
      description:
        'Communities equipped with multi-purpose clubhouses, swimming pools, 24/7 guarded gates, parks, and on-site commercial spaces.',
      icon: 'Building2',
    },
  ],
};

export const companyTimeline: CompanyMilestone[] = [
  {
    year: '2002',
    title: 'The First Deca Homes Project',
    description:
      '8990 Housing Development Corporation launches its inaugural Deca Homes community in Cabantian, Davao City, followed by expansion in Minglanilla, Cebu, committed to alleviating the national housing deficit.',
    category: 'Milestone',
    badge: 'Inaugural Launch',
    stats: 'Davao & Cebu',
  },
  {
    year: '2004',
    title: 'Pioneering Pre-Cast Concrete Technology',
    description:
      'Adopted advanced industrialized precast wall construction under veteran engineering supervision, reducing construction time to an industry-record 8 days per unit without compromising durability.',
    category: 'Innovation',
    badge: 'Proprietary Tech',
    stats: '8-Day Build Speed',
  },
  {
    year: '2006',
    title: 'Expansion into North Luzon',
    description:
      'Extended development footprint into Central and Northern Luzon with Deca Clark Resort Residences and residential projects across Pampanga.',
    category: 'Expansion',
    badge: 'Regional Growth',
    stats: 'Pampanga & Clark',
  },
  {
    year: '2007',
    title: 'Attainment of PHP 1 Billion Gross Sales',
    description:
      'Reached a landmark PHP 1 Billion in gross revenues, proving the sustainability and massive market demand for accessible Filipino mass housing.',
    category: 'Finance',
    badge: 'Revenue Milestone',
    stats: 'PHP 1.0 Billion',
  },
  {
    year: '2008 - 2009',
    title: 'Expansion into South Luzon & Western Visayas',
    description:
      'Accelerated national presence with entries into Cavite (Bella Vista) in South Luzon, and Santa Barbara and Pavia in Iloilo (Western Visayas).',
    category: 'Expansion',
    badge: 'National Footprint',
    stats: 'Cavite & Iloilo',
  },
  {
    year: '2010 - 2011',
    title: 'PHP 3 Billion Sales & CTS Gold Program',
    description:
      'Gross sales surged past PHP 3 Billion. Launched CTS Gold, a groundbreaking in-house financing program patterned after Pag-IBIG with terms up to 25 years.',
    category: 'Finance',
    badge: 'Financing Breakthrough',
    stats: 'CTS Gold Launched',
  },
  {
    year: '2012',
    title: 'Launch of Urban Deca Homes & High-Rise Towers',
    description:
      'Launched the Urban Deca Homes mid-rise condominium brand and Urban Deca Towers high-rise developments for Metro Manila commuters. Annual sales topped PHP 6 Billion.',
    category: 'Innovation',
    badge: 'Metro Manila Entry',
    stats: 'PHP 6.0 Billion',
  },
  {
    year: '2013 - 2014',
    title: 'Philippine Stock Exchange Listing (PSE: HOUSE)',
    description:
      '8990 Holdings, Inc. made its historic debut on the Philippine Stock Exchange under the ticker HOUSE, followed by a landmark follow-on public offering (IPO) in May 2014.',
    category: 'Finance',
    badge: 'PSE: HOUSE Listing',
    stats: 'Public Conglomerate',
  },
  {
    year: '2015',
    title: 'Billion-Peso Profitability & Bond Offerings',
    description:
      'First half net profits reached PHP 2.13 Billion (+18% YoY), outperforming corporate targets. Successfully issued PHP 5 Billion in retail corporate bonds to finance nationwide mega-townships.',
    category: 'Finance',
    badge: 'Capital Strength',
    stats: 'PHP 5B Bond Issue',
  },
  {
    year: '2020 - 2026+',
    title: 'Mega Master-Planned Communities & 4PH Partnership',
    description:
      'Delivery of iconic urban communities: Urban Deca Homes Manila (Tondo, 13 towers), Urban Deca Homes Ortigas (Pasig, 22 towers on 13 hectares), and Urban Deca Towers Cubao (45 storeys), in full alignment with the DHSUD 4PH National Housing Initiative.',
    category: 'Milestone',
    badge: 'Nation Building',
    stats: '100,000+ Families Housed',
  },
];

export const groupOfCompanies: GroupCompany[] = [
  {
    id: '8990-holdings',
    name: '8990 Holdings, Inc.',
    subtitle: 'The Publicly Listed Parent Conglomerate',
    category: 'Parent Company (PSE: HOUSE)',
    logo: '/images/companies/8990-holdings.png',
    badge: 'Publicly Listed (HOUSE)',
    description:
      'The parent investment holding company providing executive governance, balance sheet strength, and strategic direction across all real estate development subsidiaries in the Philippines.',
    highlights: [
      'Publicly traded on the Philippine Stock Exchange under ticker PSE: HOUSE',
      'Over two decades of audited financial transparency and corporate governance',
      'Consistent institutional credit ratings and multi-billion corporate bond track record',
      'Over 100,000 mass-housing and condominium units developed nationwide',
    ],
    projects: ['Corporate Governance', 'Capital Markets & Treasury', 'National Landbanking'],
    website: 'https://8990holdings.com',
  },
  {
    id: 'urban-deca-homes',
    name: 'Urban Deca Homes',
    subtitle: 'Master-Planned Mid-Rise Communities',
    category: 'Condominium Communities',
    logo: '/images/companies/urban-deca-homes.png',
    badge: 'Mid-Rise Masterplans',
    description:
      'The flagship brand for accessible, move-in ready condominium communities located across Metro Manila and high-growth provincial corridors. Designed for everyday Filipino families, starting professionals, and OFWs.',
    highlights: [
      'Self-contained masterplans with commercial malls, community centers, and swimming pools',
      'Move-in ready (RFO) studio, 1-bedroom, and 2-bedroom unit layouts',
      'Accredited with Pag-IBIG Fund 30-year financing and low equity downpayments',
      'Engineered with rapid industrial pre-cast concrete technology',
    ],
    projects: [
      'Urban Deca Homes Manila (Tondo - 13 Towers)',
      'Urban Deca Homes Ortigas (Pasig - 22 Towers / 13 Hectares)',
      'Urban Deca Homes Commonwealth (Quezon City)',
      'Deca Homes Pampanga & Cavite',
    ],
  },
  {
    id: 'urban-deca-towers',
    name: 'Urban Deca Towers',
    subtitle: 'Transit-Oriented Urban High-Rises',
    category: 'High-Density Metro Living',
    logo: '/images/companies/urban-deca-towers.png',
    badge: 'Transit-Oriented High-Rise',
    description:
      'High-density, smart micro-living residential skyscrapers engineered right along major mass transit arteries (EDSA and MRT lines). Tailored for commuters, BPO professionals, and urban investors seeking prime rental yields.',
    highlights: [
      'Direct walking proximity to MRT-3 stations (Cubao, Shaw, Boni) and bus terminals',
      'Fully furnished, space-optimized studio units designed for hassle-free move-in',
      'Commercial retail concourses, laundry facilities, and food hubs on ground levels',
      '24/7 biometric security and professional condominium property management',
    ],
    projects: [
      'Urban Deca Towers Cubao (Quezon City - 45 Storeys)',
      'Urban Deca Towers EDSA (Mandaluyong City)',
    ],
  },
  {
    id: 'monterrazas-de-cebu',
    name: 'Monterrazas de Cebu',
    subtitle: 'Premier Mountain Resort Township',
    category: 'Luxury Resort Residences',
    logo: '/images/companies/monterrazas-de-cebu.png',
    badge: 'Luxury Township',
    description:
      'A sprawling 300-hectare premier mountain resort township in Guadalupe, Cebu City. Perched 350 meters above sea level with unhindered panoramic views of Cebu City, Mactan Island, and the Bohol Strait.',
    highlights: [
      'The premier high-end residential address in Central Visayas with luxury cascading villas',
      'World-class terraced architecture inspired by the Banaue Rice Terraces (The Rise at Monterrazas)',
      'Environmentally sustainable engineering with rainwater catchment and solar power integration',
      'Exclusive clubhouse, resort infinity pools, helipads, and private hillside estates',
    ],
    projects: [
      'The Rise at Monterrazas',
      'Monterrazas Prime Luxury Hillside Villas',
      'The Peaks & The Hills Estates',
    ],
  },
];
