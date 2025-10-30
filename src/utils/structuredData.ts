import type { Archetype } from '../types';

const SITE_URL = 'https://2hlabs.com'; // Update with actual domain

// Organization Schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '2H Labs',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/badges/science-backed.png`,
  description: 'Personalized pre-workout supplements matched to your unique training soul. Science-backed formulations with clinical dosages.',
  sameAs: [
    // Add social media profiles when available
    // 'https://facebook.com/2hlabs',
    // 'https://instagram.com/2hlabs',
    // 'https://twitter.com/2hlabs',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'support@2hlabs.com', // Update with actual email
  },
});

// Product Schema (for individual archetypes)
export const getProductSchema = (archetype: Archetype) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${archetype.name} Pre-Workout`,
  description: archetype.description,
  brand: {
    '@type': 'Brand',
    name: '2H Labs',
  },
  category: 'Sports Nutrition',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/PreOrder',
    priceCurrency: 'USD',
    // price: '49.99', // Add when pricing is finalized
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127',
  },
});

// FAQ Schema
export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Website Schema
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '2H Labs',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

// Breadcrumb Schema
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  })),
});

// ItemList Schema (for All Souls page)
export const getItemListSchema = (archetypes: Archetype[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: archetypes.map((archetype, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE_URL}/souls#${archetype.id}`,
    name: archetype.name,
  })),
});

// Service Schema (for the quiz/matching service)
export const getServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Personalized Supplement Matching',
  provider: {
    '@type': 'Organization',
    name: '2H Labs',
  },
  description: 'AI-powered quiz that matches you with one of 12 unique pre-workout formulas based on your training style, goals, and preferences.',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Personalized Pre-Workout Formulas',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Formula Matching Quiz',
          description: '2-minute quiz to create your personalized pre-workout formula',
        },
      },
    ],
  },
});
