export interface UnitType {
  id: number | string;
  name: string;
  category: 'Studio' | '1-Bedroom' | '2-Bedroom' | '3-Bedroom';
  areaSqm: number;
  bedrooms: number;
  bathrooms: number;
  balcony: boolean;
  priceMinPhp: number;
  pricePhp?: number;
  priceMaxPhp?: number;
  reservationFeePhp?: number;
  discountPhp?: number;
  loanableBalancePhp?: number;
  pagibigInterestRate?: number;
  buildingName?: string;
  zone?: string;
  zoneLabel?: string;
  zoneType?: string;
  unitLayout?: string;
  floorPlan?: string;
  video?: string;
  gallery1?: string;
  gallery2?: string;
  gallery3?: string;
  gallery4?: string;
  gallery5?: string;
  estMonthlyPagIbigPhp?: number;
  status: 'Available' | 'Limited Availability' | 'Sold Out';
  features: string[];
  description: string;
}

export interface Amenity {
  name: string;
  description: string;
  iconName: string;
}

export interface Landmark {
  name: string;
  distance: string;
  type: 'Transit' | 'Mall' | 'School' | 'Hospital' | 'CBD';
  lat?: number;
  lng?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ProjectLocation {
  address: string;
  barangay: string;
  city: string;
  province: string;
  region: string;
  landmarks: Landmark[];
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
  sitePlan?: string;
  typicalFloorPlan?: string;
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

import rawProjects from './projects.json';

export const projects: Project[] = rawProjects as Project[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

