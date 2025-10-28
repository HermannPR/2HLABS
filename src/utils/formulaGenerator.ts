import type { UserData, Formula, FormulaIngredient, Goal } from '../types';
import { getIngredientById } from '../data/ingredients';

export class FormulaGenerator {
  private userData: UserData;

  constructor(userData: UserData) {
    this.userData = userData;
  }

  generate(): Formula {
    const ingredients: FormulaIngredient[] = [];

    // Base ingredients everyone gets
    ingredients.push(...this.getBaseIngredients());

    // Goal-specific ingredients
    ingredients.push(...this.getGoalBasedIngredients());

    // Energy/Stimulant ingredients based on preference
    ingredients.push(...this.getEnergyIngredients());

    // Hydration/Electrolytes
    ingredients.push(...this.getHydrationIngredients());

    // Calculate total caffeine
    const totalCaffeine = this.calculateTotalCaffeine(ingredients);

    return {
      id: this.generateId(),
      ingredients,
      totalCaffeine,
      createdAt: new Date(),
      name: this.generateFormulaName(),
      profile: this.userData.profile,
    };
  }

  private getBaseIngredients(): FormulaIngredient[] {
    const ingredients: FormulaIngredient[] = [];

    // L-Citrulline for everyone (pump + performance)
    const citrulline = getIngredientById('l-citrulline');
    if (citrulline) {
      ingredients.push({
        ingredient: citrulline,
        dosage: this.scaleDosage(8000, this.userData.profile.weight),
        unit: 'mg',
        reason: 'Enhanced blood flow and muscle pumps',
      });
    }

    // Creatine for strength/power goals
    if (this.hasGoal(['strength', 'muscle-gain', 'power'])) {
      const creatine = getIngredientById('creatine');
      if (creatine) {
        ingredients.push({
          ingredient: creatine,
          dosage: 5000,
          unit: 'mg',
          reason: 'Increased strength and power output',
        });
      }
    }

    return ingredients;
  }

  private getGoalBasedIngredients(): FormulaIngredient[] {
    const ingredients: FormulaIngredient[] = [];

    // Endurance-focused
    if (this.hasGoal(['endurance', 'fat-loss'])) {
      const betaAlanine = getIngredientById('beta-alanine');
      if (betaAlanine) {
        const dosage = this.userData.profile.fitnessLevel === 'beginner' ? 3200 : 5000;
        ingredients.push({
          ingredient: betaAlanine,
          dosage,
          unit: 'mg',
          reason: 'Delays fatigue during endurance activities',
        });
      }

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

    // Strength/Power focused
    if (this.hasGoal(['strength', 'power'])) {
      const betaine = getIngredientById('betaine');
      if (betaine) {
        ingredients.push({
          ingredient: betaine,
          dosage: 2500,
          unit: 'mg',
          reason: 'Enhanced power output and strength',
        });
      }
    }

    // Focus-heavy workouts
    if (this.hasGoal(['focus']) || this.userData.training.workoutType.includes('crossfit')) {
      const alphaGPC = getIngredientById('alpha-gpc');
      if (alphaGPC) {
        ingredients.push({
          ingredient: alphaGPC,
          dosage: 300,
          unit: 'mg',
          reason: 'Enhanced mind-muscle connection and focus',
        });
      }
    }

    return ingredients;
  }

  private getEnergyIngredients(): FormulaIngredient[] {
    const ingredients: FormulaIngredient[] = [];
    const { caffeineTolerance, stimulantPreference } = this.userData.preferences;

    if (stimulantPreference === 'none' || caffeineTolerance === 'none') {
      // Non-stim energy alternatives
      const tyrosine = getIngredientById('l-tyrosine');
      if (tyrosine) {
        ingredients.push({
          ingredient: tyrosine,
          dosage: 2000,
          unit: 'mg',
          reason: 'Focus and mental energy without stimulants',
        });
      }
      return ingredients;
    }

    // Calculate caffeine dosage based on tolerance and timing
    let caffeineDosage = 0;
    switch (caffeineTolerance) {
      case 'low':
        caffeineDosage = 100;
        break;
      case 'medium':
        caffeineDosage = 200;
        break;
      case 'high':
        caffeineDosage = 300;
        break;
    }

    // Reduce caffeine for evening workouts
    if (this.userData.training.workoutTime === 'evening') {
      caffeineDosage = Math.floor(caffeineDosage * 0.6);
    }

    const caffeine = getIngredientById('caffeine');
    if (caffeine && caffeineDosage > 0) {
      ingredients.push({
        ingredient: caffeine,
        dosage: caffeineDosage,
        unit: 'mg',
        reason: 'Increased energy, focus, and performance',
      });

      // Add L-Theanine with caffeine to smooth energy
      const theanine = getIngredientById('l-theanine');
      if (theanine) {
        ingredients.push({
          ingredient: theanine,
          dosage: Math.floor(caffeineDosage * 0.5), // 1:2 ratio
          unit: 'mg',
          reason: 'Smooth, focused energy without jitters',
        });
      }
    }

    // Add Theobromine for sustained energy
    if (stimulantPreference !== 'mild') {
      const theobromine = getIngredientById('theobromine');
      if (theobromine) {
        ingredients.push({
          ingredient: theobromine,
          dosage: 200,
          unit: 'mg',
          reason: 'Long-lasting, smooth energy',
        });
      }
    }

    // Tyrosine for focus
    const tyrosine = getIngredientById('l-tyrosine');
    if (tyrosine) {
      ingredients.push({
        ingredient: tyrosine,
        dosage: 1500,
        unit: 'mg',
        reason: 'Enhanced focus and stress management',
      });
    }

    return ingredients;
  }

  private getHydrationIngredients(): FormulaIngredient[] {
    const ingredients: FormulaIngredient[] = [];

    // Electrolytes for high-intensity or long-duration workouts
    if (
      this.userData.training.duration >= 60 ||
      this.userData.training.workoutType.includes('hiit') ||
      this.userData.training.workoutType.includes('crossfit')
    ) {
      const sodium = getIngredientById('sodium');
      if (sodium) {
        ingredients.push({
          ingredient: sodium,
          dosage: 500,
          unit: 'mg',
          reason: 'Hydration and enhanced muscle pumps',
        });
      }

      const potassium = getIngredientById('potassium');
      if (potassium) {
        ingredients.push({
          ingredient: potassium,
          dosage: 300,
          unit: 'mg',
          reason: 'Muscle function and hydration support',
        });
      }
    }

    // Taurine
    const taurine = getIngredientById('taurine');
    if (taurine) {
      ingredients.push({
        ingredient: taurine,
        dosage: 1000,
        unit: 'mg',
        reason: 'Endurance and cellular hydration',
      });
    }

    return ingredients;
  }

  private hasGoal(goals: Goal[]): boolean {
    return this.userData.profile.goals.some(g => goals.includes(g));
  }

  private scaleDosage(baseDosage: number, weight: number): number {
    // Scale dosage based on weight (base is 70kg/154lbs)
    const scaleFactor = weight / 70;
    const scaled = baseDosage * scaleFactor;

    // Clamp to reasonable range (0.8x to 1.2x)
    return Math.round(Math.max(baseDosage * 0.8, Math.min(scaled, baseDosage * 1.2)));
  }

  private calculateTotalCaffeine(ingredients: FormulaIngredient[]): number {
    return ingredients.reduce((total, item) => {
      const caffeine = item.ingredient.caffeineContent || 0;
      return total + item.dosage * caffeine;
    }, 0);
  }

  private generateId(): string {
    return `formula_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateFormulaName(): string {
    const primaryGoal = this.userData.profile.goals[0] || 'performance';
    const goalNames: Record<string, string> = {
      strength: 'Powerhouse',
      endurance: 'Endurance Elite',
      'fat-loss': 'Lean Machine',
      'muscle-gain': 'Mass Builder',
      focus: 'Clarity',
      power: 'Explosive',
    };

    return `${goalNames[primaryGoal] || 'Peak Performance'} Formula`;
  }
}

export const generateFormula = (userData: UserData): Formula => {
  const generator = new FormulaGenerator(userData);
  return generator.generate();
};
