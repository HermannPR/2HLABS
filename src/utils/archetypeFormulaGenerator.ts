import type { Archetype, Formula, FormulaIngredient, QuizAnswers } from '../types';
import { getIngredientById } from '../data/ingredients';

interface UserContext {
  weight: number;
  trainingTime: 'morning' | 'midday' | 'afternoon' | 'evening';
  isNewUser: boolean;
  isSensitive: boolean;
  isEveningTrainer: boolean;
}

export const generateArchetypeFormula = (
  archetype: Archetype,
  answers: QuizAnswers,
  userContext: UserContext
): Formula => {
  const ingredients: FormulaIngredient[] = [];

  // Extract user context from answers
  const weight = extractWeight(answers);
  const scaleFactor = calculateScaleFactor(weight);

  // 1. ENERGY & STIMULANTS LAYER
  ingredients.push(...getEnergyIngredients(archetype, userContext));

  // 2. PUMP LAYER
  ingredients.push(...getPumpIngredients(archetype, scaleFactor));

  // 3. STRENGTH LAYER
  ingredients.push(...getStrengthIngredients(archetype));

  // 4. ENDURANCE LAYER
  ingredients.push(...getEnduranceIngredients(archetype, scaleFactor));

  // 5. FOCUS LAYER
  ingredients.push(...getFocusIngredients(archetype));

  // 6. HYDRATION & ELECTROLYTES
  ingredients.push(...getHydrationIngredients(archetype));

  // Calculate total caffeine
  const totalCaffeine = ingredients.reduce((total, item) => {
    const caffeine = item.ingredient.caffeineContent || 0;
    return total + (item.dosage * caffeine);
  }, 0);

  return {
    id: generateFormulaId(),
    ingredients,
    totalCaffeine: Math.round(totalCaffeine),
    createdAt: new Date(),
    name: archetype.name,
    profile: {
      age: 25,
      weight,
      gender: 'other',
      fitnessLevel: 'intermediate',
      goals: ['strength'],
    },
  };
};

const getEnergyIngredients = (archetype: Archetype, context: UserContext): FormulaIngredient[] => {
  const ingredients: FormulaIngredient[] = [];
  let [minCaffeine, maxCaffeine] = archetype.formulaProfile.caffeineRange;

  // Adjust for context
  if (context.isNewUser) {
    maxCaffeine = Math.round(maxCaffeine * 0.7);
  }
  if (context.isSensitive) {
    maxCaffeine = Math.round(maxCaffeine * 0.6);
  }
  if (context.isEveningTrainer || context.trainingTime === 'evening') {
    maxCaffeine = Math.round(maxCaffeine * 0.5);
  }

  const targetCaffeine = Math.round((minCaffeine + maxCaffeine) / 2);

  if (targetCaffeine > 0) {
    // Caffeine Anhydrous
    const caffeine = getIngredientById('caffeine');
    if (caffeine) {
      ingredients.push({
        ingredient: caffeine,
        dosage: targetCaffeine,
        unit: 'mg',
        reason: archetype.formulaProfile.intensity >= 7
          ? 'Maximum energy and aggression'
          : 'Optimal energy without overstimulation',
      });
    }

    // L-Theanine (paired with caffeine for smooth energy)
    const theanine = getIngredientById('l-theanine');
    if (theanine && targetCaffeine >= 150) {
      ingredients.push({
        ingredient: theanine,
        dosage: Math.round(targetCaffeine * 0.5),
        unit: 'mg',
        reason: 'Smooth, focused energy without jitters',
      });
    }

    // Theobromine for sustained energy (moderate-high intensity archetypes)
    if (archetype.formulaProfile.intensity >= 6 && targetCaffeine >= 200) {
      const theobromine = getIngredientById('theobromine');
      if (theobromine) {
        ingredients.push({
          ingredient: theobromine,
          dosage: 200,
          unit: 'mg',
          reason: 'Long-lasting, smooth energy throughout your session',
        });
      }
    }
  }

  return ingredients;
};

const getPumpIngredients = (archetype: Archetype, scaleFactor: number): FormulaIngredient[] => {
  const ingredients: FormulaIngredient[] = [];
  const pumpLevel = archetype.formulaProfile.pumpLevel;

  const citrullineDoses = {
    light: 4000,
    moderate: 6000,
    high: 8000,
    maximum: 10000,
  };

  const citrulline = getIngredientById('l-citrulline');
  if (citrulline && pumpLevel !== 'light') {
    const baseDose = citrullineDoses[pumpLevel];
    ingredients.push({
      ingredient: citrulline,
      dosage: Math.round(baseDose * scaleFactor),
      unit: 'mg',
      reason: pumpLevel === 'maximum'
        ? 'MAXIMUM muscle pumps and blood flow'
        : 'Enhanced blood flow and muscle pumps',
    });
  }

  // Add beetroot for high-endurance archetypes
  if (archetype.formulaProfile.enduranceFocus === 'heavy') {
    const beetroot = getIngredientById('beetroot');
    if (beetroot) {
      ingredients.push({
        ingredient: beetroot,
        dosage: 500,
        unit: 'mg',
        reason: 'Improved oxygen utilization and endurance',
      });
    }
  }

  return ingredients;
};

const getStrengthIngredients = (archetype: Archetype): FormulaIngredient[] => {
  const ingredients: FormulaIngredient[] = [];
  const strengthFocus = archetype.formulaProfile.strengthFocus;

  if (strengthFocus === 'heavy' || strengthFocus === 'moderate') {
    // Creatine Monohydrate
    const creatine = getIngredientById('creatine');
    if (creatine) {
      ingredients.push({
        ingredient: creatine,
        dosage: 5000,
        unit: 'mg',
        reason: strengthFocus === 'heavy'
          ? 'Maximum strength and power output'
          : 'Enhanced strength and power',
      });
    }

    // Betaine
    const betaine = getIngredientById('betaine');
    if (betaine) {
      ingredients.push({
        ingredient: betaine,
        dosage: 2500,
        unit: 'mg',
        reason: 'Increased power output and strength',
      });
    }
  }

  return ingredients;
};

const getEnduranceIngredients = (archetype: Archetype, scaleFactor: number): FormulaIngredient[] => {
  const ingredients: FormulaIngredient[] = [];
  const enduranceFocus = archetype.formulaProfile.enduranceFocus;

  if (enduranceFocus === 'heavy' || enduranceFocus === 'moderate') {
    const betaAlanineDoses = {
      heavy: 5000,
      moderate: 3200,
    };

    const betaAlanine = getIngredientById('beta-alanine');
    if (betaAlanine && (enduranceFocus === 'heavy' || enduranceFocus === 'moderate')) {
      const baseDose = betaAlanineDoses[enduranceFocus];
      ingredients.push({
        ingredient: betaAlanine,
        dosage: Math.round(baseDose * Math.min(scaleFactor, 1.1)),
        unit: 'mg',
        reason: enduranceFocus === 'heavy'
          ? 'Delays fatigue for extended endurance'
          : 'Buffers lactic acid for improved performance',
      });
    }
  }

  // Add taurine for most archetypes
  if (enduranceFocus !== 'none') {
    const taurine = getIngredientById('taurine');
    if (taurine) {
      ingredients.push({
        ingredient: taurine,
        dosage: enduranceFocus === 'heavy' ? 2000 : 1000,
        unit: 'mg',
        reason: 'Enhanced endurance and cellular hydration',
      });
    }
  }

  return ingredients;
};

const getFocusIngredients = (archetype: Archetype): FormulaIngredient[] => {
  const ingredients: FormulaIngredient[] = [];
  const focusLevel = archetype.formulaProfile.focusLevel;

  const tyrosineDoses = {
    light: 0,
    moderate: 1000,
    high: 1500,
    maximum: 2000,
  };

  const tyrosine = getIngredientById('l-tyrosine');
  if (tyrosine && focusLevel !== 'light') {
    ingredients.push({
      ingredient: tyrosine,
      dosage: tyrosineDoses[focusLevel],
      unit: 'mg',
      reason: focusLevel === 'maximum'
        ? 'Maximum mental focus and clarity'
        : 'Enhanced focus and stress management',
    });
  }

  // Alpha-GPC for high focus archetypes
  if (focusLevel === 'maximum' || focusLevel === 'high') {
    const alphaGPC = getIngredientById('alpha-gpc');
    if (alphaGPC) {
      ingredients.push({
        ingredient: alphaGPC,
        dosage: focusLevel === 'maximum' ? 600 : 300,
        unit: 'mg',
        reason: 'Enhanced mind-muscle connection and cognitive function',
      });
    }
  }

  return ingredients;
};

const getHydrationIngredients = (archetype: Archetype): FormulaIngredient[] => {
  const ingredients: FormulaIngredient[] = [];

  // Sodium for pump and hydration
  const sodium = getIngredientById('sodium');
  if (sodium) {
    const sodiumDose = archetype.formulaProfile.pumpLevel === 'maximum' ? 500 :
                      archetype.formulaProfile.enduranceFocus === 'heavy' ? 500 : 300;

    ingredients.push({
      ingredient: sodium,
      dosage: sodiumDose,
      unit: 'mg',
      reason: 'Enhanced hydration and muscle pumps',
    });
  }

  // Potassium
  const potassium = getIngredientById('potassium');
  if (potassium) {
    const potassiumDose = archetype.formulaProfile.enduranceFocus === 'heavy' ? 400 : 300;

    ingredients.push({
      ingredient: potassium,
      dosage: potassiumDose,
      unit: 'mg',
      reason: 'Muscle function and hydration support',
    });
  }

  return ingredients;
};

const extractWeight = (answers: QuizAnswers): number => {
  const weightAnswer = answers['q9-bodyweight'];
  if (!weightAnswer) return 75; // default

  const weightMap: Record<string, number> = {
    'light': 55,
    'medium': 67.5,
    'athletic': 82.5,
    'heavy': 95,
  };

  return weightMap[weightAnswer as string] || 75;
};

const calculateScaleFactor = (weight: number): number => {
  const baseFactor = weight / 75; // 75kg as baseline
  return Math.max(0.85, Math.min(1.15, baseFactor)); // Clamp between 0.85 and 1.15
};

const generateFormulaId = (): string => {
  return `archetype_formula_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getUserContextFromAnswers = (answers: QuizAnswers): UserContext => {
  const restrictions = answers['q10-restrictions'];
  const restrictionsArray = Array.isArray(restrictions) ? restrictions : [restrictions];

  const timing = answers['q7-timing'] as string;
  const timingMap: Record<string, UserContext['trainingTime']> = {
    'morning': 'morning',
    'midday': 'midday',
    'afternoon': 'afternoon',
    'evening': 'evening',
  };

  return {
    weight: extractWeight(answers),
    trainingTime: timingMap[timing] || 'morning',
    isNewUser: restrictionsArray.includes('new-user'),
    isSensitive: restrictionsArray.includes('sensitive') || restrictionsArray.includes('sleep-issues'),
    isEveningTrainer: restrictionsArray.includes('evening-train') || timing === 'evening',
  };
};
