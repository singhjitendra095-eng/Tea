import { describe, it, expect } from 'vitest';
import { validateEmail, validateMessage } from '../../src/services/validation';

describe('Validation Service', () => {
  describe('validateEmail', () => {
    it('should return valid for a correct email', () => {
      const result = validateEmail('test@example.com');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return valid for email with subdomain', () => {
      const result = validateEmail('user@sub.domain.com');
      expect(result.valid).toBe(true);
    });

    it('should return valid for email with plus sign', () => {
      const result = validateEmail('user+tag@example.com');
      expect(result.valid).toBe(true);
    });

    it('should return invalid for empty email', () => {
      const result = validateEmail('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Email is required');
    });

    it('should return invalid for whitespace-only email', () => {
      const result = validateEmail('   ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Email is required');
    });

    it('should return invalid for email without @', () => {
      const result = validateEmail('testexample.com');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Please enter a valid email address');
    });

    it('should return invalid for email without domain', () => {
      const result = validateEmail('test@');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Please enter a valid email address');
    });

    it('should return invalid for email without TLD', () => {
      const result = validateEmail('test@example');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Please enter a valid email address');
    });

    it('should return invalid for email with spaces', () => {
      const result = validateEmail('test @example.com');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Please enter a valid email address');
    });

    it('should trim whitespace before validation', () => {
      const result = validateEmail('  test@example.com  ');
      expect(result.valid).toBe(true);
    });
  });

  describe('validateMessage', () => {
    it('should return valid for a message with sufficient length', () => {
      const result = validateMessage('This is a valid message with enough characters.');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return valid for message at exactly 10 characters', () => {
      const result = validateMessage('1234567890');
      expect(result.valid).toBe(true);
    });

    it('should return valid for message at exactly 2000 characters', () => {
      const message = 'a'.repeat(2000);
      const result = validateMessage(message);
      expect(result.valid).toBe(true);
    });

    it('should return invalid for empty message', () => {
      const result = validateMessage('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Message is required');
    });

    it('should return invalid for whitespace-only message', () => {
      const result = validateMessage('   ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Message is required');
    });

    it('should return invalid for message less than 10 characters', () => {
      const result = validateMessage('Short');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Message must be at least 10 characters');
    });

    it('should return invalid for message more than 2000 characters', () => {
      const message = 'a'.repeat(2001);
      const result = validateMessage(message);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Message must be less than 2000 characters');
    });

    it('should trim whitespace before validation', () => {
      const result = validateMessage('  This is a valid message  ');
      expect(result.valid).toBe(true);
    });

    it('should return invalid for message with only whitespace after trim', () => {
      const result = validateMessage('         ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Message is required');
    });
  });
});