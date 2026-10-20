export interface NewsArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: 'Promotion' | 'Developer News' | 'Project Milestone' | 'Government Program';
  publishedDate: string;
  formattedDate: string;
  author: string;
  readingTime: string;
  image: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    slug: 'low-cash-out-promo-metro-manila-condos',
    title: 'Low Cash-Out Move-In Promo Announced for Metro Manila Condominium Units',
    metaTitle: 'Low Cash-Out Move-In Promo | Urban Deca Homes Metro Manila',
    metaDescription: 'Take advantage of the new low cash-out move-in promo across Urban Deca Homes Manila, Ortigas, and Cubao with reservation fees starting at ₱10,000.',
    category: 'Promotion',
    publishedDate: '2026-09-15',
    formattedDate: 'September 15, 2026',
    author: 'Urban Deca Homes Sales Editorial',
    readingTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    excerpt: '8990 Holdings, Inc. introduces limited-time low initial equity terms for Ready-for-Occupancy 2-bedroom and studio condominium units in Manila, Pasig, and Quezon City.',
    content: [
      'In a bid to make homeownership even more attainable for everyday working Filipinos, 8990 Holdings has rolled out a comprehensive Low Cash-Out Move-In campaign across its flagship Metro Manila condominium communities.',
      'Under this limited promo, qualified prospective buyers can reserve their desired unit cut for as low as ₱10,000, with remaining downpayment portions structured across flexible terms while awaiting Pag-IBIG or bank loan processing.',
      'The promo applies specifically to available 2-bedroom units at Urban Deca Homes Manila (Tondo), 2-bedroom inner and corner units at Urban Deca Homes Ortigas (Pasig), and compact studio units at Urban Deca Towers Cubao (EDSA, Quezon City).',
      'Buyers are encouraged to schedule a site viewing early to select preferred floor levels and views, as promotional unit inventories are allocated on a first-come, first-served basis upon completed reservation.',
    ],
    tags: ['Promo', 'Low Cash-Out', 'Pag-IBIG Loan', 'Manila Condo', 'Ortigas', 'Cubao'],
  },
  {
    slug: '8990-holdings-pagibig-top-developer-award',
    title: '8990 Holdings Recognized as Leading Pag-IBIG Fund Developer Partner',
    metaTitle: '8990 Holdings Wins Top Developer Partner from Pag-IBIG Fund',
    metaDescription: 'Pag-IBIG Fund honors 8990 Holdings, Inc. for outstanding performance in providing accessible mass housing and condominium loans across the Philippines.',
    category: 'Developer News',
    publishedDate: '2026-08-20',
    formattedDate: 'August 20, 2026',
    author: 'Corporate Communications',
    readingTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    excerpt: 'The Home Development Mutual Fund (Pag-IBIG Fund) awards 8990 Housing Development Corporation for releasing the highest volume of affordable housing loans in NCR.',
    content: [
      'The Home Development Mutual Fund (Pag-IBIG Fund) has once again conferred premier developer recognition upon 8990 Holdings, Inc. during the annual Stakeholders’ Accomplishment Report ceremony.',
      '8990 Holdings was cited for its pivotal role in facilitating billions of pesos in completed residential housing loans, empowering tens of thousands of minimum-wage earners, private employees, and OFWs to own secure, titled condominium homes.',
      'Through its Urban Deca Homes brand, the company has consistently maintained an on-site Pag-IBIG document facilitation service that shortens loan processing lead times and removes cumbersome bureaucratic hurdles for home buyers.',
      'Management reaffirmed its corporate commitment to collaborating with national government shelters, the Department of Human Settlements and Urban Development (DHSUD), and financing partners to expand urban housing developments across the country.',
    ],
    tags: ['Developer News', 'Pag-IBIG Award', '8990 Holdings', 'Housing Accreditations'],
  },
  {
    slug: 'ortigas-lagoon-park-and-clubhouse-completion',
    title: 'Urban Deca Homes Ortigas Unveils Completed 1.3-Hectare Lagoon Park & Amenities',
    metaTitle: 'Urban Deca Homes Ortigas Opens 1.3-Hectare Lagoon Park',
    metaDescription: 'Residents at Urban Deca Homes Ortigas celebrate the formal opening of the sprawling 1.3-hectare central Lagoon Park, outdoor jogging trails, and community clubhouse.',
    category: 'Project Milestone',
    publishedDate: '2026-07-10',
    formattedDate: 'July 10, 2026',
    author: 'Project Engineering & Estate Management',
    readingTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    excerpt: 'The massive 13-hectare community along Ortigas Avenue Extension now features landscaped water elements, recreational grounds, and active lifestyle hubs.',
    content: [
      'Residents and unit owners at Urban Deca Homes Ortigas in Pasig City welcomed a major milestone with the full completion and inauguration of the central 1.3-hectare Lagoon Park amenity zone.',
      'Designed to provide an oasis of green calm amidst the vibrant urban energy of Pasig and Ortigas, the amenity park includes reflective lagoon water features, illuminated perimeter walking paths, tree-shaded benches, and an active children’s play area.',
      'The accompanying two-storey multi-purpose clubhouse was also officially opened, offering resident families an air-conditioned venue for milestone birthdays, community meetings, and private social events.',
      'With 4 elevators servicing each tower and immediate access to the on-site DECA Mall, Urban Deca Homes Ortigas continues to set the benchmark for high-value masterplanned condominium communities in eastern Metro Manila.',
    ],
    tags: ['Ortigas', 'Lagoon Park', 'Amenities', 'Pasig City', 'Clubhouse'],
  },
  {
    slug: '4ph-pambansang-pabahay-manila-program-updates',
    title: '4PH Housing Program Expands Access for Minimum-Wage Earners at Urban Deca Manila',
    metaTitle: '4PH Program Updates | Subsidized Condos at Urban Deca Manila',
    metaDescription: 'Learn about government interest subsidies and documentation guidelines under the Pambansang Pabahay para sa Pilipino (4PH) program at Urban Deca Homes Manila.',
    category: 'Government Program',
    publishedDate: '2026-06-05',
    formattedDate: 'June 5, 2026',
    author: 'Government Housing Liaison Team',
    readingTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Detailed overview of the Pambansang Pabahay para sa Pilipino (4PH) initiative and how eligible Filipino workers can access subsidized home loan rates.',
    content: [
      'The flagship Pambansang Pabahay para sa Pilipino (4PH) program of the Philippine national government continues to make significant strides in addressing the urban housing gap through key private sector partnerships with developers like 8990 Holdings.',
      'Under the 4PH framework implemented alongside Pag-IBIG Fund, qualified minimum-wage workers and low-income families can qualify for subsidized interest rates as low as 3% per annum for the first five years of their loan, dramatically lowering the monthly cash-out barrier.',
      'Selected building wings at Urban Deca Homes Manila along Vitas Street in Tondo have been allocated under the 4PH program, featuring 22.95 sqm studio and 2-bedroom configurations.',
      'Applicants must present proof of active Pag-IBIG membership, basic government identification, and employer-certified income documentation to begin pre-qualification with accredited housing officers.',
    ],
    tags: ['4PH', 'Government Housing', 'Manila', 'Pag-IBIG Subsidy', 'Affordable Living'],
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
