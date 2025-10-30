import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1-approach',
    question: 'What type of training are you doing TODAY?',
    description: 'Your current workout style determines what you need',
    dimension: 'intensity',
    options: [
      {
        id: 'destroy',
        text: 'Maximum aggression - Destroy everything in my path',
        scores: { intensity: 100, focus: 100, energy: 90 },
      },
      {
        id: 'explosive',
        text: 'Explosive bursts - Strike fast, strike hard',
        scores: { intensity: 90, focus: 70, energy: 100 },
      },
      {
        id: 'steady',
        text: 'Steady conquest - The grind never stops',
        scores: { intensity: 40, focus: 50, energy: 40 },
      },
      {
        id: 'flow',
        text: 'Flow with the session - Feel the rhythm',
        scores: { intensity: 30, focus: 30, energy: 40 },
      },
      {
        id: 'precision',
        text: 'Precision execution - Every rep counts',
        scores: { intensity: 60, focus: 100, energy: 50 },
      },
      {
        id: 'calculated',
        text: 'Patient and calculated - Mind over muscle',
        scores: { intensity: 40, focus: 80, energy: 30 },
      },
    ],
  },
  {
    id: 'q2-drive',
    question: 'What\'s your main goal for today\'s session?',
    description: 'Your current goal determines what you need most',
    dimension: 'focus',
    options: [
      {
        id: 'domination',
        text: 'Pure domination and absolute power',
        scores: { intensity: 100, focus: 100 },
      },
      {
        id: 'battle',
        text: 'The battle itself - I live for the fight',
        scores: { intensity: 90, focus: 90 },
      },
      {
        id: 'improvement',
        text: 'Constant improvement and progress',
        scores: { intensity: 60, focus: 70 },
      },
      {
        id: 'limits',
        text: 'Breaking through my limits',
        scores: { intensity: 80, focus: 60 },
      },
      {
        id: 'connection',
        text: 'Deep mind-body connection',
        scores: { intensity: 30, focus: 40 },
      },
      {
        id: 'building',
        text: 'Building something that lasts',
        scores: { intensity: 50, focus: 60 },
      },
    ],
  },
  {
    id: 'q3-adversity',
    question: 'How do you want to handle tough sets today?',
    description: 'Your approach determines the mental support you need',
    dimension: 'focus',
    options: [
      {
        id: 'rage',
        text: 'Channel pure rage and push through',
        scores: { intensity: 100, focus: 100, energy: 100 },
      },
      {
        id: 'explode',
        text: 'Explode with everything you have',
        scores: { intensity: 90, focus: 70, energy: 90 },
      },
      {
        id: 'execute',
        text: 'Stay calm and execute the plan',
        scores: { intensity: 50, focus: 100, energy: 50 },
      },
      {
        id: 'feed',
        text: 'Feed off the burn and embrace it',
        scores: { intensity: 70, focus: 60, energy: 70 },
      },
      {
        id: 'focus-deeper',
        text: 'Focus deeper into the moment',
        scores: { intensity: 40, focus: 100, energy: 40 },
      },
      {
        id: 'endure',
        text: 'Endure steadily until completion',
        scores: { intensity: 40, focus: 50, energy: 30 },
      },
    ],
  },
  {
    id: 'q4-session-type',
    question: 'How long is today\'s training session?',
    description: 'Duration affects energy and endurance requirements',
    dimension: 'duration',
    options: [
      {
        id: 'brutal',
        text: 'Short, brutal, and absolutely devastating (20-30min)',
        scores: { duration: 10, intensity: 100, energy: 100 },
      },
      {
        id: 'explosive-varied',
        text: 'Explosive and varied intensity (30-45min)',
        scores: { duration: 30, intensity: 80, energy: 80 },
      },
      {
        id: 'balanced',
        text: 'Balanced and complete (45-60min)',
        scores: { duration: 50, intensity: 60, energy: 60 },
      },
      {
        id: 'sustained',
        text: 'Long and sustained effort (60-90min)',
        scores: { duration: 80, intensity: 40, energy: 40 },
      },
      {
        id: 'marathon',
        text: 'Extended endurance journey (90min+)',
        scores: { duration: 100, intensity: 30, energy: 30 },
      },
      {
        id: 'mindful',
        text: 'Controlled and mindful movement (any duration)',
        scores: { duration: 50, intensity: 30, focus: 80 },
      },
    ],
  },
  {
    id: 'q5-energy-flow',
    question: 'How do you want your pre-workout to kick in?',
    description: 'Different energy curves for different training needs',
    dimension: 'energy',
    options: [
      {
        id: 'lightning',
        text: 'INSTANT - Hit me like lightning strikes',
        scores: { energy: 100, intensity: 90 },
      },
      {
        id: 'explosion',
        text: 'EXPLOSIVE - Fast rise, aggressive burn',
        scores: { energy: 90, intensity: 80 },
      },
      {
        id: 'wave',
        text: 'WAVE - Build gradually, sustain powerfully',
        scores: { energy: 40, intensity: 50 },
      },
      {
        id: 'controlled-burn',
        text: 'CONTROLLED - Steady and reliable power',
        scores: { energy: 50, intensity: 50, focus: 70 },
      },
      {
        id: 'dawn',
        text: 'GENTLE - Smooth rise, no harsh edges',
        scores: { energy: 30, intensity: 30 },
      },
      {
        id: 'natural',
        text: 'NATURAL - No stimulants, pure focus',
        scores: { energy: 10, stimTolerance: 0, focus: 60 },
      },
    ],
  },
  {
    id: 'q6-caffeine-spirit',
    question: 'What\'s your caffeine tolerance level?',
    description: 'We\'ll match your stimulant needs accurately',
    dimension: 'stimTolerance',
    options: [
      {
        id: 'warrior',
        text: 'WARRIOR - High tolerance, bring maximum stimulation',
        scores: { stimTolerance: 100 },
      },
      {
        id: 'experienced',
        text: 'EXPERIENCED - Regular user, can handle strong doses',
        scores: { stimTolerance: 75 },
      },
      {
        id: 'balanced',
        text: 'BALANCED - Moderate amounts work perfectly',
        scores: { stimTolerance: 50 },
      },
      {
        id: 'sensitive',
        text: 'SENSITIVE - Light touch needed, prefer less',
        scores: { stimTolerance: 25 },
      },
      {
        id: 'pure',
        text: 'PURE - No stimulants, I am naturally driven',
        scores: { stimTolerance: 0 },
      },
    ],
  },
  {
    id: 'q7-timing',
    question: 'When are you training today?',
    description: 'Training time affects stimulant recommendations',
    dimension: 'context',
    options: [
      {
        id: 'dawn',
        text: 'DAWN WARRIOR - Early morning (need to wake up)',
        scores: {},
      },
      {
        id: 'midday',
        text: 'MIDDAY HUNTER - Middle of the day (10am-2pm)',
        scores: {},
      },
      {
        id: 'afternoon',
        text: 'AFTERNOON GRINDER - Afternoon sessions (2pm-6pm)',
        scores: {},
      },
      {
        id: 'night',
        text: 'NIGHT PROWLER - Evening training (after 6pm)',
        scores: { stimTolerance: -30 },
      },
    ],
  },
  {
    id: 'q8-primary-goal',
    question: 'What\'s your primary training goal?',
    description: 'Your goal determines the optimal ingredient profile',
    dimension: 'context',
    options: [
      {
        id: 'max-strength',
        text: 'MAXIMUM STRENGTH - Pure power, heavy lifts',
        scores: { intensity: 90, duration: 10, focus: 70 },
      },
      {
        id: 'muscle-build',
        text: 'MUSCLE BUILDING - Pump and hypertrophy',
        scores: { intensity: 70, duration: 50, focus: 60 },
      },
      {
        id: 'endurance',
        text: 'ENDURANCE - Go longer, push further',
        scores: { intensity: 30, duration: 100, energy: 40 },
      },
      {
        id: 'explosive-power',
        text: 'EXPLOSIVE POWER - Speed and athleticism',
        scores: { intensity: 90, duration: 20, energy: 90 },
      },
      {
        id: 'focus-technique',
        text: 'FOCUS & TECHNIQUE - Perfect every movement',
        scores: { intensity: 50, duration: 50, focus: 100 },
      },
      {
        id: 'intensity-training',
        text: 'HIGH INTENSITY - HIIT, circuits, chaos',
        scores: { intensity: 100, duration: 30, energy: 100 },
      },
    ],
  },
  {
    id: 'q9-body-size',
    question: 'What\'s your body weight range?',
    description: 'Helps us calculate precise, effective dosages',
    dimension: 'context',
    options: [
      {
        id: 'compact',
        text: 'COMPACT - Under 60kg / 130lbs',
        scores: {},
      },
      {
        id: 'athletic',
        text: 'ATHLETIC - 60-75kg / 130-165lbs',
        scores: {},
      },
      {
        id: 'powerful',
        text: 'POWERFUL - 75-90kg / 165-200lbs',
        scores: {},
      },
      {
        id: 'massive',
        text: 'MASSIVE - Over 90kg / 200lbs+',
        scores: {},
      },
    ],
  },
  {
    id: 'q10-considerations',
    question: 'Any special considerations we should know?',
    description: 'Select all that apply - we\'ll adjust your formula',
    dimension: 'safety',
    options: [
      {
        id: 'stim-sensitive',
        text: 'I get jittery or anxious with stimulants',
        scores: { stimTolerance: -40 },
      },
      {
        id: 'sleep-priority',
        text: 'Sleep quality is critical to me',
        scores: { stimTolerance: -40 },
      },
      {
        id: 'first-timer',
        text: 'This is my first preworkout experience',
        scores: { stimTolerance: -20, intensity: -20 },
      },
      {
        id: 'evening-trainer',
        text: 'I train in the evening regularly',
        scores: { stimTolerance: -30 },
      },
      {
        id: 'natural-preference',
        text: 'I prefer minimal/natural ingredients',
        scores: { stimTolerance: -20 },
      },
      {
        id: 'drug-tested',
        text: 'I am a drug-tested competitive athlete',
        scores: {},
      },
      {
        id: 'none-apply',
        text: 'None of these - I can handle it all',
        scores: {},
      },
    ],
  },
];
