export interface BusinessInfo {
  name: string;
  legalDeveloper: string;
  siteName: string;
  domain: string;
  productionUrl: string;
  tagline: string;
  description: string;
  phones: {
    display: string;
    value: string;
    viber: boolean;
    whatsapp: boolean;
  }[];
  emails: string[];
  headquarters: {
    street: string;
    building: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  officeHours: {
    days: string;
    hours: string;
    closed: string;
  };
  governmentPrograms: {
    pagibigAccredited: boolean;
    program4PH: boolean;
    dhsudCompliant: boolean;
  };
  socialLinks: {
    facebook?: string;
    viber?: string;
    whatsapp?: string;
  };
}

export const businessInfo: BusinessInfo = {
  name: 'Urban Deca Homes Philippines',
  legalDeveloper: '8990 Holdings, Inc. (8990 Housing Development Corporation)',
  siteName: 'Urban Deca Homes PH',
  domain: 'urbandecahomes.properties',
  productionUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://urbandecahomes.properties',
  tagline: 'Affordable, Move-In Ready Condominiums in Metro Manila',
  description: 'Authorized information and sales portal for Urban Deca Homes residential condominium developments by 8990 Holdings, Inc. Offering flexible Pag-IBIG, Bank, and 4PH financing across Manila, Ortigas, and Cubao.',
  phones: [
    {
      display: '+63 917 190 8990',
      value: '+639171908990',
      viber: true,
      whatsapp: true,
    },
    {
      display: '+63 917 172 8990',
      value: '+639171728990',
      viber: true,
      whatsapp: true,
    },
  ],
  emails: [
    'inquire@urbandecahomesph.com',
    'sales@urbandecahomes.properties',
  ],
  headquarters: {
    building: 'G/F Deca Mall',
    street: 'Velasquez St. cor. Vitas St., Tondo',
    city: 'Manila City',
    region: 'Metro Manila',
    postalCode: '1013',
    country: 'Philippines',
  },
  officeHours: {
    days: 'Monday to Saturday',
    hours: '9:00 AM – 5:00 PM',
    closed: 'Sundays & National Holidays (By Appointment Only)',
  },
  governmentPrograms: {
    pagibigAccredited: true,
    program4PH: true,
    dhsudCompliant: true,
  },
  socialLinks: {
    facebook: 'https://facebook.com/urbandecahomesph',
    viber: 'viber://chat?number=%2B639171908990',
    whatsapp: 'https://wa.me/639171908990',
  },
};
