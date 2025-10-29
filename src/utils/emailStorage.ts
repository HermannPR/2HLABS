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
 * Common email domain typos and their corrections
 */
const COMMON_DOMAIN_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmil.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'yahooo.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'yhoo.com': 'yahoo.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
  'hotmial.com': 'hotmail.com',
  'hotmil.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'iclou.com': 'icloud.com',
  'iclould.com': 'icloud.com',
  'icould.com': 'icloud.com',
};

/**
 * Detect and suggest correction for common email typos
 */
export const detectEmailTypo = (email: string): string | null => {
  const parts = email.toLowerCase().split('@');
  if (parts.length !== 2) return null;

  const [, domain] = parts;
  const suggestion = COMMON_DOMAIN_TYPOS[domain];

  return suggestion ? suggestion : null;
};

/**
 * Get corrected email if typo detected
 */
export const getCorrectedEmail = (email: string): string => {
  const parts = email.split('@');
  if (parts.length !== 2) return email;

  const [username, domain] = parts;
  const correctedDomain = COMMON_DOMAIN_TYPOS[domain.toLowerCase()];

  return correctedDomain ? `${username}@${correctedDomain}` : email;
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
