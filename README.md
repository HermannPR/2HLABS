# 2HLABS - Personalized Preworkout Supplement Platform

> **Discover Your Training Soul** - An innovative preworkout supplement company that matches athletes with their unique training archetype through an intelligent personality-based quiz system.

[![Built with Vite](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## 🎯 Project Overview

2HLABS is a full-stack web application for a next-generation preworkout supplement brand. Unlike traditional supplement companies, 2HLABS uses a dimension-based personality system (similar to MBTI) to match users with one of **12 unique training archetypes** - each with its own scientifically-formulated supplement blend.

### Core Concept: Training Souls

Rather than offering a single preworkout, 2HLABS provides **12 distinct "souls"** - each representing a unique training philosophy and energy signature:

- **GORILLA RAGE** - Unstoppable Force (High intensity, explosive power)
- **DRAGON BLOOD** - Warrior Spirit (Balanced aggression and endurance)
- **CHEETAH SPRINT** - Lightning Speed (Maximum speed and agility)
- **EAGLE VISION** - Precision Master (Laser focus and control)
- **TITAN STRENGTH** - Raw Power (Maximum strength output)
- **WOLF PACK** - Team Warrior (Sustained group training energy)
- **PHOENIX RISE** - Endurance Champion (Extreme stamina and recovery)
- **BEAR ENDURANCE** - Steady Force (Long-duration power)
- **MANTIS FOCUS** - Zen Warrior (Mind-muscle connection)
- **THUNDER STRIKE** - Explosive Chaos (Maximum intensity bursts)
- **SERPENT FLOW** - Mindful Movement (Controlled, flowing energy)
- **LION HEART** - Courageous Leader (Balanced, confident power)

Users can purchase multiple souls for different training needs (e.g., GORILLA RAGE for leg day, SERPENT FLOW for yoga).

---

## 🏗️ Tech Stack

### Frontend Framework
- **React 18.3** - Modern React with hooks and concurrent features
- **TypeScript 5.6** - Type-safe development with strict mode enabled
- **Vite 7.1** - Lightning-fast build tool with HMR

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework
  - Custom color palette (Electric Blue, Neon Pink, Neon Green, Deep Navy)
  - Extended theme with custom fonts and shadows
  - Responsive mobile-first design
- **Framer Motion 11.15** - Production-ready animations
  - Page transitions
  - Element animations
  - Gesture handling
- **React Icons 5.4** - Comprehensive icon library

### Routing & Forms
- **React Router DOM 7.1** - Client-side routing with lazy loading support
- **React Hook Form 7.54** - Performant form state management
- **Zod 3.24** - TypeScript-first schema validation

### Development Tools
- **ESLint** - Code linting with TypeScript support
- **PostCSS** - CSS processing with Autoprefixer

---

## 📁 Project Structure

```
2HLABS/
├── preworkout-startup/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Reusable UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Card.tsx
│   │   │   ├── layout/              # Layout components
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Layout.tsx
│   │   │   └── home/                # Homepage sections
│   │   │       ├── Hero.tsx
│   │   │       ├── Features.tsx
│   │   │       ├── HowItWorks.tsx
│   │   │       ├── Testimonials.tsx
│   │   │       ├── FAQ.tsx
│   │   │       └── FinalCTA.tsx
│   │   ├── pages/                   # Route pages
│   │   │   ├── Home.tsx
│   │   │   ├── FormulaGenerator.tsx  # Soul discovery quiz
│   │   │   ├── AllSouls.tsx          # Archetype comparison page
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Ingredients.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── About.tsx
│   │   ├── data/                    # Static data & databases
│   │   │   ├── archetypes.ts        # 12 training souls
│   │   │   ├── quizQuestions.ts     # Soul discovery quiz
│   │   │   ├── ingredients.ts       # Ingredient database (15+ items)
│   │   │   ├── testimonials.ts
│   │   │   └── faqs.ts
│   │   ├── utils/                   # Business logic
│   │   │   ├── archetypeMatching.ts          # Dimension scoring algorithm
│   │   │   ├── archetypeFormulaGenerator.ts  # Formula generation
│   │   │   └── doseAnalysis.ts               # Clinical dose analysis
│   │   ├── types/                   # TypeScript definitions
│   │   │   └── index.ts             # All type definitions
│   │   ├── App.tsx                  # Root component with routing
│   │   ├── main.tsx                 # Application entry point
│   │   └── index.css                # Global styles
│   ├── public/                      # Static assets
│   ├── dist/                        # Production build output
│   ├── package.json
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.js          # Tailwind customization
│   ├── vite.config.ts              # Vite configuration
│   └── vercel.json                 # Vercel deployment config
├── ASSET_PROMPTS.md                # AI image generation prompts
└── README.md                       # This file
```

---

## 🧬 Soul Discovery System

### The Algorithm

The soul discovery system uses a **5-dimensional personality model** to match users with their ideal training archetype:

#### 1. **Intensity Dimension**
   - `explosive`: High-intensity, aggressive training
   - `steady`: Consistent, controlled approach
   - `mixed`: Variable intensity

#### 2. **Duration Dimension**
   - `sprint`: Short, intense sessions (20-30min)
   - `mixed`: Balanced duration (45-60min)
   - `marathon`: Extended training (90min+)

#### 3. **Focus Dimension**
   - `aggressive`: Primal, instinct-driven
   - `controlled`: Calculated, technical
   - `flow`: Meditative, present

#### 4. **Energy Pattern**
   - `burst`: Fast-acting, explosive energy
   - `balanced`: Smooth, sustained energy
   - `sustained`: Long-lasting endurance

#### 5. **Stimulant Tolerance**
   - `none`: No caffeine
   - `low`: 0-150mg caffeine
   - `moderate`: 150-250mg caffeine
   - `high`: 250-400mg caffeine

### The Quiz

10 carefully crafted questions that assess:
- Training philosophy and approach
- Motivation and drive
- Response to adversity
- Session preferences
- Energy flow preferences
- Caffeine tolerance
- Training timing
- Primary fitness goals
- Body composition
- Safety considerations

### Formula Generation

Each archetype has a unique **formula profile** that determines:

- **Caffeine Range**: Min/max caffeine content
- **Pump Level**: light → moderate → high → maximum
- **Strength Focus**: Creatine and power-boosting compounds
- **Endurance Focus**: Beta-alanine and stamina ingredients
- **Focus Level**: Nootropics and cognitive enhancers
- **Intensity Rating**: 1-10 scale

The formula generator then:
1. Adjusts for user context (weight, timing, sensitivity)
2. Selects ingredients in 6 layers:
   - Energy & Stimulants
   - Pump & Blood Flow
   - Strength & Power
   - Endurance & Stamina
   - Focus & Cognition
   - Hydration & Electrolytes
3. Calculates clinical dosages with scaling factors
4. Provides dose context (LOW/MODERATE/HIGH vs clinical range)

---

## 🧪 Ingredient Database

### Categories & Examples

| Category | Ingredients | Purpose |
|----------|-------------|---------|
| **Energy** | Caffeine Anhydrous, Theobromine | Alertness, energy, thermogenesis |
| **Pump** | L-Citrulline, Beetroot Extract | Nitric oxide, blood flow, pumps |
| **Strength** | Creatine Monohydrate, Betaine | Power output, muscle strength |
| **Endurance** | Beta-Alanine, Taurine | Stamina, fatigue resistance |
| **Focus** | L-Tyrosine, Alpha-GPC, L-Theanine | Mental clarity, mind-muscle connection |
| **Hydration** | Sodium, Potassium | Electrolyte balance, performance |

Each ingredient includes:
- **Name & Description**
- **Clinical Dosage Range** (min-max)
- **Benefits** (array of effects)
- **Science Rating** (1-5 stars)
- **Caffeine Content** (if applicable)

### Dose Analysis System

For every ingredient in a user's formula, we show:
- **Clinical Range**: e.g., "6,000-8,000mg"
- **User's Dose**: e.g., "7,500mg"
- **Dose Level**: `LOW` | `MODERATE` | `HIGH` | `MAXIMUM`
- **Color-Coded Indicator**: Visual feedback on dosing strategy

---

## 🎨 Design System

### Color Palette

```javascript
{
  primary: {
    DEFAULT: '#00E5FF',  // Electric Blue
    dark: '#00B8D4',
    light: '#6EFFFF',
  },
  secondary: {
    DEFAULT: '#FF00E5',  // Neon Pink
    dark: '#C700B3',
    light: '#FF6EFF',
  },
  accent: '#39FF14',      // Neon Green
  dark: {
    DEFAULT: '#0A0E27',   // Deep Navy
    lighter: '#141B3E',
    light: '#1E2749',
  }
}
```

### Typography

- **Headings**: Space Grotesk (Bold, Modern)
- **Body**: Inter (Clean, Readable)

### Animation Strategy

- **Page Transitions**: Fade + slide animations
- **Element Reveals**: Staggered appearance with delays
- **Interactions**: Scale + color transitions on hover
- **Loading States**: Spinning indicators with pulsing effects

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v16 or higher
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/HermannPR/2HLABS.git

# Navigate to project directory
cd 2HLABS/preworkout-startup

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Scripts

```bash
# Development
npm run dev          # Start dev server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Linting
npm run lint         # Run ESLint
```

---

## 📦 Deployment

### Vercel (Recommended)

The project is configured for zero-config Vercel deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments on every push to `main`.

**Live URL**: [Your Vercel deployment URL]

### Build Output

```bash
npm run build
```

Generates optimized production build in `dist/` directory:
- Minified JavaScript bundles
- Optimized CSS with PurgeCSS
- Compressed assets
- Source maps for debugging

---

## 🎯 Key Features

### ✅ Completed

- **Soul Discovery Quiz** - 10-question personality-based assessment
- **12 Unique Archetypes** - Complete profiles with formulas
- **Dynamic Formula Generation** - Personalized ingredient selection
- **Dose Context Display** - Clinical range comparison
- **All Souls Comparison Page** - Browse all 12 archetypes
- **Archetype Reveal Animation** - Epic results page with staggered animations
- **Responsive Design** - Mobile-first, fully responsive
- **Ingredient Library** - Filterable database with search
- **Homepage** - Complete marketing site
- **Navigation** - Multi-page routing with React Router

### 🚧 Roadmap

- [ ] User Authentication (Auth0 / Firebase)
- [ ] Saved Formulas & User Profiles
- [ ] E-commerce Integration (Stripe)
- [ ] Subscription Management
- [ ] Admin Dashboard
- [ ] Email Marketing (Mailchimp / SendGrid)
- [ ] Blog / Content Management
- [ ] A/B Testing Framework
- [ ] Analytics Integration (Google Analytics, Mixpanel)
- [ ] Customer Reviews & Ratings
- [ ] Referral Program
- [ ] Mobile App (React Native)

---

## 🧪 Formula Generation Algorithm

### Input Data

```typescript
{
  archetype: Archetype,           // Matched soul
  answers: QuizAnswers,           // Raw quiz responses
  userContext: {
    weight: number,
    trainingTime: string,
    isNewUser: boolean,
    isSensitive: boolean,
    isEveningTrainer: boolean,
  }
}
```

### Processing Steps

1. **Extract User Context**
   - Parse body weight from quiz
   - Determine training time preferences
   - Identify sensitivities and restrictions

2. **Apply Archetype Profile**
   - Load archetype's formula template
   - Get caffeine range, pump level, focus level, etc.

3. **Adjust for Context**
   - Scale caffeine for new users (-30%)
   - Scale caffeine for sensitive users (-40%)
   - Scale caffeine for evening trainers (-50%)
   - Scale ingredient dosages by body weight (±15%)

4. **Select Ingredients**
   - Energy layer (caffeine, theobromine, theanine)
   - Pump layer (citrulline, beetroot)
   - Strength layer (creatine, betaine)
   - Endurance layer (beta-alanine, taurine)
   - Focus layer (tyrosine, alpha-GPC)
   - Hydration layer (electrolytes)

5. **Generate Output**
   - Calculate total caffeine
   - Format dosages with units
   - Provide reasoning for each ingredient
   - Add dose context (clinical range comparison)

### Output Data

```typescript
{
  id: string,
  ingredients: FormulaIngredient[],  // Array of 8-12 ingredients
  totalCaffeine: number,             // Total mg caffeine
  createdAt: Date,
  name: string,                      // Archetype name
  profile: UserProfile,
}
```

---

## 📊 Type System

All data structures are strongly typed with TypeScript. Key types include:

```typescript
// Core types
Archetype, Formula, Ingredient, QuizQuestion, QuizAnswers

// Dimension types
IntensityType, DurationType, FocusType, EnergyPattern, StimTolerance

// Component types
FormulaIngredient, DimensionScores, ArchetypeResult, UserContext

// Analysis types
DoseLevel, DoseAnalysis
```

See `src/types/index.ts` for complete type definitions.

---

## 🎨 Asset Generation

The project includes `ASSET_PROMPTS.md` with 50+ detailed AI image generation prompts for:

- 12 Soul Logos (circular badges, 512x512px)
- Simplified Icons (128x128px)
- Category Icons (7 types)
- Trust Badges (4 types)
- Background Images & Textures
- UI Accent Graphics
- Flavor Visuals (coming soon)
- Social Media Templates

All prompts are designed for consistency with the brand's electric/neon aesthetic.

---

## 🤝 Contributing

This is a private project for 2HLABS. For internal development:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly: `npm run build` (must succeed)
4. Commit: `git commit -m "Description"`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

### Code Standards

- Use TypeScript for all new code
- Follow existing component patterns
- Use Tailwind classes (avoid custom CSS)
- Add proper type definitions
- Test responsive design (mobile/tablet/desktop)

---

## 📄 License

All rights reserved - 2HLABS © 2025

---

## 📞 Support

For questions or issues:
- **Email**: support@2hlabs.com
- **GitHub Issues**: [Create an issue](https://github.com/HermannPR/2HLABS/issues)

---

**Built with 💪 by the 2HLABS Team**
