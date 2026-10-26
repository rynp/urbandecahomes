import { Metadata } from 'next';
import { businessInfo } from '@/data/business';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://urbandecahomes.properties';

export interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  path = '',
  image = '/images/og-default.jpg',
  keywords = [],
  noIndex = false,
}: SeoProps): Metadata {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
  const ogImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  const defaultKeywords = [
    'Urban Deca Homes',
    'Urban Deca Homes Philippines',
    'Urban Deca Homes Manila',
    'Urban Deca Homes Ortigas',
    'Urban Deca Towers Cubao',
    'Affordable Condo Philippines',
    'Pag-IBIG Condo Manila',
    'Rent to Own Condo Manila',
    '8990 Holdings Inc',
    '4PH Housing Program',
    'Condo in Tondo Manila',
    'Condo in Pasig City',
    'Condo in Cubao Quezon City',
  ];

  const mergedKeywords = Array.from(new Set([...keywords, ...defaultKeywords]));

  return {
    title: {
      default: title,
      template: `%s | ${businessInfo.siteName}`,
    },
    description,
    keywords: mergedKeywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: businessInfo.name,
      locale: 'en_PH',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.png', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: ['/favicon.ico'],
    },
    authors: [{ name: businessInfo.legalDeveloper }],
    creator: businessInfo.legalDeveloper,
    publisher: businessInfo.name,
  };
}
