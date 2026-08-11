# Implementation Plan: Foundation & Public Website

**Branch**: `001-foundation-public-website` | **Date**: 2026-08-11 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-foundation-public-website/spec.md`

---

## Summary

Establish a premium, responsive public-facing website and frontend foundation for The Tea Story e-commerce platform. The website communicates brand positioning (calm, luxurious, handcrafted, wellness-focused) through hero imagery, brand storytelling, featured teas showcase, social proof, and lead capture mechanisms. The implementation creates reusable React components, design tokens, and responsive layouts that future features (F-002 through F-012) will build upon.

**Technical Approach**: React SPA with TypeScript, Vite build tool, Tailwind CSS for styling, responsive mobile-first design, Google Analytics 4 integration, localStorage for form data (dev/testing), and static JSON data for featured teas and content.

---

## Technical Context

**Language/Version**: TypeScript 5.x (modern version support)

**Primary Dependencies**: 
- React 18.x (UI framework)
- Vite 5.x (build tool)
- Tailwind CSS 3.x (styling)
- React Router 6.x (navigation/routing)
- Google Analytics 4 (gtag.js) (telemetry)
- Axios or native fetch (HTTP client for future API integration)

**Storage**: Browser localStorage only (no backend for this feature; form submissions stored locally for dev/testing)

**Testing**: 
- Vitest (unit tests)
- React Testing Library (component tests)
- Playwright or Cypress (E2E tests)

**Target Platform**: Web browsers (desktop, tablet, mobile); modern browsers (Chrome, Firefox, Safari, Edge) updated within last 12 months

**Project Type**: Web application (single-page application / SPA)

**Performance Goals**: 
- Homepage load under 2 seconds on 4G connection
- Lighthouse performance score 90+
- Lighthouse accessibility score 90+ (WCAG AA)
- Lighthouse SEO score 90+

**Constraints**: 
- No backend APIs required for this feature (static content)
- Mobile-first responsive design (< 768px, 768px–1024px, > 1024px breakpoints)
- Premium brand aesthetic (calm, minimal, elegant visual design)
- WCAG AA accessibility compliance mandatory

**Scale/Scope**: 
- 1 homepage + 7 main sections (Home, About, Why Choose Us, Featured Teas, Testimonials, Contact, Newsletter)
- 8 reusable React components (Hero, Section, Card, Form, Navigation, Footer, etc.)
- 4-6 featured tea products (static JSON)
- 3-5 customer testimonials (static content)
- Responsive layout for 3 device sizes
- Form validation and localStorage integration (newsletter, contact)

---

## Constitution Check

**Gate: Security by Default**
- ✅ No sensitive data transmitted to client during this feature (static content, localhost-only form storage)
- ✅ GA4 integration does not require authentication or credentials
- ⚠️ **Future gate violation on F-005+**: Form submissions must be validated and rate-limited on backend (not applicable to F-001 localStorage-only approach)

**Gate: Maintainable Architecture**
- ✅ Component-based React structure supports modularity
- ✅ TypeScript provides strong typing for maintainability
- ✅ Design tokens (colors, spacing, typography) stored in Tailwind config and CSS variables for reusability
- ⚠️ **Future gate violation on F-002+**: API layer and shared types must be established when backend integration begins

**Gate: Quality & Testing Discipline**
- ✅ Component tests via React Testing Library required for all interactive components (forms, navigation)
- ✅ E2E tests required for primary user journeys (homepage load, form submission, navigation)
- ✅ Accessibility tests automated via axe-core or similar
- ✅ CI/linting/type checking gated before merge
- ⚠️ **Action item**: Add test coverage requirements to PR template

**Gate: Premium Experience Consistency**
- ✅ Design adheres to DesignPrinciples.md (calm, premium, luxury aesthetic)
- ✅ All imagery follows brand guidelines (tea gardens, craftsmanship, natural light)
- ✅ Accessibility compliance supports premium perception (clear navigation, readable text)
- ✅ Component library establishes visual consistency for future features

**Gate: Observability & Change Control**
- ✅ GA4 integration provides page view and interaction tracking
- ✅ No sensitive data logged; health metrics deferred to infrastructure (Azure Application Insights)
- ✅ Feature flags not required for F-001 (no high-risk changes)
- ⚠️ **Future action item on F-005+**: Add rate limiting and backend validation telemetry

**Summary**: All constitution principles are satisfied for F-001. Future features (F-002+) requiring authentication, payment, and API integration will need backend validation, rate limiting, and observability enhancements before implementation.

## Project Structure

### Documentation (this feature)

```text
specs/001-foundation-public-website/
├── plan.md                  # This file (implementation planning)
├── research.md              # Phase 0 output (resolved research items)
├── data-model.md            # Phase 1 output (component architecture, data structures)
├── quickstart.md            # Phase 1 output (dev environment setup guide)
├── contracts/               # Phase 1 output (component and API contracts)
│   ├── featured-teas.json   # Data contract for featured teas JSON schema
│   ├── component-api.md     # Component prop interfaces and usage
│   └── ga4-events.md        # Google Analytics 4 event taxonomy
└── checklists/
    └── requirements.md      # Quality checklist and validation status
```

### Source Code (repository root)

**Selected Structure**: Single project (React SPA)

```text
src/
├── components/
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   ├── Hero.test.tsx
│   │   └── Hero.module.css
│   ├── Navigation/
│   │   ├── Navigation.tsx
│   │   ├── Navigation.test.tsx
│   │   └── Navigation.module.css
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── Card.module.css
│   ├── Section/
│   │   ├── Section.tsx
│   │   └── Section.module.css
│   ├── Form/
│   │   ├── NewsletterForm.tsx
│   │   ├── NewsletterForm.test.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ContactForm.test.tsx
│   │   └── Form.module.css
│   └── Footer/
│       ├── Footer.tsx
│       └── Footer.module.css
├── pages/
│   ├── HomePage.tsx         # Main homepage component
│   ├── HomePage.test.tsx
│   └── HomePage.module.css
├── data/
│   ├── featured-teas.json   # Static featured teas (4-6 teas)
│   └── testimonials.json    # Static testimonials (3-5 quotes)
├── services/
│   ├── storage.ts           # localStorage utilities for form data
│   ├── analytics.ts         # GA4 event tracking wrapper
│   └── validation.ts        # Form validation utilities (email, message)
├── styles/
│   ├── globals.css          # Global Tailwind setup
│   ├── variables.css        # CSS custom properties (brand colors, spacing)
│   └── typography.css       # Premium typography setup
├── utils/
│   ├── classnames.ts        # Utility for conditional CSS classes
│   └── constants.ts         # App constants (breakpoints, GA4 tracking ID)
├── App.tsx                  # Root component
├── App.test.tsx
├── main.tsx                 # Vite entry point
└── vite-env.d.ts           # Vite type definitions

tests/
├── unit/                    # Component unit tests (*.test.tsx files in src/components)
├── integration/             # Integration tests for user flows
│   ├── homepage.test.ts     # Homepage load and interaction
│   ├── forms.test.ts        # Newsletter and contact form submission
│   └── navigation.test.ts   # Navigation between sections
└── e2e/                     # End-to-end tests (Playwright/Cypress)
    ├── homepage.e2e.ts      # Full homepage journey
    ├── forms.e2e.ts         # Form submission flows
    └── mobile.e2e.ts        # Mobile responsiveness validation

public/
├── images/                  # Hero, featured tea, testimonial images
│   ├── hero-bg.jpg
│   ├── featured-tea-*.jpg
│   └── testimonial-*.jpg
├── favicon.ico
└── robots.txt               # SEO

config/
├── tailwind.config.js       # Tailwind CSS configuration (brand colors, breakpoints, typography)
├── vite.config.ts           # Vite build configuration
├── postcss.config.js        # PostCSS + Tailwind setup
└── tsconfig.json            # TypeScript configuration

.github/
├── workflows/
│   └── ci.yml               # CI pipeline (lint, type-check, test, build)
└── copilot-instructions.md  # Agent context (updated by plan)

Docs/                        # Project documentation (already provided)
├── DesignPrinciples.md
├── ProductVision.md
├── TechStack.md
├── UserPersonas.md
└── ...

.specify/
├── templates/               # Feature templates
├── memory/
│   └── constitution.md      # Project constitution
└── scripts/
    └── powershell/          # Spec Kit automation scripts
```

**Structure Decision**: Single React SPA with component-based architecture. Tailwind CSS for styling with custom CSS variables for brand colors. Organized by feature areas (components, pages, services, data, styles, utils). Test files colocated with source files (`.test.tsx` convention) for easy maintenance. Static JSON data files for featured teas and testimonials support future migration to API-driven content.

## Complexity Tracking

| Complexity Area | Assessment | Justification |
|-----------------|------------|---|
| Component Library Foundation | Medium | Must establish reusable component patterns (Hero, Card, Section, Form) that F-002+ features depend on. Design system (colors, typography, spacing) is non-negotiable for premium brand consistency. |
| Responsive Design | Medium | Three breakpoints (mobile, tablet, desktop) with mobile-first approach requires careful CSS organization and thorough testing on multiple devices. |
| Form Validation & Storage | Low-Medium | Newsletter and contact forms require client-side validation and localStorage integration; complexity is manageable with established patterns. |
| Accessibility Compliance | Medium | WCAG AA compliance (semantic HTML, color contrast, keyboard navigation, ARIA labels) is mandatory and requires careful attention during component implementation and testing. |
| Performance Optimization | Low-Medium | Image optimization (WebP, CDN), lazy loading, code splitting, and 2-second load target require systematic performance auditing but are achievable with modern tooling. |
| GA4 Integration | Low | Standard GA4 implementation via script tag and event tracking wrapper; no backend dependency. |

---

## Phase 0: Research & Resolution

### Extracted Research Items

Based on Technical Context and specification requirements, the following items require research or best practices documentation:

1. **Responsive Design Breakpoints & Mobile-First Strategy**
   - Query: Best practices for mobile-first responsive design with React and Tailwind CSS
   - Deliverable: Responsive design architecture (breakpoint strategy, component patterns, testing approach)

2. **Premium Brand Aesthetic & Component Design System**
   - Query: Establishing design tokens and reusable component library for premium e-commerce UI
   - Deliverable: Design system setup (Tailwind config, CSS variables, component library structure)

3. **Form Validation & localStorage Integration Patterns**
   - Query: Client-side form validation with React and persistent storage patterns for development/testing
   - Deliverable: Form handling patterns, validation utilities, localStorage wrapper architecture

4. **Accessibility Compliance (WCAG AA) in React**
   - Query: Implementing WCAG AA standards (semantic HTML, color contrast, keyboard navigation, ARIA) in React components
   - Deliverable: Accessibility checklist, component patterns, testing strategies

5. **Google Analytics 4 Integration in React SPA**
   - Query: GA4 implementation in React applications (event tracking, page view tracking, session management)
   - Deliverable: GA4 wrapper service, event taxonomy, integration patterns

6. **Image Optimization for E-commerce (WebP, CDN, Lazy Loading)**
   - Query: Image optimization strategies for premium e-commerce websites (format, size, delivery)
   - Deliverable: Image optimization approach, CDN strategy, lazy loading patterns

7. **SEO Fundamentals for React SPA**
   - Query: SEO best practices for single-page applications (Open Graph, meta tags, structured data, static generation)
   - Deliverable: SEO implementation strategy (client-side vs. static generation), tooling recommendations

### Research Dispatch

*Phase 0 will resolve each research item and document findings in `research.md`. Key outputs:*

- ✅ **Responsive Design Architecture**: Breakpoint strategy (< 768px mobile, 768px–1024px tablet, > 1024px desktop), component patterns (mobile-first CSS, conditional rendering), testing approach
- ✅ **Design System Setup**: Tailwind config with brand colors (forest green #2A5F3A, earth brown #8B6F47, etc.), typography scale, spacing system, reusable component patterns
- ✅ **Form Handling Patterns**: Email validation regex, message field requirements, localStorage wrapper with JSON serialization, duplicate prevention via session ID
- ✅ **Accessibility Strategy**: Semantic HTML structure, color contrast verification (4.5:1), keyboard navigation patterns, ARIA labels for forms and interactive elements, axe-core testing integration
- ✅ **GA4 Integration**: Event tracking wrapper, event taxonomy (page_view, tea_card_click, newsletter_signup, contact_form_submit), deployment configuration
- ✅ **Image Optimization**: WebP conversion with PNG fallback, hero image < 200KB, responsive images with srcset, lazy loading for testimonial/featured tea images
- ✅ **SEO Approach**: Static HTML generation (via Vite + static export) or SSR considerations for future API integration, Open Graph meta tags, structured data (Organization + LocalBusiness schemas)

---

## Phase 1: Design & Contracts

### 1a. Component Architecture (data-model.md output)

**React Component Hierarchy**:

```
App
├── Navigation                 # Sticky header with responsive menu
│   ├── Logo
│   ├── NavLinks              # Home, About, Why Choose Us, etc.
│   └── MobileMenu            # Hamburger menu for mobile
├── HomePage
│   ├── Hero                  # Premium hero section with CTA
│   ├── FeaturedTeasSection   # 4-6 tea cards grid
│   │   └── TeaCard (x4-6)    # Individual tea product card
│   ├── AboutSection          # Brand story and mission
│   ├── WhyChooseUsSection    # Competitive differentiators
│   ├── TestimonialsSection   # 3-5 testimonial cards
│   │   └── TestimonialCard (x3-5)
│   ├── NewsletterSection     # Email signup form
│   │   └── NewsletterForm
│   ├── ContactSection        # Contact info + form
│   │   └── ContactForm
│   ├── Section               # Reusable section wrapper
│   └── Footer
└── [Future: Auth, Catalog, Details, Cart, Checkout pages]
```

**Component Data Model**:

| Component | Props | State | Responsibilities |
|-----------|-------|-------|------------------|
| **Hero** | `headline`, `subheadline`, `ctaText`, `ctaUrl`, `backgroundImage` | (none) | Display premium hero banner with imagery and CTA |
| **TeaCard** | `id`, `name`, `image`, `description`, `teaType`, `ctaUrl` | (none) | Display individual featured tea product |
| **FeaturedTeasSection** | `teas` (array of TeaCard props) | (none) | Grid layout for 4-6 featured teas |
| **Section** | `title`, `children`, `className` | (none) | Reusable section wrapper with consistent spacing |
| **NewsletterForm** | `onSuccess` callback | `email`, `submitted`, `error` | Email input, validation, success message, localStorage storage |
| **ContactForm** | `onSuccess` callback | `email`, `message`, `submitted`, `errors` | Email/message inputs, validation, success message, localStorage storage |
| **Navigation** | `items`, `onNavigate` callback | `mobileMenuOpen` | Responsive navigation with mobile hamburger menu |
| **Footer** | `links`, `copyright` | (none) | Footer with links and copyright |

### 1b. Data Contracts (contracts/ output)

**Featured Teas JSON Schema** (`src/data/featured-teas.json`):

```json
[
  {
    "id": "tea-001",
    "name": "Himalayan Green Essence",
    "image": "/images/featured-tea-green.jpg",
    "description": "Delicate green tea from the foothills of Himalayas, crafted for clarity and wellness.",
    "teaType": "Green",
    "ctaUrl": "/products/himalayan-green-essence"
  },
  { ... 3-5 more teas }
]
```

**Testimonials JSON Schema** (`src/data/testimonials.json`):

```json
[
  {
    "id": "testimonial-001",
    "quote": "The Tea Story transforms my daily wellness ritual into something truly special.",
    "author": "Priya Sharma",
    "role": "Wellness Coach",
    "image": "/images/testimonial-priya.jpg"
  },
  { ... 2-4 more testimonials }
]
```

**GA4 Event Taxonomy** (`contracts/ga4-events.md`):

```
Events:
- page_view (standard)
  - page_location
  - page_title
- tea_card_click
  - tea_id
  - tea_name
  - tea_type
- newsletter_signup_submit
  - status (success | error)
  - error_code (if applicable)
- contact_form_submit
  - status (success | error)
  - error_code (if applicable)
```

**Component API Contract** (`contracts/component-api.md`):

```typescript
// Example: Hero component interface
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImage: string; // URL or import
}

// Form state shape
interface FormState {
  email: string;
  submitted: boolean;
  error?: string;
}
```

### 1c. Quickstart Guide (quickstart.md output)

**Development Environment Setup**:

```bash
# Clone and setup
git clone <repo>
cd Tea
npm install

# Environment variables (.env.local)
VITE_GA4_TRACKING_ID=G-XXXXXXXXXX

# Development server
npm run dev
# Open http://localhost:5173

# Run tests
npm run test          # Unit + component tests
npm run test:e2e      # End-to-end tests
npm run test:a11y     # Accessibility tests

# Build for production
npm run build
npm run preview       # Preview production build locally

# Lint and type check
npm run lint
npm run type-check
```

**Key Development Files**:

- `src/App.tsx` - Root component entry point
- `src/pages/HomePage.tsx` - Main homepage implementation
- `src/components/` - Reusable component library
- `src/data/` - Static JSON data for featured teas, testimonials
- `src/services/storage.ts` - localStorage utilities (forms)
- `src/services/analytics.ts` - GA4 wrapper
- `tailwind.config.js` - Brand colors and design tokens
- `.github/workflows/ci.yml` - CI/CD pipeline

**Common Tasks**:

1. Add a new reusable component: Create file in `src/components/<Name>/`, write component + test file, export from `src/components/index.ts`
2. Update brand colors: Modify `tailwind.config.js` (primary/secondary color scales) or `src/styles/variables.css` (CSS custom properties)
3. Add new testimonial: Add entry to `src/data/testimonials.json`, image file to `public/images/`
4. Test form validation: Check `src/services/validation.ts` for email/message rules
5. Debug GA4 events: Check `src/services/analytics.ts` and browser DevTools Network tab for gtag requests

### 1d. Agent Context Update

Update `.github/copilot-instructions.md` to reference the implementation plan:

```markdown
<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan:

📄 **Implementation Plan**: [specs/001-foundation-public-website/plan.md](specs/001-foundation-public-website/plan.md)  
📋 **Component Architecture**: [specs/001-foundation-public-website/data-model.md](specs/001-foundation-public-website/data-model.md)  
📝 **Data Contracts**: [specs/001-foundation-public-website/contracts/](specs/001-foundation-public-website/contracts/)  
🚀 **Dev Setup**: [specs/001-foundation-public-website/quickstart.md](specs/001-foundation-public-website/quickstart.md)  

**Feature**: F-001 Foundation & Public Website  
**Status**: Planning Phase Complete → Ready for Implementation  
**Tech Stack**: React 18 + TypeScript + Vite + Tailwind CSS  

<!-- SPECKIT END -->
```

---

## Phase 1 Summary

✅ **Technical Context Established**: React/Vite/TypeScript stack with Tailwind CSS, Google Analytics 4, localStorage for forms, static JSON data

✅ **Constitution Compliance Verified**: All 5 principles satisfied; future features (F-002+) will need backend validation and observability enhancements

✅ **Component Architecture Designed**: 8-10 reusable React components organized by responsibility, with clear prop interfaces and state management

✅ **Data Contracts Defined**: Featured teas JSON schema, testimonials data structure, GA4 event taxonomy, component API interfaces

✅ **Project Structure Documented**: Source tree with component library, pages, services, styles, and test organization established

✅ **Quickstart Guide Created**: Development environment setup, key file locations, common tasks documented for team reference

---

## Phase 2: Post-Design Constitution Re-evaluation

**Re-check Against Constitution**:

| Principle | Pre-Design Status | Post-Design Status | Action Required |
|-----------|------|------|---|
| Security by Default | ✅ Pass | ✅ Pass | None; localStorage approach is safe for dev/testing |
| Maintainable Architecture | ⚠️ Requires design | ✅ Pass | Component library structure and TypeScript typing established |
| Quality & Testing Discipline | ⚠️ Requires design | ✅ Pass | React Testing Library + Vitest setup defined; E2E tests required |
| Premium Experience Consistency | ✅ Pass | ✅ Pass | Design system (colors, typography) supports brand alignment |
| Observability & Change Control | ⚠️ Partial | ✅ Pass | GA4 integration defined; infrastructure monitoring deferred to ops |

**Conclusion**: Design phase satisfies all constitution gates. Feature is ready for `/speckit.tasks` (task generation and breakdown).

---

## Recommended Next Steps

✅ **Phase 0 (Research)**: Generate `research.md` with best practices for responsive design, accessibility, GA4, form handling, image optimization, and SEO

✅ **Phase 1 (Design)**: Generate `data-model.md`, `contracts/`, and `quickstart.md` files (detailed above)

✅ **Phase 1 (Agent Context)**: Update `.github/copilot-instructions.md` with plan file reference

➡️ **Next Command**: Run `/speckit.tasks` to generate `tasks.md` with prioritized, dependency-ordered implementation tasks

---
