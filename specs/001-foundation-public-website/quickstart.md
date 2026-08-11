# Quick Start Guide

**Feature**: F-001 Foundation & Public Website  
**Date**: 2026-08-11  
**Status**: Ready for Development

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Development Workflow](#development-workflow)
4. [Running Tests](#running-tests)
5. [Building for Production](#building-for-production)
6. [Common Development Tasks](#common-development-tasks)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: Latest stable version
- **Code Editor**: VS Code (recommended) with extensions:
  - ESLint
  - Prettier
  - TypeScript Vue Plugin (Volar)

**Verify Installation**:
```bash
node --version    # v18.x or higher
npm --version     # 9.x or higher
git --version     # Latest
```

---

## Environment Setup

### 1. Clone Repository

```bash
cd ~/Documents
git clone <repository-url> Tea
cd Tea
```

### 2. Install Dependencies

```bash
npm install
```

This installs all packages defined in `package.json`:
- React 18.x
- TypeScript 5.x
- Vite 5.x
- Tailwind CSS 3.x
- React Router 6.x
- Vitest (unit testing)
- React Testing Library (component testing)
- Playwright/Cypress (E2E testing)

### 3. Configure Environment Variables

Create `.env.local` in the repository root:

```bash
# .env.local
VITE_GA4_TRACKING_ID=G-XXXXXXXXXX
VITE_API_URL=https://api.example.com  # Future use for F-002+
```

**Notes**:
- Replace `G-XXXXXXXXXX` with your GA4 Measurement ID
- `.env.local` is git-ignored and local to your machine
- Variables are injected at build time; prefix all client-side vars with `VITE_`

### 4. Verify Setup

```bash
npm run dev
# Output: ➜  local:   http://localhost:5173/

# In another terminal:
npm run type-check
# Output: No type errors found
```

---

## Development Workflow

### Start Development Server

```bash
npm run dev
```

**Output**:
```
➜  local:   http://localhost:5173/
➜  press h + enter to show help
```

**Features**:
- Hot Module Replacement (HMR): Changes auto-reload in browser
- Source maps: Debug TypeScript directly in browser DevTools
- Port: 5173 (or next available if 5173 is in use)

**Access**:
- Open http://localhost:5173 in browser
- Edit files in `src/` and see changes instantly

### Code Quality Tools

**Type Check** (TypeScript):
```bash
npm run type-check
# Validates type safety without building
```

**Linting** (ESLint):
```bash
npm run lint
# Checks code style and best practices

npm run lint:fix
# Auto-fixes linting issues
```

**Code Formatting** (Prettier):
```bash
npm run format
# Auto-formats code according to project style

npm run format:check
# Checks if code is formatted correctly
```

### Recommended Editor Setup

Create `.vscode/settings.json` in repository root:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["typescript", "typescriptreact"],
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## Running Tests

### Unit & Component Tests (Vitest + React Testing Library)

```bash
npm run test
# Runs all tests in watch mode
# Re-runs tests when files change

npm run test:coverage
# Generates coverage report (aim for 80%+ coverage)

npm run test:ui
# Opens interactive UI to explore tests
```

**Key Test Files**:
- `tests/components/Hero.test.tsx`
- `tests/components/TeaCard.test.tsx`
- `tests/components/NewsletterForm.test.tsx`
- `tests/services/validation.test.ts`
- `tests/services/analytics.test.ts`

### E2E Tests (Playwright/Cypress)

```bash
npm run test:e2e
# Runs E2E tests in headless mode

npm run test:e2e:ui
# Opens Playwright/Cypress inspector UI (interactive)
```

**Key E2E Scenarios**:
- User navigates to homepage and scrolls through sections
- User clicks featured tea card (verifies analytics event)
- User signs up for newsletter (verifies form validation and storage)
- User submits contact form (verifies storage and duplicate prevention)
- User navigates on mobile (hamburger menu works)
- Accessibility (keyboard navigation, screen reader)

### Accessibility Tests (axe-core)

```bash
npm run test:a11y
# Runs accessibility audit on components
# Checks WCAG AA compliance
```

---

## Building for Production

### Create Production Build

```bash
npm run build
# Outputs to dist/ folder
# Optimized, minified, code-split

# Expected output:
# dist/index.html
# dist/assets/index-*.js (code split chunks)
# dist/assets/index-*.css (Tailwind CSS)
# dist/images/ (optimized images)
```

### Preview Production Build

```bash
npm run preview
# Serves dist/ folder locally
# Allows testing production build before deployment

# Output:
# ➜  local:   http://localhost:4173/
```

### Deployment Checklist

- [ ] `npm run type-check` passes (no type errors)
- [ ] `npm run lint` passes (no lint errors)
- [ ] `npm run test` passes (all unit/component tests)
- [ ] `npm run test:e2e` passes (all E2E tests)
- [ ] `npm run test:a11y` passes (WCAG AA compliance)
- [ ] `npm run build` succeeds (no build errors)
- [ ] `npm run preview` loads without errors
- [ ] `.env.local` is configured with production GA4 ID
- [ ] `dist/` folder ready for deployment to Azure App Service

---

## Common Development Tasks

### Add a New Reusable Component

**1. Create component file** (`src/components/ComponentName/ComponentName.tsx`):

```typescript
import React from 'react';

export interface ComponentNameProps {
  // Define props here
  title: string;
  children: React.ReactNode;
}

export function ComponentName({ title, children }: ComponentNameProps) {
  return (
    <div className="...">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

**2. Create test file** (`src/components/ComponentName/ComponentName.test.tsx`):

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders with title', () => {
    render(<ComponentName title="Test Title">Content</ComponentName>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

**3. Export from** `src/components/index.ts`:

```typescript
export { ComponentName } from './ComponentName/ComponentName';
```

**4. Use in a page** (`src/pages/HomePage.tsx`):

```typescript
import { ComponentName } from '../components';

export function HomePage() {
  return <ComponentName title="My Component">Hello</ComponentName>;
}
```

### Update Brand Colors

**Edit** `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'tea': {
          50: '#f5f7f4',
          500: '#2a5f3a',  // Primary forest green
          600: '#1f4629',
          // ...
        },
      },
    },
  },
};
```

**Or use CSS variables** (`src/styles/variables.css`):

```css
:root {
  --color-primary: #2a5f3a;        /* Forest green */
  --color-secondary: #8b6f47;      /* Earth brown */
  --color-accent: #d4af37;         /* Soft gold */
}
```

### Add a New Data Source

**1. Create JSON file** (`src/data/new-data.json`):

```json
[
  { "id": 1, "name": "Item 1", "description": "Description" }
]
```

**2. Import in component** (`src/components/MyComponent/MyComponent.tsx`):

```typescript
import newData from '../../data/new-data.json';

export function MyComponent() {
  return (
    <div>
      {newData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Track a New Analytics Event

**1. Add event to** `src/services/analytics.ts`:

```typescript
export type EventName = 
  | 'page_view'
  | 'tea_card_click'
  | 'my_new_event';  // Add here
```

**2. Use in component**:

```typescript
import { trackEvent } from '../../services/analytics';

export function MyComponent() {
  const handleClick = () => {
    trackEvent('my_new_event', { custom_property: 'value' });
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### Add Form Validation Rule

**Edit** `src/services/validation.ts`:

```typescript
export const ValidationRules = {
  email: { /* ... */ },
  message: { /* ... */ },
  phone: {  // New rule
    pattern: /^\+?[1-9]\d{1,14}$/,
    message: 'Please enter a valid phone number',
  },
};

export function validatePhone(phone: string): { valid: boolean; error?: string } {
  if (!phone.trim()) {
    return { valid: false, error: 'Phone is required' };
  }
  if (!ValidationRules.phone.pattern.test(phone)) {
    return { valid: false, error: ValidationRules.phone.message };
  }
  return { valid: true };
}
```

### Implement Lazy Loading for Images

Use the `OptimizedImage` component:

```tsx
import { OptimizedImage } from '../components/OptimizedImage/OptimizedImage';

export function MyComponent() {
  return (
    <OptimizedImage
      src="/images/my-image.jpg"
      alt="Description"
      lazy={true}  // Enable lazy loading
      className="w-full h-auto"
    />
  );
}
```

---

## File Structure Reference

```
Tea/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Hero/
│   │   ├── TeaCard/
│   │   ├── Section/
│   │   ├── Navigation/
│   │   ├── NewsletterForm/
│   │   ├── ContactForm/
│   │   └── Footer/
│   ├── pages/                # Page components (React Router)
│   │   ├── HomePage.tsx
│   │   └── [Future pages]
│   ├── data/                 # Static JSON data files
│   │   ├── featured-teas.json
│   │   └── testimonials.json
│   ├── services/             # Utility/service modules
│   │   ├── analytics.ts      # GA4 wrapper
│   │   ├── validation.ts     # Form validation
│   │   └── storage.ts        # localStorage wrapper
│   ├── styles/               # Global CSS
│   │   ├── index.css
│   │   └── variables.css
│   ├── App.tsx               # Root component
│   └── main.tsx              # Entry point
├── tests/                    # Test files (mirror src/ structure)
│   ├── components/
│   ├── services/
│   └── e2e/
├── public/                   # Static assets
│   ├── images/
│   └── favicon.ico
├── .github/
│   ├── workflows/            # CI/CD pipelines
│   └── copilot-instructions.md
├── specs/
│   └── 001-foundation-public-website/
│       ├── spec.md           # Feature specification
│       ├── plan.md           # Implementation plan
│       ├── research.md       # Research findings
│       ├── data-model.md     # Component architecture
│       └── contracts/        # Data contracts
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
├── .env.local                # Local environment variables (git-ignored)
└── README.md                 # Project readme
```

---

## Troubleshooting

### Issue: Dependencies fail to install

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install
```

### Issue: Port 5173 already in use

```bash
# Vite will automatically use the next available port
# Or specify a different port:
npm run dev -- --port 3000
```

### Issue: TypeScript errors in IDE

```bash
# Restart TypeScript server in VS Code
# Command Palette (Ctrl+Shift+P): "TypeScript: Restart TS Server"
```

### Issue: Prettier/ESLint conflicts

```bash
# Disable Prettier for ESLint rules
npm run lint:fix
# Then format with Prettier
npm run format
```

### Issue: localStorage not persisting data

```typescript
// Check browser DevTools Console
// Open DevTools > Application > Storage > localStorage
// Verify tea_story_submissions key exists
console.log(localStorage.getItem('tea_story_submissions'));
```

### Issue: GA4 events not tracking

```typescript
// Verify GA4 ID in .env.local
console.log(import.meta.env.VITE_GA4_TRACKING_ID);

// Check DevTools Network tab for gtag requests
// Should see requests to google-analytics.com
```

### Issue: Build fails with image optimization errors

```bash
# Clear build cache
rm -rf dist/

# Rebuild
npm run build

# If issue persists, check image files exist:
ls public/images/
```

---

## Next Steps

1. ✅ Setup complete
2. Start development server: `npm run dev`
3. Implement components from `data-model.md`
4. Write tests for each component
5. Run E2E tests: `npm run test:e2e`
6. Build for production: `npm run build`
7. Deploy to Azure App Service

---

## Getting Help

- **Type Errors**: Check `npm run type-check` output
- **Lint Issues**: Run `npm run lint:fix` to auto-fix
- **Test Failures**: Check `npm run test:ui` for interactive debugging
- **Build Errors**: Check `npm run build` output and `dist/` folder
- **Component API**: Reference [contracts/component-api.md](component-api.md)
- **Specification**: See [spec.md](spec.md) for feature requirements

---
