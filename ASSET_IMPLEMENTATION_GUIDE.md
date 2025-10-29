# Asset Implementation Guide

This guide shows exactly where to place generated assets and what code changes are needed.

## Directory Structure

```
public/assets/
├── souls/              # 12 soul logos (1024x1024px)
├── categories/         # 6 category icons (512x512px)
├── badges/            # 4 trust badges (512x512px)
├── concepts/          # 4 concept images (1200x800px)
├── dimensions/        # 5 dimension circles (400x400px each)
└── backgrounds/       # 1 hero background (1920x1080px)
```

---

## 1. SOUL LOGOS (12 files)

### Files to create:
- `public/assets/souls/gorilla-rage.png`
- `public/assets/souls/dragon-blood.png`
- `public/assets/souls/phoenix-rise.png`
- `public/assets/souls/shark-focus.png`
- `public/assets/souls/cheetah-speed.png`
- `public/assets/souls/bear-endurance.png`
- `public/assets/souls/eagle-precision.png`
- `public/assets/souls/lion-courage.png`
- `public/assets/souls/wolf-pack.png`
- `public/assets/souls/panther-stealth.png`
- `public/assets/souls/rhino-power.png`
- `public/assets/souls/falcon-agility.png`

### Code files already configured:
- ✅ `src/utils/soulLogos.ts` - Already maps all 12 souls
- ✅ `src/data/archetypes.ts` - Already has correct IDs
- ✅ `src/pages/AllSouls.tsx` - Already imports from utility
- ✅ `src/pages/FormulaGenerator.tsx` - Already imports from utility

### Action required:
**Just drop the 12 PNG files into `public/assets/souls/` folder. No code changes needed.**

---

## 2. CATEGORY ICONS (6 files)

### Files to create:
- `public/assets/categories/strength.png`
- `public/assets/categories/endurance.png`
- `public/assets/categories/speed.png`
- `public/assets/categories/power.png`
- `public/assets/categories/focus.png`
- `public/assets/categories/recovery.png`

### Code changes needed:

**File: `src/pages/Ingredients.tsx`**

Current code uses placeholder emojis:
```typescript
const categories = [
  { id: 'strength', name: 'Strength & Power', icon: '💪', ... },
  { id: 'endurance', name: 'Endurance', icon: '🏃', ... },
  { id: 'speed', name: 'Speed & Agility', icon: '⚡', ... },
  { id: 'power', name: 'Explosive Power', icon: '🔥', ... },
  { id: 'focus', name: 'Focus & Clarity', icon: '🎯', ... },
  { id: 'recovery', name: 'Recovery', icon: '🌙', ... },
];
```

Change to:
```typescript
const categories = [
  {
    id: 'strength',
    name: 'Strength & Power',
    icon: '/assets/categories/strength.png',
    ...
  },
  {
    id: 'endurance',
    name: 'Endurance',
    icon: '/assets/categories/endurance.png',
    ...
  },
  {
    id: 'speed',
    name: 'Speed & Agility',
    icon: '/assets/categories/speed.png',
    ...
  },
  {
    id: 'power',
    name: 'Explosive Power',
    icon: '/assets/categories/power.png',
    ...
  },
  {
    id: 'focus',
    name: 'Focus & Clarity',
    icon: '/assets/categories/focus.png',
    ...
  },
  {
    id: 'recovery',
    name: 'Recovery',
    icon: '/assets/categories/recovery.png',
    ...
  },
];
```

And update the render from emoji to image:
```typescript
// BEFORE:
<span className="text-4xl mb-4">{category.icon}</span>

// AFTER:
<img
  src={category.icon}
  alt={category.name}
  className="w-16 h-16 mb-4 object-contain"
/>
```

---

## 3. TRUST BADGES (4 files)

### Files to create:
- `public/assets/badges/science-backed.png` ✅
- `public/assets/badges/clinical-dosages.png` ✅
- `public/assets/badges/full-transparency.png` ✅
- `public/assets/badges/lab-tested.png` ✅

### Code changes needed:

**File: `src/components/home/TrustBadges.tsx`** ✅ COMPLETED

Component created with the following badges:
```typescript
const badges = [
  {
    icon: '/assets/badges/science-backed.png',
    title: 'Science-Backed',
    description: 'Research-driven formulations'
  },
  {
    icon: '/assets/badges/clinical-dosages.png',
    title: 'Clinical Dosages',
    description: 'Effective ingredient amounts'
  },
  {
    icon: '/assets/badges/full-transparency.png',
    title: 'Full Transparency',
    description: 'Complete label disclosure'
  },
  {
    icon: '/assets/badges/lab-tested.png',
    title: 'Lab Tested',
    description: 'Third-party verified purity'
  },
];
```

**File: `src/pages/Home.tsx`** ✅ COMPLETED

TrustBadges component imported and added to page flow:
```typescript
import { TrustBadges } from '../components/home/TrustBadges';

// Added in page flow after Features section
<TrustBadges />
```

---

## 4. CONCEPT IMAGES (4 files)

### Files to create:
- `public/assets/concepts/personalization.png`
- `public/assets/concepts/science.png`
- `public/assets/concepts/community.png`
- `public/assets/concepts/dimensions.png` (THIS WILL BE SPECIAL - see Section 5)

### Code changes needed:

**File: `src/pages/HowItWorks.tsx`** or **`src/pages/Home.tsx`**

Add to the "How It Works" section or features section:
```typescript
const concepts = [
  {
    image: '/assets/concepts/personalization.png',
    title: 'Personalized to You',
    description: 'Every formula is unique based on your training soul'
  },
  {
    image: '/assets/concepts/science.png',
    title: 'Science-Driven',
    description: 'Backed by research and expert formulation'
  },
  {
    image: '/assets/concepts/community.png',
    title: 'Community Support',
    description: 'Join athletes who train with purpose'
  },
];
```

Render with:
```typescript
{concepts.map((concept, index) => (
  <div key={index}>
    <img
      src={concept.image}
      alt={concept.title}
      className="w-full h-64 object-cover rounded-lg mb-4"
    />
    <h3 className="text-2xl font-heading font-bold mb-2">{concept.title}</h3>
    <p className="text-gray-400">{concept.description}</p>
  </div>
))}
```

---

## 5. DIMENSION CIRCLES (5 files) - SPECIAL HANDLING

### Files to create:
- `public/assets/dimensions/intensity.png` (400x400px)
- `public/assets/dimensions/duration.png` (400x400px)
- `public/assets/dimensions/focus.png` (400x400px)
- `public/assets/dimensions/energy-pattern.png` (400x400px)
- `public/assets/dimensions/stim-tolerance.png` (400x400px)

### Composite Image Setup:

**Create: `src/components/common/DimensionsVisualization.tsx`**

```typescript
import { motion } from 'framer-motion';

export const DimensionsVisualization = () => {
  const dimensions = [
    {
      id: 'intensity',
      src: '/assets/dimensions/intensity.png',
      label: 'Intensity',
      position: { top: '0%', left: '50%', transform: 'translate(-50%, 0)' } // Top center
    },
    {
      id: 'duration',
      src: '/assets/dimensions/duration.png',
      label: 'Duration',
      position: { top: '30%', left: '85%', transform: 'translate(-50%, 0)' } // Top right
    },
    {
      id: 'focus',
      src: '/assets/dimensions/focus.png',
      label: 'Focus',
      position: { top: '70%', left: '85%', transform: 'translate(-50%, 0)' } // Bottom right
    },
    {
      id: 'energy-pattern',
      src: '/assets/dimensions/energy-pattern.png',
      label: 'Energy Pattern',
      position: { top: '85%', left: '30%', transform: 'translate(-50%, 0)' } // Bottom left
    },
    {
      id: 'stim-tolerance',
      src: '/assets/dimensions/stim-tolerance.png',
      label: 'Stim Tolerance',
      position: { top: '30%', left: '15%', transform: 'translate(-50%, 0)' } // Top left
    },
  ];

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Central connecting lines (optional) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <circle
          cx="50%"
          cy="50%"
          r="150"
          fill="none"
          stroke="rgba(0, 255, 255, 0.2)"
          strokeWidth="2"
        />
      </svg>

      {/* Dimension circles */}
      {dimensions.map((dimension, index) => (
        <motion.div
          key={dimension.id}
          className="absolute"
          style={dimension.position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, type: 'spring' }}
        >
          <div className="relative group">
            <img
              src={dimension.src}
              alt={dimension.label}
              className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
            />
            <p className="text-center text-sm font-semibold text-white mt-2">
              {dimension.label}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50" />
    </div>
  );
};
```

**Use in: `src/pages/HowItWorks.tsx`**

```typescript
import { DimensionsVisualization } from '../components/common/DimensionsVisualization';

// In the JSX:
<section className="mb-20">
  <h2 className="text-3xl font-heading font-bold text-center mb-12">
    Five Key <span className="text-gradient">Dimensions</span>
  </h2>
  <DimensionsVisualization />
</section>
```

**Note:** You can adjust the `position` values in the array to fine-tune placement after seeing how they look.

---

## 6. HERO BACKGROUND (1 file)

### File to create:
- `public/assets/backgrounds/hero-bg.png` (1920x1080px)

### Prompt for Google Imagen 3:

```
Dynamic fitness gym environment background. High-energy abstract composition with overlapping transparent geometric shapes, glowing energy particles, and motion blur effects. Color palette: deep charcoal black (#0A0A0B) base with electric cyan (#00FFFF), vibrant magenta (#FF00FF), and neon orange (#FF6B35) accent gradients. Modern athletic aesthetic with depth and layers. Subtle texture and grain for premium feel. No people, no text, no specific objects - pure abstract energy and movement. Horizontal landscape orientation, 1920x1080 pixels. Professional sports supplement hero section background.
```

### Code changes needed:

**File: `src/pages/Home.tsx`**

Find the Hero section (likely has `className="min-h-screen"` or similar):

```typescript
// BEFORE (solid background):
<div className="min-h-screen bg-dark flex items-center">

// AFTER (with background image):
<div
  className="min-h-screen flex items-center relative"
  style={{
    backgroundImage: 'url(/assets/backgrounds/hero-bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  {/* Dark overlay for text readability */}
  <div className="absolute inset-0 bg-black/50" />

  {/* Content (make sure it's relative/z-index to appear above overlay) */}
  <div className="relative z-10 w-full">
    {/* Existing hero content */}
  </div>
</div>
```

**Alternative CSS approach (cleaner):**

Add to `src/index.css`:
```css
.hero-bg {
  background-image: url('/assets/backgrounds/hero-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.hero-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}
```

Then in `Home.tsx`:
```typescript
<div className="min-h-screen hero-bg flex items-center">
  <div className="relative z-10 w-full">
    {/* Hero content */}
  </div>
</div>
```

---

## 7. ASSET UPLOAD CHECKLIST

### Step 1: Generate all assets with Google Imagen 3
- [ ] 12 soul logos
- [ ] 6 category icons
- [ ] 4 trust badges
- [ ] 3 concept images (personalization, science, community)
- [ ] 5 dimension circles (intensity, duration, focus, energy-pattern, stim-tolerance)
- [ ] 1 hero background

### Step 2: Manually remove white backgrounds
Use your preferred tool to make backgrounds transparent (all except hero-bg.png)

### Step 3: Organize files into folders
```
public/assets/
├── souls/ (12 files)
├── categories/ (6 files)
├── badges/ (4 files)
├── concepts/ (3 files)
├── dimensions/ (5 files)
└── backgrounds/ (1 file)
```

### Step 4: Apply code changes
1. ✅ Souls - No changes needed (already configured)
2. `src/pages/Ingredients.tsx` - Update category icons
3. `src/pages/Home.tsx` - Add trust badges
4. `src/pages/HowItWorks.tsx` - Add concept images
5. Create `src/components/common/DimensionsVisualization.tsx`
6. `src/pages/HowItWorks.tsx` - Import and use DimensionsVisualization
7. `src/pages/Home.tsx` - Add hero background
8. (Optional) `src/index.css` - Add hero-bg class

### Step 5: Test locally
```bash
cd preworkout-startup
npm run dev
```
Visit each page and verify:
- All souls appear on /souls and formula results
- Category icons render on /ingredients
- Trust badges show on homepage
- Concept images appear in how-it-works
- Dimension circles compose nicely
- Hero background loads and text is readable

### Step 6: Deploy
```bash
git add public/assets
git add src/
git commit -m "Add all brand assets and implement throughout site"
git push
```

---

## 8. OPTIMIZATION (After assets are working)

Once everything is implemented and tested:

1. **Image Optimization**
   - Compress PNGs with TinyPNG or similar
   - Consider WebP versions for better performance

2. **Lazy Loading**
   - Add `loading="lazy"` to all `<img>` tags below the fold

3. **Responsive Images**
   - Create @2x and @3x versions for retina displays
   - Use `srcset` for different screen sizes

4. **Fallbacks**
   - Add `onError` handlers to gracefully handle missing images
   - Provide alt text for accessibility

---

## Need Help?

If you encounter issues:
1. Check browser console for 404 errors on image paths
2. Verify file names match exactly (case-sensitive)
3. Clear browser cache if images don't update
4. Ensure all paths start with `/assets/` (not `./assets/`)

Let me know when assets are ready and I'll help with implementation!
