import type { QuizQuestion } from '../types';

/**
 * New Formula-Based Quiz
 * Prioritizes caffeine tolerance first, then narrows by concrete training variables
 */

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Q1: PRIMARY FILTER - Caffeine Tolerance
  {
    id: 'q1-caffeine-tolerance',
    question: 'How much caffeine do you want/tolerate in your pre-workout?',
    description: 'This determines the baseline stimulation level',
    dimension: 'stimTolerance',
    options: [
      {
        id: 'extreme',
        text: 'EXTREME POWER (275-350mg) - Very high tolerance, need maximum stimulation',
        scores: { stimTolerance: 100, energy: 100, caffeineLevel: 'extreme' },
      },
      {
        id: 'high',
        text: 'HIGH ENERGY (200-300mg) - Strong energy without going overboard',
        scores: { stimTolerance: 75, energy: 80, caffeineLevel: 'high' },
      },
      {
        id: 'moderate',
        text: 'MODERATE BOOST (150-200mg) - Solid energy lift is perfect',
        scores: { stimTolerance: 50, energy: 60, caffeineLevel: 'moderate' },
      },
      {
        id: 'low',
        text: 'LIGHT STIM (100-175mg) - Sensitive to caffeine, prefer lower doses',
        scores: { stimTolerance: 25, energy: 40, caffeineLevel: 'low' },
      },
      {
        id: 'minimal',
        text: 'MINIMAL STIM (75-125mg) - Just a gentle energy boost',
        scores: { stimTolerance: 10, energy: 20, caffeineLevel: 'minimal' },
      },
      {
        id: 'none',
        text: 'NO STIM (0mg) - I avoid all caffeine/stimulants',
        scores: { stimTolerance: 0, energy: 0, caffeineLevel: 'none' },
      },
    ],
  },

  // Q2a: FOR EXTREME CAFFEINE USERS (275-350mg)
  {
    id: 'q2-extreme-intensity',
    question: 'What\'s your training intensity today?',
    description: 'Your intensity level determines the right extreme formula',
    dimension: 'intensity',
    conditionalOn: { 'q1-caffeine-tolerance': ['extreme'] },
    options: [
      {
        id: 'chaos',
        text: 'MAXIMUM CHAOS (10/10) - HIIT, circuits, absolute insanity',
        scores: { intensity: 100, archetype: 'thunder-strike' },
      },
      {
        id: 'aggression',
        text: 'MAXIMUM AGGRESSION (9/10) - Heavy lifting, all-out power',
        scores: { intensity: 90, archetype: 'gorilla-rage' },
      },
    ],
  },

  // Q2b: FOR HIGH CAFFEINE USERS (200-300mg)
  {
    id: 'q2-high-training-style',
    question: 'What\'s your training style today?',
    description: 'Select the training approach that matches your session',
    dimension: 'trainingType',
    conditionalOn: { 'q1-caffeine-tolerance': ['high'] },
    options: [
      {
        id: 'max-strength',
        text: 'MAX STRENGTH - Heavy singles/doubles, powerlifting focus',
        scores: { intensity: 90, duration: 10, archetype: 'titan-strength' },
      },
      {
        id: 'hybrid',
        text: 'HYBRID ATHLETE - Mixed training (combat sports, CrossFit, functional)',
        scores: { intensity: 70, duration: 50, archetype: 'dragon-blood' },
      },
      {
        id: 'balanced',
        text: 'BALANCED TRAINING - Versatile across strength, endurance, skill',
        scores: { intensity: 70, duration: 50, archetype: 'lion-heart' },
      },
    ],
  },

  // Q3: FOR MODERATE CAFFEINE USERS (150-200mg)
  {
    id: 'q3-moderate-goal',
    question: 'What\'s your primary training goal today?',
    description: 'Your goal determines the optimal moderate-stim formula',
    dimension: 'trainingType',
    conditionalOn: { 'q1-caffeine-tolerance': ['moderate'] },
    options: [
      {
        id: 'speed-power',
        text: 'SPEED & POWER - Sprints, jumps, explosive movements',
        scores: { intensity: 80, duration: 20, archetype: 'cheetah-sprint' },
      },
      {
        id: 'team-endurance',
        text: 'TEAM SPORTS / ENDURANCE - Soccer, basketball, sustained effort',
        scores: { intensity: 60, duration: 60, archetype: 'wolf-pack' },
      },
    ],
  },

  // Q4: FOR LOW CAFFEINE USERS (100-175mg)
  {
    id: 'q4-low-priority',
    question: 'What do you prioritize in today\'s session?',
    description: 'Choose your main focus for low-stim optimization',
    dimension: 'trainingType',
    conditionalOn: { 'q1-caffeine-tolerance': ['low'] },
    options: [
      {
        id: 'max-focus',
        text: 'MAXIMUM FOCUS - Mind-muscle connection, precision technique',
        scores: { focus: 100, intensity: 50, archetype: 'eagle-vision' },
      },
      {
        id: 'pump-focus',
        text: 'PUMP & FOCUS - Bodybuilding, hypertrophy, muscle fullness',
        scores: { focus: 100, intensity: 60, archetype: 'mantis-focus' },
      },
      {
        id: 'long-endurance',
        text: 'LONG ENDURANCE - Marathon training, high-volume bodybuilding',
        scores: { duration: 100, intensity: 40, archetype: 'phoenix-rise' },
      },
    ],
  },

  // Q5: FOR MINIMAL CAFFEINE USERS (75-125mg)
  {
    id: 'q5-minimal-confirm',
    question: 'Confirm your training type:',
    description: 'Minimal stimulation is ideal for all-day outdoor activities',
    dimension: 'trainingType',
    conditionalOn: { 'q1-caffeine-tolerance': ['minimal'] },
    options: [
      {
        id: 'outdoor',
        text: 'OUTDOOR / ADVENTURE - Hiking, rucking, all-day activities',
        scores: { duration: 100, intensity: 30, archetype: 'bear-endurance' },
      },
    ],
  },

  // Q6: FOR STIM-FREE USERS (0mg)
  {
    id: 'q6-stim-free-confirm',
    question: 'Confirm your stim-free preference:',
    description: 'Zero caffeine is perfect for mobility, recovery, and evening training',
    dimension: 'trainingType',
    conditionalOn: { 'q1-caffeine-tolerance': ['none'] },
    options: [
      {
        id: 'stim-free',
        text: 'STIM-FREE TRAINING - Yoga, mobility, recovery, evening sessions',
        scores: { stimTolerance: 0, intensity: 20, archetype: 'serpent-flow' },
      },
    ],
  },

  // Q7: OPTIONAL BONUS - Training Time (for all users)
  {
    id: 'q7-training-time',
    question: 'What time are you training?',
    description: 'This helps us give additional recommendations for sleep optimization',
    dimension: 'context',
    optional: true,
    options: [
      {
        id: 'early-morning',
        text: 'Early Morning (5-10am) - Need to wake up',
        scores: { timeOfDay: 'morning' },
      },
      {
        id: 'late-morning',
        text: 'Late Morning / Afternoon (10am-4pm) - Optimal training window',
        scores: { timeOfDay: 'midday' },
      },
      {
        id: 'early-evening',
        text: 'Early Evening (4-7pm) - After work/school',
        scores: { timeOfDay: 'evening', stimWarning: true },
      },
      {
        id: 'late-evening',
        text: 'Late Evening (7pm+) - Night owl training',
        scores: { timeOfDay: 'night', stimWarning: true, recommendLowStim: true },
      },
    ],
  },
];
