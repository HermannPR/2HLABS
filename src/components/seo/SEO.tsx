import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  canonical?: string;
  noindex?: boolean;
}

export const SEO = ({
  title,
  description,
  keywords,
  ogImage = '/assets/backgrounds/hero-bg.png',
  ogType = 'website',
  canonical,
  noindex = false,
}: SEOProps) => {
  const fullTitle = `${title} | 2H Labs`;
  const siteUrl = 'https://2hlabs.com'; // Update with actual domain
  const canonicalUrl = canonical || window.location.href;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Helper function to set or update meta tag
    const setMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Helper function to set or update link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }

      element.setAttribute('href', href);
    };

    // Basic Meta Tags
    setMetaTag('description', description);
    if (keywords) {
      setMetaTag('keywords', keywords);
    }

    // Robots
    if (noindex) {
      setMetaTag('robots', 'noindex, nofollow');
    } else {
      setMetaTag('robots', 'index, follow');
    }

    // Open Graph Tags
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:image', ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`, true);
    setMetaTag('og:site_name', '2H Labs', true);

    // Twitter Card Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`);

    // Canonical URL
    setLinkTag('canonical', canonicalUrl);

    // Cleanup function
    return () => {
      // Optionally clean up on unmount
    };
  }, [fullTitle, description, keywords, ogImage, ogType, canonicalUrl, siteUrl, noindex]);

  return null; // This component doesn't render anything
};

// Structured Data Component
interface StructuredDataProps {
  data: object;
}

export const StructuredData = ({ data }: StructuredDataProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = 'structured-data';

    // Remove existing structured data script if any
    const existing = document.getElementById('structured-data');
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [data]);

  return null;
};
