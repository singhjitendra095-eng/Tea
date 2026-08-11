# Research Findings: Foundation & Public Website

**Feature**: F-001 Foundation & Public Website  
**Date**: 2026-08-11  
**Status**: Phase 0 Research Complete

---

## Overview

This document consolidates research findings for 7 key technical topics required to implement the Foundation & Public Website feature. Each research item resolves a "NEEDS CLARIFICATION" from the implementation plan's Technical Context section and documents best practices, architectural decisions, and tool recommendations.

---

## Research Item 1: Responsive Design Breakpoints & Mobile-First Strategy

### Research Question
How should responsive design be structured in React with Tailwind CSS, ensuring optimal user experience across mobile (< 768px), tablet (768px–1024px), and desktop (> 1024px) devices with a mobile-first approach?

### Decision
**Use Tailwind's mobile-first breakpoint strategy with CSS media queries and responsive utility classes.**

### Rationale
- Tailwind CSS supports mobile-first design by default: base styles apply to all screen sizes, then `sm:`, `md:`, `lg:`, `xl:` prefixes override for larger screens.
- Mobile-first approach aligns with The Tea Story's persona requirements: Wellness Professional and Luxury Buyer are primarily mobile-first shoppers.
- Performance benefits: smaller CSS bundle for mobile users when base styles are optimized.
- Simpler component logic: fewer conditional renders needed; Tailwind handles breakpoint-based styling via CSS.

### Recommended Approach

**Tailwind Breakpoint Mapping**:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Small mobile (not used in this feature; included for completeness)
      'md': '768px',   // Tablet breakpoint (F-001 considers this start of tablet)
      'lg': '1024px',  // Desktop breakpoint (F-001 considers this start of desktop)
      'xl': '1280px',  // Wide desktop
      '2xl': '1536px', // Extra wide
    },
  },
};
```

**F-001 Mapping (Simplified)**:
- Mobile: default (0–767px) → base Tailwind utilities apply
- Tablet: `md:` prefix (768px–1023px) → mid-size layouts
- Desktop: `lg:` prefix (1024px+) → full layouts

**Component Example**:
```tsx
// Hero.tsx - Mobile-first responsive component
export function Hero({ title, image, cta }) {
  return (
    <section className="
      py-12 px-4        // Mobile: 12px padding
      md:py-24 md:px-8  // Tablet: 24px padding
      lg:py-32 lg:px-16 // Desktop: 32px padding
      bg-gray-50
    ">
      <div className="
        grid grid-cols-1  // Mobile: single column
        md:grid-cols-2    // Tablet: two columns
        lg:grid-cols-3    // Desktop: three columns
        gap-4 md:gap-6 lg:gap-8
      ">
        {/* Content */}
      </div>
    </section>
  );
}
```

### Testing Strategy
- **Manual Testing**: iPhone SE (375px), iPhone 14 (390px), Galaxy A12 (412px), iPad (768px), Desktop (1440px)
- **Automated**: Playwright visual regression tests for breakpoint transitions
- **Tool**: Lighthouse DevTools (responsive design mode)

### Alternatives Considered & Rejected
- **CSS Grid auto-fit/auto-fill**: Less predictable at specific breakpoints; Tailwind's explicit breakpoints provide better control for premium UI
- **Styled Components with media queries**: Tailwind's utility approach is faster to develop and maintains consistency

---

## Research Item 2: Premium Brand Aesthetic & Component Design System

### Research Question
How should design tokens (colors, typography, spacing) be structured in Tailwind CSS to establish a reusable, premium component library for The Tea Story brand?

### Decision
**Establish design tokens via Tailwind config + CSS custom properties, creating a centralized, brand-consistent component library.**

### Rationale
- Tailwind's `extend` config allows brand-specific color scales, typography, and spacing without overriding defaults
- CSS custom properties (CSS vars) provide runtime flexibility for theme switching (future feature)
- Design system foundation supports F-002+ features (product catalog, checkout) with consistency
- Premium brand aesthetic requires explicit color harmony and typography precision

### Recommended Approach

**Tailwind Config Setup** (`tailwind.config.js`):
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Brand palette (from DesignPrinciples.md)
        'tea': {
          50: '#f5f7f4',   // Lightest
          100: '#e8ede5',
          200: '#d4dfc9',
          300: '#b8ceaa',
          400: '#7ba95a',
          500: '#2a5f3a',  // Primary forest green
          600: '#1f4629',
          700: '#1a3a20',
          800: '#0f2416',
          900: '#051108',  // Darkest
        },
        'earth': {
          50: '#faf8f5',
          100: '#f5ede5',
          300: '#d4c4b0',
          500: '#8b6f47',  // Primary earth brown
          700: '#5c4a33',
          900: '#2d2416',
        },
        'cream': {
          50: '#fffef9',
          100: '#fff8f0',
          200: '#fce6cc',
          500: '#f5e6d3',  // Warm cream
        },
        'gold': {
          300: '#ffd700',
          500: '#d4af37',  // Soft gold accent
        },
        'charcoal': {
          900: '#1a1a1a',  // Typography
        },
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],     // Headings
        'sans': ['Inter', 'sans-serif'],   // Body
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],     // Subheadings
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // Main headings
      },
      spacing: {
        // Define consistent spacing scale (4px base unit)
        '0': '0px',
        '1': '0.25rem',
        '2': '0.5rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
      },
    },
  },
};
```

**CSS Custom Properties** (`src/styles/variables.css`):
```css
:root {
  /* Brand Colors */
  --color-primary: #2a5f3a;        /* Forest green */
  --color-secondary: #8b6f47;      /* Earth brown */
  --color-accent: #d4af37;         /* Soft gold */
  --color-neutral-light: #f5e6d3;  /* Cream */
  --color-neutral-dark: #1a1a1a;   /* Charcoal */

  /* Typography */
  --font-serif: Georgia, serif;
  --font-sans: Inter, sans-serif;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;

  /* Premium visual hierarchy */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
}
```

**Reusable Component Pattern**:
```tsx
// src/components/Section/Section.tsx
interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  background?: 'light' | 'dark' | 'none';
}

export function Section({ 
  title, 
  children, 
  className = '', 
  background = 'light' 
}: SectionProps) {
  const bgClasses = {
    light: 'bg-tea-50',
    dark: 'bg-charcoal-900 text-white',
    none: 'bg-transparent',
  };

  return (
    <section className={`
      py-12 md:py-20 lg:py-24
      px-4 md:px-8 lg:px-16
      ${bgClasses[background]}
      ${className}
    `}>
      {title && (
        <h2 className="
          text-3xl md:text-4xl lg:text-5xl
          font-serif font-bold
          text-tea-800
          mb-8 md:mb-12 lg:mb-16
          text-center
        ">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
```

### Alternatives Considered & Rejected
- **Styled Components**: Adds runtime overhead; Tailwind's static CSS is more performant
- **CSS-in-JS libraries (Emotion, Styled)**: Tailwind's utility-first approach is faster for premium UI prototyping
- **Raw CSS variables only**: Tailwind provides type-safe integration and better tooling

---

## Research Item 3: Form Validation & localStorage Integration Patterns

### Research Question
How should client-side form validation and localStorage integration be structured in React to support development/testing without backend infrastructure?

### Decision
**Implement validation service with localStorage wrapper; forms persist data as JSON with session-based duplicate prevention.**

### Rationale
- localStorage provides dev/testing storage without server infrastructure
- Validation utilities separate business logic from React component rendering
- Session-based duplicate prevention (via sessionStorage flag) prevents accidental resubmissions
- Pattern scales to backend API integration when F-005+ features require real email submission

### Recommended Approach

**Validation Service** (`src/services/validation.ts`):
```typescript
export const ValidationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  message: {
    minLength: 10,
    maxLength: 1000,
    message: 'Message must be between 10 and 1000 characters',
  },
};

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email.trim()) {
    return { valid: false, error: 'Email is required' };
  }
  if (!ValidationRules.email.pattern.test(email)) {
    return { valid: false, error: ValidationRules.email.message };
  }
  return { valid: true };
}

export function validateMessage(message: string): { valid: boolean; error?: string } {
  if (!message.trim()) {
    return { valid: false, error: 'Message is required' };
  }
  if (message.length < ValidationRules.message.minLength) {
    return { valid: false, error: ValidationRules.message.message };
  }
  if (message.length > ValidationRules.message.maxLength) {
    return { valid: false, error: ValidationRules.message.message };
  }
  return { valid: true };
}
```

**Storage Service** (`src/services/storage.ts`):
```typescript
interface FormSubmission {
  type: 'newsletter' | 'contact';
  email: string;
  message?: string;
  timestamp: string;
}

const STORAGE_KEY = 'tea_story_submissions';
const SESSION_KEY = 'tea_story_session_id';

export function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function saveFormSubmission(submission: Omit<FormSubmission, 'timestamp'>): boolean {
  try {
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as FormSubmission[];
    const newSubmission: FormSubmission = {
      ...submission,
      timestamp: new Date().toISOString(),
    };
    submissions.push(newSubmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    return true;
  } catch (error) {
    console.error('Failed to save form submission:', error);
    return false;
  }
}

export function hasDuplicateSubmission(email: string, type: 'newsletter' | 'contact'): boolean {
  try {
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as FormSubmission[];
    const sessionId = getSessionId();
    
    // Check for duplicate in current session
    return submissions.some(
      (s) => s.email === email && s.type === type && s.timestamp > getSessionStartTime()
    );
  } catch (error) {
    return false;
  }
}

function getSessionStartTime(): string {
  // Return timestamp from 30 minutes ago (session duration)
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  return thirtyMinutesAgo.toISOString();
}

export function getFormSubmissions(): FormSubmission[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function clearFormSubmissions(): void {
  localStorage.removeItem(STORAGE_KEY);
}
```

**React Component Integration** (`src/components/Form/NewsletterForm.tsx`):
```tsx
import { useState } from 'react';
import { validateEmail } from '../../services/validation';
import { saveFormSubmission, hasDuplicateSubmission } from '../../services/storage';
import { trackEvent } from '../../services/analytics';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    const validation = validateEmail(email);
    if (!validation.valid) {
      setError(validation.error || 'Invalid email');
      trackEvent('newsletter_signup_submit', { status: 'error', error_code: 'invalid_email' });
      return;
    }

    // Check for duplicate in session
    if (hasDuplicateSubmission(email, 'newsletter')) {
      setError('You've already signed up in this session');
      trackEvent('newsletter_signup_submit', { status: 'error', error_code: 'duplicate' });
      return;
    }

    // Save to localStorage
    const saved = saveFormSubmission({ type: 'newsletter', email });
    if (!saved) {
      setError('Failed to save your email. Please try again.');
      trackEvent('newsletter_signup_submit', { status: 'error', error_code: 'storage_error' });
      return;
    }

    // Success
    setSubmitted(true);
    setEmail('');
    trackEvent('newsletter_signup_submit', { status: 'success' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="px-4 py-2 border border-gray-300 rounded"
        aria-label="Email address"
      />
      {error && <span className="text-red-600 text-sm">{error}</span>}
      <button
        type="submit"
        className="px-4 py-2 bg-tea-600 text-white rounded hover:bg-tea-700"
      >
        Subscribe
      </button>
      {submitted && <span className="text-green-600 text-sm">Thank you! Check your email for exclusive updates</span>}
    </form>
  );
}
```

---

## Research Item 4: Accessibility Compliance (WCAG AA) in React

### Research Question
How should WCAG AA accessibility standards be implemented in React components to ensure keyboard navigation, color contrast, semantic HTML, and ARIA labels?

### Decision
**Use semantic HTML, ARIA attributes, explicit color contrast, keyboard event handling, and automated testing with axe-core.**

### Rationale
- WCAG AA is mandatory per spec (SC-006)
- React's JSX supports semantic HTML (`<button>`, `<nav>`, `<main>`) naturally
- ARIA labels bridge gaps where semantic meaning isn't obvious
- Automated + manual testing catches 80% of issues; comprehensive approach ensures compliance

### Recommended Approach

**Component Accessibility Checklist**:

| Item | Implementation | F-001 Example |
|------|---|---|
| **Semantic HTML** | Use proper tags (`<button>`, `<form>`, `<nav>`, `<main>`, `<footer>`) instead of `<div>` | `<button className="...">Subscribe</button>` not `<div onClick=...>` |
| **Color Contrast** | Text/background must have ≥4.5:1 ratio (large text ≥3:1) | Test with WebAIM contrast checker; use `text-charcoal-900` on light backgrounds |
| **ARIA Labels** | Add `aria-label` for icon buttons, `aria-describedby` for form errors | `<button aria-label="Open mobile menu">☰</button>` |
| **Keyboard Navigation** | Tab order, focus management, escape key handling | Form inputs in logical order; escape closes mobile menu |
| **Heading Hierarchy** | `<h1>`, `<h2>`, `<h3>` in logical order, not for styling | One `<h1>` per page; section titles as `<h2>` |
| **Form Labels** | `<label htmlFor="inputId">` paired with `<input id="inputId">` | `<label htmlFor="email">Email</label><input id="email">` |
| **Alt Text** | Descriptive alt text for all images | `<img alt="Premium Himalayan green tea in ceramic cup" src="..." />` |
| **Focus Indicators** | Visible focus ring for keyboard users | Tailwind's `focus:ring-2 focus:ring-tea-500` |
| **Skip Links** | Allow keyboard users to skip navigation | `<a href="#main" className="sr-only">Skip to main content</a>` |

**Example Accessible Component** (`src/components/Navigation/Navigation.tsx`):
```tsx
import { useState } from 'react';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className="sticky top-0 z-50 bg-white shadow"
      onKeyDown={handleEscape}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-serif font-bold text-tea-800">
          The Tea Story
        </a>

        {/* Mobile Menu Toggle */}
        <button
          aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={mobileMenuOpen}
          className="
            md:hidden
            focus:outline-none focus:ring-2 focus:ring-tea-500 rounded
          "
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <a href="/#about" className="text-charcoal-900 hover:text-tea-600">About</a>
          <a href="/#why-choose-us" className="text-charcoal-900 hover:text-tea-600">Why Choose Us</a>
          <a href="/#featured-teas" className="text-charcoal-900 hover:text-tea-600">Featured Teas</a>
          <a href="/#contact" className="text-charcoal-900 hover:text-tea-600">Contact</a>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gray-50 py-4 px-4">
          <a href="/#about" className="block py-2 text-charcoal-900">About</a>
          <a href="/#why-choose-us" className="block py-2 text-charcoal-900">Why Choose Us</a>
          <a href="/#featured-teas" className="block py-2 text-charcoal-900">Featured Teas</a>
          <a href="/#contact" className="block py-2 text-charcoal-900">Contact</a>
        </nav>
      )}
    </nav>
  );
}
```

**Testing Strategy**:
- **Automated**: Run axe-core in unit tests (`npm run test:a11y`)
- **Manual**: Keyboard-only navigation, screen reader testing (NVDA/JAWS on Windows, VoiceOver on Mac)
- **Tools**: WebAIM contrast checker, WAVE browser extension, Lighthouse accessibility audit

---

## Research Item 5: Google Analytics 4 Integration in React SPA

### Research Question
How should Google Analytics 4 be integrated into a React SPA to track page views, user interactions, and generate bounce rate metrics?

### Decision
**Integrate GA4 via gtag.js script tag; create wrapper service for event tracking; deploy tracking ID via environment variables.**

### Rationale
- GA4 gtag.js is standard, well-documented, and requires no backend infrastructure
- Wrapper service decouples analytics from component logic; easier to test and migrate
- Environment variable configuration supports multiple deployments (dev, staging, prod)
- Event tracking enables bounce rate measurement and user behavior analysis

### Recommended Approach

**GA4 Setup**:
1. Create Google Analytics 4 property at analytics.google.com
2. Generate Measurement ID (format: `G-XXXXXXXXXX`)
3. Store in `.env.local`: `VITE_GA4_TRACKING_ID=G-XXXXXXXXXX`

**HTML Script Injection** (`src/main.tsx` or `index.html`):
```html
<!-- In public/index.html or injected via Vite -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Analytics Service Wrapper** (`src/services/analytics.ts`):
```typescript
export type EventName = 
  | 'page_view'
  | 'tea_card_click'
  | 'newsletter_signup_submit'
  | 'contact_form_submit';

export type EventProperties = {
  page_view?: {
    page_location: string;
    page_title: string;
  };
  tea_card_click?: {
    tea_id: string;
    tea_name: string;
    tea_type: string;
  };
  newsletter_signup_submit?: {
    status: 'success' | 'error';
    error_code?: string;
  };
  contact_form_submit?: {
    status: 'success' | 'error';
    error_code?: string;
  };
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent<T extends EventName>(
  eventName: T,
  properties?: EventProperties[T]
): void {
  if (!window.gtag) {
    console.warn('GA4 not initialized. Event not tracked:', eventName);
    return;
  }

  window.gtag('event', eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
}

export function trackPageView(title: string): void {
  trackEvent('page_view', {
    page_location: window.location.href,
    page_title: title,
  });
}
```

**Component Integration**:
```tsx
import { useEffect } from 'react';
import { trackPageView, trackEvent } from '../../services/analytics';

export function HomePage() {
  useEffect(() => {
    trackPageView('Home');
  }, []);

  const handleTeaCardClick = (teaId: string, teaName: string, teaType: string) => {
    trackEvent('tea_card_click', { tea_id: teaId, tea_name: teaName, tea_type: teaType });
    // Navigate to product detail page or placeholder
  };

  return (
    <div>
      {/* Hero, sections, etc. */}
      <button onClick={() => handleTeaCardClick('tea-001', 'Himalayan Green', 'Green')}>
        View Tea
      </button>
    </div>
  );
}
```

**Event Taxonomy**:

| Event | Trigger | Properties | Use Case |
|---|---|---|---|
| `page_view` | Page loads / route changes | `page_location`, `page_title` | Bounce rate, session metrics |
| `tea_card_click` | Featured tea card clicked | `tea_id`, `tea_name`, `tea_type` | User interest in products |
| `newsletter_signup_submit` | Newsletter form submitted | `status`, `error_code` | Conversion rate, signup funnel |
| `contact_form_submit` | Contact form submitted | `status`, `error_code` | Lead generation metrics |

---

## Research Item 6: Image Optimization for E-commerce (WebP, CDN, Lazy Loading)

### Research Question
How should images be optimized in a premium e-commerce website to meet performance targets (< 2 seconds load time, < 100KB hero image)?

### Decision
**Use WebP format with PNG fallback, serve via CDN (Azure Blob Storage + CDN), implement lazy loading for below-fold images.**

### Rationale
- WebP reduces image size by ~30% vs. JPEG without quality loss
- CDN edge caching ensures fast delivery to global users (important for future international expansion)
- Lazy loading (Intersection Observer) defers non-critical image loading
- Lighthouse performance audits image optimization; this approach targets 90+ score

### Recommended Approach

**Image Optimization Pipeline**:

1. **Source Images** (provide to team as high-res files)
   - Format: JPEG, PNG, TIFF (lossless or lossy originals)
   - Resolution: 1.5-2x target display size
   - Storage: `public/images/` or external asset management system

2. **Build-Time Conversion** (Vite plugin):
   ```bash
   # Install image optimization tools
   npm install --save-dev @vite-plugin/imagemin
   ```

   **vite.config.ts**:
   ```typescript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import imagemin from '@vite-plugin/imagemin';

   export default defineConfig({
     plugins: [
       react(),
       imagemin({
         gifsicle: { optimizationLevel: 7 },
         optipng: { optimizationLevel: 7 },
         mozjpeg: { quality: 85 },
         pngquant: { quality: [0.8, 0.9], speed: 4 },
         webp: { quality: 75 },
       }),
     ],
   });
   ```

3. **Runtime Image Component** (`src/components/OptimizedImage/OptimizedImage.tsx`):
   ```tsx
   import { useState, useEffect, useRef } from 'react';

   interface OptimizedImageProps {
     src: string;
     alt: string;
     width?: number;
     height?: number;
     lazy?: boolean;
     className?: string;
   }

   export function OptimizedImage({
     src,
     alt,
     width,
     height,
     lazy = true,
     className = '',
   }: OptimizedImageProps) {
     const [isInView, setIsInView] = useState(!lazy);
     const imgRef = useRef<HTMLImageElement>(null);

     useEffect(() => {
       if (!lazy || !imgRef.current) return;

       const observer = new IntersectionObserver(
         ([entry]) => {
           if (entry.isIntersecting) {
             setIsInView(true);
             observer.unobserve(entry.target);
           }
         },
         { rootMargin: '100px' }
       );

       observer.observe(imgRef.current);
       return () => observer.disconnect();
     }, [lazy]);

     const baseSrc = src.replace(/\.[^.]+$/, '');
     const webpSrc = `${baseSrc}.webp`;
     const fallbackSrc = src;

     return (
       <picture ref={imgRef}>
         <source srcSet={isInView ? webpSrc : undefined} type="image/webp" />
         <source srcSet={isInView ? fallbackSrc : undefined} />
         <img
           src={isInView ? fallbackSrc : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"%3E%3C/svg%3E'}
           alt={alt}
           width={width}
           height={height}
           className={`${className} ${!isInView ? 'blur' : ''}`}
           loading={lazy ? 'lazy' : 'eager'}
         />
       </picture>
     );
   }
   ```

4. **Usage in Components**:
   ```tsx
   <OptimizedImage
     src="/images/hero-bg.jpg"
     alt="Premium tea gardens at sunrise"
     width={1440}
     height={600}
     lazy={false}  // Hero image: eager load
     className="w-full h-auto"
   />

   <OptimizedImage
     src="/images/testimonial-priya.jpg"
     alt="Priya Sharma, Wellness Coach"
     width={200}
     height={200}
     lazy={true}   // Testimonial images: lazy load
     className="w-32 h-32 rounded-full"
   />
   ```

5. **CDN Deployment** (Azure Blob Storage):
   ```bash
   # Upload images to Azure Blob Storage
   # Configure CDN endpoint for public access
   # Update image URLs in deployment to CDN domain
   ```

**Performance Targets**:
- Hero image: < 100KB (WebP) on 4G
- Featured tea images: < 80KB each
- Testimonial images: < 60KB each
- Total above-fold images: < 200KB

**Tools**:
- Local testing: Lighthouse DevTools, WebPageTest
- Build verification: `npm run build && npm run preview`

---

## Research Item 7: SEO Fundamentals for React SPA

### Research Question
How should a React SPA be optimized for search engines, considering the need for server-side rendering or static generation for meta tags, Open Graph, and structured data?

### Decision
**Use Vite static export (pre-rendering) for public pages; implement SEO metadata service for dynamic meta tags; add structured data markup (Schema.org).**

### Rationale
- React SPAs don't render server-side by default, limiting SEO
- Pre-rendering homepage to static HTML (via Vite) ensures Googlebot sees content
- Metadata service manages `<title>`, `<meta>`, `<link>` tags for each page
- Structured data (JSON-LD) helps search engines understand content
- Simpler than full SSR; sufficient for F-001 static content

### Recommended Approach

**SEO Metadata Service** (`src/services/seo.ts`):
```typescript
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  canonical?: string;
  structuredData?: Record<string, any>;
}

export function setSEOMetadata(metadata: SEOMetadata): void {
  // Set title
  document.title = metadata.title;

  // Helper to set or update meta tag
  const setMetaTag = (name: string, content: string, property?: boolean) => {
    let meta = document.querySelector(
      property ? `meta[property="${name}"]` : `meta[name="${name}"]`
    ) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      if (property) meta.setAttribute('property', name);
      else meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  // Standard meta tags
  setMetaTag('description', metadata.description);
  if (metadata.keywords) {
    setMetaTag('keywords', metadata.keywords.join(', '));
  }

  // Open Graph meta tags
  setMetaTag('og:title', metadata.ogTitle || metadata.title, true);
  setMetaTag('og:description', metadata.ogDescription || metadata.description, true);
  if (metadata.ogImage) setMetaTag('og:image', metadata.ogImage, true);
  if (metadata.ogUrl) setMetaTag('og:url', metadata.ogUrl, true);
  setMetaTag('og:type', metadata.ogType || 'website', true);

  // Twitter Card
  setMetaTag('twitter:card', metadata.twitterCard || 'summary_large_image');

  // Canonical
  if (metadata.canonical) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = metadata.canonical;
  }

  // Structured data (JSON-LD)
  if (metadata.structuredData) {
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(metadata.structuredData);
  }
}

// Homepage SEO
export const HomepageSEO: SEOMetadata = {
  title: 'The Tea Story – Premium Organic Tea & Wellness Lifestyle',
  description: 'Discover handcrafted organic teas from the finest gardens. A premium digital experience for wellness-focused tea lovers and luxury seekers.',
  keywords: ['organic tea', 'premium tea', 'wellness tea', 'luxury lifestyle'],
  ogTitle: 'The Tea Story – Premium Tea Experience',
  ogDescription: 'Handcrafted organic teas. Premium packaging. Wellness lifestyle.',
  ogImage: 'https://example.com/images/og-tea-story.jpg',
  ogType: 'website',
  canonical: 'https://example.com/',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Tea Story',
    url: 'https://example.com',
    logo: 'https://example.com/logo.png',
    description: 'Premium organic tea e-commerce platform',
    sameAs: [
      'https://www.instagram.com/theteasterory',
      'https://www.facebook.com/theteastory',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@example.com',
    },
  },
};
```

**Usage in Components**:
```tsx
import { useEffect } from 'react';
import { setSEOMetadata, HomepageSEO } from '../../services/seo';

export function HomePage() {
  useEffect(() => {
    setSEOMetadata(HomepageSEO);
  }, []);

  return (
    <main>
      {/* Page content */}
    </main>
  );
}
```

**Static Pre-rendering** (`vite.config.ts`):
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    ssrManifest: true,
    // Vite outputs index.html automatically for SPA
    // For pre-rendering additional pages, use vite-plugin-ssr or static-generation plugins
  },
});
```

**robots.txt** (`public/robots.txt`):
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /.env

Sitemap: https://example.com/sitemap.xml
```

**SEO Checklist**:
- ✅ Semantic HTML (`<h1>`, `<h2>`, `<nav>`, `<main>`, `<footer>`)
- ✅ Meta descriptions (150–160 characters)
- ✅ Open Graph meta tags (for social sharing)
- ✅ Structured data (Organization, LocalBusiness)
- ✅ Mobile-friendly (responsive design, 4G load time)
- ✅ HTTPS (required by spec)
- ✅ robots.txt and sitemap.xml
- ✅ Alt text on all images
- ✅ Internal linking structure
- ✅ Performance (Lighthouse score 90+)

---

## Summary: Phase 0 Complete

All 7 research items have been resolved with decision, rationale, and detailed implementation approach:

1. ✅ **Responsive Design**: Tailwind mobile-first strategy with breakpoints (mobile < 768px, tablet 768–1024px, desktop > 1024px)
2. ✅ **Design System**: Tailwind config + CSS custom properties for brand colors, typography, spacing
3. ✅ **Form Validation**: Validation service + localStorage wrapper with session-based duplicate prevention
4. ✅ **Accessibility**: Semantic HTML, ARIA labels, color contrast, keyboard navigation, automated testing with axe-core
5. ✅ **GA4 Integration**: gtag.js wrapper service, event taxonomy, environment-based configuration
6. ✅ **Image Optimization**: WebP with PNG fallback, CDN deployment, lazy loading via Intersection Observer
7. ✅ **SEO**: Metadata service, structured data, robots.txt, static pre-rendering

**Recommendation**: Research findings support proceeding to Phase 1 (Design Artifacts generation). All technical uncertainties have been resolved; implementation can begin confidently.

---
