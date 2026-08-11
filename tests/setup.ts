import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.gtag for analytics tests
Object.defineProperty(window, 'gtag', {
  value: vi.fn(),
  writable: true,
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});