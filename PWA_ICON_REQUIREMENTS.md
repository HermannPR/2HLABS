# PWA Icon Requirements for 2H Labs

## Overview
We need Progressive Web App (PWA) icons for the 2H Labs preworkout supplement website. These icons will appear when users install the app on their devices (mobile, desktop, tablet).

## Required Sizes

### Standard Icons
All icons should be square PNG files with transparent backgrounds (except where noted).

| Size | Purpose | Notes |
|------|---------|-------|
| **192x192px** | Android home screen | Primary mobile icon |
| **512x512px** | Android splash screen | High-resolution display |
| **180x180px** | iOS home screen (apple-touch-icon) | Apple devices |
| **16x16px** | Browser favicon | Tiny, simplified version |
| **32x32px** | Browser tab icon | Desktop browsers |
| **96x96px** | Desktop shortcut | Windows/Linux |

### Maskable Icon (Special Requirement)
- **512x512px maskable icon**
  - Must have safe zone: important content within center 40% (204x204px)
  - Full bleed design (can extend to edges)
  - Android may crop to circle, squircle, or other shapes
  - Background should be solid color (no transparency)

## Brand Guidelines

### Primary Brand Colors
- **Primary Cyan**: `#00e5ff` - Main brand color
- **Dark Background**: `#0a0a0a` - Deep black
- **Dark Lighter**: `#1a1a1a` - Slightly lighter black
- **Secondary**: `#00b8cc` - Darker cyan for gradients

### Logo/Icon Design Direction

**Option 1: "2H" Monogram**
- Bold, modern "2H" text mark
- Gradient from primary cyan (#00e5ff) to secondary (#00b8cc)
- On dark background (#0a0a0a or #1a1a1a)
- Clean, minimal, recognizable at small sizes

**Option 2: Abstract Symbol**
- Geometric/abstract representation of:
  - Strength/power (lightning bolt, dumbbells, molecular structure)
  - Science/precision (hexagon, atoms, beaker)
  - Energy (burst, rays, glow effect)
- Primary cyan as main color
- Glowing effect (outer glow/shadow)

**Option 3: Badge/Emblem**
- Circular or hexagonal badge
- "2H" or "2H LABS" text
- Border with inner glow
- Can include tagline in larger sizes

### Design Requirements

**Must Have:**
- ✅ Recognizable at 32x32px (must be legible when tiny)
- ✅ Strong silhouette/shape (works in monochrome)
- ✅ No fine details that disappear at small sizes
- ✅ Consistent across all sizes (same core design)
- ✅ Cyan/dark color palette from brand guidelines
- ✅ Modern, premium, science/tech aesthetic

**Avoid:**
- ❌ Gradients in favicon sizes (16x16, 32x32)
- ❌ Thin lines or small text
- ❌ Complex illustrations
- ❌ Multiple colors at small sizes
- ❌ Photographic elements

## Delivery Format

### File Naming Convention
```
icon-16.png       (16x16)
icon-32.png       (32x32)
icon-96.png       (96x96)
icon-180.png      (180x180, Apple touch icon)
icon-192.png      (192x192)
icon-512.png      (512x512)
icon-maskable-512.png (512x512, special safe-zone version)
```

### Technical Specifications
- **Format**: PNG (24-bit or 32-bit with alpha channel)
- **Color Space**: sRGB
- **Compression**: Optimized PNG (use tools like TinyPNG)
- **Transparency**:
  - Transparent background for standard icons
  - Solid background for maskable icon
- **No extra padding**: Icons should fill the canvas edge-to-edge (except maskable safe zone)

## Maskable Icon Guide

### Safe Zone Diagram
```
┌─────────────────────────────────────┐
│                                     │ ← Full bleed area (512x512)
│   ┌─────────────────────────────┐   │
│   │                             │   │
│   │     Safe Zone (204x204)     │   │ ← Keep important content here
│   │    Critical elements must   │   │
│   │    stay within this area    │   │
│   │                             │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Maskable Icon Requirements
1. Center your logo/icon within 204x204px center area
2. Background can extend to full 512x512px
3. Use solid background color (recommend dark #1a1a1a or cyan #00e5ff)
4. Test with [Maskable.app](https://maskable.app/) tool
5. Ensure icon looks good when cropped to circle and squircle

## Design Inspiration & References

### Style References
- **Tech/Science**: Clean geometric shapes, glowing effects
- **Premium Fitness**: Bold, confident, modern
- **Examples**: Apple App Icons, Google Material Design icons

### Current Website Elements to Match
- Hero section gradient glow effects
- Primary cyan color prominence
- Dark theme aesthetic
- Sharp, modern typography (Orbitron font family)
- Neon glow styling

## Testing Checklist

Before final delivery, test icons:
- [ ] View at actual size (16x16, 32x32, etc.)
- [ ] Check against dark backgrounds
- [ ] Check against light backgrounds (some OS uses light mode)
- [ ] Test maskable icon at [Maskable.app](https://maskable.app/)
- [ ] Verify PNG optimization (file sizes under 50KB for 512px)
- [ ] Ensure transparency works correctly
- [ ] Check silhouette is recognizable in monochrome

## Additional Notes

### Current Placeholder
Currently using Vite's default icon. New icons should replace:
- `public/vite.svg`
- PWA manifest icon entries

### Manifest Configuration
Icons will be added to `manifest.webmanifest` with:
```json
{
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### Questions or Clarifications
Contact the development team with any questions about:
- Brand color usage
- Design direction preference
- Technical specifications
- Delivery timeline

---

**Priority**: Medium
**Timeline**: No rush, but needed before launch
**Designer**: TBD
**Last Updated**: 2025-10-30
