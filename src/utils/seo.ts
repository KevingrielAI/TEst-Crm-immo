/**
 * Safe meta tag helpers that work in both browser and SSR contexts
 */

/**
 * Safely set or update a meta tag
 * No-op if document is not available (SSR safe)
 */
export function safeSetMeta(name: string, content: string, type: 'name' | 'property' = 'name'): void {
  if (typeof document === 'undefined') {
    return; // SSR guard
  }

  let meta = document.querySelector(`meta[${type}="${name}"]`) as HTMLMetaElement;

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(type, name);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

/**
 * Safely set page title
 * No-op if document is not available (SSR safe)
 */
export function safeSetTitle(title: string): void {
  if (typeof document === 'undefined') {
    return; // SSR guard
  }

  document.title = title;
}

/**
 * Append JSON-LD structured data
 * Returns cleanup function to remove the script
 * No-op if document is not available (SSR safe)
 */
export function appendJsonLd(data: Record<string, any>): () => void {
  if (typeof document === 'undefined') {
    return () => {}; // SSR guard
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = `jsonld-${Date.now()}`; // Unique ID for cleanup
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);

  // Return cleanup function
  return () => {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
  };
}

/**
 * Set all meta tags for a page
 */
export function setPageMeta(config: {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
}): void {
  safeSetTitle(config.title);
  safeSetMeta('description', config.description);

  if (config.keywords) {
    safeSetMeta('keywords', config.keywords);
  }

  safeSetMeta('og:title', config.ogTitle || config.title, 'property');
  safeSetMeta('og:description', config.ogDescription || config.description, 'property');
  safeSetMeta('og:type', 'website', 'property');
}
