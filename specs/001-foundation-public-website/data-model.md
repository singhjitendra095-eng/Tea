# Component Architecture & Data Model

**Feature**: F-001 Foundation & Public Website  
**Date**: 2026-08-11  
**Version**: 1.0  
**Status**: Design Phase Complete

---

## Overview

This document defines the component architecture, data models, state management, and prop interfaces for the Foundation & Public Website feature. It serves as a detailed blueprint for implementation teams.

---

## Component Hierarchy

```
App (Root)
│
├── Navigation
│   ├── Logo (Display)
│   ├── NavLinks (Navigation)
│   └── MobileMenu (Navigation toggle for mobile)
│
├── HomePage
│   ├── Hero
│   ├── Section (Wrapper for spacing/layout)
│   │   └── AboutSection
│   ├── Section
│   │   └── WhyChooseUsSection
│   ├── Section
│   │   └── FeaturedTeasSection
│   │       └── TeaCard (x4-6)
│   ├── Section
│   │   └── TestimonialsSection
│   │       └── TestimonialCard (x3-5)
│   ├── Section
│   │   └── NewsletterSection
│   │       └── NewsletterForm
│   ├── Section
│   │   └── ContactSection
│   │       └── ContactForm
│   └── Footer
│
└── [Future Routes]
    ├── /products/:id (ProductDetailPage)
    ├── /cart (CartPage)
    ├── /checkout (CheckoutPage)
    └── /auth (AuthPages)
```

---

## Component Specifications

### 1. App (Root)

**File**: `src/App.tsx`

**Responsibilities**:
- Initialize React Router
- Load GA4 analytics
- Set up theme/global state
- Render main layout with Navigation, page routes, and Footer

**Props**: None (root component)

**State**: None (use context for theme if needed in future)

**Dependencies**:
- React Router 6.x
- GA4 analytics wrapper
- Navigation component

**Example**:
```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage';

export function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Future routes */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
```

---

### 2. Navigation

**File**: `src/components/Navigation/Navigation.tsx`

**Responsibilities**:
- Display logo and navigation links
- Handle mobile menu toggle
- Manage keyboard navigation (escape key)
- Provide sticky header on scroll

**Props**:
```typescript
interface NavigationProps {
  items?: NavItem[];  // Optional; defaults to standard links
  onNavigate?: (path: string) => void;  // Optional callback
}

interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}
```

**State**:
```typescript
{
  mobileMenuOpen: boolean;  // Track mobile menu open/close
}
```

**Accessibility**:
- `aria-label` on hamburger menu
- `aria-expanded` to indicate menu state
- Keyboard navigation (Tab, Escape)
- Semantic `<nav>` and `<button>` elements

**Example**:
```tsx
export function Navigation({ items, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4 md:px-8">
        <a href="/" className="text-2xl font-serif font-bold text-tea-600">
          The Tea Story
        </a>
        {/* Mobile toggle */}
        <button aria-label="Toggle menu" aria-expanded={mobileMenuOpen} className="md:hidden">
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        {/* Desktop nav */}
        <div className="hidden md:flex gap-8">
          {(items || defaultItems).map(item => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </div>
      </div>
      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 py-4 px-4">
          {(items || defaultItems).map(item => (
            <a key={item.href} href={item.href} className="block py-2">{item.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

const defaultItems: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Why Choose Us', href: '/#why-choose-us' },
  { label: 'Featured Teas', href: '/#featured-teas' },
  { label: 'Contact', href: '/#contact' },
];
```

---

### 3. Hero

**File**: `src/components/Hero/Hero.tsx`

**Responsibilities**:
- Display premium hero banner with background image
- Present headline, subheadline, and call-to-action
- Ensure responsive layout and accessibility

**Props**:
```typescript
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImage: string;  // URL or import
  backgroundAlt?: string;
}
```

**State**: None (presentational component)

**Example**:
```tsx
export function Hero({ headline, subheadline, ctaText, ctaUrl, backgroundImage }: HeroProps) {
  return (
    <section
      className="
        relative h-96 md:h-screen
        bg-cover bg-center bg-no-repeat
        flex items-center justify-center
      "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{headline}</h1>
        <p className="text-lg md:text-2xl mb-8">{subheadline}</p>
        <a href={ctaUrl} className="inline-block px-8 py-3 bg-tea-600 hover:bg-tea-700 rounded">
          {ctaText}
        </a>
      </div>
    </section>
  );
}
```

---

### 4. Section

**File**: `src/components/Section/Section.tsx`

**Responsibilities**:
- Provide reusable layout wrapper for homepage sections
- Manage consistent spacing and background colors
- Support optional title and custom styling

**Props**:
```typescript
interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  background?: 'light' | 'dark' | 'none';  // Default: 'light'
  id?: string;  // For anchor links
}
```

**State**: None (presentational)

**Example**:
```tsx
export function Section({ title, children, className = '', background = 'light', id }: SectionProps) {
  const bgClasses = {
    light: 'bg-tea-50',
    dark: 'bg-charcoal-900 text-white',
    none: 'bg-transparent',
  };

  return (
    <section id={id} className={`py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 ${bgClasses[background]} ${className}`}>
      {title && <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">{title}</h2>}
      {children}
    </section>
  );
}
```

---

### 5. FeaturedTeasSection

**File**: `src/components/FeaturedTeasSection/FeaturedTeasSection.tsx`

**Responsibilities**:
- Render grid of featured tea products
- Load data from JSON file
- Pass data to TeaCard components

**Props**:
```typescript
interface FeaturedTeasSectionProps {
  teas?: Tea[];  // Optional; defaults to static JSON data
  onTeaClick?: (tea: Tea) => void;
}

interface Tea {
  id: string;
  name: string;
  image: string;
  description: string;
  teaType: string;
  ctaUrl: string;
}
```

**State**: 
```typescript
{
  teas: Tea[];  // Loaded from src/data/featured-teas.json
}
```

**Example**:
```tsx
import { useEffect, useState } from 'react';
import { TeaCard } from '../TeaCard/TeaCard';
import featuredTeas from '../../data/featured-teas.json';

export function FeaturedTeasSection({ teas: externalTeas, onTeaClick }: FeaturedTeasSectionProps) {
  const [teas, setTeas] = useState<Tea[]>(externalTeas || []);

  useEffect(() => {
    if (!externalTeas) {
      setTeas(featuredTeas);
    }
  }, [externalTeas]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {teas.map(tea => (
        <TeaCard key={tea.id} {...tea} onClick={() => onTeaClick?.(tea)} />
      ))}
    </div>
  );
}
```

---

### 6. TeaCard

**File**: `src/components/TeaCard/TeaCard.tsx`

**Responsibilities**:
- Display individual tea product card
- Show image, name, type, description
- Trigger analytics event on click
- Link to product detail page

**Props**:
```typescript
interface TeaCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  teaType: string;
  ctaUrl: string;
  onClick?: () => void;
}
```

**State**: None

**Example**:
```tsx
import { trackEvent } from '../../services/analytics';

export function TeaCard({ id, name, image, description, teaType, ctaUrl, onClick }: TeaCardProps) {
  const handleClick = () => {
    trackEvent('tea_card_click', { tea_id: id, tea_name: name, tea_type: teaType });
    onClick?.();
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <img src={image} alt={name} className="w-full h-64 object-cover rounded-t-lg" />
      <div className="p-6">
        <span className="text-xs font-semibold text-tea-600 uppercase">{teaType}</span>
        <h3 className="text-xl font-serif font-bold text-charcoal-900 mt-2">{name}</h3>
        <p className="text-sm text-gray-600 mt-3 line-clamp-3">{description}</p>
        <a
          href={ctaUrl}
          onClick={handleClick}
          className="inline-block mt-6 px-6 py-2 bg-tea-600 text-white rounded hover:bg-tea-700 transition"
        >
          View & Pre-Order
        </a>
      </div>
    </div>
  );
}
```

---

### 7. TestimonialCard

**File**: `src/components/TestimonialCard/TestimonialCard.tsx`

**Responsibilities**:
- Display individual testimonial
- Show quote, author, role, image
- Provide consistent styling within testimonials section

**Props**:
```typescript
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}
```

**State**: None

**Example**:
```tsx
export function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-700 italic mb-4">"{quote}"</p>
      <div className="flex items-center gap-4">
        <img src={image} alt={author} className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-semibold text-charcoal-900">{author}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
}
```

---

### 8. NewsletterForm

**File**: `src/components/NewsletterForm/NewsletterForm.tsx`

**Responsibilities**:
- Accept email input
- Validate email format
- Track subscription event
- Store submission in localStorage
- Display success/error messages
- Prevent duplicate submissions in session

**Props**:
```typescript
interface NewsletterFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}
```

**State**:
```typescript
{
  email: string;
  submitted: boolean;
  error: string;
  isLoading: boolean;
}
```

**Example**:
```tsx
import { useState } from 'react';
import { validateEmail } from '../../services/validation';
import { saveFormSubmission, hasDuplicateSubmission } from '../../services/storage';
import { trackEvent } from '../../services/analytics';

export function NewsletterForm({ onSuccess, onError }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateEmail(email);
    if (!validation.valid) {
      const err = validation.error || 'Invalid email';
      setError(err);
      onError?.(err);
      trackEvent('newsletter_signup_submit', { status: 'error', error_code: 'invalid_email' });
      return;
    }

    if (hasDuplicateSubmission(email, 'newsletter')) {
      const err = 'Already subscribed in this session';
      setError(err);
      onError?.(err);
      trackEvent('newsletter_signup_submit', { status: 'error', error_code: 'duplicate' });
      return;
    }

    if (saveFormSubmission({ type: 'newsletter', email })) {
      setSubmitted(true);
      setEmail('');
      onSuccess?.();
      trackEvent('newsletter_signup_submit', { status: 'success' });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      const err = 'Failed to save. Please try again.';
      setError(err);
      onError?.(err);
      trackEvent('newsletter_signup_submit', { status: 'error', error_code: 'storage_error' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="Email address"
        className="px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-tea-500"
      />
      {error && <span className="text-red-600 text-sm">{error}</span>}
      <button
        type="submit"
        className="px-6 py-3 bg-tea-600 text-white rounded hover:bg-tea-700 focus:ring-2 focus:ring-tea-500"
      >
        Subscribe
      </button>
      {submitted && <span className="text-green-600 text-sm">✓ Check your email for exclusive updates</span>}
    </form>
  );
}
```

---

### 9. ContactForm

**File**: `src/components/ContactForm/ContactForm.tsx`

**Responsibilities**:
- Accept email and message input
- Validate both fields
- Track form submission event
- Store submission in localStorage
- Display success/error messages
- Prevent duplicate submissions

**Props**:
```typescript
interface ContactFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}
```

**State**:
```typescript
{
  email: string;
  message: string;
  submitted: boolean;
  errors: Record<string, string>;
}
```

**Example** (similar to NewsletterForm with additional message field):
```tsx
import { useState } from 'react';
import { validateEmail, validateMessage } from '../../services/validation';
import { saveFormSubmission, hasDuplicateSubmission } from '../../services/storage';
import { trackEvent } from '../../services/analytics';

export function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const emailValidation = validateEmail(email);
    const messageValidation = validateMessage(message);

    if (!emailValidation.valid || !messageValidation.valid) {
      const newErrors: Record<string, string> = {};
      if (!emailValidation.valid) newErrors.email = emailValidation.error || '';
      if (!messageValidation.valid) newErrors.message = messageValidation.error || '';
      setErrors(newErrors);
      trackEvent('contact_form_submit', { status: 'error', error_code: 'validation' });
      return;
    }

    if (hasDuplicateSubmission(email, 'contact')) {
      setErrors({ email: 'Already submitted in this session' });
      trackEvent('contact_form_submit', { status: 'error', error_code: 'duplicate' });
      return;
    }

    if (saveFormSubmission({ type: 'contact', email, message })) {
      setSubmitted(true);
      setEmail('');
      setMessage('');
      onSuccess?.();
      trackEvent('contact_form_submit', { status: 'success' });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setErrors({ form: 'Failed to save. Please try again.' });
      trackEvent('contact_form_submit', { status: 'error', error_code: 'storage_error' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium mb-2">Email</label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-tea-500"
        />
        {errors.email && <span className="text-red-600 text-sm mt-1">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-2">Message</label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-tea-500"
        />
        {errors.message && <span className="text-red-600 text-sm mt-1">{errors.message}</span>}
      </div>

      {errors.form && <span className="text-red-600 text-sm">{errors.form}</span>}
      <button type="submit" className="px-6 py-3 bg-tea-600 text-white rounded hover:bg-tea-700">
        Send Message
      </button>
      {submitted && <span className="text-green-600 text-sm">✓ Thank you. We'll be in touch soon.</span>}
    </form>
  );
}
```

---

### 10. Footer

**File**: `src/components/Footer/Footer.tsx`

**Responsibilities**:
- Display footer content (links, copyright, brand info)
- Provide navigation to key pages
- Include contact information

**Props**:
```typescript
interface FooterProps {
  links?: FooterLink[];
  copyright?: string;
}

interface FooterLink {
  label: string;
  href: string;
}
```

**State**: None

**Example**:
```tsx
export function Footer({ links, copyright }: FooterProps) {
  return (
    <footer className="bg-charcoal-900 text-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">The Tea Story</h3>
            <p className="text-gray-400">Premium organic tea for wellness.</p>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-4">
            {(links || defaultLinks).map(link => (
              <a key={link.href} href={link.href} className="hover:text-tea-400 transition">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="text-gray-400">
            <p>contact@example.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>{copyright || '© 2026 The Tea Story. All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
}

const defaultLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];
```

---

## Data Structures

### Tea Data Model

**File**: `src/data/featured-teas.json`

```json
[
  {
    "id": "tea-001",
    "name": "Himalayan Green Essence",
    "image": "/images/featured-tea-green.webp",
    "description": "Delicate green tea from the foothills of the Himalayas, crafted for clarity and wellness. Each sip brings freshness and serenity.",
    "teaType": "Green",
    "ctaUrl": "/products/himalayan-green-essence"
  },
  {
    "id": "tea-002",
    "name": "Darjeeling Black Gold",
    "image": "/images/featured-tea-black.webp",
    "description": "Premium black tea from Darjeeling gardens with subtle floral notes. A sophisticated choice for tea connoisseurs.",
    "teaType": "Black",
    "ctaUrl": "/products/darjeeling-black-gold"
  },
  {
    "id": "tea-003",
    "name": "Oolong Harmony",
    "image": "/images/featured-tea-oolong.webp",
    "description": "Perfectly balanced oolong with fruity undertones. Roasted to perfection for a premium taste experience.",
    "teaType": "Oolong",
    "ctaUrl": "/products/oolong-harmony"
  },
  {
    "id": "tea-004",
    "name": "Herbal Wellness Blend",
    "image": "/images/featured-tea-herbal.webp",
    "description": "Organic herbal blend combining chamomile, lavender, and mint. Perfect for relaxation and mindful moments.",
    "teaType": "Herbal",
    "ctaUrl": "/products/herbal-wellness-blend"
  }
]
```

### Testimonial Data Model

**File**: `src/data/testimonials.json`

```json
[
  {
    "id": "testimonial-001",
    "quote": "The Tea Story transformed my daily wellness ritual into something truly special. The quality is exceptional.",
    "author": "Priya Sharma",
    "role": "Wellness Coach",
    "image": "/images/testimonial-priya.webp"
  },
  {
    "id": "testimonial-002",
    "quote": "As a luxury brand enthusiast, I was impressed by the attention to detail and premium experience at every touchpoint.",
    "author": "James Chen",
    "role": "Luxury Lifestyle Writer",
    "image": "/images/testimonial-james.webp"
  },
  {
    "id": "testimonial-003",
    "quote": "Finally, a tea brand that understands that wellness and indulgence go hand in hand. Highly recommend.",
    "author": "Sophia Moreau",
    "role": "Health & Wellness Consultant",
    "image": "/images/testimonial-sophia.webp"
  }
]
```

---

## State Management Strategy

### Overview
For F-001, local component state and localStorage are sufficient. No global state management (Redux, Zustand) is required yet.

### Approach
1. **Component-Level State**: Each form manages its own state (email, message, submitted, errors)
2. **localStorage**: Form submissions persisted for development/testing
3. **Context (Future)**: Theme/dark mode context if added
4. **API Integration (F-002+)**: Replace localStorage with API calls

### Storage Schema
```typescript
// src/services/storage.ts
interface FormSubmission {
  type: 'newsletter' | 'contact';
  email: string;
  message?: string;
  timestamp: ISO8601String;
}

// Stored at: window.localStorage['tea_story_submissions']
// Format: JSON array of FormSubmission
```

---

## Summary

This data model document provides:
- ✅ Component hierarchy and responsibilities
- ✅ Detailed props and state for each component
- ✅ Data structures for tea and testimonial data
- ✅ State management strategy
- ✅ Implementation examples (code snippets)

**Next Steps**: Implement components following this architecture; leverage TypeScript interfaces for type safety.

---
