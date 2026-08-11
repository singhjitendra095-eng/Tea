# Tasks: Foundation & Public Website

**Feature**: F-001 Foundation & Public Website  
**Input**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/)  
**Date**: 2026-08-11  
**Status**: Ready for Implementation

---

## Overview

This document defines all implementation tasks for the Foundation & Public Website feature, organized by user story to enable independent implementation and testing. Each user story can be developed, tested, and deployed independently.

**Task Organization**:
- **Phase 1**: Setup (shared infrastructure)
- **Phase 2**: Foundational (blocking prerequisites)
- **Phases 3-7**: P1 User Stories (brand discovery, brand learning, competitive advantage, navigation, mobile)
- **Phases 8-10**: P2 User Stories (social proof, newsletter, contact)
- **Phase 11**: Polish & Cross-Cutting Concerns

**Testing Strategy**:
- **Unit Tests**: Validation rules, utility functions
- **Component Tests**: Each React component with React Testing Library
- **E2E Tests**: Primary user journeys (homepage load, form submissions, navigation)
- **Accessibility Tests**: WCAG AA compliance with axe-core

---

## Parallel Execution Guide

**Phase 1-2 must complete first** (shared infrastructure and foundational components)

**After Phase 2, all P1 user stories can run in parallel**:
- US1 (Hero/FeaturedTeas) runs independently
- US2 (About Section) runs independently
- US3 (Why Choose Us Section) runs independently
- US6 (Navigation routing) runs independently
- US7 (Responsive design testing) runs independently

**After P1 stories, P2 stories can run in parallel**:
- US4 (Testimonials) independent of forms
- US5 (Newsletter) independent of contact
- US8 (Contact) independent of forms

**Suggested sprint structure**:
- Sprint 1: Phase 1-2 (Setup + Foundational) + all P1 stories in parallel
- Sprint 2: All P2 stories + Phase 11 Polish

---

## Phase 1: Setup & Project Initialization

**Purpose**: Initialize project structure, dependencies, and configuration

- [ ] T001 Create project structure per implementation plan in `src/`, `tests/`, `public/` folders
- [ ] T002 Initialize npm dependencies (React 18, TypeScript 5, Vite 5, Tailwind CSS, React Router, testing tools)
- [ ] T003 [P] Configure Vite (vite.config.ts) with React plugin and build optimizations
- [ ] T004 [P] Configure TypeScript (tsconfig.json) with strict mode and React JSX settings
- [ ] T005 [P] Configure Tailwind CSS (tailwind.config.js) with brand color palette and responsive breakpoints
- [ ] T006 [P] Configure ESLint and Prettier for code style
- [ ] T007 [P] Configure Vitest for unit testing (vitest.config.ts)
- [ ] T008 [P] Setup GitHub Actions CI/CD pipeline in `.github/workflows/ci.yml` for lint, type-check, test, build
- [ ] T009 Create `.env.local` template with VITE_GA4_TRACKING_ID placeholder
- [ ] T010 [P] Create global CSS foundation (src/styles/index.css) with Tailwind imports and CSS custom properties (src/styles/variables.css)
- [ ] T011 Create src/main.tsx entry point with React.StrictMode and root component rendering
- [ ] T012 Create public/index.html with GA4 script tag template (VITE_GA4_TRACKING_ID injected at build time)

**Checkpoint**: Project structure ready; npm run dev, build, test all work correctly

---

## Phase 2: Foundational Components & Services

**Purpose**: Build reusable infrastructure that ALL user stories depend on

**⚠️ CRITICAL**: These tasks MUST complete before user story implementation begins. No story-specific work starts until Phase 2 is 100% done.

### Core Services

- [ ] T013 Implement validation service in `src/services/validation.ts` with validateEmail() and validateMessage() functions per [contracts/component-api.md](contracts/component-api.md)
- [ ] T014 [P] Implement localStorage storage wrapper in `src/services/storage.ts` with saveFormSubmission(), getFormSubmissions(), hasDuplicateSubmission(), getSessionId() per research.md
- [ ] T015 [P] Implement GA4 analytics wrapper in `src/services/analytics.ts` with trackEvent() and trackPageView() functions per [contracts/ga4-events.md](contracts/ga4-events.md)

### Unit Tests for Services (T013-T015)

- [ ] T016 [P] Unit tests for validation service (validateEmail, validateMessage) in `tests/services/validation.test.ts`
- [ ] T017 [P] Unit tests for storage service (save, retrieve, duplicate detection) in `tests/services/storage.test.ts`
- [ ] T018 [P] Unit tests for analytics service (gtag calls) in `tests/services/analytics.test.ts`

### Foundational Components

- [ ] T019 Implement Section wrapper component in `src/components/Section/Section.tsx` per [data-model.md](data-model.md) – used by all sections
- [ ] T020 [P] Create component export index in `src/components/index.ts` for easy importing
- [ ] T021 [P] Create pages directory structure (`src/pages/HomePage.tsx` as starting point)
- [ ] T022 [P] Setup React Router (BrowserRouter, Routes) in `src/App.tsx` with initial route to HomePage

### Foundational Component Tests

- [ ] T023 Component test for Section wrapper in `tests/components/Section.test.tsx`

### Data Setup

- [ ] T024 [P] Create featured teas static data file `src/data/featured-teas.json` with 4-6 teas per [contracts/component-api.md](contracts/component-api.md)
- [ ] T025 [P] Create testimonials static data file `src/data/testimonials.json` with 3-5 testimonials per [contracts/component-api.md](contracts/component-api.md)

**Checkpoint**: Services tested ✅ | Foundational components ready ✅ | Data files created ✅ | Ready for user story implementation

---

## Phase 3: User Story 1 – Visitor Discovers Premium Brand (P1) 🎯

**Goal**: Visitor lands on homepage, sees hero section with premium imagery and brand tagline, discovers featured teas

**Independent Test**: Load homepage → Hero section visible with background image, headline, subheadline, CTA → Scroll to featured teas section → See 4-6 tea cards with images, names, types, descriptions → Click tea card → Navigate to placeholder product page

### Implementation Tasks for US1

- [ ] T026 [P] [US1] Implement Hero component in `src/components/Hero/Hero.tsx` per [data-model.md](data-model.md) with responsive background image and CTA button
- [ ] T027 [P] [US1] Implement FeaturedTeasSection component in `src/components/FeaturedTeasSection/FeaturedTeasSection.tsx` that loads 4-6 teas from JSON
- [ ] T028 [P] [US1] Implement TeaCard component in `src/components/TeaCard/TeaCard.tsx` displaying tea image, name, type badge, description, CTA link
- [ ] T029 [US1] Integrate Hero + FeaturedTeasSection into `src/pages/HomePage.tsx` with Section wrappers and proper layout spacing
- [ ] T030 [P] [US1] Create Tea card click analytics event tracking in TeaCard.tsx (calls trackEvent 'tea_card_click')
- [ ] T031 [P] [US1] Optimize hero image (WebP, < 100KB) and featured tea images (< 80KB each) – store in `public/images/`
- [ ] T032 [P] [US1] Create OptimizedImage component in `src/components/OptimizedImage/OptimizedImage.tsx` with lazy loading for below-fold images per research.md

### Component Tests for US1

- [ ] T033 [P] [US1] Component tests for Hero in `tests/components/Hero.test.tsx` (renders headline, CTA button, background image)
- [ ] T034 [P] [US1] Component tests for TeaCard in `tests/components/TeaCard.test.tsx` (renders name, description, type badge, triggers analytics)
- [ ] T035 [P] [US1] Component tests for FeaturedTeasSection in `tests/components/FeaturedTeasSection.test.tsx` (loads 4-6 teas from data, renders cards)

### E2E Tests for US1

- [ ] T036 [US1] E2E test in `tests/e2e/homepage-brand-discovery.spec.ts`: User lands on homepage → page loads < 2s → Hero visible with image → Scroll to featured teas → See 4-6 cards → Click one card → Navigate to product detail page

**Checkpoint**: US1 complete – Hero and featured teas fully functional and independently testable ✅

---

## Phase 4: User Story 2 – Visitor Learns About Brand (P1)

**Goal**: Visitor sees About section with brand mission, story, and lifestyle photography

**Independent Test**: Scroll to About section on homepage → See brand mission statement → Read brand story copy → View premium photography of tea gardens/craftsmanship → Understand brand values

### Implementation Tasks for US2

- [ ] T037 [P] [US2] Implement AboutSection component in `src/components/AboutSection/AboutSection.tsx` with brand mission, story copy, and lifestyle imagery
- [ ] T038 [P] [US2] Create about section text content (mission statement, brand story, values) – store in `src/data/about.json` or hardcode in component
- [ ] T039 [US2] Integrate AboutSection into `src/pages/HomePage.tsx` with Section wrapper (id="about" for anchor linking)
- [ ] T040 [P] [US2] Optimize about section images (photography of tea gardens, craftsmanship) for web delivery per research.md

### Component Tests for US2

- [ ] T041 [P] [US2] Component test for AboutSection in `tests/components/AboutSection.test.tsx` (renders mission, story text, images)

### E2E Tests for US2

- [ ] T042 [US2] E2E test in `tests/e2e/about-section.spec.ts`: User scrolls to About section → Sees mission statement → Reads brand story → Views imagery

**Checkpoint**: US2 complete – About section fully functional ✅

---

## Phase 5: User Story 3 – Visitor Understands Competitive Advantage (P1)

**Goal**: Visitor sees Why Choose Us section with 3-5 key differentiators (premium sourcing, wellness focus, sustainability, packaging, customization)

**Independent Test**: Scroll to Why Choose Us section → See 3-5 benefit cards or list items → Each benefit highlights competitive advantage → Text speaks to target personas

### Implementation Tasks for US3

- [ ] T043 [P] [US3] Implement WhyChooseUsSection component in `src/components/WhyChooseUsSection/WhyChooseUsSection.tsx` displaying 3-5 differentiators
- [ ] T044 [P] [US3] Create why-choose-us content (benefits list) in `src/data/why-choose-us.json` or hardcode in component
- [ ] T045 [US3] Integrate WhyChooseUsSection into `src/pages/HomePage.tsx` with Section wrapper (id="why-choose-us" for anchor linking)
- [ ] T046 [P] [US3] Optional: Create BenefitCard sub-component if benefits need special styling/icons

### Component Tests for US3

- [ ] T047 [P] [US3] Component test for WhyChooseUsSection in `tests/components/WhyChooseUsSection.test.tsx` (renders all differentiators)

### E2E Tests for US3

- [ ] T048 [US3] E2E test in `tests/e2e/why-choose-us-section.spec.ts`: User scrolls to Why Choose Us → Sees 3-5 benefits → Text is readable and compelling

**Checkpoint**: US3 complete – Why Choose Us section fully functional ✅

---

## Phase 6: User Story 6 – Visitor Navigates Seamlessly (P1)

**Goal**: Navigation menu works on all pages, links to all major sections (Home, About, Why Choose Us, Featured Teas, Contact), mobile-friendly hamburger menu

**Independent Test**: User clicks navigation links → Correct sections scroll into view OR pages load correctly → Mobile menu opens/closes → Keyboard navigation (Tab) works

### Implementation Tasks for US6

- [ ] T049 Implement Navigation component in `src/components/Navigation/Navigation.tsx` with sticky header, responsive menu, mobile hamburger per [data-model.md](data-model.md)
- [ ] T050 [P] [US6] Create navigation styling for desktop (horizontal menu) and mobile (hamburger + dropdown)
- [ ] T051 [US6] Integrate Navigation into `src/App.tsx` to appear on all pages
- [ ] T052 [P] [US6] Implement mobile menu open/close state and keyboard handling (Escape to close) per research.md accessibility requirements
- [ ] T053 [P] [US6] Create navigation link destinations (Home → /, About → /#about, etc.) – use hash-based routing or React Router scroll-to-id
- [ ] T054 [P] [US6] Add ARIA labels to Navigation for accessibility (aria-label on hamburger, aria-expanded menu state)

### Component Tests for US6

- [ ] T055 [P] [US6] Component test for Navigation in `tests/components/Navigation.test.tsx` (renders links, hamburger menu, mobile/desktop layouts, keyboard events)

### E2E Tests for US6

- [ ] T056 [US6] E2E test in `tests/e2e/navigation.spec.ts`: User clicks desktop nav links → sections scroll to view → Mobile menu opens/closes → Keyboard navigation (Tab, Escape) works

**Checkpoint**: US6 complete – Navigation fully functional across all pages ✅

---

## Phase 7: User Story 7 – Visitor Accesses Website on Mobile (P1)

**Goal**: Website renders perfectly on mobile, tablet, and desktop with responsive design (mobile-first)

**Independent Test**: Load website on 5+ different screen sizes (mobile < 768px, tablet 768-1024px, desktop > 1024px) → All content visible without horizontal scrolling → Images scale correctly → Touch targets (buttons) large enough → Hero image responsive

### Implementation Tasks for US7

- [ ] T057 [P] [US7] Ensure all components use Tailwind responsive classes (sm:, md:, lg: prefixes) per research.md responsive design strategy
- [ ] T058 [P] [US7] Implement responsive images with srcset and lazy loading per research.md image optimization strategy
- [ ] T059 [P] [US7] Add media queries to CSS as needed for fine-tuning breakpoint-specific styling in `src/styles/index.css`
- [ ] T060 [P] [US7] Test Tailwind breakpoints across all components: confirm mobile-first stacking, tablet 2-column layouts, desktop full layouts
- [ ] T061 [P] [US7] Verify touch targets (buttons, links) are ≥ 44px on mobile per accessibility standards
- [ ] T062 [P] [US7] Manual testing on 5+ devices: iPhone SE (375px), iPhone 14 (390px), Galaxy A12 (412px), iPad (768px), Desktop (1440px)

### Testing for US7

- [ ] T063 [P] [US7] Visual regression tests in `tests/e2e/responsive-design.spec.ts`: Playwright tests at breakpoints (375px, 768px, 1024px) capture screenshots comparing mobile/tablet/desktop layouts

**Checkpoint**: US7 complete – Responsive design verified across all breakpoints ✅

---

## Phase 8: User Story 4 – Visitor Builds Trust Through Social Proof (P2)

**Goal**: Testimonials section displays 3-5 authentic customer quotes with names and optional photos

**Independent Test**: Scroll to Testimonials section → See 3-5 customer testimonial cards → Each shows quote, author name, optional photo → Section has clean, organized layout

### Implementation Tasks for US4

- [ ] T064 [P] [US4] Implement TestimonialsSection component in `src/components/TestimonialsSection/TestimonialsSection.tsx` that loads 3-5 testimonials from JSON
- [ ] T065 [P] [US4] Implement TestimonialCard component in `src/components/TestimonialCard/TestimonialCard.tsx` displaying quote, author, role, optional photo
- [ ] T066 [US4] Integrate TestimonialsSection into `src/pages/HomePage.tsx` with Section wrapper (id="testimonials" for anchor linking)
- [ ] T067 [P] [US4] Optimize testimonial author photos (< 60KB each) and store in `public/images/`

### Component Tests for US4

- [ ] T068 [P] [US4] Component tests for TestimonialCard in `tests/components/TestimonialCard.test.tsx` (renders quote, author, role, photo)
- [ ] T069 [P] [US4] Component tests for TestimonialsSection in `tests/components/TestimonialsSection.test.tsx` (loads 3-5 testimonials from data, renders cards)

### E2E Tests for US4

- [ ] T070 [US4] E2E test in `tests/e2e/testimonials-section.spec.ts`: User scrolls to Testimonials → Sees 3-5 cards → Each has quote, author name, photo

**Checkpoint**: US4 complete – Testimonials section fully functional ✅

---

## Phase 9: User Story 5 – Visitor Provides Email for Newsletter (P2)

**Goal**: Newsletter signup form accepts email, validates, displays success, prevents duplicates in session, stores in localStorage

**Independent Test**: Scroll to Newsletter section → Enter valid email → Submit → See success message → Form clears → Try same email again → See "already subscribed" error → Check localStorage for stored email

### Implementation Tasks for US5

- [ ] T071 Implement NewsletterSection component in `src/components/NewsletterSection/NewsletterSection.tsx` that wraps NewsletterForm
- [ ] T072 Implement NewsletterForm component in `src/components/NewsletterForm/NewsletterForm.tsx` per [data-model.md](data-model.md) with email input, validation, success/error states
- [ ] T073 [P] [US5] Implement email validation (validateEmail from service) with regex pattern per `src/services/validation.ts`
- [ ] T074 [P] [US5] Implement duplicate prevention (hasDuplicateSubmission) per session via `src/services/storage.ts`
- [ ] T075 [P] [US5] Implement localStorage storage of submissions via `src/services/storage.ts` saveFormSubmission()
- [ ] T076 [US5] Wire GA4 event tracking for newsletter_signup_submit (trackEvent) in NewsletterForm.tsx per [contracts/ga4-events.md](contracts/ga4-events.md)
- [ ] T077 [US5] Integrate NewsletterSection into `src/pages/HomePage.tsx` or `src/components/Footer/Footer.tsx` with Section wrapper (id="newsletter" for anchor linking)
- [ ] T078 [P] [US5] Add success/error message styling with Tailwind (green for success, red for error) per design tokens

### Component Tests for US5

- [ ] T079 [P] [US5] Component tests for NewsletterForm in `tests/components/NewsletterForm.test.tsx` (renders input, validates email, shows success/error, prevents duplicates, tracks analytics)

### E2E Tests for US5

- [ ] T080 [US5] E2E test in `tests/e2e/newsletter-signup.spec.ts`: User enters valid email → Submits → Sees success message → Tries duplicate → Sees error → Check localStorage

**Checkpoint**: US5 complete – Newsletter form fully functional ✅

---

## Phase 10: User Story 8 – Visitor Can Contact The Tea Story (P2)

**Goal**: Contact section with contact info (email, phone, address) and contact form that validates, stores submissions, prevents duplicates

**Independent Test**: Scroll to Contact section → See business contact details → Scroll to contact form → Enter email and message → Submit → See success message → Form clears → Try duplicate email → See error → Check localStorage

### Implementation Tasks for US8

- [ ] T081 Implement ContactSection component in `src/components/ContactSection/ContactSection.tsx` showing contact info (email, phone, address) and contact form
- [ ] T082 Implement ContactForm component in `src/components/ContactForm/ContactForm.tsx` per [data-model.md](data-model.md) with email and message inputs, validation, success/error states
- [ ] T083 [P] [US8] Implement email + message validation (validateEmail, validateMessage from service) per `src/services/validation.ts`
- [ ] T084 [P] [US8] Implement duplicate prevention (hasDuplicateSubmission) per session for contact form via `src/services/storage.ts`
- [ ] T085 [P] [US8] Implement localStorage storage of contact submissions (email + message) via `src/services/storage.ts` saveFormSubmission()
- [ ] T086 [US8] Wire GA4 event tracking for contact_form_submit (trackEvent) in ContactForm.tsx per [contracts/ga4-events.md](contracts/ga4-events.md)
- [ ] T087 [US8] Integrate ContactSection into `src/pages/HomePage.tsx` with Section wrapper (id="contact" for anchor linking)
- [ ] T088 [P] [US8] Add inline error messages for email and message fields with red styling per form best practices

### Component Tests for US8

- [ ] T089 [P] [US8] Component tests for ContactForm in `tests/components/ContactForm.test.tsx` (renders inputs, validates both fields, shows success/error, prevents duplicates, tracks analytics)
- [ ] T090 [P] [US8] Component tests for ContactSection in `tests/components/ContactSection.test.tsx` (renders contact info and form together)

### E2E Tests for US8

- [ ] T091 [US8] E2E test in `tests/e2e/contact-form.spec.ts`: User enters valid email and message → Submits → Sees success message → Tries duplicate email → Sees error → Check localStorage

**Checkpoint**: US8 complete – Contact form fully functional ✅

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Final quality assurance, optimization, and completeness before launch

### Footer Component

- [ ] T092 Implement Footer component in `src/components/Footer/Footer.tsx` with copyright, section links, and contact info
- [ ] T093 [P] Integrate Footer into `src/App.tsx` to appear on all pages
- [ ] T094 [P] Component test for Footer in `tests/components/Footer.test.tsx`

### Accessibility (WCAG AA Compliance)

- [ ] T095 [P] Audit all components for semantic HTML (use `<button>`, `<nav>`, `<main>`, `<footer>`, `<h1>`-`<h6>` correctly) per research.md accessibility section
- [ ] T096 [P] Add ARIA labels to form fields, interactive elements, and icon buttons (aria-label, aria-describedby, aria-expanded)
- [ ] T097 [P] Verify color contrast ratios ≥ 4.5:1 for all text against backgrounds per WCAG AA standards using WebAIM contrast checker
- [ ] T098 [P] Test keyboard navigation: Tab through all elements in logical order, Escape closes mobile menu, Enter submits forms
- [ ] T099 [P] Audit alt text on all images (should be descriptive, not "image" or "photo")
- [ ] T100 Run automated accessibility tests with axe-core in `tests/a11y/` directory (run during `npm run test:a11y`)

### Performance Optimization

- [ ] T101 [P] Analyze homepage load time with Lighthouse (target < 2s on 4G): run `npm run build && npm run preview`
- [ ] T102 [P] Verify all images are optimized (WebP format, < 100KB hero, < 80KB featured teas, < 60KB testimonials) – use image compression tools
- [ ] T103 [P] Implement code splitting: ensure main bundle is < 200KB gzipped, lazy-load routes if added in future
- [ ] T104 [P] Enable Vite minification and compression in production build
- [ ] T105 [P] Verify Lighthouse scores: Performance 90+, Accessibility 90+, SEO 90+ via `npm run build && npx lighthouse http://localhost:4173`

### SEO Implementation

- [ ] T106 Implement SEO metadata service in `src/services/seo.ts` with setSEOMetadata() function per research.md SEO section
- [ ] T107 Add Open Graph meta tags in `public/index.html` (og:title, og:description, og:image, og:type)
- [ ] T108 Add structured data (JSON-LD) for Organization schema in HomePage per research.md
- [ ] T109 [P] Add meta descriptions to each section (150-160 characters)
- [ ] T110 [P] Verify all images have descriptive alt text for SEO
- [ ] T111 Create `public/robots.txt` and `public/sitemap.xml` (static for MVP)
- [ ] T112 Verify semantic HTML structure (proper heading hierarchy, `<main>`, `<nav>`, `<footer>`)

### Google Analytics 4 Integration

- [ ] T113 Verify GA4 script tag is loaded in `public/index.html` with VITE_GA4_TRACKING_ID from .env.local
- [ ] T114 Test GA4 event tracking: page_view, tea_card_click, newsletter_signup_submit, contact_form_submit (check DevTools Network tab for gtag requests)
- [ ] T115 [P] Verify GA4 events contain correct properties per [contracts/ga4-events.md](contracts/ga4-events.md)
- [ ] T116 Create GA4 dashboard documentation (out of scope for feature delivery, handled by team post-launch)

### E2E Test Coverage

- [ ] T117 E2E test in `tests/e2e/full-homepage.spec.ts`: Complete user journey – load homepage → scroll through all sections → verify all sections visible → click navigation links → interact with forms
- [ ] T118 [P] E2E tests on mobile viewport (375px width) to verify mobile layout and hamburger menu
- [ ] T119 [P] E2E tests on tablet viewport (768px width) to verify tablet layout
- [ ] T120 [P] E2E tests on desktop viewport (1440px width) to verify full layout

### Documentation & Developer Experience

- [ ] T121 Verify [quickstart.md](quickstart.md) is accurate and includes all npm commands, file structure, and common tasks
- [ ] T122 Verify [data-model.md](data-model.md) component documentation is complete with prop types and examples
- [ ] T123 Verify [contracts/component-api.md](contracts/component-api.md) has TypeScript interfaces for all components
- [ ] T124 [P] Add JSDoc comments to all exported functions and React components
- [ ] T125 [P] Create `.github/CONTRIBUTING.md` with development workflow (create branch, run tests, commit message format)

### CI/CD & Build Validation

- [ ] T126 Verify GitHub Actions CI pipeline runs on all PRs: linting passes, type check passes, all tests pass, build succeeds
- [ ] T127 [P] Verify production build generates no warnings or errors
- [ ] T128 [P] Test production build locally: `npm run build && npm run preview` – verify all pages load and forms work

### Browser Compatibility Testing

- [ ] T129 [P] Test on Chrome (latest), Firefox (latest), Safari (latest), Edge (latest) – verify layout, forms, navigation work correctly
- [ ] T130 [P] Test on older Safari (iOS 12+) and Android Chrome (Android 8+) to verify CSS/JS compatibility

### Final Quality Assurance

- [ ] T131 Code review: Ensure all code follows project style (ESLint/Prettier), no console errors/warnings
- [ ] T132 [P] Verify no broken links or 404s on all pages and sections
- [ ] T133 [P] Verify forms do not submit actual emails (localStorage-only for this feature)
- [ ] T134 [P] Verify images load correctly (no broken image icons)
- [ ] T135 [P] Verify loading times are acceptable (hero section loads first, lazy loading for below-fold images)
- [ ] T136 Test on various network speeds: throttle to 4G in DevTools and verify page still loads < 2s

**Checkpoint**: All quality gates passed ✅ | Feature ready for launch

---

## Task Summary by Metric

| Category | Count | Notes |
|----------|-------|-------|
| **Total Tasks** | 136 | Includes setup, implementation, tests, and polish |
| **Parallelizable Tasks** | 68 | Marked with [P] – can run concurrently after dependencies |
| **P1 User Stories** | 5 | US1, US2, US3, US6, US7 (brand discovery, learning, navigation, mobile) |
| **P2 User Stories** | 3 | US4, US5, US8 (social proof, newsletter, contact) |
| **Phase 1 (Setup)** | 12 | Project initialization |
| **Phase 2 (Foundational)** | 13 | Services, components, data |
| **Phase 3 (US1)** | 11 | Hero + Featured Teas |
| **Phase 4 (US2)** | 4 | About Section |
| **Phase 5 (US3)** | 4 | Why Choose Us Section |
| **Phase 6 (US6)** | 8 | Navigation |
| **Phase 7 (US7)** | 7 | Responsive Design Testing |
| **Phase 8 (US4)** | 7 | Testimonials |
| **Phase 9 (US5)** | 8 | Newsletter Form |
| **Phase 10 (US8)** | 11 | Contact Form |
| **Phase 11 (Polish)** | 45 | Accessibility, Performance, SEO, GA4, E2E, Documentation, QA |

---

## Recommended Implementation Order

**Sprint 1 (Week 1-2): Setup + Foundational + P1 Stories in Parallel**
1. Phase 1: Setup (12 tasks) – all sequential
2. Phase 2: Foundational (13 tasks) – services first, then components
3. Phase 3-7: P1 Stories (35 tasks) – run in parallel after Phase 2 complete

**Sprint 2 (Week 3): P2 Stories in Parallel + Polish**
1. Phase 8-10: P2 Stories (26 tasks) – run in parallel
2. Phase 11: Polish & QA (45 tasks) – accessibility, performance, E2E, documentation, final QA

**Estimated Effort**:
- Phase 1-2: 25 tasks (~20 hours)
- Phase 3-7: 35 tasks (~30 hours, parallelized → ~10 wall-clock hours)
- Phase 8-10: 26 tasks (~20 hours, parallelized → ~7 wall-clock hours)
- Phase 11: 45 tasks (~30 hours, mostly validation/testing → ~15 wall-clock hours)

**Total**: ~100 hours effort / ~35-40 wall-clock days with parallelization

---

## Success Criteria Mapping

Each task maps to one or more success criteria from [spec.md](spec.md):

- **SC-001** (< 2s load): T101, T102, T104, T105
- **SC-002** (Accessibility 90+): T095-T100, T112
- **SC-003** (SEO 90+): T106-T112
- **SC-004** (5 device renders): T062, T118-T120
- **SC-005** (Images < 100KB): T031, T067
- **SC-006** (WCAG AA audit): T095-T100
- **SC-007** (No broken links): T132-T135
- **SC-008** (Bounce rate tracking): T114-T115
- **SC-009** (Premium perception): T026-T040 (design implementation)
- **SC-010** (2% newsletter conversion): T071-T078 (form UX)

---

## Done Criteria

✅ **Feature complete when**:
- [ ] All Phase 1-2 tasks complete
- [ ] All Phase 3-7 (P1 stories) tasks complete
- [ ] All Phase 8-10 (P2 stories) tasks complete
- [ ] All Phase 11 (Polish) tasks complete
- [ ] All GitHub Actions CI checks pass (lint, type-check, test, build)
- [ ] Lighthouse scores all ≥ 90+ (Performance, Accessibility, SEO)
- [ ] Manual QA on 5+ devices passes
- [ ] E2E test coverage includes all primary user journeys
- [ ] Documentation (quickstart.md, data-model.md, contracts/) is accurate and complete

---
