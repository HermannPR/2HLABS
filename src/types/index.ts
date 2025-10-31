// User Profile Types
export interface UserProfile {
  age: number;
  weight: number;
  gender: 'male' | 'female' | 'other';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: Goal[];
}

export type Goal =
  | 'strength'
  | 'endurance'
  | 'fat-loss'
  | 'muscle-gain'
  | 'focus'
  | 'power';

// Training Information
export interface TrainingInfo {
  workoutTime: 'morning' | 'afternoon' | 'evening';
  workoutType: WorkoutType[];
  duration: number; // in minutes
  frequency: number; // days per week
}

export type WorkoutType =
  | 'weightlifting'
  | 'cardio'
  | 'hiit'
  | 'crossfit'
  | 'sports'
  | 'endurance';

// Preferences
export interface UserPreferences {
  caffeineTolerance: 'none' | 'low' | 'medium' | 'high';
  stimulantPreference: 'none' | 'mild' | 'moderate' | 'high';
  dietaryRestrictions: string[];
  avoidIngredients: string[];
}

// Health Info
export interface HealthInfo {
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  stressLevel: 'low' | 'medium' | 'high';
  sensitivities: string[];
}

// Complete User Data
export interface UserData {
  profile: UserProfile;
  training: TrainingInfo;
  preferences: UserPreferences;
  health: HealthInfo;
}

// Ingredient Types
export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  description: string;
  benefits: string[];
  dosageRange: {
    min: number;
    max: number;
    unit: 'mg' | 'g';
  };
  timing?: string;
  scienceRating: number; // 1-5
  caffeineContent?: number; // mg
}

export type IngredientCategory =
  | 'energy'
  | 'pump'
  | 'strength'
  | 'endurance'
  | 'focus'
  | 'recovery'
  | 'hydration';

// Formula Types
export interface FormulaIngredient {
  ingredient: Ingredient;
  dosage: number;
  unit: 'mg' | 'g';
  reason: string;
}

export interface Formula {
  id: string;
  userId?: string;
  ingredients: FormulaIngredient[];
  totalCaffeine: number;
  createdAt: Date;
  name: string;
  profile: UserProfile;
}

// Testimonial Type
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  image?: string;
  content: string;
  rating: number;
}

// FAQ Type
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Archetype System Types
export type IntensityType = 'explosive' | 'steady' | 'mixed';
export type DurationType = 'sprint' | 'mixed' | 'marathon';
export type FocusType = 'aggressive' | 'controlled' | 'flow';
export type EnergyPattern = 'burst' | 'sustained' | 'balanced';
export type StimTolerance = 'none' | 'low' | 'moderate' | 'high';

export interface DimensionScores {
  intensity: IntensityType;
  duration: DurationType;
  focus: FocusType;
  energyPattern: EnergyPattern;
  stimTolerance: StimTolerance;
  intensityScore: number; // 0-100
  durationScore: number; // 0-100
  focusScore: number; // 0-100
  energyScore: number; // 0-100
}

export interface Archetype {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  traits: string[];
  athleteTypes: string[];
  dimensions: {
    intensity: IntensityType;
    duration: DurationType;
    focus: FocusType;
    energyPattern: EnergyPattern;
    stimTolerance: StimTolerance;
  };
  formulaProfile: {
    caffeineRange: [number, number];
    pumpLevel: 'light' | 'moderate' | 'high' | 'maximum';
    strengthFocus: 'none' | 'light' | 'moderate' | 'heavy';
    enduranceFocus: 'none' | 'light' | 'moderate' | 'heavy';
    focusLevel: 'light' | 'moderate' | 'high' | 'maximum';
    intensity: number; // 1-10
  };
  warnings: string[];
  flavors: FlavorOption[];
  testimonials: ArchetypeTestimonial[];
}

export interface FlavorOption {
  id: string;
  name: string;
  fullName: string; // e.g., "Gorilla Rage - Fruit Fury"
  description: string;
  color: string;
  comingSoon?: boolean;
}

export interface ArchetypeTestimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  options: QuizOption[];
  dimension: 'intensity' | 'duration' | 'focus' | 'energy' | 'stimTolerance' | 'safety' | 'context' | 'trainingType';
  conditionalOn?: { [questionId: string]: string[] }; // Show question only if previous answer matches
  optional?: boolean; // Optional questions can be skipped
}

export interface QuizOption {
  id: string;
  text: string;
  emoji?: string;
  image?: string;
  scores: {
    intensity?: number;
    duration?: number;
    focus?: number;
    energy?: number;
    stimTolerance?: number;
    caffeineLevel?: 'extreme' | 'high' | 'moderate' | 'low' | 'minimal' | 'none';
    archetype?: string; // Direct archetype ID mapping
    timeOfDay?: 'morning' | 'midday' | 'evening' | 'night';
    stimWarning?: boolean;
    recommendLowStim?: boolean;
    trainingType?: string;
  };
}

export interface QuizAnswers {
  [questionId: string]: string | string[];
}

export interface ArchetypeResult {
  archetype: Archetype;
  dimensionScores: DimensionScores;
  formula: Formula;
  matchPercentage: number;
}
