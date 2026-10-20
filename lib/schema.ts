import { businessInfo } from '@/data/business';
import { Project } from '@/data/projects';
import { NewsArticle } from '@/data/news';
import { JobPosting } from '@/data/jobs';
import { FAQItem } from '@/data/faqs';
import { SITE_URL } from '@/lib/seo';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: businessInfo.name,
    legalName: businessInfo.legalDeveloper,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/hero-building.jpg`,
    description: businessInfo.description,
    telephone: businessInfo.phones[0].value,
    email: businessInfo.emails[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.headquarters.street,
      addressLocality: businessInfo.headquarters.city,
      addressRegion: businessInfo.headquarters.region,
      postalCode: businessInfo.headquarters.postalCode,
      addressCountry: 'PH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 14.6225,
      longitude: 120.9575,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      businessInfo.socialLinks.facebook,
      'https://8990holdings.com',
      'https://www.decahomes.com.ph',
    ].filter(Boolean),
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: businessInfo.name,
    url: SITE_URL,
    description: businessInfo.description,
    publisher: {
      '@type': 'Organization',
      name: businessInfo.legalDeveloper,
      url: SITE_URL,
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  };
}

export function getFaqSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getProjectApartmentComplexSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: project.name,
    description: project.metaDescription,
    url: `${SITE_URL}/${project.slug}`,
    image: project.heroImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: project.location.address,
      addressLocality: project.location.city,
      addressRegion: project.location.region,
      addressCountry: 'PH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: project.location.coordinates.lat,
      longitude: project.location.coordinates.lng,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PHP',
      lowPrice: project.priceMinPhp,
      highPrice: project.priceMaxPhp,
      offerCount: project.unitTypes.length,
      availability: 'https://schema.org/InStock',
    },
    amenityFeature: project.amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity.name,
      value: true,
    })),
  };
}

export function getArticleSchema(article: NewsArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}/news-and-promo/${article.slug}`,
    image: [article.image],
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: businessInfo.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/news-and-promo/${article.slug}`,
    },
  };
}

export function getJobPostingSchema(job: JobPosting) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.overview,
    datePosted: '2026-01-15',
    validThrough: `${job.closingDate}T23:59:59Z`,
    employmentType: job.employmentType === 'Full-time' ? 'FULL_TIME' : 'OTHER',
    hiringOrganization: {
      '@type': 'Organization',
      name: businessInfo.name,
      sameAs: SITE_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Metro Manila',
        addressCountry: 'PH',
      },
    },
  };
}
