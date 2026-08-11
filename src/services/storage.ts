/**
 * Storage Service
 * Provides localStorage wrapper for form submissions per research.md
 */

export interface FormSubmission {
  type: 'newsletter' | 'contact';
  email: string;
  message?: string;
  timestamp: number;
  sessionId: string;
}

const STORAGE_KEY = 'tea-story-form-submissions';
const SESSION_ID_KEY = 'tea-story-session-id';

/**
 * Generates or retrieves a session ID
 * @returns The session ID string
 */
export function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Retrieves all form submissions from localStorage
 * @returns Array of FormSubmission objects
 */
export function getFormSubmissions(): FormSubmission[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as FormSubmission[];
  } catch {
    return [];
  }
}

/**
 * Checks if a duplicate submission exists for the given email and form type in the current session
 * @param email - The email to check
 * @param formType - The form type ('newsletter' or 'contact')
 * @returns True if duplicate exists, false otherwise
 */
export function hasDuplicateSubmission(email: string, formType: 'newsletter' | 'contact'): boolean {
  const submissions = getFormSubmissions();
  const sessionId = getSessionId();
  
  return submissions.some(
    (submission) =>
      submission.email.toLowerCase() === email.toLowerCase() &&
      submission.type === formType &&
      submission.sessionId === sessionId
  );
}

/**
 * Saves a form submission to localStorage
 * @param submission - The form submission data (without timestamp and sessionId)
 * @returns True if saved successfully, false otherwise
 */
export function saveFormSubmission(submission: Omit<FormSubmission, 'timestamp' | 'sessionId'>): boolean {
  try {
    const submissions = getFormSubmissions();
    const newSubmission: FormSubmission = {
      ...submission,
      timestamp: Date.now(),
      sessionId: getSessionId(),
    };
    submissions.push(newSubmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    return true;
  } catch {
    return false;
  }
}

/**
 * Clears all form submissions (for testing purposes)
 */
export function clearFormSubmissions(): void {
  localStorage.removeItem(STORAGE_KEY);
}