/**
 * SEO Utilities for Ugegbe GWR Website
 * Provides functions for dynamic meta tags, social sharing, and SEO optimization
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Update document title and meta tags dynamically
 */
export function updateSEOTags(config: SEOConfig): void {
  // Update title
  document.title = config.title;

  // Update or create meta tags
  const metaTags: Record<string, string> = {
    description: config.description,
    'og:title': config.title,
    'og:description': config.description,
    'og:type': config.type || 'website',
    'twitter:title': config.title,
    'twitter:description': config.description,
  };

  if (config.keywords) {
    metaTags.keywords = config.keywords;
  }

  if (config.image) {
    metaTags['og:image'] = config.image;
    metaTags['twitter:image'] = config.image;
  }

  if (config.url) {
    metaTags['og:url'] = config.url;
    metaTags['canonical'] = config.url;
  }

  if (config.author) {
    metaTags.author = config.author;
  }

  if (config.publishedTime) {
    metaTags['article:published_time'] = config.publishedTime;
  }

  if (config.modifiedTime) {
    metaTags['article:modified_time'] = config.modifiedTime;
  }

  // Apply meta tags
  Object.entries(metaTags).forEach(([key, value]) => {
    if (key === 'canonical') {
      // Handle canonical link
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = value;
    } else {
      // Handle meta tags
      const property = key.startsWith('og:') || key.startsWith('article:') ? 'property' : 'name';
      let meta = document.querySelector(`meta[${property}="${key}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(property, key);
        document.head.appendChild(meta);
      }
      
      meta.content = value;
    }
  });
}

/**
 * Preload critical resources for better performance
 */
export function preloadCriticalResources(): void {
  const criticalImages = [
    '/IMG_3314.JPG.webp',
    '/IMG_6521.JPG.webp',
    '/UGEGBE_X_GWR_Dark.png',
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Generate social sharing URLs
 */
export function generateSocialShareUrls(url: string, text: string) {
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}&hashtags=UgegbeGWR,FavourUgegbe`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`,
    email: `mailto:?subject=${encodeURIComponent('Join me at the Favour Ugegbe GWR Marathon')}&body=${encodeURIComponent(text + '\n\n' + url)}`,
  };
}

/**
 * SEO page configurations
 */
export const SEO_PAGES = {
  home: {
    title: '48-Hour French Marathon | Favour Ugegbe | Nov 13-15, 2026 Lagos',
    description: 'Join Nigerian polyglot Favour Chisimdi Ugegbe as she attempts to break the Guinness World Record for the longest French language lesson - 48 hours straight in Lagos, Nigeria. Free entry.',
    keywords: 'Favour Ugegbe, Guinness World Records, French language marathon, Lagos Nigeria events, polyglot, world record attempt',
    url: 'https://ugegbegwr.com',
    image: 'https://ugegbegwr.com/og-image.png',
  },
  register: {
    title: 'Register Free | Favour Ugegbe 48-Hour French Marathon',
    description: 'Register for free to attend the historic 48-hour French language marathon by Favour Ugegbe. November 13-15, 2026 in Lagos, Nigeria. Be part of history.',
    keywords: 'register, free entry, Favour Ugegbe event, Lagos events 2026',
    url: 'https://ugegbegwr.com/register',
    image: 'https://ugegbegwr.com/og-image.png',
  },
  about: {
    title: 'About Favour Ugegbe | Nigerian Polyglot | 11 Languages',
    description: 'Meet Favour Chisimdi Ugegbe, the Nigerian polyglot who speaks 11 languages and is attempting to break the Guinness World Record with a 48-hour French lesson marathon.',
    keywords: 'Favour Ugegbe, Nigerian polyglot, 11 languages, language educator, Favour Nwobodo',
    url: 'https://ugegbegwr.com/favour',
    image: 'https://ugegbegwr.com/IMG_3314.JPG.webp',
  },
  schedule: {
    title: 'Event Schedule | 48-Hour French Marathon | Nov 13-15, 2026',
    description: 'View the full schedule for the 48-hour French language marathon. Three days, four moments. The send-off, the clock starts, hour 26, and the final bell.',
    keywords: 'event schedule, marathon timeline, Lagos events November 2026',
    url: 'https://ugegbegwr.com/schedule',
    image: 'https://ugegbegwr.com/og-image.png',
  },
  faq: {
    title: 'FAQ | Favour Ugegbe 48-Hour French Marathon',
    description: 'Get answers to frequently asked questions about the 48-hour French language marathon, attendance, the record attempt, and more.',
    keywords: 'FAQ, questions, event information, attendance details',
    url: 'https://ugegbegwr.com/faq',
    image: 'https://ugegbegwr.com/og-image.png',
  },
};

/**
 * Generate structured data for events
 */
export function generateEventStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: "Favour Chisimdi Ugegbe's 48-Hour French Language Marathon",
    description: 'Guinness World Records attempt for the longest language lesson',
    startDate: '2026-11-13T18:00:00+01:00',
    endDate: '2026-11-15T18:00:00+01:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Lagos, Nigeria',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressCountry: 'NG',
      },
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock',
    },
  };
}
