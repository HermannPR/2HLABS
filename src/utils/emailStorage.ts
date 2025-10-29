/**
 * Email Storage Utility
 * Handles localStorage operations for email submissions before backend integration
 */

export interface EmailSubmission {
  email: string;
  archetype?: string;
  timestamp: number;
  source: 'homepage' | 'results';
}

const STORAGE_KEY = 'emailSubmissions';

/**
 * Save an email submission to localStorage
 */
export const saveEmail = (submission: EmailSubmission): void => {
  try {
    const existing = getEmailSubmissions();
    existing.push(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error('Failed to save email:', error);
  }
};

/**
 * Get all email submissions from localStorage
 */
export const getEmailSubmissions = (): EmailSubmission[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to retrieve emails:', error);
    return [];
  }
};

/**
 * Check if an email has already been submitted
 */
export const hasSubmittedEmail = (email: string): boolean => {
  const submissions = getEmailSubmissions();
  return submissions.some(sub => sub.email.toLowerCase() === email.toLowerCase());
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email);
};

/**
 * Clear all email submissions (for testing/debugging)
 */
export const clearEmailSubmissions = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear emails:', error);
  }
};
