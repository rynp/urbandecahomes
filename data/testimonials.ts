export interface Testimonial {
  id: string;
  name: string;
  role: string;
  project: string;
  unitType: string;
  avatar: string;
  initials: string;
  quote: string;
  rating: number;
  yearMovedIn: string;
  category: 'Manila' | 'Ortigas' | 'Cubao' | 'OFW';
  highlight: string;
  bgImage?: string;
}

export const homeownerTestimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Marissa Ramos',
    role: 'Unit Owners & Family',
    project: 'Urban Deca Homes Manila',
    unitType: '2-Bedroom Unit',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    initials: 'ER',
    quote:
      'Dati nangungupahan lang kami sa Sampaloc na walang sariling paradahan at laging nag-aalala sa baha. Sa Urban Deca Homes Manila, nakakuha kami ng 2-bedroom unit sa Pag-IBIG na kasing presyo lang halos ng inuupahan namin noon. May mall pa sa baba!',
    rating: 5,
    yearMovedIn: '2023',
    category: 'Manila',
    highlight: 'Saved ₱14,000/mo vs Renting',
    bgImage: '/images/testimonials/testimonial-1.jpg',
  },
  {
    id: 't-2',
    name: 'Jalke & Camille Santos',
    role: 'BPO Team Leader',
    project: 'Urban Deca Homes Ortigas',
    unitType: '2-Bedroom Unit',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    initials: 'CS',
    quote:
      'Working in Ortigas CBD, I used to endure 2 to 3 hours of traffic everyday from Taytay. Having my own unit at Urban Deca Homes Ortigas along Ortigas Ave. Ext. gives me my weekends back. The 1.3-hectare park is peaceful and relaxing.',
    rating: 5,
    yearMovedIn: '2024',
    category: 'Ortigas',
    highlight: 'Reduced Daily Commute by 2 Hours',
    bgImage: '/images/testimonials/testimonial-2.jpg',
  },
  {
    id: 't-3',
    name: 'Rolando Dela Cruz',
    role: 'OFW Civil Engineer (Dubai)',
    project: 'Urban Deca Towers Cubao',
    unitType: 'Studio Suite',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    initials: 'RC',
    quote:
      'As an OFW in Dubai, I wanted an investment along EDSA with guaranteed rental demand. Urban Deca Towers Cubao was affordable and the documentation through SPA was straightforward with the sales team.',
    rating: 5,
    yearMovedIn: '2022',
    category: 'OFW',
    highlight: '100% Tenancy Rate Since Handover',
    bgImage: '/images/testimonials/testimonial-3.jpg',
  },
  {
    id: 't-4',
    name: 'Patricia Reyes',
    role: 'Hospital Staff Nurse & Medical Tech',
    project: 'Urban Deca Homes Manila',
    unitType: '2-Bedroom Unit',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80',
    initials: 'PR',
    quote:
      'As hospital frontliners in Manila, having an affordable home only 10 minutes away from our shift without commuting stress is life-changing. Pag-IBIG loan process was approved in just 3 weeks with the help of Deca’s documentation team.',
    rating: 5,
    yearMovedIn: '2024',
    category: 'Manila',
    highlight: 'Fast-Track Pag-IBIG 3-Week Approval',
    bgImage: '/images/testimonials/testimonial-4.jpg',
  },
  {
    id: 't-5',
    name: 'Engr. Joshua Mendoza',
    role: 'Senior Software Engineer (Remote)',
    project: 'Urban Deca Homes Ortigas',
    unitType: 'Corner 2-Bedroom',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    initials: 'JM',
    quote:
      'High-speed fiber connectivity, peaceful community atmosphere, and having the DECA Mall right downstairs makes working from home seamless. My monthly Pag-IBIG amortization is lower than renting a studio in BGC!',
    rating: 5,
    yearMovedIn: '2023',
    category: 'Ortigas',
    highlight: 'Work-from-Home Lifestyle & DECA Mall',
    bgImage: '/images/testimonials/testimonial-5.jpg',
  },
  {
    id: 't-6',
    name: 'Mark & Cristina Flores',
    role: 'Government Administrative Officer',
    project: 'Urban Deca Towers Cubao',
    unitType: 'Transit Studio Suite',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    initials: 'MF',
    quote:
      'Commuting along MRT-3 Cubao was my daily struggle. Now my unit is literally steps from EDSA and the station. The ₱10,000 reservation fee made it so easy to get started without depleting my GSIS savings.',
    rating: 5,
    yearMovedIn: '2024',
    category: 'Cubao',
    highlight: '₱10,000 Reservation Easy Entry',
    bgImage: '/images/testimonials/testimonial-6.jpg',
  },
  {
    id: 't-7',
    name: 'Alvin Soriano',
    role: 'E-Commerce Business Owners',
    project: 'Urban Deca Homes Manila',
    unitType: '2-Bedroom Corner Unit',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
    initials: 'AS',
    quote:
      'We were worried our non-traditional business income would get rejected by banks. But the Pag-IBIG accredited team walked us through every requirement. Now we have our own 2-bedroom home and inventory warehouse nearby in Tondo.',
    rating: 5,
    yearMovedIn: '2023',
    category: 'Manila',
    highlight: 'Self-Employed Loan Assistance',
    bgImage: '/images/testimonials/testimonial-7.jpg',
  },
  {
    id: 't-8',
    name: 'Capt. Danilo Hernandez',
    role: 'Merchant Marine Officer / Seafarer',
    project: 'Urban Deca Homes Ortigas',
    unitType: '3-Bedroom Combined Unit',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80',
    initials: 'DH',
    quote:
      'While on board vessels overseas, I needed a dependable investment in Metro Manila that my family can safely reside in. The 24/7 security, clubhouse amenities, and secure gated community give me complete peace of mind.',
    rating: 5,
    yearMovedIn: '2023',
    category: 'OFW',
    highlight: 'Gated 24/7 Family Security',
    bgImage: '/images/testimonials/testimonial-8.jpg',
  },
  {
    id: 't-9',
    name: 'Kenneth & Sarah Del Rosario',
    role: 'IT Project Manager & Finance Analyst',
    project: 'Urban Deca Homes Manila',
    unitType: '2-Bedroom Unit',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    initials: 'KD',
    quote:
      'Finding a fully finished home with accessible Pag-IBIG monthly amortization in Tondo made our move seamless. Having the DECA Mall right beside us gives our family effortless convenience every day.',
    rating: 5,
    yearMovedIn: '2024',
    category: 'Manila',
    highlight: 'Seamless Family Turnover',
    bgImage: '/images/testimonials/testimonial-9.jpg',
  },
  {
    id: 't-10',
    name: 'Ramon Bautista',
    role: 'Senior Operations Lead',
    project: 'Urban Deca Towers Cubao',
    unitType: 'Transit Studio Suite',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    initials: 'RB',
    quote:
      'Being steps away from MRT-3 Cubao cuts my daily commuting stress down to zero. The ₱10,000 reservation fee and fast loan processing made owning my first city home truly reachable.',
    rating: 5,
    yearMovedIn: '2024',
    category: 'Cubao',
    highlight: 'Prime Transit Convenience along EDSA',
    bgImage: '/images/testimonials/testimonial-10.jpg',
  },
];
