# 2HLABS Molecular Visualization System - Comprehensive Plan

## Overview
Create an integrated molecular visualization experience that connects:
1. Hero background 3D molecules
2. Interactive 3D molecule viewer (modal)
3. Ingredients page with detailed compound cards
4. Scientific studies and compound information

---

## 1. MOLECULAR STRUCTURE FIXES

### Current Issues
- **Separated atoms**: Some atoms appear disconnected but should be bonded
- **Missing bonds**: Need to add all chemical bonds for accurate representation
- **Bond types**: Single, double, triple bonds should be visually distinguished

### Accurate Molecular Structures

#### Caffeine (C₈H₁₀N₄O₂)
```
Structure: Two fused rings (6-membered + 5-membered)
Bonds needed:
- 6-membered ring: 6 C-N bonds
- 5-membered ring: 5 C-N bonds
- Double bonds: C=O (2 oxygen atoms)
- Methyl groups: 3 CH₃ groups attached to nitrogens
Total atoms: 24 (8C + 10H + 4N + 2O)
Currently showing: Simplified structure without hydrogens
Action: Add missing bonds, distinguish double bonds
```

#### Creatine (C₄H₉N₃O₂)
```
Structure: Linear with guanidine group
Bonds needed:
- C-N-C chain
- C=N double bond in guanidine
- COOH carboxylic acid group
- NH₂ amino groups
Total atoms: 19 (4C + 9H + 3N + 2O)
Currently showing: Simplified structure
Action: Add proper bonding, show functional groups
```

#### Beta-Alanine (C₃H₇NO₂)
```
Structure: Simple amino acid
Bonds needed:
- 3-carbon chain
- NH₂ amino group on beta carbon
- COOH carboxylic acid
Total atoms: 13 (3C + 7H + 1N + 2O)
Currently showing: Simplified structure
Action: Complete bonding structure
```

### Bond Visual Distinction
- **Single bond**: Current thickness (0.18)
- **Double bond**: Two parallel cylinders (0.12 each, 0.15 apart)
- **Triple bond**: Three parallel cylinders (not needed for our compounds)

---

## 2. CAMERA MOVEMENT ENHANCEMENT

### Current State
- Static camera position
- Molecules rotate on their own axes
- No dynamic camera movement

### Proposed Camera System

#### Option A: Orbital Camera (Recommended)
```typescript
// Smooth orbital motion around molecules
useFrame((state) => {
  const time = state.clock.getElapsedTime();
  camera.position.x = Math.sin(time * 0.1) * 8;
  camera.position.z = Math.cos(time * 0.1) * 8;
  camera.position.y = Math.sin(time * 0.05) * 2;
  camera.lookAt(0, 0, 0);
});
```

#### Option B: Drift Camera
```typescript
// Subtle floating/drifting effect
useFrame((state) => {
  const time = state.clock.getElapsedTime();
  camera.position.x += Math.sin(time * 0.3) * 0.002;
  camera.position.y += Math.cos(time * 0.2) * 0.002;
  camera.position.z += Math.sin(time * 0.15) * 0.001;
});
```

#### Option C: Figure-8 Pattern
```typescript
// Cinematic figure-8 motion
useFrame((state) => {
  const time = state.clock.getElapsedTime() * 0.2;
  camera.position.x = Math.sin(time) * 6;
  camera.position.z = Math.sin(time * 2) * 6;
  camera.position.y = Math.cos(time * 0.5) * 3;
  camera.lookAt(0, 0, 0);
});
```

**Recommendation**: Option A (Orbital) - provides smooth, professional movement that keeps molecules in view.

---

## 3. 3D VIEWER MODAL (Top Right Corner Button)

### UI Design

#### Toggle Button (Fixed Position)
```
Location: Top right corner (below header)
Position: fixed, top-20 right-4, z-50
Icon: 3D cube or molecule icon
Design:
- Circular button (w-14 h-14)
- Brand gradient background
- Glowing effect on hover
- Pulsing animation to attract attention
```

#### Modal Layout
```
┌─────────────────────────────────────────────────┐
│  [X Close]                        [3D Viewer]   │
├─────────────┬───────────────────────────────────┤
│  Molecules  │                                   │
│  List       │        3D Canvas                  │
│  (Sidebar)  │        (Interactive)              │
│             │                                   │
│  [√] Caffeine                                  │
│  [ ] L-Citrulline                              │
│  [ ] Beta-Alanine                              │
│  [√] Creatine                                  │
│  [ ] Taurine                                   │
│  [🔒] L-Tyrosine                               │
│  [🔒] Alpha-GPC                                │
│  [🔒] Theanine                                 │
│             │        Controls:                  │
│             │        - Rotate: Click + Drag     │
│             │        - Zoom: Scroll             │
│             │        - Reset: Double Click      │
└─────────────┴───────────────────────────────────┘
```

### Features

#### Molecule Selection
- **Checkbox list** of all ingredients
- **Available molecules**: Rendered with full 3D structures
- **Locked molecules** (🔒): Future additions, grayed out
- **Multiple selection**: Can view multiple molecules simultaneously
- **Search/Filter**: Quick find ingredient

#### Interactive Controls
- **Orbit controls**: Click and drag to rotate
- **Zoom**: Mouse wheel
- **Pan**: Right-click drag or Shift + drag
- **Reset view**: Double-click or reset button
- **Molecule info overlay**: Hover shows name and formula

#### Visual Enhancements
- **Grid floor**: Optional reference grid
- **Atom labels**: Toggle element symbols (C, N, O, H)
- **Bond labels**: Toggle bond types (single, double)
- **Measurement tool**: Distance between atoms
- **Color schemes**:
  - Brand gradient (default)
  - CPK coloring (Chemistry standard)
  - Element-specific colors

---

## 4. INGREDIENTS PAGE ENHANCEMENT

### Current State
- Basic ingredient cards
- Limited information
- No molecular visualization

### Enhanced Ingredient Card Structure

```tsx
interface EnhancedIngredientCard {
  // Basic Info
  name: string;
  chemicalName: string;
  formula: string;
  molecularWeight: number;
  category: 'stimulant' | 'pump' | 'focus' | 'endurance' | 'recovery';

  // Visual
  has3DModel: boolean;
  iconPath: string;

  // Dosage Information
  clinicalDose: {
    min: number;
    max: number;
    optimal: number;
    unit: 'mg' | 'g';
  };

  // Scientific Evidence
  studies: Study[];
  evidenceLevel: 'strong' | 'moderate' | 'emerging' | 'limited';

  // Effects & Mechanisms
  primaryEffects: string[];
  mechanismOfAction: string;
  onsetTime: string;
  duration: string;

  // Safety & Interactions
  sideEffects: string[];
  contraindications: string[];
  interactions: string[];

  // Practical Info
  tasteProfile: string;
  solubility: 'high' | 'medium' | 'low';
  stability: string;
  synergiesWith: string[];
}

interface Study {
  title: string;
  authors: string[];
  year: number;
  journal: string;
  pubmedId?: string;
  doi?: string;
  summary: string;
  findingHighlight: string;
  participantCount?: number;
  studyType: 'meta-analysis' | 'rct' | 'cohort' | 'case-study';
  qualityScore?: number; // 1-10
}
```

### Card Visual Design

#### Collapsed State (Grid View)
```
┌─────────────────────────────────┐
│  [Icon]  Caffeine               │
│          C₈H₁₀N₄O₂              │
│                                 │
│  Clinical Dose: 100-400mg       │
│  Evidence: ████████░░ Strong    │
│                                 │
│  ✓ Energy  ✓ Focus  ✓ Endurance│
│                                 │
│  [View 3D] [Learn More]         │
└─────────────────────────────────┘
```

#### Expanded State (Modal/Detail Page)
```
┌─────────────────────────────────────────────────────────┐
│  [X Close]                                   [View 3D]   │
│                                                          │
│  ╔═══════════════════════════════════════════════════╗  │
│  ║                 CAFFEINE                          ║  │
│  ║           1,3,7-Trimethylxanthine                ║  │
│  ║                C₈H₁₀N₄O₂                         ║  │
│  ╚═══════════════════════════════════════════════════╝  │
│                                                          │
│  📊 DOSAGE & EFFECTIVENESS                               │
│  ├─ Clinical Range: 100-400mg                           │
│  ├─ Optimal Dose: 200mg (3-6mg/kg bodyweight)          │
│  ├─ Evidence Level: ████████░░ Strong (8/10)           │
│  └─ Studies: 150+ peer-reviewed                         │
│                                                          │
│  🧠 PRIMARY EFFECTS                                      │
│  • Increased alertness and wakefulness                  │
│  • Enhanced cognitive performance                       │
│  • Improved physical endurance (3-5%)                  │
│  • Reduced perceived exertion                          │
│                                                          │
│  🔬 MECHANISM OF ACTION                                  │
│  Adenosine receptor antagonist - blocks A1 and A2A      │
│  receptors in the brain, preventing drowsiness and      │
│  promoting alertness. Increases dopamine and            │
│  norepinephrine activity.                               │
│                                                          │
│  ⏱️ TIMING & DURATION                                   │
│  • Onset: 15-45 minutes                                 │
│  • Peak: 30-60 minutes                                  │
│  • Duration: 3-5 hours                                  │
│  • Half-life: 4-6 hours                                 │
│                                                          │
│  📚 KEY STUDIES (5 most relevant)                       │
│                                                          │
│  1. [Meta-Analysis] ⭐ 9.2/10 Quality                   │
│     "Caffeine and Exercise Performance"                 │
│     Grgic et al., 2019 - Journal of Sport Science      │
│     👥 21 studies, 600+ participants                    │
│     💡 "3-6mg/kg improves endurance by 2-4%"           │
│     [Read Full Study →] [PubMed] [DOI]                 │
│                                                          │
│  2. [RCT] ⭐ 8.7/10 Quality                             │
│     "Caffeine Effects on Cognitive Function"            │
│     McLellan et al., 2016 - Neuroscience               │
│     👥 50 participants, double-blind                    │
│     💡 "200mg enhances working memory 12%"             │
│     [Read Full Study →] [PubMed] [DOI]                 │
│                                                          │
│  [Show 15 More Studies]                                 │
│                                                          │
│  ⚠️ SAFETY & CONSIDERATIONS                             │
│  Common Side Effects:                                   │
│  • Jitters (high doses >400mg)                         │
│  • Increased heart rate                                │
│  • Sleep disruption (if taken <6hrs before bed)        │
│                                                          │
│  Contraindications:                                     │
│  • Pregnancy/breastfeeding (limit 200mg)               │
│  • Heart conditions (consult physician)                │
│  • Anxiety disorders                                   │
│                                                          │
│  🔗 SYNERGIES                                            │
│  Works well with:                                       │
│  • L-Theanine (reduces jitters, smooths focus)         │
│  • Citrulline (enhanced pump + energy)                 │
│  • Beta-Alanine (improved endurance stacking)          │
│                                                          │
│  🧪 PRACTICAL INFORMATION                                │
│  • Taste: Bitter (requires flavoring)                  │
│  • Solubility: Moderate (hot water preferred)          │
│  • Stability: Excellent (heat/light stable)            │
│  • Form: Anhydrous powder (most potent)                │
│                                                          │
│  [View 3D Structure] [Add to Formula] [Share]          │
└─────────────────────────────────────────────────────────┘
```

### Locked vs Unlocked States

#### Unlocked (3D Model Available)
- Full interaction
- "View 3D" button is bright and clickable
- Opens 3D viewer with molecule loaded
- Shows molecule icon with brand gradient

#### Locked (No 3D Model Yet)
- Card still shows all information
- "View 3D" button shows lock icon 🔒
- Grayed out, not clickable
- Tooltip: "3D visualization coming soon"
- Shows flat structural formula instead

---

## 5. DATA STRUCTURE

### Ingredient Database Schema

```typescript
// src/data/ingredients.ts

export interface Ingredient {
  id: string; // 'caffeine', 'beta-alanine', etc.

  // Basic Information
  displayName: string;
  chemicalName: string;
  formula: string;
  molecularWeight: number;
  casNumber?: string;

  // Classification
  category: IngredientCategory;
  tags: string[];

  // 3D Visualization
  has3DModel: boolean;
  moleculeData?: MoleculeStructure; // For 3D rendering
  structuralFormulaImage?: string; // Fallback 2D image

  // Dosage
  dosage: DosageInfo;

  // Scientific Evidence
  evidenceLevel: EvidenceLevel;
  studies: Study[];

  // Effects
  primaryEffects: Effect[];
  mechanismOfAction: string;
  pharmacokinetics: Pharmacokinetics;

  // Safety
  safety: SafetyInfo;

  // Practical
  practical: PracticalInfo;

  // Relationships
  synergiesWith: string[]; // Array of ingredient IDs
  antagonizesWith?: string[];
}

interface MoleculeStructure {
  atoms: Atom[];
  bonds: Bond[];
  spatialData: SpatialData;
}

interface Atom {
  id: string;
  element: 'C' | 'H' | 'N' | 'O' | 'S' | 'P';
  position: [number, number, number];
  charge?: number;
}

interface Bond {
  id: string;
  atom1Id: string;
  atom2Id: string;
  type: 'single' | 'double' | 'triple' | 'aromatic';
  order: 1 | 2 | 3;
}
```

---

## 6. IMPLEMENTATION PHASES

### Phase 1: Foundation (Week 1)
- [ ] Fix existing molecule bond structures
- [ ] Add missing bonds to Caffeine, Creatine, Beta-Alanine
- [ ] Implement dynamic camera movement
- [ ] Create ingredient data structure

### Phase 2: 3D Viewer Modal (Week 2)
- [ ] Build floating 3D viewer button (top-right)
- [ ] Create modal with sidebar + 3D canvas
- [ ] Implement molecule selection system
- [ ] Add orbit controls and interactions
- [ ] Create locked/unlocked states

### Phase 3: Enhanced Ingredient Cards (Week 3)
- [ ] Design and build detailed ingredient card layout
- [ ] Integrate study data structure
- [ ] Add PubMed/DOI linking
- [ ] Create expandable card modals
- [ ] Implement "View 3D" button integration

### Phase 4: Integration & Polish (Week 4)
- [ ] Connect ingredients page ↔ 3D viewer
- [ ] Add more molecules (L-Citrulline, Taurine, etc.)
- [ ] Implement search/filter functionality
- [ ] Add animations and transitions
- [ ] Performance optimization
- [ ] Mobile responsiveness

### Phase 5: Content (Ongoing)
- [ ] Gather scientific studies for each ingredient
- [ ] Write mechanism of action descriptions
- [ ] Create 3D models for remaining ingredients
- [ ] Add synergy information
- [ ] Quality control and fact-checking

---

## 7. INITIAL INGREDIENT LIST

### Available 3D Models (Launch)
1. ✅ **Caffeine** - C₈H₁₀N₄O₂
2. ✅ **Beta-Alanine** - C₃H₇NO₂
3. ✅ **Creatine Monohydrate** - C₄H₉N₃O₂
4. 🔧 **L-Citrulline** - C₆H₁₃N₃O₃ (need to build)
5. 🔧 **Taurine** - C₂H₇NO₃S (need to build)

### Locked Models (Future)
6. 🔒 **L-Tyrosine** - C₉H₁₁NO₃
7. 🔒 **Alpha-GPC** - C₈H₂₀NO₆P
8. 🔒 **L-Theanine** - C₇H₁₄N₂O₃
9. 🔒 **Betaine Anhydrous** - C₅H₁₁NO₂
10. 🔒 **N-Acetyl L-Tyrosine** - C₁₁H₁₃NO₄

---

## 8. TECHNICAL CONSIDERATIONS

### Performance
- Molecule complexity: Limit to ~50 atoms per structure
- Multiple molecules: Max 3-4 simultaneously in viewer
- LOD (Level of Detail): Reduce atom detail at distance
- Instancing: Use for repeated H atoms

### Accessibility
- Keyboard navigation for 3D viewer
- Alt text for all molecular structures
- Screen reader descriptions of molecules
- High contrast mode support

### Mobile Support
- Touch controls for 3D rotation
- Simplified molecule view on small screens
- Responsive modal layouts
- Performance optimization for mobile GPUs

---

## 9. USER FLOWS

### Flow 1: Discover Molecule from Hero
```
User on homepage
  → Sees rotating molecules in background
  → Clicks floating 3D button (top-right)
  → 3D viewer opens with current molecules
  → Can explore, add more, learn about ingredients
  → Clicks ingredient name
  → Opens detailed ingredient card
```

### Flow 2: Research Ingredient
```
User on ingredients page
  → Browses ingredient cards
  → Clicks "View 3D" on Caffeine
  → 3D viewer opens with Caffeine loaded
  → User explores molecular structure
  → Closes viewer, back to ingredients
  → Clicks "Learn More" on card
  → Detailed modal with studies opens
```

### Flow 3: Compare Molecules
```
User in 3D viewer
  → Selects Caffeine (already visible)
  → Checks Creatine checkbox
  → Both molecules appear
  → Can see size/structure comparison
  → Reads hover tooltips
  → Opens ingredient cards for both
```

---

## 10. MOLECULE LIBRARY EXPANSION ROADMAP

### Q1 2025: Core Ingredients (5)
- Caffeine
- Beta-Alanine
- Creatine
- L-Citrulline
- Taurine

### Q2 2025: Nootropics (5)
- L-Tyrosine
- Alpha-GPC
- L-Theanine
- Huperzine A
- Lion's Mane (active compound)

### Q3 2025: Pump & Vascularity (4)
- Agmatine Sulfate
- Nitrosigine (visual representation)
- VasoDrive-AP (peptides)
- Pine Bark Extract (active compound)

### Q4 2025: Advanced Compounds (6)
- Senactiv
- AstraGin
- Rhodiola Rosea (active)
- Cordyceps (active)
- Betaine Anhydrous
- N-Acetyl L-Tyrosine

---

## SUMMARY

This comprehensive plan creates a unique, science-forward experience that:

1. **Educates users** about ingredients through interactive 3D visualization
2. **Builds trust** with scientific studies and transparent information
3. **Differentiates 2HLABS** from competitors with cutting-edge visualization
4. **Connects features** seamlessly (hero → viewer → ingredients → studies)
5. **Scales easily** with modular architecture for adding new molecules

The system positions 2HLABS as the most scientifically rigorous and transparent pre-workout brand, appealing to educated consumers who value understanding what they put in their bodies.
