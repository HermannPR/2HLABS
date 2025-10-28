import { FAQ } from '../types';

export const FAQS: FAQ[] = [
  {
    id: '1',
    question: 'How does the personalized formula work?',
    answer: 'Our algorithm analyzes your fitness goals, training schedule, body composition, and preferences to create a unique preworkout formula. We adjust ingredient dosages based on your weight, select compounds that align with your goals, and account for your caffeine tolerance and dietary restrictions.',
    category: 'product',
  },
  {
    id: '2',
    question: 'Are the ingredients science-backed?',
    answer: 'Absolutely. We only use ingredients with strong clinical research supporting their efficacy. Each ingredient is dosed according to scientific literature, not under-dosed like many commercial products. We provide full transparency with references to published studies.',
    category: 'product',
  },
  {
    id: '3',
    question: 'Can I adjust my formula later?',
    answer: 'Yes! As your training evolves, so can your formula. You can update your profile anytime and we\'ll regenerate your formula to match your current needs. Many athletes adjust their formula for different training phases (cutting, bulking, competition prep).',
    category: 'product',
  },
  {
    id: '4',
    question: 'Is this safe for drug-tested athletes?',
    answer: 'Yes. All our ingredients are naturally occurring or synthetic versions of natural compounds. We do not use any banned substances. However, we always recommend athletes check with their specific organization\'s banned substance list and consult with their team.',
    category: 'safety',
  },
  {
    id: '5',
    question: 'How much caffeine will be in my formula?',
    answer: 'This depends entirely on your preferences and tolerance. During the quiz, you\'ll specify your caffeine tolerance (none, low, medium, high) and we\'ll adjust accordingly. Formulas range from 0mg to 400mg of caffeine. You have full control.',
    category: 'product',
  },
  {
    id: '6',
    question: 'What if I have allergies or dietary restrictions?',
    answer: 'Our formula builder includes a section for dietary restrictions and allergens. We can accommodate vegan, vegetarian, gluten-free, and other requirements. We\'ll automatically exclude any ingredients you flag.',
    category: 'safety',
  },
  {
    id: '7',
    question: 'How long does shipping take?',
    answer: 'We manufacture your custom formula fresh after you order. Production takes 2-3 business days, and shipping is 3-5 business days within the continental US. International shipping is available and takes 7-14 days.',
    category: 'shipping',
  },
  {
    id: '8',
    question: 'Do you offer a money-back guarantee?',
    answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied with your personalized formula, contact us within 30 days for a full refund. We stand behind our products.',
    category: 'shipping',
  },
];
