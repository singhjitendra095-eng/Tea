import { describe, it, expect, beforeEach, vi } from 'vitest';
import { trackEvent, trackPageView, initGA4 } from '../../src/services/analytics';

// Mock window.gtag and window.dataLayer
const mockGtag = vi.fn();
const mockDataLayer: unknown[] = [];

Object.defineProperty(global, 'window', {
  value: {
    gtag: mockGtag,
    dataLayer: mockDataLayer,
    location: { href: 'https://example.com/' },
  },
  writable: true,
});

describe('Analytics Service', () => {
  beforeEach(() => {
    mockGtag.mockClear();
    mockDataLayer.length = 0;
  });

  describe('trackEvent', () => {
    it('should call gtag with event name and parameters', () => {
      trackEvent('tea_card_click', { tea_id: 'tea-001', tea_name: 'Test Tea', tea_type: 'Green' });
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'tea_card_click', {
        tea_id: 'tea-001',
        tea_name: 'Test Tea',
        tea_type: 'Green',
      });
    });

    it('should call gtag with event name and empty parameters when none provided', () => {
      trackEvent('page_view');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {});
    });

    it('should not call gtag when window.gtag is not defined', () => {
      // Temporarily remove gtag
      const originalGtag = global.window.gtag;
      // @ts-ignore
      delete global.window.gtag;
      
      trackEvent('test_event', { foo: 'bar' });
      
      // Restore
      global.window.gtag = originalGtag;
      
      // Should not throw and should not call gtag
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('trackPageView', () => {
    it('should call gtag with page_view event and page_title', () => {
      trackPageView('Homepage');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
        page_title: 'Homepage',
        page_location: 'https://example.com/',
      });
    });

    it('should use provided page_location when given', () => {
      trackPageView('About Page', 'https://example.com/about');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
        page_title: 'About Page',
        page_location: 'https://example.com/about',
      });
    });

    it('should not call gtag when window.gtag is not defined', () => {
      const originalGtag = global.window.gtag;
      // @ts-ignore
      delete global.window.gtag;
      
      trackPageView('Test Page');
      
      global.window.gtag = originalGtag;
      
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('initGA4', () => {
    it('should initialize gtag and dataLayer', () => {
      // Reset mocks
      mockGtag.mockClear();
      mockDataLayer.length = 0;
      
      // Remove existing script if any
      const existingScript = document.querySelector('script[src*="googletagmanager.com"]');
      if (existingScript) existingScript.remove();
      
      // Save original gtag reference
      const originalGtag = global.window.gtag;
      
      initGA4('G-TEST123');
      
      // The initGA4 function replaces window.gtag with its own implementation
      // So we need to check the new gtag function was called
      // Get the new gtag function that was assigned
      const newGtag = global.window.gtag;
      
      // Call the new gtag to verify it works
      newGtag('js', new Date());
      newGtag('config', 'G-TEST123');
      
      // Check that dataLayer was initialized
      expect(global.window.dataLayer).toBeDefined();
      // Find our calls in the dataLayer (they should be the last 2 entries)
      const layer = global.window.dataLayer as unknown[];
      expect(layer.length).toBeGreaterThanOrEqual(2);
      const lastTwo = layer.slice(-2);
      expect(lastTwo[0]).toEqual(['js', expect.any(Date)]);
      expect(lastTwo[1]).toEqual(['config', 'G-TEST123']);
      
      // Restore original gtag for other tests
      global.window.gtag = originalGtag;
    });

    it('should not add duplicate script tags', () => {
      // Add a script tag first
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TEST123';
      document.head.appendChild(script);
      
      const initialScriptCount = document.querySelectorAll('script[src*="googletagmanager.com"]').length;
      
      initGA4('G-TEST123');
      
      const finalScriptCount = document.querySelectorAll('script[src*="googletagmanager.com"]').length;
      expect(finalScriptCount).toBe(initialScriptCount);
      
      // Cleanup
      script.remove();
    });

    it('should do nothing when window is not defined (SSR)', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      
      // Should not throw
      expect(() => initGA4('G-TEST123')).not.toThrow();
      
      global.window = originalWindow;
    });
  });
});