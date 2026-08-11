/**
 * Validation Service
 * Provides validation functions for forms per contracts/component-api.md
 */

/**
 * Email validation result
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns ValidationResult with valid flag and optional error message
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return { valid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true };
}

/**
 * Validates a message field
 * @param message - The message to validate
 * @returns ValidationResult with valid flag and optional error message
 */
export function validateMessage(message: string): ValidationResult {
  if (!message || message.trim() === '') {
    return { valid: false, error: 'Message is required' };
  }

  if (message.trim().length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters' };
  }

  if (message.trim().length > 2000) {
    return { valid: false, error: 'Message must be less than 2000 characters' };
  }

  return { valid: true };
}