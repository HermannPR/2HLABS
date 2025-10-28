import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1-vibe',
    question: 'You walk into the gym. What\'s your vibe?',
    description: 'Be honest - there are no wrong answers',
    dimension: 'focus',
    options: [
      {
        id: 'war',
        text: 'I\'m here to go to WAR',
        emoji: '⚔️',
        scores: { focus: 100, intensity: 80 },
      },
      {
        id: 'execute',
        text: 'Focused and ready to execute',
        emoji: '🎯',
        scores: { focus: 60, intensity: 60 },
      },
      {
        id: 'flow',
        text: 'Ready to flow and move',
        emoji: '🌊',
        scores: { focus: 30, intensity: 40 },
      },
      {
        id: 'steady',
        text: 'Steady grind, let\'s work',
        emoji: '💪',
        scores: { focus: 50, intensity: 50 },
      },
    ],
  },
  {
    id: 'q2-session',
    question: 'Your ideal training session feels like...',
    description: 'How long do you usually go?',
    dimension: 'duration',
    options: [
      {
        id: 'battle',
        text: 'An intense 20-30 minute battle',
        emoji: '🔥',
        scores: { duration: 10, intensity: 90, energy: 90 },
      },
      {
        id: 'solid',
        text: 'A solid 45-60 minute session',
        emoji: '⚖️',
        scores: { duration: 50, intensity: 60, energy: 60 },
      },
      {
        id: 'sustained',
        text: '90+ minutes of sustained effort',
        emoji: '⏱️',
        scores: { duration: 100, intensity: 40, energy: 30 },
      },
    ],
  },
  {
    id: 'q3-performance',
    question: 'When you imagine peak performance, you see yourself...',
    description: 'What does your best look like?',
    dimension: 'intensity',
    options: [
      {
        id: 'explode',
        text: 'Exploding with maximum power',
        emoji: '💥',
        scores: { intensity: 100, energy: 90 },
      },
      {
        id: 'momentum',
        text: 'Building momentum steadily',
        emoji: '📈',
        scores: { intensity: 40, energy: 50 },
      },
      {
        id: 'bursts',
        text: 'Quick bursts then recover',
        emoji: '⚡',
        scores: { intensity: 70, energy: 80 },
      },
    ],
  },
  {
    id: 'q4-energy',
    question: 'How do you want your energy to hit?',
    description: 'Everyone\'s different - what works for you?',
    dimension: 'energy',
    options: [
      {
        id: 'fast-hard',
        text: 'Fast and hard, let\'s GO!',
        emoji: '🚀',
        scores: { energy: 100, intensity: 80 },
      },
      {
        id: 'gradual',
        text: 'Gradual rise, sustained throughout',
        emoji: '🌅',
        scores: { energy: 30, intensity: 40 },
      },
      {
        id: 'controlled',
        text: 'Steady and controlled',
        emoji: '📊',
        scores: { energy: 50, intensity: 50, focus: 70 },
      },
    ],
  },
  {
    id: 'q5-caffeine',
    question: 'Describe your relationship with caffeine...',
    description: 'This helps us dial in your perfect dose',
    dimension: 'stimTolerance',
    options: [
      {
        id: 'immune',
        text: 'Multiple coffees daily, I\'m immune',
        emoji: '☕☕☕',
        scores: { stimTolerance: 100 },
      },
      {
        id: 'regular',
        text: 'Regular coffee, works fine',
        emoji: '☕☕',
        scores: { stimTolerance: 60 },
      },
      {
        id: 'noticeable',
        text: 'One coffee affects me noticeably',
        emoji: '☕',
        scores: { stimTolerance: 30 },
      },
      {
        id: 'avoid',
        text: 'I avoid caffeine',
        emoji: '🚫',
        scores: { stimTolerance: 0 },
      },
    ],
  },
  {
    id: 'q6-goal',
    question: 'What\'s your biggest goal right now?',
    description: 'We\'ll prioritize ingredients for this',
    dimension: 'context',
    options: [
      {
        id: 'strength',
        text: 'Lift heavier, pure strength',
        emoji: '🏋️',
        scores: { intensity: 80, duration: 10, focus: 70 },
      },
      {
        id: 'muscle',
        text: 'Build muscle, look better',
        emoji: '💪',
        scores: { intensity: 60, duration: 50, focus: 60 },
      },
      {
        id: 'endurance',
        text: 'Go longer, more endurance',
        emoji: '🏃',
        scores: { intensity: 30, duration: 100, energy: 40 },
      },
      {
        id: 'focus',
        text: 'Improve focus and technique',
        emoji: '🎯',
        scores: { intensity: 40, duration: 50, focus: 100 },
      },
      {
        id: 'power',
        text: 'Be faster and more explosive',
        emoji: '⚡',
        scores: { intensity: 90, duration: 20, energy: 90 },
      },
    ],
  },
  {
    id: 'q7-timing',
    question: 'When do you usually train?',
    description: 'Timing affects our caffeine recommendations',
    dimension: 'context',
    options: [
      {
        id: 'morning',
        text: 'Morning (5am-10am)',
        emoji: '🌅',
        scores: {},
      },
      {
        id: 'midday',
        text: 'Midday (10am-3pm)',
        emoji: '🌞',
        scores: {},
      },
      {
        id: 'afternoon',
        text: 'Afternoon (3pm-6pm)',
        emoji: '🌆',
        scores: {},
      },
      {
        id: 'evening',
        text: 'Evening (6pm+)',
        emoji: '🌙',
        scores: { stimTolerance: -30 }, // Reduce stimulant recommendation
      },
    ],
  },
  {
    id: 'q8-activity',
    question: 'Pick the activity that speaks to you most...',
    description: 'What gets you excited?',
    dimension: 'context',
    options: [
      {
        id: 'barbell',
        text: 'Heavy barbell work',
        emoji: '🏋️',
        scores: { intensity: 80, duration: 20, focus: 70 },
      },
      {
        id: 'running',
        text: 'Running/cardio',
        emoji: '🏃',
        scores: { intensity: 40, duration: 100, energy: 30 },
      },
      {
        id: 'bodyweight',
        text: 'Bodyweight/gymnastics',
        emoji: '🤸',
        scores: { intensity: 60, duration: 50, focus: 80 },
      },
      {
        id: 'combat',
        text: 'Combat sports',
        emoji: '🥊',
        scores: { intensity: 90, duration: 60, focus: 90, energy: 80 },
      },
      {
        id: 'team',
        text: 'Team sports',
        emoji: '🏀',
        scores: { intensity: 70, duration: 70, energy: 60 },
      },
      {
        id: 'yoga',
        text: 'Yoga/mobility',
        emoji: '🧘',
        scores: { intensity: 20, duration: 60, focus: 40, stimTolerance: -20 },
      },
    ],
  },
  {
    id: 'q9-bodyweight',
    question: 'Your body weight...',
    description: 'We use this to calculate safe dosages',
    dimension: 'context',
    options: [
      {
        id: 'light',
        text: 'Under 60kg (130lbs)',
        emoji: '🪶',
        scores: {},
      },
      {
        id: 'medium',
        text: '60-75kg (130-165lbs)',
        emoji: '⚖️',
        scores: {},
      },
      {
        id: 'athletic',
        text: '75-90kg (165-200lbs)',
        emoji: '💪',
        scores: {},
      },
      {
        id: 'heavy',
        text: 'Over 90kg (200lbs+)',
        emoji: '🦍',
        scores: {},
      },
    ],
  },
  {
    id: 'q10-restrictions',
    question: 'Any of these apply to you?',
    description: 'Select all that apply - we\'ll adjust your formula accordingly',
    dimension: 'safety',
    options: [
      {
        id: 'sensitive',
        text: 'I\'m sensitive to stimulants (jitters/anxiety)',
        emoji: '😰',
        scores: { stimTolerance: -40 },
      },
      {
        id: 'evening-train',
        text: 'I train in the evening (after 6pm)',
        emoji: '🌙',
        scores: { stimTolerance: -30 },
      },
      {
        id: 'new-user',
        text: 'I\'m new to pre-workouts',
        emoji: '🆕',
        scores: { stimTolerance: -20, intensity: -20 },
      },
      {
        id: 'sleep-issues',
        text: 'I have sleep issues',
        emoji: '😴',
        scores: { stimTolerance: -40 },
      },
      {
        id: 'natural',
        text: 'I prefer natural/minimal ingredients',
        emoji: '🌿',
        scores: { stimTolerance: -20 },
      },
      {
        id: 'drug-tested',
        text: 'I\'m a drug-tested athlete',
        emoji: '🏅',
        scores: {},
      },
      {
        id: 'none',
        text: 'None of these',
        emoji: '✅',
        scores: {},
      },
    ],
  },
];
