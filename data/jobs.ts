export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  department: string;
  employmentType: 'Full-time' | 'Commission-Based' | 'Hybrid';
  location: string;
  salaryOrCommission: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  closingDate: string;
}

export const jobPostings: JobPosting[] = [
  {
    id: 'property-specialist',
    slug: 'property-specialist',
    title: 'Real Estate Property Specialist (Sales Executive)',
    metaTitle: 'Property Specialist Careers | Urban Deca Homes Sales Recruitment',
    metaDescription: 'Join the top-performing sales team at Urban Deca Homes. Enjoy generous commission structures, allowances, and comprehensive real estate sales training.',
    department: 'Residential Sales & Marketing',
    employmentType: 'Full-time',
    location: 'Metro Manila (Manila / Ortigas / Cubao)',
    salaryOrCommission: 'Monthly Allowance + Uncapped Commissions (₱50,000–₱150,000+ Potential)',
    overview: 'We are seeking motivated, customer-centric Property Specialists to present, market, and sell Ready-for-Occupancy and Pre-Selling condominium units across Metro Manila.',
    responsibilities: [
      'Conduct scheduled site viewings and presentations for prospective homebuyers at model units',
      'Assist buyers in understanding Pag-IBIG Fund, bank, and in-house financing schemes',
      'Facilitate reservation document completion and buyer document collection',
      'Participate in project mall open houses, corporate roadshows, and digital sales campaigns',
      'Maintain diligent client follow-ups and CRM lead status updates',
    ],
    qualifications: [
      'College graduate or completed at least 2 years of college education (72 units required for PRC real estate accreditation)',
      'Excellent verbal and written communication skills in Tagalog and English',
      'Goal-oriented, self-motivated, and comfortable interacting with first-time homebuyers and OFWs',
      'Fresh graduates with passion for sales and real estate are warmly encouraged to apply',
      'Experience in digital lead generation or real estate sales is an advantage',
    ],
    benefits: [
      'Competitive monthly cash allowance upon meeting initial KPIs',
      'Attractive and fast commission payout schedules on completed reservations',
      'Free comprehensive PRC Accreditation assistance and CPD training',
      'Annual performance travel incentives and developer sales awards',
    ],
    closingDate: '2026-12-31',
  },
  {
    id: 'senior-sales-manager',
    slug: 'senior-sales-manager',
    title: 'Senior Unit Sales Manager (Team Leader)',
    metaTitle: 'Senior Sales Manager Opening | Urban Deca Homes Careers',
    metaDescription: 'Lead a dynamic team of real estate property specialists at Urban Deca Homes. High override commissions, leadership training, and sales incentives.',
    department: 'Sales Leadership',
    employmentType: 'Full-time',
    location: 'Ortigas / Pasig Office',
    salaryOrCommission: 'Base Management Allowance + Team Override Commissions',
    overview: 'Lead, mentor, and expand a dedicated team of 5–10 Property Specialists delivering top sales volume for Urban Deca Homes Ortigas and Manila.',
    responsibilities: [
      'Recruit, train, and guide new real estate sales agents in prospecting and closing',
      'Formulate team sales strategies, open-house schedules, and booth activations',
      'Review client credit qualification and support complex buyer transactions',
      'Monitor weekly team quotas and report pipeline forecasts to Sales Directors',
    ],
    qualifications: [
      'Minimum 2 years of proven supervisory or managerial experience in Philippine real estate sales',
      'Licensed Real Estate Broker (PRC) or accredited Real Estate Salesperson with strong track record',
      'Demonstrated leadership skills with existing network of active sales agents',
      'Strategic understanding of Pag-IBIG and Philippine mortgage documentation',
    ],
    benefits: [
      'Generous overriding commissions on all team production',
      'Quarterly performance bonuses and luxury travel incentives',
      'Dedicated sales booth support and company marketing collateral',
    ],
    closingDate: '2026-12-31',
  },
  {
    id: 'digital-marketing-specialist',
    slug: 'digital-marketing-specialist',
    title: 'Digital Marketing & Lead Generation Associate',
    metaTitle: 'Digital Marketing Careers | Urban Deca Homes Sales Support',
    metaDescription: 'Manage online real estate ad campaigns, social media channels, and digital lead funnels for Urban Deca Homes Metro Manila.',
    department: 'Digital Marketing',
    employmentType: 'Full-time',
    location: 'Tondo, Manila Office (Hybrid)',
    salaryOrCommission: 'Competitive Base Salary + Performance Bonus',
    overview: 'Drive high-converting digital advertising and organic content campaigns across Facebook, TikTok, Google Search, and YouTube for Metro Manila condominium projects.',
    responsibilities: [
      'Create and optimize Meta Ads and Google Search ad campaigns targeting OFW and local homebuyer demographics',
      'Produce short-form property walk-through videos and photo content for social media channels',
      'Monitor landing page conversion metrics and lead delivery into CRM funnels',
      'Collaborate with property specialists to ensure rapid response times to online inquiries',
    ],
    qualifications: [
      'Degree in Marketing, Communications, Information Technology, or related discipline',
      'Minimum 1 year hands-on experience managing paid digital ad campaigns (Meta Ads Manager)',
      'Familiarity with real estate buyer search habits in the Philippines is an asset',
      'Proficiency in Canva, Adobe Photoshop, or video editing software (CapCut/Premiere)',
    ],
    benefits: [
      'Competitive monthly salary with health coverage (HMO)',
      'Hybrid work flexibility',
      'Performance-based lead conversion bonuses',
    ],
    closingDate: '2026-12-31',
  },
];
