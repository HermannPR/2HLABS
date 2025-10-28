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
