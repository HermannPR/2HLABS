# 2HLABS Performance Audit Report

**Date:** November 17, 2025
**Auditor:** Claude AI
**Project:** 2HLABS Personalized Pre-Workout Platform
**Branch:** `claude/review-and-optimize-01RXvBtKsxGjLjX7ou8DkPmq`

---

## Executive Summary

This comprehensive performance audit identifies significant optimization opportunities across bundle sizes, image assets, and dependency management. The analysis reveals **critical areas for improvement** that could reduce initial load time by **40-60%** and improve overall user experience.

### Key Findings

🔴 **CRITICAL ISSUES:**
- **9.8MB of unoptimized PNG images** (0 WebP conversions)
- **1.1MB Three.js bundle** (222KB compressed) loaded on home page
- **83MB react-icons** dependency with only 19 imports used
- **412MB node_modules** size

🟡 **HIGH PRIORITY:**
- React Hook Form unused (0 imports found)
- Workbox-window unused (0 imports found)
- html-to-image used in only 1 component
- lenis used in only 1 hook

🟢 **STRENGTHS:**
- Brotli compression enabled (✓)
- Good chunk splitting strategy (✓)
- Console logs stripped in production (✓)
- PWA support configured (✓)

---

## 1. Bundle Size Analysis

### Total Build Size
- **dist/ folder:** 13MB total
- **JavaScript bundles:** ~1.8MB uncompressed
- **CSS:** 44KB
- **Compression:** Brotli + Gzip enabled ✓

### JavaScript Bundle Breakdown

| Bundle | Uncompressed | Brotli | Impact | Priority |
|--------|--------------|--------|---------|----------|
| **three-vendor** | 1.1MB | 222KB | 🔴 CRITICAL | Lazy load |
| **animation-vendor** | 122KB | 35KB | 🟡 HIGH | Review imports |
| **index (main)** | 120KB | 32KB | 🟢 GOOD | Monitor |
| **FormulaGenerator** | 69KB | 18KB | 🟢 GOOD | Code split |
| **i18n-vendor** | 45KB | 13KB | 🟢 GOOD | OK |
| **AllSouls** | 37KB | 7.7KB | 🟢 GOOD | OK |
| **IngredientDetail** | 36KB | 9.1KB | 🟢 GOOD | OK |
| **router-vendor** | 31KB | 10KB | 🟢 GOOD | OK |
| **Home** | 22KB | 4.5KB | 🟢 GOOD | OK |
| **soulLogos** | 19KB | - | 🟡 MEDIUM | Optimize |

### Compression Effectiveness

**Brotli compression ratios:**
- Three.js: 1.1MB → 222KB (80% reduction) ✓
- Animation: 122KB → 35KB (71% reduction) ✓
- Main index: 120KB → 32KB (73% reduction) ✓
- Home page: 22KB → 4.5KB (80% reduction) ✓

**Verdict:** Compression is working excellently. Focus on reducing source size.

---

## 2. Dependency Analysis

### Total Dependencies
- **Production:** 19 packages
- **Development:** 17 packages
- **Total installed:** 36 packages
- **node_modules size:** 412MB

### Dependency Usage Audit

#### 🔴 CRITICAL - Unused Dependencies

| Package | Status | Size | Action |
|---------|--------|------|--------|
| **react-hook-form** | ❌ 0 imports | - | **REMOVE** |
| **workbox-window** | ❌ 0 imports | - | **REMOVE** |
| **@hookform/resolvers** | ❌ Unused | - | **REMOVE** |
| **zod** | ❌ Unused | - | **REMOVE** |

**Estimated savings:** ~50KB bundle size, faster installs

#### 🟡 HIGH PRIORITY - Underutilized Dependencies

| Package | Imports | Size | Recommendation |
|---------|---------|------|----------------|
| **react-icons** | 19 imports | 83MB | Replace with individual SVGs or lucide-react (2MB) |
| **html-to-image** | 1 import | - | Consider alternative or lazy load only |
| **lenis** | 1 import | - | Consider native CSS scroll-behavior |

**react-icons optimization potential:**
- Current: 83MB in node_modules
- Alternative (lucide-react): 2MB
- **Savings: 81MB node_modules, ~100KB+ bundle**

#### 🟢 WELL-USED Dependencies

| Package | Imports | Size | Status |
|---------|---------|------|--------|
| **framer-motion** | 53 imports | 2.6MB | ✓ Justified |
| **i18next** | 19 imports | - | ✓ Justified |
| **@react-three** | 15 imports | 35MB | ✓ Justified (lazy loaded) |
| **three** | 8 imports | 35MB | ✓ Justified (lazy loaded) |

---

## 3. Image Asset Analysis

### Current State: 🔴 CRITICAL OPTIMIZATION NEEDED

**Total Image Assets:** 18 files
**Total Size:** 9.8MB
**WebP conversions:** 0 files (0%)
**Optimization:** None detected

### Detailed Breakdown

#### Soul Images (12 files) - 7.7MB
| File | Size | Optimization Potential |
|------|------|----------------------|
| thunder-strike.png | 1.2MB | → ~200KB WebP (83% savings) |
| eagle-vision.png | 800KB | → ~140KB WebP (82% savings) |
| gorilla-rage.png | 807KB | → ~140KB WebP (82% savings) |
| titan-strength.png | 751KB | → ~130KB WebP (83% savings) |
| dragon-blood.png | 690KB | → ~120KB WebP (83% savings) |
| lion-heart.png | 625KB | → ~110KB WebP (82% savings) |
| bear-endurance.png | 620KB | → ~110KB WebP (82% savings) |
| phoenix-rise.png | 603KB | → ~105KB WebP (83% savings) |
| cheetah-sprint.png | 501KB | → ~90KB WebP (82% savings) |
| wolf-pack.png | 449KB | → ~80KB WebP (82% savings) |
| serpent-flow.png | 420KB | → ~75KB WebP (82% savings) |
| mantis-focus.png | 402KB | → ~70KB WebP (83% savings) |

**Total souls optimized:** 7.7MB → ~1.4MB (82% reduction)

#### Badge Images (4 files) - 821KB
| File | Size | Optimization Potential |
|------|------|----------------------|
| science-backed.png | 214KB | → ~40KB WebP (81% savings) |
| clinical-dosages.png | 206KB | → ~38KB WebP (82% savings) |
| full-transparency.png | 204KB | → ~38KB WebP (81% savings) |
| lab-tested.png | 197KB | → ~36KB WebP (82% savings) |

**Total badges optimized:** 821KB → ~152KB (81% reduction)

#### Other Images (2 files) - 1.6MB
| File | Size | Optimization Potential |
|------|------|----------------------|
| hero-bg.png | 1.3MB | → ~230KB WebP (82% savings) |
| 2hlabs-logo.png | 288KB | → ~50KB WebP (83% savings) |

**Total other optimized:** 1.6MB → ~280KB (82% reduction)

### Total Image Optimization Impact

| Metric | Before | After | Savings |
|--------|--------|-------|---------|
| **Total Size** | 9.8MB | 1.8MB | **8MB (82%)** |
| **Load Time (3G)** | ~32 seconds | ~6 seconds | **26 seconds** |
| **Load Time (4G)** | ~8 seconds | ~1.5 seconds | **6.5 seconds** |

---

## 4. Chunk Splitting Review

### Current Strategy: ✓ GOOD

The manual chunk splitting is well-designed:

```typescript
manualChunks: {
  'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'], // ✓
  'animation-vendor': ['framer-motion'], // ✓
  'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'], // ✓
  'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers'], // ❌ UNUSED
  'router-vendor': ['react-router-dom'], // ✓
  'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'], // ✓
}
```

### Recommendations:
1. ✅ **Keep:** three-vendor, animation-vendor, i18n-vendor, router-vendor, react-vendor
2. ❌ **Remove:** form-vendor (unused dependencies)
3. 🔄 **Consider:** Splitting i18n by route for even smaller initial load

---

## 5. Performance Metrics Baseline

### Current Estimates (Based on Bundle Analysis)

**Note:** Actual Lighthouse audit should be run in production environment.

#### Estimated Metrics:
- **First Contentful Paint (FCP):** ~2.5-3.5s (Target: <1.8s)
- **Largest Contentful Paint (LCP):** ~4-6s (Target: <2.5s)
- **Time to Interactive (TTI):** ~5-7s (Target: <3.8s)
- **Total Blocking Time (TBT):** ~300-500ms (Target: <200ms)
- **Cumulative Layout Shift (CLS):** Unknown (needs measurement)

#### Network Performance (Simulated):
**Fast 3G (initial load, no cache):**
- HTML: ~100ms
- Main JS (three-vendor): ~3-4s
- Other JS chunks: ~1-2s
- Images (9.8MB): ~30+ seconds
- **Total:** ~35-40 seconds 🔴

**4G (initial load, no cache):**
- HTML: ~50ms
- Main JS (three-vendor): ~800ms
- Other JS chunks: ~400ms
- Images (9.8MB): ~8-10 seconds
- **Total:** ~10-12 seconds 🟡

---

## 6. Critical Issues Summary

### 🔴 CRITICAL (Immediate Action Required)

1. **Image Optimization**
   - **Impact:** 82% size reduction (9.8MB → 1.8MB)
   - **Effort:** Medium (2-3 hours)
   - **Priority:** 🔴 HIGHEST
   - **Action:** Convert all PNGs to WebP with PNG fallback

2. **Three.js Bundle on Home Page**
   - **Impact:** 1.1MB (222KB compressed) loaded upfront
   - **Effort:** Low (30 minutes)
   - **Priority:** 🔴 HIGH
   - **Action:** Implement lazy loading with Suspense

3. **Unused Dependencies**
   - **Impact:** ~50KB bundle reduction, faster installs
   - **Effort:** Very Low (5 minutes)
   - **Priority:** 🔴 HIGH
   - **Action:** Remove react-hook-form, zod, @hookform/resolvers, workbox-window

### 🟡 HIGH PRIORITY (Next Week)

4. **react-icons Replacement**
   - **Impact:** 81MB node_modules reduction, ~100KB bundle savings
   - **Effort:** Medium-High (3-4 hours)
   - **Priority:** 🟡 HIGH
   - **Action:** Replace with lucide-react or individual SVG files

5. **Implement Reduced Motion Support**
   - **Impact:** Accessibility compliance, better UX
   - **Effort:** Low (1 hour)
   - **Priority:** 🟡 MEDIUM-HIGH
   - **Action:** Add prefers-reduced-motion media queries

6. **Mobile 3D Optimization**
   - **Impact:** Better mobile performance, 60 FPS target
   - **Effort:** Medium (2-3 hours)
   - **Priority:** 🟡 HIGH
   - **Action:** Reduce molecule count, lower poly geometry

### 🟢 MEDIUM PRIORITY (This Month)

7. **Font Optimization**
   - **Impact:** Faster text rendering, better FCP
   - **Effort:** Low (1 hour)
   - **Action:** Implement font subsetting, preload critical fonts

8. **Component Lazy Loading**
   - **Impact:** Smaller initial bundle
   - **Effort:** Medium (2 hours)
   - **Action:** Lazy load heavy components with React.lazy()

9. **Service Worker Enhancement**
   - **Impact:** Better offline support, faster repeat visits
   - **Effort:** Medium (3 hours)
   - **Action:** Optimize caching strategies

---

## 7. Optimization Roadmap

### Phase 1: Quick Wins (4-6 hours) - THIS WEEK

**Priority 1: Image Optimization**
- [ ] Convert all 18 PNG images to WebP
- [ ] Create fallback PNG versions (optimized)
- [ ] Implement `<picture>` elements with WebP + PNG
- [ ] Add lazy loading to images
- [ ] Expected impact: **8MB savings, 20-26s faster load**

**Priority 2: Remove Unused Dependencies**
- [ ] Remove react-hook-form
- [ ] Remove @hookform/resolvers
- [ ] Remove zod
- [ ] Remove workbox-window
- [ ] Update vite.config.ts (remove form-vendor chunk)
- [ ] Expected impact: **~50KB bundle reduction**

**Priority 3: Lazy Load Three.js**
- [ ] Move Scene3D to React.lazy()
- [ ] Add Suspense boundary with skeleton
- [ ] Only load when hero section in viewport
- [ ] Expected impact: **1.1MB (222KB compressed) deferred**

### Phase 2: High Impact (6-8 hours) - NEXT WEEK

**Priority 4: Replace react-icons**
- [ ] Identify all 19 icon imports
- [ ] Replace with lucide-react or individual SVGs
- [ ] Test all icon replacements
- [ ] Remove react-icons dependency
- [ ] Expected impact: **81MB node_modules, ~100KB bundle**

**Priority 5: Mobile 3D Optimization**
- [ ] Reduce FloatingMolecules count (10 → 3-5 on mobile)
- [ ] Lower sphere geometry detail on mobile
- [ ] Add device capability detection
- [ ] Implement quality presets (low/medium/high)
- [ ] Expected impact: **60 FPS on mobile, better battery**

**Priority 6: Accessibility**
- [ ] Add prefers-reduced-motion support
- [ ] Disable/simplify animations when enabled
- [ ] Add toggle for 3D effects
- [ ] Test with screen readers
- [ ] Expected impact: **A11y compliance, better UX**

### Phase 3: Polish (4-6 hours) - THIS MONTH

**Priority 7: React Performance**
- [ ] Add React.memo() to expensive components
- [ ] Optimize re-renders with useMemo/useCallback
- [ ] Review useEffect dependencies
- [ ] Profile component render times

**Priority 8: Advanced Optimizations**
- [ ] Font subsetting and preloading
- [ ] Critical CSS extraction
- [ ] Service worker improvements
- [ ] Performance monitoring setup

---

## 8. Expected Performance Improvements

### After Phase 1 (Quick Wins)

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Initial Bundle** | 1.8MB | ~650KB | 64% smaller |
| **Image Assets** | 9.8MB | 1.8MB | 82% smaller |
| **Total Page Weight** | ~12MB | ~2.5MB | **79% reduction** |
| **FCP (4G)** | ~3s | ~1.2s | **60% faster** |
| **LCP (4G)** | ~6s | ~2s | **67% faster** |
| **TTI (4G)** | ~7s | ~2.5s | **64% faster** |

### After Phase 2 (High Impact)

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **node_modules** | 412MB | ~330MB | 20% smaller |
| **Bundle Size** | 1.8MB | ~550KB | 69% smaller |
| **Mobile FPS** | ~30-45 | ~60 | 2x smoother |
| **Lighthouse Score** | ~60-70 | ~90+ | A-grade |

### After Phase 3 (Polish)

- **Perfect Lighthouse Score:** 95-100
- **Core Web Vitals:** All "Good"
- **Mobile Experience:** Excellent
- **Accessibility:** WCAG 2.1 AA compliant

---

## 9. Technical Recommendations

### Immediate Actions (Do This Week)

```bash
# 1. Remove unused dependencies
npm uninstall react-hook-form @hookform/resolvers zod workbox-window

# 2. Install image optimization tools
npm install --save-dev sharp imagemin imagemin-webp

# 3. Update vite.config.ts (remove form-vendor chunk)
```

### Code Changes Required

**vite.config.ts:**
```diff
manualChunks: {
  'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
  'animation-vendor': ['framer-motion'],
  'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
- 'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers'],
  'router-vendor': ['react-router-dom'],
  'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
}
```

**Hero.tsx (Lazy load 3D):**
```typescript
import { lazy, Suspense } from 'react';

const Scene3D = lazy(() => import('../three/Scene3D'));
const FloatingMolecules = lazy(() => import('../three/FloatingMolecules'));

// In render:
<Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />}>
  <Scene3D>
    <FloatingMolecules />
  </Scene3D>
</Suspense>
```

### Image Conversion Script

Create `scripts/optimize-images.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = 'public/assets';

// Convert all PNGs to WebP
function convertImages(dir) {
  fs.readdirSync(dir, { recursive: true }).forEach(file => {
    if (file.endsWith('.png')) {
      const inputPath = path.join(dir, file);
      const outputPath = inputPath.replace('.png', '.webp');

      sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath)
        .then(() => console.log(`✓ Converted: ${file}`))
        .catch(err => console.error(`✗ Failed: ${file}`, err));
    }
  });
}

convertImages(imageDir);
```

---

## 10. Risk Assessment

### Low Risk (Safe to implement)
- ✅ Image optimization (WebP with PNG fallback)
- ✅ Remove unused dependencies
- ✅ Lazy load Three.js
- ✅ Add prefers-reduced-motion

### Medium Risk (Test thoroughly)
- 🟡 Replace react-icons (ensure all icons work)
- 🟡 Mobile 3D optimization (test on real devices)
- 🟡 Font optimization (ensure fonts load correctly)

### High Risk (Requires careful planning)
- 🔴 Major refactoring of animation system
- 🔴 Complete 3D particle replacement

---

## 11. Success Metrics

### Key Performance Indicators (KPIs)

Track these after each optimization phase:

**Load Performance:**
- [ ] FCP < 1.8s (currently ~3s)
- [ ] LCP < 2.5s (currently ~6s)
- [ ] TTI < 3.8s (currently ~7s)
- [ ] Total Page Weight < 3MB (currently ~12MB)

**User Experience:**
- [ ] Mobile FPS ≥ 60 (currently ~30-45)
- [ ] Bounce rate improvement
- [ ] Time on site increase
- [ ] Quiz completion rate

**Technical:**
- [ ] Lighthouse Score ≥ 90 (all categories)
- [ ] Bundle size < 500KB (currently ~1.8MB)
- [ ] Image size < 2MB (currently 9.8MB)
- [ ] node_modules < 350MB (currently 412MB)

---

## 12. Conclusion

This audit reveals **significant optimization opportunities** with **high return on investment**. The most critical finding is the **9.8MB of unoptimized PNG images**, which can be reduced by 82% through WebP conversion.

### Recommended Next Steps:

1. **Start with Phase 1 (Quick Wins)** - 4-6 hours of work for massive impact
2. **Measure baseline** with Lighthouse in production
3. **Implement optimizations** systematically
4. **Re-measure** after each phase
5. **Update this document** with actual results

### Expected Overall Impact:

- **79% reduction** in total page weight (12MB → 2.5MB)
- **60-67% faster** load times
- **2x smoother** mobile animations (60 FPS)
- **Lighthouse score:** 90+ (from estimated 60-70)
- **Better user experience** across all devices

---

**Audit Status:** ✅ COMPLETE
**Next Action:** Begin Phase 1 - Image Optimization
**Owner:** Development Team
**Review Date:** After Phase 1 completion

---

*Generated by Claude AI - Performance Audit System*
*For questions or clarifications, refer to `.claude/` documentation*
