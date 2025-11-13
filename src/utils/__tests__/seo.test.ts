import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { safeSetMeta, safeSetTitle, appendJsonLd } from '../seo';

describe('SEO Utilities', () => {
  let dom: JSDOM;

  beforeEach(() => {
    // Create a new JSDOM instance for each test
    dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
    global.document = dom.window.document as any;
  });

  afterEach(() => {
    // Clean up
    delete (global as any).document;
  });

  describe('safeSetMeta', () => {
    it('creates a new meta tag if it does not exist', () => {
      safeSetMeta('description', 'Test description');

      const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      expect(meta).not.toBeNull();
      expect(meta.getAttribute('content')).toBe('Test description');
    });

    it('updates an existing meta tag', () => {
      safeSetMeta('description', 'First description');
      safeSetMeta('description', 'Updated description');

      const metas = document.querySelectorAll('meta[name="description"]');
      expect(metas.length).toBe(1);
      expect((metas[0] as HTMLMetaElement).getAttribute('content')).toBe('Updated description');
    });

    it('works with property attribute (for Open Graph)', () => {
      safeSetMeta('og:title', 'OG Title', 'property');

      const meta = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      expect(meta).not.toBeNull();
      expect(meta.getAttribute('content')).toBe('OG Title');
    });
  });

  describe('safeSetTitle', () => {
    it('sets the document title', () => {
      safeSetTitle('Test Page Title');
      expect(document.title).toBe('Test Page Title');
    });
  });

  describe('appendJsonLd', () => {
    it('appends JSON-LD script to head', () => {
      const jsonData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Test Company',
      };

      appendJsonLd(jsonData);

      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).not.toBeNull();
      expect(script?.textContent).toBe(JSON.stringify(jsonData));
    });

    it('cleanup function removes the script', () => {
      const jsonData = { '@type': 'Test' };
      const cleanup = appendJsonLd(jsonData);

      let script = document.querySelector('script[type="application/ld+json"]');
      expect(script).not.toBeNull();

      cleanup();

      script = document.querySelector('script[type="application/ld+json"]');
      expect(script).toBeNull();
    });
  });
});
