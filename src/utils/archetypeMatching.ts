import type { QuizAnswers, DimensionScores, Archetype, ArchetypeResult, IntensityType, DurationType, FocusType, EnergyPattern, StimTolerance } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { ARCHETYPES } from '../data/archetypes';

interface RawScores {
  intensity: number;
  duration: number;
  focus: number;
  energy: number;
  stimTolerance: number;
}

/**
 * New Direct Archetype Matching
 * Prioritizes direct archetype assignments from quiz answers
 */
export const getArchetypeResult = (answers: QuizAnswers): ArchetypeResult => {
  // First, check if any answer directly specifies an archetype
  const directArchetypeId = getDirectArchetypeFromAnswers(answers);

  if (directArchetypeId) {
    const archetype = ARCHETYPES.find(a => a.id === directArchetypeId);
    if (archetype) {
      const dimensionScores = calculateDimensionScores(answers);
      const formula = createFormulaPlaceholder(archetype);

      return {
        archetype,
        dimensionScores,
        formula,
        matchPercentage: 100, // Direct match = 100%
      };
    }
  }

  // Fallback to score-based matching (for backwards compatibility)
  const dimensionScores = calculateDimensionScores(answers);
  const archetype = findBestArchetype(dimensionScores);
  const matchPercentage = calculateMatchPercentage(archetype, dimensionScores);
  const formula = createFormulaPlaceholder(archetype);

  return {
    archetype,
    dimensionScores,
    formula,
    matchPercentage,
  };
};

/**
 * Extract direct archetype ID from quiz answers
 */
const getDirectArchetypeFromAnswers = (answers: QuizAnswers): string | null => {
  for (const [questionId, answerIds] of Object.entries(answers)) {
    const question = QUIZ_QUESTIONS.find(q => q.id === questionId);
    if (!question) continue;

    const selectedIds = Array.isArray(answerIds) ? answerIds : [answerIds];

    for (const answerId of selectedIds) {
      const option = question.options.find(opt => opt.id === answerId);
      if (option?.scores.archetype) {
        return option.scores.archetype;
      }
    }
  }

  return null;
};

/**
 * Calculate dimension scores from quiz answers
 */
export const calculateDimensionScores = (answers: QuizAnswers): DimensionScores => {
  const scores: RawScores = {
    intensity: 0,
    duration: 0,
    focus: 0,
    energy: 0,
    stimTolerance: 0,
  };

  const counts = {
    intensity: 0,
    duration: 0,
    focus: 0,
    energy: 0,
    stimTolerance: 0,
  };

  // Calculate raw scores from all answers
  Object.entries(answers).forEach(([questionId, answerIds]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === questionId);
    if (!question) return;

    const selectedIds = Array.isArray(answerIds) ? answerIds : [answerIds];

    selectedIds.forEach(answerId => {
      const option = question.options.find(opt => opt.id === answerId);
      if (!option) return;

      // Add scores from this option
      if (option.scores.intensity !== undefined) {
        scores.intensity += option.scores.intensity;
        counts.intensity++;
      }
      if (option.scores.duration !== undefined) {
        scores.duration += option.scores.duration;
        counts.duration++;
      }
      if (option.scores.focus !== undefined) {
        scores.focus += option.scores.focus;
        counts.focus++;
      }
      if (option.scores.energy !== undefined) {
        scores.energy += option.scores.energy;
        counts.energy++;
      }
      if (option.scores.stimTolerance !== undefined) {
        scores.stimTolerance += option.scores.stimTolerance;
        counts.stimTolerance++;
      }
    });
  });

  // Average the scores
  const avgScores = {
    intensity: counts.intensity > 0 ? scores.intensity / counts.intensity : 50,
    duration: counts.duration > 0 ? scores.duration / counts.duration : 50,
    focus: counts.focus > 0 ? scores.focus / counts.focus : 50,
    energy: counts.energy > 0 ? scores.energy / counts.energy : 50,
    stimTolerance: Math.max(0, Math.min(100, counts.stimTolerance > 0 ? scores.stimTolerance / counts.stimTolerance : 50)),
  };

  // Convert scores to types
  const dimensionScores: DimensionScores = {
    intensity: scoreToIntensityType(avgScores.intensity),
    duration: scoreToDurationType(avgScores.duration),
    focus: scoreToFocusType(avgScores.focus),
    energyPattern: scoreToEnergyPattern(avgScores.energy),
    stimTolerance: scoreToStimTolerance(avgScores.stimTolerance),
    intensityScore: Math.round(avgScores.intensity),
    durationScore: Math.round(avgScores.duration),
    focusScore: Math.round(avgScores.focus),
    energyScore: Math.round(avgScores.energy),
  };

  return dimensionScores;
};

const scoreToIntensityType = (score: number): IntensityType => {
  if (score >= 65) return 'explosive';
  if (score >= 35) return 'mixed';
  return 'steady';
};

const scoreToDurationType = (score: number): DurationType => {
  if (score >= 65) return 'marathon';
  if (score >= 35) return 'mixed';
  return 'sprint';
};

const scoreToFocusType = (score: number): FocusType => {
  if (score >= 70) return 'aggressive';
  if (score >= 40) return 'controlled';
  return 'flow';
};

const scoreToEnergyPattern = (score: number): EnergyPattern => {
  if (score >= 65) return 'burst';
  if (score >= 35) return 'balanced';
  return 'sustained';
};

const scoreToStimTolerance = (score: number): StimTolerance => {
  if (score >= 70) return 'high';
  if (score >= 40) return 'moderate';
  if (score >= 15) return 'low';
  return 'none';
};

/**
 * Find best archetype match based on dimension scores
 * (Fallback method for backwards compatibility)
 */
export const findBestArchetype = (dimensionScores: DimensionScores): Archetype => {
  let bestMatch: Archetype = ARCHETYPES[0];
  let bestScore = 0;

  ARCHETYPES.forEach(archetype => {
    let matchScore = 0;

    // Exact dimension matches are worth a lot
    if (archetype.dimensions.intensity === dimensionScores.intensity) matchScore += 30;
    if (archetype.dimensions.duration === dimensionScores.duration) matchScore += 25;
    if (archetype.dimensions.focus === dimensionScores.focus) matchScore += 20;
    if (archetype.dimensions.energyPattern === dimensionScores.energyPattern) matchScore += 15;
    if (archetype.dimensions.stimTolerance === dimensionScores.stimTolerance) matchScore += 10;

    // Partial matches for mixed states
    if (archetype.dimensions.intensity === 'mixed' && dimensionScores.intensity !== 'mixed') matchScore += 10;
    if (archetype.dimensions.duration === 'mixed' && dimensionScores.duration !== 'mixed') matchScore += 10;

    if (matchScore > bestScore) {
      bestScore = matchScore;
      bestMatch = archetype;
    }
  });

  return bestMatch;
};

export const calculateMatchPercentage = (archetype: Archetype, dimensionScores: DimensionScores): number => {
  let matches = 0;
  let total = 5;

  if (archetype.dimensions.intensity === dimensionScores.intensity) matches++;
  if (archetype.dimensions.duration === dimensionScores.duration) matches++;
  if (archetype.dimensions.focus === dimensionScores.focus) matches++;
  if (archetype.dimensions.energyPattern === dimensionScores.energyPattern) matches++;
  if (archetype.dimensions.stimTolerance === dimensionScores.stimTolerance) matches++;

  return Math.round((matches / total) * 100);
};

/**
 * Create formula placeholder for archetype
 */
const createFormulaPlaceholder = (archetype: Archetype) => {
  return {
    id: `formula_${Date.now()}`,
    ingredients: [],
    totalCaffeine: archetype.formulaProfile.caffeineRange[0],
    createdAt: new Date(),
    name: archetype.name,
    profile: {
      age: 25,
      weight: 75,
      gender: 'male' as const,
      fitnessLevel: 'intermediate' as const,
      goals: ['strength' as const],
    },
  };
};
