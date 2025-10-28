# Architecture & Key Concepts

## System Architecture

```
User Flow:
Homepage → Quiz → Analyzing Animation → Archetype Reveal → Formula Breakdown → CTA

Alternative Flow:
Homepage → All Souls Page → View Archetype → Take Quiz
```

## Data Flow

### Quiz → Archetype → Formula

```typescript
1. QuizAnswers (raw user responses)
   ↓
2. calculateDimensionScores() → DimensionScores (5 dimensions)
   ↓
3. findBestArchetype() → Archetype (matched soul)
   ↓
4. getUserContextFromAnswers() → UserContext (weight, timing, sensitivities)
   ↓
5. generateArchetypeFormula() → Formula (personalized ingredients)
   ↓
6. analyzeDose() → DoseAnalysis (clinical context for each ingredient)
```

## Key Type Definitions

### Archetype
```typescript
{
  id: string,
  name: string,
  emoji: string,
  tagline: string,
  description: string,
  traits: string[],
  athleteTypes: string[],
  dimensions: {
    intensity: IntensityType,
    duration: DurationType,
    focus: FocusType,
    energyPattern: EnergyPattern,
    stimTolerance: StimTolerance,
  },
  formulaProfile: {
    caffeineRange: [number, number],
    pumpLevel: 'light' | 'moderate' | 'high' | 'maximum',
    strengthFocus: 'none' | 'light' | 'moderate' | 'heavy',
    enduranceFocus: 'none' | 'light' | 'moderate' | 'heavy',
    focusLevel: 'light' | 'moderate' | 'high' | 'maximum',
    intensity: number, // 1-10
  },
  warnings: string[],
  flavors: FlavorOption[],
  testimonials: ArchetypeTestimonial[],
}
```

### Formula Generation Layers

The formula generator builds the supplement in 6 layers:

#### 1. Energy & Stimulants Layer
- **Caffeine Anhydrous**: Base stimulant
- **L-Theanine**: Smooth energy (if caffeine ≥ 150mg)
- **Theobromine**: Sustained energy (if intensity ≥ 6 and caffeine ≥ 200mg)

**Context adjustments:**
- New user: max caffeine × 0.7
- Sensitive: max caffeine × 0.6
- Evening trainer: max caffeine × 0.5

#### 2. Pump Layer
- **L-Citrulline**: 4,000-10,000mg based on pump level
- **Beetroot Extract**: For endurance-heavy archetypes (500mg)

**Scaling**: Body weight factor (0.85-1.15×)

#### 3. Strength Layer
- **Creatine Monohydrate**: 5,000mg (if strengthFocus = moderate/heavy)
- **Betaine**: 2,500mg (if strengthFocus = moderate/heavy)

#### 4. Endurance Layer
- **Beta-Alanine**: 3,200-5,000mg (if enduranceFocus = moderate/heavy)
- **Taurine**: 1,000-2,000mg (if enduranceFocus ≠ none)

**Scaling**: Body weight factor capped at 1.1× for beta-alanine

#### 5. Focus Layer
- **L-Tyrosine**: 1,000-2,000mg based on focus level
- **Alpha-GPC**: 300-600mg (if focusLevel = high/maximum)

#### 6. Hydration & Electrolytes
- **Sodium**: 300-500mg
- **Potassium**: 300-400mg

**Scaling**: Higher for pump/endurance focus

## Archetype Matching Algorithm

### Scoring System:

```typescript
Exact dimension match:
- Intensity: +30 points
- Duration: +25 points
- Focus: +20 points
- Energy Pattern: +15 points
- Stim Tolerance: +10 points

Partial match (user has specific, archetype is 'mixed'):
- Intensity: +10 points
- Duration: +10 points

Best match wins!
```

### Match Percentage:
```typescript
matchPercentage = (exactMatches / 5) × 100

Example:
- 5/5 matches = 100%
- 4/5 matches = 80%
- 3/5 matches = 60%
```

## Component Architecture

### Page Components
- **Home**: Marketing landing page
- **FormulaGenerator**: Quiz + Analyzing + Results (3 states)
- **AllSouls**: Grid view + modal for all archetypes
- **Ingredients**: Filterable ingredient library
- **HowItWorks**: Process explanation
- **Pricing**: Pricing tiers
- **About**: Company story

### Layout Components
- **Layout**: Wraps all pages with Navbar + Footer
- **Navbar**: Fixed navigation with responsive menu
- **Footer**: Links, social, copyright

### Common Components
- **Button**: Reusable button with variants (primary, outline, ghost)
- **Card**: Content container with border and padding

### Home Sections
- **Hero**: Main headline + CTA
- **Features**: 3-column feature grid
- **HowItWorks**: 3-step process
- **Testimonials**: User reviews carousel
- **FAQ**: Accordion-style questions
- **FinalCTA**: Bottom conversion section

## State Management

Currently using **local React state** (useState):
- Quiz answers
- Current question index
- Show results flag
- Archetype result
- Analyzing animation state

**Future**: May need Redux/Zustand if adding:
- User authentication
- Saved formulas
- Shopping cart

## Routing Structure

```
/                    → Home
/formula             → FormulaGenerator (Quiz)
/souls               → AllSouls (Comparison)
/how-it-works        → HowItWorks
/ingredients         → Ingredients
/pricing             → Pricing
/about               → About
```

## Animation Strategy

### Framer Motion Usage:

1. **Page Transitions**: Fade + slide
2. **Staggered Reveals**: Sequential appearance with delays
3. **Hover Effects**: Scale transforms
4. **Loading States**: Rotating spinners

### Key Animations:
- Quiz question transitions (slide in/out)
- Analyzing screen (rotating border + scaling)
- Results reveal (staggered sections with 0.2s delays)
- All Souls cards (fade in with index × 0.05s delay)

## Styling Approach

### Tailwind CSS Utility-First:
- NO custom CSS files (except global styles)
- All styles via className
- Custom theme in `tailwind.config.js`
- Responsive design with `sm:`, `md:`, `lg:` prefixes

### Custom Classes:
- `.text-gradient`: Blue-pink gradient text
- `.bg-dark`: Deep navy background
- `.bg-dark-lighter`: Slightly lighter navy
- `.bg-dark-light`: Border color

### Design Tokens:
```javascript
colors: {
  primary: { DEFAULT, dark, light },
  secondary: { DEFAULT, dark, light },
  accent: DEFAULT,
  dark: { DEFAULT, lighter, light },
}
```

## Performance Considerations

### Current Optimizations:
- Vite for fast builds
- React 18 concurrent features
- Lazy loading (can be added for routes)
- Image optimization (TODO: when images are added)

### Bundle Size:
- Production build: ~445 KB (gzipped: ~137 KB)
- Main CSS: ~21 KB (gzipped: ~4.6 KB)

### Future Optimizations:
- Code splitting by route
- Image lazy loading
- Component lazy loading
- CDN for assets

## Development vs Production

### Development:
- Hot Module Replacement (HMR)
- Source maps
- Dev server on localhost:5175
- No optimization

### Production:
- Minified JS/CSS
- Tree shaking
- PurgeCSS (unused styles removed)
- Compressed assets
- Deployed to Vercel edge network

## Error Handling

### Current:
- TypeScript for type safety
- ESLint for code quality
- Build fails on TypeScript errors

### Missing (TODO):
- Runtime error boundaries
- Form validation errors
- API error handling (when added)
- Fallback UI for failed loads
