import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
  structuredData?: any
}

export const defaultSEO: SEOConfig = {
  title: 'Fly Elite - Private Jet Morocco | Jet Privé Maroc',
  description: 'Aviation d\'affaires au Maroc. Réservez votre jet privé en 5 minutes au meilleur prix. Plus de 300 aéroports disponibles. Private jet Morocco.',
  keywords: 'jet privé maroc, private jet morocco, aviation affaires maroc, charter flight morocco, vol privé maroc, business aviation morocco',
  ogImage: '/og-image.png'
}

export function generateMetadata(config: SEOConfig): Metadata {
  const { title, description, keywords, canonical, ogImage, noIndex } = config
  
  return {
    title,
    description,
    keywords,
    ...(canonical && { alternates: { canonical } }),
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Fly Elite',
      images: [
        {
          url: ogImage || defaultSEO.ogImage!,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'fr_FR',
      alternateLocale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage || defaultSEO.ogImage!],
    },
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
    },
  }
}

export function generateStructuredData(type: string, data: any) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }

  return JSON.stringify(baseData)
}

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fly Elite',
  description: 'Aviation d\'affaires au Maroc - Private jet services in Morocco',
  url: 'https://flyelite.ma',
  logo: 'https://flyelite.ma/iconflyelite.svg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+212-XXX-XXXXXX',
    contactType: 'customer service',
    availableLanguage: ['French', 'English', 'Arabic']
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MA',
    addressLocality: 'Morocco'
  },
  sameAs: [
    'https://www.linkedin.com/company/flyelite',
    'https://www.instagram.com/flyelite'
  ]
}

export const localBusinessStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://flyelite.ma/#organization',
  name: 'Fly Elite',
  description: 'Aviation d\'affaires au Maroc - Private jet charter services',
  url: 'https://flyelite.ma',
  telephone: '+212-XXX-XXXXXX',
  priceRange: '€€€€',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MA',
    addressLocality: 'Morocco'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.5731,
    longitude: -7.5898
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday', 
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    opens: '00:00',
    closes: '23:59'
  },
  serviceArea: {
    '@type': 'Country',
    name: 'Morocco'
  }
}

export function generateBreadcrumbStructuredData(items: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateProductStructuredData(offer: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Private Jet Flight ${offer.from} to ${offer.to}`,
    description: `Private jet charter flight from ${offer.from} to ${offer.to} with ${offer.aircraft}`,
    image: offer.gallery?.[0] || '/og-image.png',
    offers: {
      '@type': 'Offer',
      price: offer.price.amount,
      priceCurrency: offer.price.currency,
      availability: 'https://schema.org/InStock',
      validFrom: offer.date,
      seller: {
        '@type': 'Organization',
        name: 'Fly Elite'
      }
    },
    brand: {
      '@type': 'Brand',
      name: 'Fly Elite'
    },
    category: 'Private Aviation Services'
  }
}

export function generateArticleStructuredData(post: any, language: 'fr' | 'en' = 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title[language],
    description: post.excerpt[language],
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Fly Elite'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fly Elite',
      logo: {
        '@type': 'ImageObject',
        url: 'https://flyelite.ma/iconflyelite.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://flyelite.ma/blog/${post.slug}`
    }
  }
}
