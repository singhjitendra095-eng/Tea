/**
 * Analytics Service
 * GA4 analytics wrapper per contracts/ga4-events.md
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Tracks a custom event with GA4
 * @param eventName - The event name (e.g., 'tea_card_click', 'newsletter_signup_submit')
 * @param parameters - Event parameters object
 */
export function trackEvent(eventName: string, parameters: Record<string, unknown> = {}): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

/**
 * Tracks a page view with GA4
 * @param pageTitle - The page title
 * @param pageLocation - The page URL (optional, defaults to current location)
 */
export function trackPageView(pageTitle: string, pageLocation?: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: pageLocation || window.location.href,
    });
  }
}

/**
 * Initializes GA4 with the tracking ID
 * This should be called once at app startup
 * @param trackingId - The GA4 measurement ID (e.g., 'G-XXXXXXXXXX')
 */
export function initGA4(trackingId: string): void {
  if (typeof window === 'undefined') return;

  // Add gtag script if not already present
  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${trackingId}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);
  }

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', trackingId);
}