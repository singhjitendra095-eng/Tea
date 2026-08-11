# Data Contracts & Component API

**Feature**: F-001 Foundation & Public Website  
**Date**: 2026-08-11  
**Version**: 1.0

---

## Featured Teas Schema

**File**: `src/data/featured-teas.json`

**Purpose**: Define the structure of featured tea products displayed in the FeaturedTeasSection

**Schema**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "minItems": 4,
  "maxItems": 6,
  "items": {
    "type": "object",
    "required": ["id", "name", "image", "description", "teaType", "ctaUrl"],
    "properties": {
      "id": {
        "type": "string",
        "pattern": "^tea-[0-9]{3}$",
        "description": "Unique identifier for the tea product (format: tea-001)"
      },
      "name": {
        "type": "string",
        "minLength": 3,
        "maxLength": 50,
        "description": "Product name (e.g., 'Himalayan Green Essence')"
      },
      "image": {
        "type": "string",
        "pattern": "^/images/.*\\.(jpg|jpeg|png|webp)$",
        "description": "Path to product image (URL or local path)"
      },
      "description": {
        "type": "string",
        "minLength": 20,
        "maxLength": 200,
        "description": "Brief product description (20-200 characters)"
      },
      "teaType": {
        "type": "string",
        "enum": ["Green", "Black", "Oolong", "White", "Pu-erh", "Herbal"],
        "description": "Tea category/type"
      },
      "ctaUrl": {
        "type": "string",
        "pattern": "^/products/[a-z-]+$",
        "description": "Call-to-action URL (link to product detail page)"
      }
    }
  }
}
```

**Example Data**:
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
  }
]
```

---

## Testimonials Schema

**File**: `src/data/testimonials.json`

**Purpose**: Define the structure of testimonial/social proof data displayed in the TestimonialsSection

**Schema**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "minItems": 3,
  "maxItems": 5,
  "items": {
    "type": "object",
    "required": ["id", "quote", "author", "role", "image"],
    "properties": {
      "id": {
        "type": "string",
        "pattern": "^testimonial-[0-9]{3}$",
        "description": "Unique identifier (format: testimonial-001)"
      },
      "quote": {
        "type": "string",
        "minLength": 50,
        "maxLength": 300,
        "description": "Customer testimonial text (50-300 characters)"
      },
      "author": {
        "type": "string",
        "minLength": 3,
        "maxLength": 50,
        "description": "Customer name"
      },
      "role": {
        "type": "string",
        "minLength": 5,
        "maxLength": 50,
        "description": "Customer role/profession (e.g., 'Wellness Coach')"
      },
      "image": {
        "type": "string",
        "pattern": "^/images/.*\\.(jpg|jpeg|png|webp)$",
        "description": "Path to testimonial author's image"
      }
    }
  }
}
```

**Example Data**:
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
    "quote": "As a luxury brand enthusiast, I was impressed by the attention to detail and premium experience.",
    "author": "James Chen",
    "role": "Luxury Lifestyle Writer",
    "image": "/images/testimonial-james.webp"
  }
]
```

---

## Google Analytics 4 Event Schema

**File**: `contracts/ga4-events.md`

**Purpose**: Define the event taxonomy for tracking user interactions with GA4

### Events

#### page_view
**Trigger**: When user lands on or navigates to a page

**Properties**:
| Property | Type | Required | Description |
|----------|------|----------|---|
| `page_location` | string | Yes | Current page URL |
| `page_title` | string | Yes | Page title (e.g., "Homepage") |

**Example**:
```javascript
gtag('event', 'page_view', {
  page_location: 'https://example.com/',
  page_title: 'Home'
});
```

---

#### tea_card_click
**Trigger**: When user clicks on a featured tea product card

**Properties**:
| Property | Type | Required | Description |
|----------|------|----------|---|
| `tea_id` | string | Yes | Tea product ID (e.g., "tea-001") |
| `tea_name` | string | Yes | Tea product name |
| `tea_type` | string | Yes | Tea type/category (Green, Black, etc.) |

**Example**:
```javascript
gtag('event', 'tea_card_click', {
  tea_id: 'tea-001',
  tea_name: 'Himalayan Green Essence',
  tea_type: 'Green'
});
```

**Use Case**: Understand which products generate the most interest

---

#### newsletter_signup_submit
**Trigger**: When user submits the newsletter signup form

**Properties**:
| Property | Type | Required | Description |
|----------|------|----------|---|
| `status` | string ('success' \| 'error') | Yes | Submission outcome |
| `error_code` | string | No | Error code if status is 'error' |

**Error Codes**:
- `invalid_email`: Email validation failed
- `duplicate`: User already subscribed in session
- `storage_error`: localStorage save failed

**Example**:
```javascript
// Success
gtag('event', 'newsletter_signup_submit', {
  status: 'success'
});

// Error
gtag('event', 'newsletter_signup_submit', {
  status: 'error',
  error_code: 'invalid_email'
});
```

**Use Case**: Track newsletter conversion rate and signup funnel issues

---

#### contact_form_submit
**Trigger**: When user submits the contact form

**Properties**:
| Property | Type | Required | Description |
|----------|------|----------|---|
| `status` | string ('success' \| 'error') | Yes | Form submission outcome |
| `error_code` | string | No | Error code if status is 'error' |

**Error Codes**:
- `validation`: Email or message validation failed
- `duplicate`: User already submitted in session
- `storage_error`: localStorage save failed

**Example**:
```javascript
// Success
gtag('event', 'contact_form_submit', {
  status: 'success'
});

// Error
gtag('event', 'contact_form_submit', {
  status: 'error',
  error_code: 'validation'
});
```

**Use Case**: Track contact form engagement and identify potential issues

---

### GA4 Dashboard Recommendations

**Key Metrics**:
- Bounce rate (pages / sessions)
- Average engagement time
- Conversion rate (newsletter signups / visitors)
- Top traffic sources
- Device/OS distribution

**Segment Suggestions**:
- New vs. Returning users
- Mobile vs. Desktop
- Traffic source (organic, direct, social)

---

## Component API Contracts

### Hero Component

**File**: `src/components/Hero/Hero.tsx`

**TypeScript Interface**:
```typescript
interface HeroProps {
  /** Page headline/main title */
  headline: string;

  /** Secondary headline/subtitle */
  subheadline: string;

  /** Call-to-action button text */
  ctaText: string;

  /** Call-to-action button URL */
  ctaUrl: string;

  /** Background image URL or import path */
  backgroundImage: string;

  /** Alt text for background image (optional) */
  backgroundAlt?: string;
}
```

**Example Usage**:
```tsx
import { Hero } from './components/Hero/Hero';
import heroImage from './images/hero-tea-garden.webp';

export function HomePage() {
  return (
    <Hero
      headline="Discover Premium Organic Tea"
      subheadline="Elevate your wellness ritual with handcrafted teas from the world's finest gardens"
      ctaText="Explore Our Collection"
      ctaUrl="/#featured-teas"
      backgroundImage={heroImage}
      backgroundAlt="Tea gardens at sunrise"
    />
  );
}
```

---

### TeaCard Component

**File**: `src/components/TeaCard/TeaCard.tsx`

**TypeScript Interface**:
```typescript
interface TeaCardProps {
  /** Unique tea product identifier */
  id: string;

  /** Product name */
  name: string;

  /** Product image URL or path */
  image: string;

  /** Brief product description */
  description: string;

  /** Tea category (Green, Black, Oolong, etc.) */
  teaType: string;

  /** Call-to-action link */
  ctaUrl: string;

  /** Optional click handler (for analytics) */
  onClick?: () => void;
}
```

**Example Usage**:
```tsx
import { TeaCard } from './components/TeaCard/TeaCard';

const tea = {
  id: 'tea-001',
  name: 'Himalayan Green Essence',
  image: '/images/featured-tea-green.webp',
  description: 'Delicate green tea from the foothills of the Himalayas...',
  teaType: 'Green',
  ctaUrl: '/products/himalayan-green-essence'
};

export function FeaturedTeasSection() {
  return (
    <TeaCard
      {...tea}
      onClick={() => console.log('Tea clicked:', tea.id)}
    />
  );
}
```

---

### Section Component

**File**: `src/components/Section/Section.tsx`

**TypeScript Interface**:
```typescript
interface SectionProps {
  /** Optional section title (rendered as h2) */
  title?: string;

  /** Section content (React nodes) */
  children: React.ReactNode;

  /** Additional CSS classes for styling */
  className?: string;

  /** Background color style ('light', 'dark', 'none') */
  background?: 'light' | 'dark' | 'none';

  /** HTML id attribute for anchor links */
  id?: string;
}
```

**Example Usage**:
```tsx
import { Section } from './components/Section/Section';

export function HomePage() {
  return (
    <Section
      id="featured-teas"
      title="Featured Teas"
      background="light"
      className="py-20"
    >
      {/* Tea cards go here */}
    </Section>
  );
}
```

---

### NewsletterForm Component

**File**: `src/components/NewsletterForm/NewsletterForm.tsx`

**TypeScript Interface**:
```typescript
interface NewsletterFormProps {
  /** Optional callback on successful submission */
  onSuccess?: () => void;

  /** Optional callback on error */
  onError?: (error: string) => void;
}
```

**Example Usage**:
```tsx
import { NewsletterForm } from './components/NewsletterForm/NewsletterForm';

export function NewsletterSection() {
  return (
    <NewsletterForm
      onSuccess={() => console.log('Newsletter signup successful')}
      onError={(error) => console.error('Newsletter signup failed:', error)}
    />
  );
}
```

**Behavior**:
- Validates email format using regex
- Checks for duplicate submissions in current session
- Stores submission in localStorage
- Displays success/error messages
- Tracks GA4 event: `newsletter_signup_submit`

---

### ContactForm Component

**File**: `src/components/ContactForm/ContactForm.tsx`

**TypeScript Interface**:
```typescript
interface ContactFormProps {
  /** Optional callback on successful submission */
  onSuccess?: () => void;

  /** Optional callback on error */
  onError?: (error: string) => void;
}
```

**Example Usage**:
```tsx
import { ContactForm } from './components/ContactForm/ContactForm';

export function ContactSection() {
  return (
    <ContactForm
      onSuccess={() => console.log('Contact form submitted')}
      onError={(error) => console.error('Contact form error:', error)}
    />
  );
}
```

**Behavior**:
- Validates email and message fields
- Checks for duplicate submissions
- Stores submission in localStorage
- Displays inline field errors
- Tracks GA4 event: `contact_form_submit`

---

### Navigation Component

**File**: `src/components/Navigation/Navigation.tsx`

**TypeScript Interface**:
```typescript
interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface NavigationProps {
  /** Optional navigation items; defaults to standard links */
  items?: NavItem[];

  /** Optional callback when user navigates */
  onNavigate?: (path: string) => void;
}
```

**Example Usage**:
```tsx
import { Navigation } from './components/Navigation/Navigation';

export function App() {
  return (
    <Navigation
      items={[
        { label: 'About', href: '/#about' },
        { label: 'Featured Teas', href: '/#featured-teas' },
      ]}
      onNavigate={(path) => console.log('Navigating to:', path)}
    />
  );
}
```

---

## Form Submission Storage Format

**localStorage Key**: `tea_story_submissions`

**Data Structure**:
```typescript
interface FormSubmission {
  type: 'newsletter' | 'contact';
  email: string;
  message?: string;  // Only for contact form
  timestamp: ISO8601String;  // e.g., "2026-08-11T10:30:00.000Z"
}

// Stored as JSON array
// Example: [
//   { type: 'newsletter', email: 'user@example.com', timestamp: '2026-08-11T10:30:00.000Z' },
//   { type: 'contact', email: 'user@example.com', message: 'I have a question...', timestamp: '2026-08-11T10:31:00.000Z' }
// ]
```

**Retrieval**:
```typescript
const submissions = JSON.parse(localStorage.getItem('tea_story_submissions') || '[]');
console.log(submissions);  // Array of FormSubmission objects
```

---

## Summary

This contracts document defines:
- ✅ Featured teas JSON schema (4-6 products)
- ✅ Testimonials JSON schema (3-5 testimonials)
- ✅ GA4 event taxonomy (4 core events)
- ✅ Component API interfaces (TypeScript)
- ✅ Form submission storage format

**Usage**: Reference these contracts during component implementation to ensure consistency and type safety.

---
