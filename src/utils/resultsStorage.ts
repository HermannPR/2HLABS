/**
 * Results Storage Utility
 * Handles saving and retrieving quiz results from localStorage
 */

import type { ArchetypeResult } from '../types';

const STORAGE_KEY = 'savedResults';
const MAX_SAVED_RESULTS = 5; // Keep last 5 results

export interface SavedResult {
  id: string;
  timestamp: number;
  result: ArchetypeResult;
}

/**
 * Save a result to localStorage
 */
export const saveResult = (result: ArchetypeResult): void => {
  try {
    const existing = getSavedResults();

    // Create new saved result
    const newResult: SavedResult = {
      id: generateId(),
      timestamp: Date.now(),
      result,
    };

    // Add to beginning of array
    existing.unshift(newResult);

    // Keep only MAX_SAVED_RESULTS
    const trimmed = existing.slice(0, MAX_SAVED_RESULTS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to save result:', error);
  }
};

/**
 * Get all saved results from localStorage
 */
export const getSavedResults = (): SavedResult[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to retrieve results:', error);
    return [];
  }
};

/**
 * Get a specific saved result by ID
 */
export const getSavedResultById = (id: string): SavedResult | null => {
  const results = getSavedResults();
  return results.find(r => r.id === id) || null;
};

/**
 * Delete a saved result
 */
export const deleteSavedResult = (id: string): void => {
  try {
    const results = getSavedResults();
    const filtered = results.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete result:', error);
  }
};

/**
 * Clear all saved results
 */
export const clearSavedResults = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear results:', error);
  }
};

/**
 * Format timestamp for display
 */
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
};

/**
 * Generate unique ID
 */
const generateId = (): string => {
  return `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
