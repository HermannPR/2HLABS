# 2HLABS Project Overview

## 🎯 Project Purpose

2HLABS is a personalized preworkout supplement company with a unique **"Soul Discovery"** approach. Instead of offering one generic preworkout, we have **12 unique training archetypes (souls)** - each with its own scientifically-formulated supplement blend.

Think of it like MBTI for fitness - users take a personality-based quiz to discover their training archetype, which determines their ideal preworkout formula.

## 🧬 Core Concept: Training Souls

Users can have multiple souls for different training needs:
- **GORILLA RAGE** for heavy leg days
- **SERPENT FLOW** for yoga sessions
- **DRAGON BLOOD** for balanced training
- etc.

Each soul has:
- Unique personality traits
- Specific caffeine range (0-400mg)
- Custom ingredient blend
- Intensity level (1-10)
- Formula profile (pump/strength/endurance/focus levels)

## 📊 The Soul Discovery System

### 5-Dimensional Personality Model:

1. **Intensity**: explosive | steady | mixed
2. **Duration**: sprint | mixed | marathon
3. **Focus**: aggressive | controlled | flow
4. **Energy Pattern**: burst | balanced | sustained
5. **Stim Tolerance**: none | low | moderate | high

### The Process:
1. User takes 10-question quiz
2. Answers are scored across 5 dimensions
3. Algorithm matches to closest archetype
4. Personalized formula is generated
5. User sees epic reveal with full breakdown

## 🏗️ Tech Stack

- **React 18.3** + **TypeScript 5.6**
- **Vite 7.1** (build tool)
- **Tailwind CSS 3.4** (styling)
- **Framer Motion 11.15** (animations)
- **React Router 7.1** (routing)
- **Deployed on Vercel**

## 📁 Key Files to Know

### Data & Logic
- `src/data/archetypes.ts` - All 12 soul definitions
- `src/data/quizQuestions.ts` - 10 quiz questions
- `src/data/ingredients.ts` - 15+ ingredient database
- `src/utils/archetypeMatching.ts` - Dimension scoring algorithm
- `src/utils/archetypeFormulaGenerator.ts` - Formula generation
- `src/utils/doseAnalysis.ts` - Clinical dose analysis

### Pages
- `src/pages/Home.tsx` - Marketing homepage
- `src/pages/FormulaGenerator.tsx` - Quiz + results reveal
- `src/pages/AllSouls.tsx` - Comparison page for all 12 souls
- `src/pages/Ingredients.tsx` - Ingredient library

### Components
- `src/components/layout/` - Navbar, Footer, Layout
- `src/components/common/` - Button, Card
- `src/components/home/` - Homepage sections

## 🎨 Brand Identity

### Colors:
- **Primary**: Electric Blue (#00E5FF)
- **Secondary**: Neon Pink (#FF00E5)
- **Accent**: Neon Green (#39FF14)
- **Dark**: Deep Navy (#0A0E27)

### Fonts:
- **Headings**: Space Grotesk
- **Body**: Inter

### Style:
- Dark theme
- Energetic, modern, slightly futuristic
- Powerful but not aggressive
- Science-backed credibility

## 🚀 Current Status

### ✅ Completed:
- Full website with 6+ pages
- Soul discovery quiz (10 questions)
- Archetype matching algorithm
- Formula generation system
- Results page with animations
- All Souls comparison page
- Dose analysis (shows LOW/MODERATE/HIGH)
- Responsive design
- Vercel deployment
- Professional README
- Asset generation guide

### 🚧 Not Yet Done:
- User authentication
- E-commerce integration
- Saved formulas
- Flavor selection UI
- Blog/content
- Email capture
- Analytics

## 🔗 Important Links

- **GitHub**: https://github.com/HermannPR/2HLABS
- **Vercel**: https://2-hlabs-nrcqgbjl9-hermannprs-projects.vercel.app/
- **Local Dev**: http://localhost:5175 (port varies)

## 📝 Notes

- NO EMOJIS in UI (only in documentation)
- Science-based approach is critical
- Clinical dosage transparency is key
- User can discover multiple souls
- This is NOT just a workout picker - it's SOUL DISCOVERY
