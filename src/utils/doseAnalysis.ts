import type { Ingredient } from '../types';

export type DoseLevel = 'low' | 'moderate' | 'high' | 'clinical';

export interface DoseAnalysis {
  level: DoseLevel;
  percentage: number; // How much of the clinical max (0-100+)
  label: string;
  color: string; // Tailwind color class
}

export const analyzeDose = (
  dosage: number,
  ingredient: Ingredient
): DoseAnalysis => {
  const { min, max } = ingredient.dosageRange;
  const range = max - min;
  const percentage = ((dosage - min) / range) * 100;

  let level: DoseLevel;
  let label: string;
  let color: string;

  if (dosage < min) {
    level = 'low';
    label = 'BELOW CLINICAL RANGE';
    color = 'text-yellow-500';
  } else if (dosage >= min && dosage < min + range * 0.33) {
    level = 'low';
    label = 'LOW DOSE';
    color = 'text-blue-400';
  } else if (dosage >= min + range * 0.33 && dosage < min + range * 0.66) {
    level = 'moderate';
    label = 'MODERATE DOSE';
    color = 'text-primary';
  } else if (dosage >= min + range * 0.66 && dosage <= max) {
    level = 'high';
    label = 'HIGH DOSE';
    color = 'text-accent';
  } else {
    level = 'clinical';
    label = 'MAXIMUM CLINICAL DOSE';
    color = 'text-secondary';
  }

  return {
    level,
    percentage: Math.round(percentage),
    label,
    color,
  };
};

export const formatDoseRange = (ingredient: Ingredient): string => {
  const { min, max, unit } = ingredient.dosageRange;

  if (unit === 'g') {
    return `${min / 1000}g - ${max / 1000}g`;
  }

  return `${min.toLocaleString()}mg - ${max.toLocaleString()}mg`;
};
