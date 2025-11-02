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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
  },
  {
    id: 'citrulline-malate',
    name: 'Citrulline Malate',
    category: 'pump',
    description: 'L-Citrulline bound to malic acid for enhanced absorption',
    benefits: ['Enhanced pumps', 'Reduced muscle soreness', 'Improved ATP production'],
    dosageRange: { min: 8000, max: 10000, unit: 'mg' },
    scienceRating: 5,
    enabled: true,
  },
  {
    id: 'beetroot',
    name: 'Beetroot Extract',
    category: 'pump',
    description: 'Natural nitrate source for improved blood flow',
    benefits: ['Enhanced endurance', 'Better oxygen utilization', 'Improved pumps'],
    dosageRange: { min: 500, max: 1000, unit: 'mg' },
    scienceRating: 4,
    enabled: true,
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
    enabled: true,
  },
  {
    id: 'betaine',
    name: 'Betaine Anhydrous',
    category: 'strength',
    description: 'Improves power output and supports hydration',
    benefits: ['Increased power', 'Enhanced strength', 'Better hydration'],
    dosageRange: { min: 2500, max: 3500, unit: 'mg' },
    scienceRating: 4,
    enabled: true,
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
    enabled: true,
  },
  {
    id: 'taurine',
    name: 'Taurine',
    category: 'endurance',
    description: 'Amino acid that supports endurance and reduces oxidative stress',
    benefits: ['Enhanced endurance', 'Reduced muscle damage', 'Improved focus'],
    dosageRange: { min: 1000, max: 2000, unit: 'mg' },
    scienceRating: 4,
    enabled: true,
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
    enabled: true,
  },
  {
    id: 'alpha-gpc',
    name: 'Alpha-GPC',
    category: 'focus',
    description: 'Choline compound that enhances acetylcholine production',
    benefits: ['Enhanced focus', 'Improved mind-muscle connection', 'Better power output'],
    dosageRange: { min: 300, max: 600, unit: 'mg' },
    scienceRating: 4,
    enabled: true,
  },
  {
    id: 'l-theanine',
    name: 'L-Theanine',
    category: 'focus',
    description: 'Promotes calm focus and reduces caffeine jitters',
    benefits: ['Smooth energy', 'Reduced anxiety', 'Enhanced focus'],
    dosageRange: { min: 100, max: 200, unit: 'mg' },
    scienceRating: 4,
    enabled: true,
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
    enabled: true,
  },
  {
    id: 'potassium',
    name: 'Potassium',
    category: 'hydration',
    description: 'Electrolyte that supports hydration and muscle function',
    benefits: ['Muscle function', 'Hydration support', 'Cramp prevention'],
    dosageRange: { min: 200, max: 400, unit: 'mg' },
    scienceRating: 5,
    enabled: true,
  },

  // Optional / Advanced Ingredients (disabled by default)
  {
    id: 'nitrosigine',
    name: 'Nitrosigine®',
    category: 'pump',
    description: 'Inositol-stabilized arginine silicate that boosts nitric oxide for long-lasting pumps and focus',
    benefits: ['Sustained pumps', 'Improved blood flow', 'Enhanced cognitive focus'],
    dosageRange: { min: 1200, max: 1500, unit: 'mg' },
    scienceRating: 4,
    enabled: false,
  },
  {
    id: 'glycerpump',
    name: 'GlycerPump® (65% Glycerol)',
    category: 'pump',
    description: 'Highly stable glycerol powder that increases cellular hydration and pump fullness',
    benefits: ['Hyper-hydration', 'Full muscle pumps', 'Improved endurance in heat'],
    dosageRange: { min: 2000, max: 3000, unit: 'mg' },
    scienceRating: 4,
    enabled: false,
  },
  {
    id: 'rhodiola',
    name: 'Rhodiola Rosea (3% Rosavins)',
    category: 'focus',
    description: 'Adaptogenic herb that reduces fatigue and sharpens mental performance under stress',
    benefits: ['Reduced perceived exertion', 'Improved focus', 'Anti-fatigue support'],
    dosageRange: { min: 200, max: 400, unit: 'mg' },
    scienceRating: 4,
    enabled: false,
  },
  {
    id: 'coconut-water',
    name: 'Coconut Water Powder',
    category: 'hydration',
    description: 'Natural electrolyte complex that replenishes sodium, potassium, and trace minerals',
    benefits: ['Enhanced hydration', 'Electrolyte balance', 'Supports muscle contractions'],
    dosageRange: { min: 1000, max: 2000, unit: 'mg' },
    scienceRating: 3,
    enabled: false,
  },
];

const STORAGE_KEY = '2hlabs:ingredient-availability';

let overrideCache: Record<string, boolean> | null = null;

const readOverrides = (): Record<string, boolean> => {
  if (overrideCache) {
    return overrideCache;
  }
  if (typeof window === 'undefined') {
    overrideCache = {};
    return overrideCache;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    overrideCache = raw ? JSON.parse(raw) : {};
  } catch {
    overrideCache = {};
  }
  return overrideCache!;
};

const getOverrides = () => readOverrides();

const computeEnabled = (ingredient: Ingredient): boolean => {
  const overrides = getOverrides();
  if (Object.prototype.hasOwnProperty.call(overrides, ingredient.id)) {
    return overrides[ingredient.id];
  }
  return ingredient.enabled !== false;
};

export const syncIngredientOverrides = (overrides: Record<string, boolean>) => {
  overrideCache = { ...overrides };
  if (typeof window !== 'undefined') {
    if (Object.keys(overrides).length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    }
  }
};

export const getIngredientAvailabilityMap = (): Record<string, boolean> => ({ ...getOverrides() });

export const updateIngredientAvailability = (id: string, enabled: boolean) => {
  const overrides = { ...getOverrides(), [id]: enabled };
  const ingredient = INGREDIENTS.find(ing => ing.id === id);
  if (ingredient && (ingredient.enabled !== false) === enabled) {
    delete overrides[id];
  }
  syncIngredientOverrides(overrides);
};

export const getIngredientById = (id: string): Ingredient | undefined => {
  const ingredient = INGREDIENTS.find(ing => ing.id === id);
  if (!ingredient) return undefined;
  return computeEnabled(ingredient) ? ingredient : undefined;
};

export const getIngredientsByCategory = (category: string): Ingredient[] => {
  return INGREDIENTS.filter(ing => ing.category === category && computeEnabled(ing));
};

export const isIngredientEnabled = (id: string): boolean => {
  const ingredient = INGREDIENTS.find(ing => ing.id === id);
  if (!ingredient) return false;
  return computeEnabled(ingredient);
};

export const getAllIngredients = () => [...INGREDIENTS];
