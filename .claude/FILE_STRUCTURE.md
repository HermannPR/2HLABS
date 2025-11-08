# File Organization Guide

## Directory Structure

### `/src` - Source Code

#### `/src/components` - React Components
Organized by feature and type:

**`/animations`** - Reusable animation components
- `Card3D.tsx` - 3D card rotation effects
- `CardFlip.tsx` - Card flip animations
- `CountUp.tsx` - Number counting animation
- `GlowingOrb.tsx` - Animated orb effect
- `ScrollReveal.tsx` - Scroll-triggered reveals
- `WeldingBorder.tsx` - Animated border effect

**`/common`** - Base UI components
- `Button.tsx` - Primary button component
- `Card.tsx` - Card container component
- `Badge.tsx`, `Skeleton.tsx`, etc.

**`/formula`** - Formula generation & display
- `FormulaResults.tsx` - Results display
- `IngredientBreakdown.tsx` - Ingredient details
- `DoseAnalysis.tsx` - Dose information

**`/home`** - Home page sections
- `Hero.tsx` - Hero section with 3D
- `Features.tsx` - Feature showcase
- `HowItWorks.tsx` - Process explanation

**`/soul`** - Archetype/Soul components
- `PokemonCard.tsx` - Soul card design
- `StackedCards.tsx` - Mobile carousel
- `SoulCardWithFlip.tsx` - Desktop flip cards

**`/three`** - Three.js 3D components
- `Scene3D.tsx` - Main 3D scene
- Lazy-loaded for performance

**`/quiz`** - Quiz flow components
- `QuizQuestion.tsx` - Question display
- `QuizProgress.tsx` - Progress indicator
- `QuizResults.tsx` - Results screen

**`/layout`** - Layout components
- `Header.tsx` - Site header
- `Footer.tsx` - Site footer
- `ErrorBoundary.tsx` - Error handling

**`/seo`** - SEO components
- `SEO.tsx` - Meta tags component
- `StructuredData.tsx` - JSON-LD schemas

#### `/src/pages` - Route Pages
- `Home.tsx` - Landing page
- `FormulaGenerator.tsx` - Quiz page
- `AllSouls.tsx` - Soul gallery
- `About.tsx` - About page
- `Ingredients.tsx` - Ingredients list
- `IngredientDetail.tsx` - Single ingredient

#### `/src/data` - Static Data
- `archetypes.ts` - 12 training souls
- `ingredients.ts` - Ingredient database
- `ingredientDetails.ts` - Detailed info
- `quizQuestions.ts` - Quiz questions
- `testimonials.ts` - User testimonials
- `faqs.ts` - FAQ content

#### `/src/utils` - Utility Functions
- `formulaGenerator.ts` - Formula algorithm
- `archetypeMatching.ts` - Quiz matching
- `doseAnalysis.ts` - Dose calculations
- `soulLogos.ts` - Logo utilities
- `structuredData.ts` - SEO schemas

#### `/src/hooks` - Custom Hooks
- `useInViewport.ts` - Viewport detection
- `useReducedMotion.ts` - Motion preferences
- `useScrollAnimation.ts` - Scroll animations

#### `/src/context` - React Contexts
- `DeveloperContext.tsx` - Dev mode features

#### `/src/i18n` - Internationalization
- `config.ts` - i18n setup
- `/locales` - Translation files

#### `/src/types` - TypeScript Types
- `index.ts` - Shared type definitions

### `/public` - Static Assets

**`/assets`** - Images and media
- `/backgrounds` - Background images
- `/badges` - Badge icons
- `/categories` - Category icons
- `/concepts` - Concept images
- `/dimensions` - Dimension icons
- `/souls` - Soul/archetype images

### Root Configuration Files

**Build & Dev:**
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript config
- `tailwind.config.js` - Tailwind CSS
- `postcss.config.js` - PostCSS
- `eslint.config.js` - ESLint rules

**Deployment:**
- `vercel.json` - Vercel settings
- `package.json` - Dependencies

**PWA:**
- `index.html` - Entry point
- `/dev-dist` - Dev PWA files
- `/dist` - Production build

**Documentation:**
- `README.md` - Main readme
- `/.claude` - Claude AI docs
- `SESSION_SUMMARY.md` - Session notes

## Naming Conventions

### Files
- **Components:** PascalCase (`Button.tsx`, `QuizQuestion.tsx`)
- **Utilities:** camelCase (`formulaGenerator.ts`)
- **Constants:** camelCase (`gradients.ts`)
- **Types:** PascalCase (`index.ts` with `Archetype` type)

### Components
- **Functional:** PascalCase export (`export const Button`)
- **Props:** `ComponentNameProps` interface
- **Hooks:** `use` prefix (`useInViewport`)

### Variables
- **Constants:** UPPER_SNAKE_CASE (`SOUL_COLORS`)
- **React State:** camelCase (`isLoading`, `currentIndex`)
- **Props:** camelCase (`brandColor`, `getSoulLogo`)

## Import Organization

Standard import order:
```typescript
// 1. External libraries
import { motion } from 'framer-motion';
import { useState } from 'react';

// 2. Internal components
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

// 3. Utilities/Hooks
import { useInViewport } from '../hooks/useInViewport';

// 4. Data/Constants
import { ARCHETYPES } from '../data/archetypes';

// 5. Types
import type { Archetype } from '../types';

// 6. Styles (if any)
import './styles.css';
```

## Component Structure

Standard component file structure:
```typescript
// 1. Imports
import { ... } from '...';

// 2. Types
interface ComponentProps {
  // ...
}

// 3. Constants (component-specific)
const LOCAL_CONSTANT = '...';

// 4. Component
export const Component = ({ props }: ComponentProps) => {
  // a. State
  const [state, setState] = useState();
  
  // b. Hooks
  const customHook = useCustomHook();
  
  // c. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // d. Handlers
  const handleClick = () => {
    // ...
  };
  
  // e. Render helpers
  const renderSection = () => {
    // ...
  };
  
  // f. Return JSX
  return (
    // ...
  );
};
```

## Code Quality Standards

### TypeScript
- ✅ Strict mode enabled
- ✅ Explicit types for props
- ✅ Return types for functions
- ✅ No `any` unless necessary

### Performance
- ✅ Lazy load heavy components
- ✅ Memoize expensive calculations
- ✅ Use `useCallback` for handlers
- ✅ Optimize re-renders

### Accessibility
- ✅ Semantic HTML
- ✅ ARIA labels where needed
- ✅ Keyboard navigation
- ✅ Screen reader support

### Mobile-First
- ✅ Touch-optimized
- ✅ Responsive design
- ✅ Performance-conscious
- ✅ Reduced motion support

## Git Workflow

### Commit Messages
Format: `<type>: <description>`

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `perf:` - Performance improvement
- `refactor:` - Code refactoring
- `style:` - Formatting changes
- `docs:` - Documentation
- `chore:` - Build/config changes

Examples:
```
feat: Add circular carousel with spring physics
fix: Make mobile cards immediately visible
perf: Add Brotli/Gzip compression
docs: Update project status
```

### Branch Strategy
- `main` - Production-ready code
- Feature branches when needed
- Deploy from `main` to Vercel

## Dependencies Management

### Adding Dependencies
```bash
npm install <package>           # Production
npm install -D <package>         # Development
```

### Updating Dependencies
```bash
npm update                       # Update all
npm outdated                     # Check versions
```

### Current Major Dependencies
- react: 19.1.1
- vite: 7.1.12
- framer-motion: 12.23.24
- react-router-dom: 7.9.4
- three: Latest
- tailwindcss: Latest

## Build & Deploy

### Local Development
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview build locally
```

### Deployment
- Push to `main` → Auto-deploy to Vercel
- Check Vercel dashboard for status
- Monitor build logs for errors

## Environment Variables

Currently using:
- No environment variables (all config in code)

Future needs:
- `VITE_GA_ID` - Google Analytics
- `VITE_API_KEY` - API keys
- `VITE_SENTRY_DSN` - Error tracking
