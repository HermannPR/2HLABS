import type { Ingredient } from '../types';

export const INGREDIENTS: Ingredient[] = [
  // Energy & Stimulants
  {
    id: 'caffeine',
    name: 'Caffeine Anhydrous',
    category: 'energy',
    description: 'Pure caffeine that increases alertness, energy, and focus',
    benefits: ['Increased energy', 'Enhanced focus', 'Improved endurance', 'Fat oxidation'],
    dosageRange: { min: 100, max: 400, unit: 'mg' },
    timing: 'Pre-workout',
    scienceRating: 5,
    caffeineContent: 1,
  },
  {
    id: 'theobromine',
    name: 'Theobromine',
    category: 'energy',
    description: 'Natural stimulant from cocoa with smooth, long-lasting energy',
    benefits: ['Sustained energy', 'Mood enhancement', 'Vasodilation'],
    dosageRange: { min: 200, max: 400, unit: 'mg' },
    scienceRating: 4,
  },

  // Pump & Blood Flow
  {
    id: 'l-citrulline',
    name: 'L-Citrulline',
    category: 'pump',
    description: 'Amino acid that boosts nitric oxide production for enhanced blood flow',
    benefits: ['Muscle pumps', 'Improved blood flow', 'Reduced fatigue', 'Better nutrient delivery'],
    dosageRange: { min: 6000, max: 8000, unit: 'mg' },
    scienceRating: 5,
  },
  {
    id: 'citrulline-malate',
    name: 'Citrulline Malate',
    category: 'pump',
    description: 'L-Citrulline bound to malic acid for enhanced absorption',
    benefits: ['Enhanced pumps', 'Reduced muscle soreness', 'Improved ATP production'],
    dosageRange: { min: 8000, max: 10000, unit: 'mg' },
    scienceRating: 5,
  },
  {
    id: 'beetroot',
    name: 'Beetroot Extract',
    category: 'pump',
    description: 'Natural nitrate source for improved blood flow',
    benefits: ['Enhanced endurance', 'Better oxygen utilization', 'Improved pumps'],
    dosageRange: { min: 500, max: 1000, unit: 'mg' },
    scienceRating: 4,
  },

  // Strength & Power
  {
    id: 'creatine',
    name: 'Creatine Monohydrate',
    category: 'strength',
    description: 'Most researched supplement for strength and power output',
    benefits: ['Increased strength', 'Enhanced power', 'Muscle growth', 'Improved recovery'],
    dosageRange: { min: 3000, max: 5000, unit: 'mg' },
    scienceRating: 5,
  },
  {
    id: 'betaine',
    name: 'Betaine Anhydrous',
    category: 'strength',
    description: 'Improves power output and supports hydration',
    benefits: ['Increased power', 'Enhanced strength', 'Better hydration'],
    dosageRange: { min: 2500, max: 2500, unit: 'mg' },
    scienceRating: 4,
  },

  // Endurance
  {
    id: 'beta-alanine',
    name: 'Beta-Alanine',
    category: 'endurance',
    description: 'Buffers lactic acid buildup for improved endurance',
    benefits: ['Delayed fatigue', 'Increased endurance', 'Better high-rep performance'],
    dosageRange: { min: 3200, max: 6400, unit: 'mg' },
    scienceRating: 5,
  },
  {
    id: 'taurine',
    name: 'Taurine',
    category: 'endurance',
    description: 'Amino acid that supports endurance and reduces oxidative stress',
    benefits: ['Enhanced endurance', 'Reduced muscle damage', 'Improved focus'],
    dosageRange: { min: 1000, max: 2000, unit: 'mg' },
    scienceRating: 4,
  },

  // Focus & Cognition
  {
    id: 'l-tyrosine',
    name: 'L-Tyrosine',
    category: 'focus',
    description: 'Amino acid precursor to dopamine for enhanced mental performance',
    benefits: ['Improved focus', 'Stress reduction', 'Enhanced mood'],
    dosageRange: { min: 1500, max: 2000, unit: 'mg' },
    scienceRating: 4,
  },
  {
    id: 'alpha-gpc',
    name: 'Alpha-GPC',
    category: 'focus',
    description: 'Choline compound that enhances acetylcholine production',
    benefits: ['Enhanced focus', 'Improved mind-muscle connection', 'Better power output'],
    dosageRange: { min: 300, max: 600, unit: 'mg' },
    scienceRating: 4,
  },
  {
    id: 'l-theanine',
    name: 'L-Theanine',
    category: 'focus',
    description: 'Promotes calm focus and reduces caffeine jitters',
    benefits: ['Smooth energy', 'Reduced anxiety', 'Enhanced focus'],
    dosageRange: { min: 100, max: 200, unit: 'mg' },
    scienceRating: 4,
  },

  // Recovery & Hydration
  {
    id: 'sodium',
    name: 'Sodium (as Sea Salt)',
    category: 'hydration',
    description: 'Essential electrolyte for hydration and muscle function',
    benefits: ['Improved hydration', 'Better muscle contractions', 'Enhanced pumps'],
    dosageRange: { min: 300, max: 500, unit: 'mg' },
    scienceRating: 5,
  },
  {
    id: 'potassium',
    name: 'Potassium',
    category: 'hydration',
    description: 'Electrolyte that supports hydration and muscle function',
    benefits: ['Muscle function', 'Hydration support', 'Cramp prevention'],
    dosageRange: { min: 200, max: 400, unit: 'mg' },
    scienceRating: 5,
  },
];

export const getIngredientById = (id: string): Ingredient | undefined => {
  return INGREDIENTS.find(ing => ing.id === id);
};

export const getIngredientsByCategory = (category: string): Ingredient[] => {
  return INGREDIENTS.filter(ing => ing.category === category);
};
