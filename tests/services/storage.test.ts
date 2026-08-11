import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getSessionId, getFormSubmissions, hasDuplicateSubmission, saveFormSubmission, clearFormSubmissions } from '../../src/services/storage';

// Mock localStorage and sessionStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get store() { return store; },
    set store(value: Record<string, string>) { store = value; },
  };
})();

const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get store() { return store; },
    set store(value: Record<string, string>) { store = value; },
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock, writable: true });
Object.defineProperty(global, 'sessionStorage', { value: sessionStorageMock, writable: true });

describe('Storage Service', () => {
  beforeEach(() => {
    localStorageMock.clear();
    sessionStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('getSessionId', () => {
    it('should generate a new session ID if none exists', () => {
      const sessionId = getSessionId();
      expect(sessionId).toBeDefined();
      expect(typeof sessionId).toBe('string');
      expect(sessionId.length).toBeGreaterThan(0);
    });

    it('should return the same session ID on subsequent calls', () => {
      const sessionId1 = getSessionId();
      const sessionId2 = getSessionId();
      expect(sessionId1).toBe(sessionId2);
    });

    it('should store session ID in sessionStorage', () => {
      getSessionId();
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('tea-story-session-id', expect.any(String));
    });
  });

  describe('getFormSubmissions', () => {
    it('should return empty array when no submissions exist', () => {
      const submissions = getFormSubmissions();
      expect(submissions).toEqual([]);
    });

    it('should return parsed submissions from localStorage', () => {
      const testSubmissions = [
        { type: 'newsletter', email: 'test@example.com', timestamp: 1234567890, sessionId: 'session-1' },
      ];
      localStorageMock.setItem('tea-story-form-submissions', JSON.stringify(testSubmissions));
      
      const submissions = getFormSubmissions();
      expect(submissions).toEqual(testSubmissions);
    });

    it('should return empty array when localStorage contains invalid JSON', () => {
      localStorageMock.setItem('tea-story-form-submissions', 'invalid-json');
      const submissions = getFormSubmissions();
      expect(submissions).toEqual([]);
    });
  });

  describe('hasDuplicateSubmission', () => {
    it('should return false when no submissions exist', () => {
      const result = hasDuplicateSubmission('test@example.com', 'newsletter');
      expect(result).toBe(false);
    });

    it('should return false when email does not match', () => {
      localStorageMock.setItem('tea-story-form-submissions', JSON.stringify([
        { type: 'newsletter', email: 'other@example.com', timestamp: 1234567890, sessionId: 'session-1' },
      ]));
      const result = hasDuplicateSubmission('test@example.com', 'newsletter');
      expect(result).toBe(false);
    });

    it('should return false when form type does not match', () => {
      localStorageMock.setItem('tea-story-form-submissions', JSON.stringify([
        { type: 'contact', email: 'test@example.com', timestamp: 1234567890, sessionId: 'session-1' },
      ]));
      const result = hasDuplicateSubmission('test@example.com', 'newsletter');
      expect(result).toBe(false);
    });

    it('should return false when session ID does not match', () => {
      localStorageMock.setItem('tea-story-form-submissions', JSON.stringify([
        { type: 'newsletter', email: 'test@example.com', timestamp: 1234567890, sessionId: 'different-session' },
      ]));
      const result = hasDuplicateSubmission('test@example.com', 'newsletter');
      expect(result).toBe(false);
    });

    it('should return true when email, form type, and session ID all match', () => {
      const sessionId = getSessionId(); // Initialize session
      localStorageMock.setItem('tea-story-form-submissions', JSON.stringify([
        { type: 'newsletter', email: 'test@example.com', timestamp: 1234567890, sessionId },
      ]));
      const result = hasDuplicateSubmission('test@example.com', 'newsletter');
      expect(result).toBe(true);
    });

    it('should be case-insensitive for email comparison', () => {
      const sessionId = getSessionId();
      localStorageMock.setItem('tea-story-form-submissions', JSON.stringify([
        { type: 'newsletter', email: 'TEST@EXAMPLE.COM', timestamp: 1234567890, sessionId },
      ]));
      const result = hasDuplicateSubmission('test@example.com', 'newsletter');
      expect(result).toBe(true);
    });
  });

  describe('saveFormSubmission', () => {
    it('should save a newsletter submission successfully', () => {
      getSessionId(); // Initialize session
      const result = saveFormSubmission({ type: 'newsletter', email: 'test@example.com' });
      expect(result).toBe(true);
      
      const submissions = getFormSubmissions();
      expect(submissions).toHaveLength(1);
      expect(submissions[0].type).toBe('newsletter');
      expect(submissions[0].email).toBe('test@example.com');
      expect(submissions[0].timestamp).toBeDefined();
      expect(submissions[0].sessionId).toBeDefined();
    });

    it('should save a contact submission with message successfully', () => {
      getSessionId(); // Initialize session
      const result = saveFormSubmission({ 
        type: 'contact', 
        email: 'test@example.com', 
        message: 'Hello, this is a test message.' 
      });
      expect(result).toBe(true);
      
      const submissions = getFormSubmissions();
      expect(submissions).toHaveLength(1);
      expect(submissions[0].type).toBe('contact');
      expect(submissions[0].email).toBe('test@example.com');
      expect(submissions[0].message).toBe('Hello, this is a test message.');
    });

    it('should append to existing submissions', () => {
      getSessionId(); // Initialize session
      saveFormSubmission({ type: 'newsletter', email: 'first@example.com' });
      saveFormSubmission({ type: 'newsletter', email: 'second@example.com' });
      
      const submissions = getFormSubmissions();
      expect(submissions).toHaveLength(2);
    });

    it('should return false when localStorage is unavailable', () => {
      // Simulate localStorage throwing an error
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = vi.fn(() => { throw new Error('Storage full'); });
      
      const result = saveFormSubmission({ type: 'newsletter', email: 'test@example.com' });
      expect(result).toBe(false);
      
      localStorageMock.setItem = originalSetItem;
    });
  });

  describe('clearFormSubmissions', () => {
    it('should remove all submissions from localStorage', () => {
      localStorageMock.setItem('tea-story-form-submissions', JSON.stringify([
        { type: 'newsletter', email: 'test@example.com', timestamp: 1234567890, sessionId: 'session-1' },
      ]));
      
      clearFormSubmissions();
      
      const submissions = getFormSubmissions();
      expect(submissions).toEqual([]);
    });
  });
});