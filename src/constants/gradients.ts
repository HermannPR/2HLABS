export interface GradientStop {
  bg: string;
  glow: string;
}

export const INTENSITY_GRADIENT: GradientStop[] = [
  { bg: '#3B82F6', glow: 'rgba(59, 130, 246, 0.6)' },
  { bg: '#06B6D4', glow: 'rgba(6, 182, 212, 0.6)' },
  { bg: '#10B981', glow: 'rgba(16, 185, 129, 0.6)' },
  { bg: '#84CC16', glow: 'rgba(132, 204, 22, 0.6)' },
  { bg: '#EAB308', glow: 'rgba(234, 179, 8, 0.6)' },
  { bg: '#F59E0B', glow: 'rgba(245, 158, 11, 0.6)' },
  { bg: '#F97316', glow: 'rgba(249, 115, 22, 0.6)' },
  { bg: '#EF4444', glow: 'rgba(239, 68, 68, 0.6)' },
  { bg: '#DC2626', glow: 'rgba(220, 38, 38, 0.6)' },
  { bg: '#B91C1C', glow: 'rgba(185, 28, 28, 0.7)' },
];

export const PUMP_GRADIENT: GradientStop[] = [
  { bg: '#0DA3E7', glow: 'rgba(13, 163, 231, 0.7)' },
  { bg: '#0282C7', glow: 'rgba(2, 130, 199, 0.7)' },
  { bg: '#2561E9', glow: 'rgba(37, 97, 233, 0.7)' },
  { bg: '#4337CA', glow: 'rgba(67, 55, 202, 0.7)' },
  { bg: '#7C3AEC', glow: 'rgba(124, 58, 236, 0.7)' },
  { bg: '#A854F5', glow: 'rgba(168, 84, 245, 0.7)' },
  { bg: '#D845EA', glow: 'rgba(216, 69, 234, 0.72)' },
  { bg: '#F23F5D', glow: 'rgba(242, 63, 93, 0.72)' },
  { bg: '#ED4243', glow: 'rgba(237, 66, 67, 0.75)' },
  { bg: '#DB2526', glow: 'rgba(219, 37, 38, 0.78)' },
];

export const FOCUS_GRADIENT: GradientStop[] = [
  { bg: '#00FF00', glow: 'rgba(0, 255, 0, 0.7)' },
  { bg: '#00FF55', glow: 'rgba(0, 255, 85, 0.7)' },
  { bg: '#00FFA9', glow: 'rgba(0, 255, 169, 0.7)' },
  { bg: '#00FFFF', glow: 'rgba(0, 255, 255, 0.7)' },
  { bg: '#00A9FF', glow: 'rgba(0, 169, 255, 0.7)' },
  { bg: '#0054FF', glow: 'rgba(0, 84, 255, 0.7)' },
  { bg: '#0000FF', glow: 'rgba(0, 0, 255, 0.7)' },
  { bg: '#5400FF', glow: 'rgba(84, 0, 255, 0.7)' },
  { bg: '#AA00FF', glow: 'rgba(170, 0, 255, 0.72)' },
  { bg: '#FF00FF', glow: 'rgba(255, 0, 255, 0.75)' },
];

export const LEVEL_TO_VALUE: Record<string, number> = {
  light: 3,
  moderate: 6,
  high: 8,
  maximum: 10,
};
