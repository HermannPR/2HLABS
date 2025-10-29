# 2HLABS — ChatGPT Individual Image Generation Prompt List

This list adapts the ArtBot/asset prompts for 1‑at‑a‑time image creation in ChatGPT’s image tool. Use the global block once per chat (or include it each time), then paste the asset‑specific prompt you need.

---

## Global Block (paste first)

Copy this block into ChatGPT before generating any assets in the session:

```
You are generating a single image per request for a fitness brand.

Brand palette:
- Electric Blue #00E5FF
- Neon Pink   #FF00E5
- Neon Green  #39FF14
- Deep Navy   #0A0E27 (dark backgrounds)

Style: modern, energetic, slightly futuristic, powerful. For logos/icons use vector-like, clean lines, simplified geometry. For backgrounds use abstract cinematic lighting and particle effects.

Composition & output rules:
- Create ONE image per prompt.
- Centered subject, clean edges, high contrast.
- Transparent background when applicable (icons, badges, logos). If not supported, use Deep Navy #0A0E27 as flat background.
- No text, letters, numbers, watermarks, or signatures.
- Avoid photorealistic people/faces unless explicitly requested.

Negative constraints: blurry, low quality, watermark, text, signature, ugly, distorted, bad anatomy, jpeg artifacts, worst quality, low resolution, cluttered, busy.

Sizing guidance:
- Logos/icons: 1024×1024 (downscale later if needed)
- Wide backgrounds: 1792×1024 (or closest available)
- Tall/vertical: 1024×1792 (or closest available)
If fixed sizing isn’t available in the UI, generate square at highest quality.
```

Tip: If a result comes back too busy/complex, add “minimalist, simplified shapes, fewer details” to the end of the prompt and regenerate.

---

## Soul Logos (12) — circular badge, vector style

Paste one of the following after the Global Block. Each is a standalone, single‑image prompt.

### Gorilla Rage
```
Create a circular badge logo featuring a fierce gorilla head with an aggressive expression and teeth showing; emphasize muscular features; sharp geometric lines; vector logo style. Palette: electric blue and neon pink gradients on deep navy background. Intense, high‑energy, professional fitness brand aesthetic. No text. Single image.
```

### Dragon Blood
```
Create a circular badge logo featuring a powerful dragon head breathing subtle fire; metallic sheen on scales; sharp angular design; fierce but controlled; vector logo style. Palette: electric blue with crimson/red accents on dark background. Professional fitness brand aesthetic. No text. Single image.
```

### Cheetah Sprint
```
Create a circular badge logo featuring a cheetah head in motion with speed lines suggesting movement; sleek, aerodynamic; modern minimalist vector style. Palette: electric blue with yellow accents on deep navy background. Athletic, fast aesthetic. No text. Single image.
```

### Eagle Vision
```
Create a circular badge logo featuring an eagle head with piercing, focused eyes; precision theme; modern geometric vector style. Palette: electric blue and white on dark background. Professional fitness logo. No text. Single image.
```

### Titan Strength
```
Create a circular badge logo featuring a mechanical/cyborg arm with defined muscles; metallic textures; futuristic vector style; strength and power theme. Palette: steel/metal with electric blue glow accents on dark industrial background. No text. Single image.
```

### Wolf Pack
```
Create a circular badge logo featuring a noble wolf head; calm strength; semi‑realistic yet simplified vector style; pack mentality theme. Palette: earth tones with electric blue accents on dark forest background. No text. Single image.
```

### Phoenix Rise
```
Create a circular badge logo featuring a phoenix rising with wings spread; flames and energy trails; modern stylized vector design; rebirth and endurance theme. Palette: orange to electric blue gradient on dark background. No text. Single image.
```

### Bear Endurance
```
Create a circular badge logo featuring a strong, steady bear head with thick fur texture; modern rustic vector style; endurance/power theme. Palette: browns with electric blue accents on a dark wilderness background. No text. Single image.
```

### Mantis Focus
```
Create a circular badge logo featuring a mantis head/strike pose; precise, calculated; sharp geometric vector style; zen warrior focus theme. Palette: neon green and electric blue on dark background. No text. Single image.
```

### Thunder Strike
```
Create a circular badge logo combining a lightning bolt with explosive energy; maximum intensity; modern vector style; HIIT theme. Palette: bright electric blue and purple on a dark stormy background. No text. Single image.
```

### Serpent Flow
```
Create a circular badge logo featuring a serpent in a flowing S‑curve; smooth, graceful movement; minimalist vector style; mindfulness/flow theme. Palette: soft green and blue on a dark, peaceful background. No text. Single image.
```

### Lion Heart
```
Create a circular badge logo featuring a lion head with a majestic mane; courageous warrior expression; modern regal vector style. Palette: golden with electric blue accents on dark background. No text. Single image.
```

---

## Ingredient Category Icons (7) — simplified, transparent background

Keep these extremely simple and readable at 256×256 after downscaling.

### Energy
```
Create a clean geometric lightning bolt icon in electric blue, minimalist single‑color line/shape, centered, transparent background if possible, modern UI icon. No text. Single image.
```

### Pump
```
Create a clean geometric icon for muscle pump/blood flow: a droplet with subtle vein motif in neon pink, minimalist single‑color, centered, transparent background if possible. No text. Single image.
```

### Strength
```
Create a clean geometric barbell/muscle icon in metallic/electric blue, minimalist single‑color, centered, transparent background if possible. No text. Single image.
```

### Endurance
```
Create a clean geometric infinity loop or running track icon with a subtle orange→blue gradient; minimalist shape; centered; transparent background if possible. No text. Single image.
```

### Focus
```
Create a clean geometric brain/target crosshair icon in neon green; minimalist single‑color; centered; transparent background if possible. No text. Single image.
```

### Recovery
```
Create a clean geometric refresh/cycle icon with soft blue color and subtle natural element; minimalist single‑color; centered; transparent background if possible. No text. Single image.
```

### Hydration
```
Create a clean geometric water droplet icon with tiny electrolyte molecule nodes; cyan blue; minimalist; centered; transparent background if possible. No text. Single image.
```

---

## Trust Badges (4) — clean, professional, transparent background

### Science‑Backed
```
Create a badge icon featuring a scientific molecule/atom structure; electric blue and white; clean, professional; centered; transparent background if possible. No text. Single image.
```

### Lab Tested
```
Create a badge icon featuring a laboratory beaker/test tube; electric blue with neon green accent; clean, professional; centered; transparent background if possible. No text. Single image.
```

### Clinical Dosage
```
Create a badge icon featuring a precision measuring scale; electric blue and white; clean, professional; centered; transparent background if possible. No text. Single image.
```

### Third‑Party Tested
```
Create a badge icon featuring a shield with a checkmark; neon green and blue; clean, professional; centered; transparent background if possible. No text. Single image.
```

---

## Backgrounds & Hero

### Main Hero Background (1920×1080 feel)
```
Create a dark atmospheric gym environment with dramatic lighting and abstract energy particles; electric blue and neon pink light rays; modern cinematic style; high‑energy fitness aesthetic; no people; clean composition suitable for hero banner. Single image.
```

### Soul Comparison Background
```
Create an abstract grid/matrix with 12 subtle nodes interconnected by faint lines; dark background with electric blue grid lines and neon pink highlights; modern data‑viz aesthetic; clean backdrop for overlay content. No people, no text. Single image.
```

### Results Celebration Background
```
Create an abstract energy explosion radiating from center; gradient from electric blue to neon pink to neon green; particle effects; celebratory yet clean background suitable behind content. No text. Single image.
```

### Mobile Background Pattern (tileable feel)
```
Create a seamless subtle pattern of small abstract creature silhouettes and energy symbols; very dark with faint electric blue outlines; minimal and tileable look for mobile backgrounds. No text. Single image.
```

---

## Soul Concept Introduction (12)

### Soul Discovery Hero
```
Create an abstract visualization of 12 distinct energy signatures arranged in a circle; mystical but modern; electric blue and neon pink energy flows connecting them; dark background with particle effects; cinematic and powerful; fitness‑meets‑spirituality tone. No text. Single image.
```

### Dimension Visualization
```
Create five interconnected dimensional axes/vectors in 3D space; geometric abstract style; labeled conceptually as Intensity, Duration, Focus, Energy, Tolerance (do not render literal text); use shapes/symbols; electric blue and neon pink gradients on dark; clean infographic aesthetic. Single image.
```

### Quiz Journey
```
Create an abstract path or journey with 10 glowing waypoints/stepping stones leading to a bright destination; electric blue path with neon pink accents; dark background; inspirational and minimal. No text. Single image.
```

### Archetype Matching
```
Create a visualization of a matching algorithm: geometric particles forming a cohesive pattern reminiscent of a DNA helix; electric blue→neon pink gradient; dark background; modern tech aesthetic. No text. Single image.
```

### “What Is Your Soul?” Header
```
Create a mystical question‑mark shape made of swirling energy particles morphing into 12 small creature silhouettes (gorilla, dragon, cheetah, eagle, etc.); electric blue and neon accents; dark atmospheric background; powerful and intriguing banner feel. No text. Single image.
```

### Training Philosophy Icons (Set of 5)
Use one prompt at a time, generating one icon per request.
```
Create a minimalist line‑icon for [Intensity | Duration | Focus | Energy Pattern | Tolerance].
- Intensity: lightning bolt
- Duration: hourglass
- Focus: target/crosshair
- Energy Pattern: energy wave
- Tolerance: thermometer/gauge
Electric blue lines on transparent background if possible; consistent style across icons. No text. Single image.
```

### Before Quiz Explainer (vertical feel)
```
Create a vertical infographic concept split into three parts: (1) question‑mark silhouette, (2) quiz/test icons, (3) creature transformation; electric blue and neon pink; dark background; tells the story of discovery; clean, minimal text‑free visuals. Single image.
```

### Find Your Match Banner
```
Create a split composition: left — abstract human silhouette made of particles; right — 12 soul creature silhouettes arranged in a circle; electric blue connection lines between them; dark background; modern and mystical banner feel. No text. Single image.
```

### Quiz Introduction Cards (generate one per request)
```
Card 1 — “No Wrong Answers”: abstract checkmark transforming into multiple paths; all glowing electric blue; reassuring, open aesthetic; dark background; clean card composition; no text.
```
```
Card 2 — “Takes 2 Minutes”: minimalist timer/clock with energy particles; electric blue and neon pink; dark background; clean card composition; no text.
```
```
Card 3 — “Science‑Based”: abstract DNA helix merging with geometric data nodes; electric blue and white; dark background; trustworthy, professional; no text.
```

---

## UI Accent Graphics (optional)

### Progress Bar Glow
```
Create a horizontal glowing progress bar with energy effects; electric blue→neon pink gradient; transparent background if possible; modern UI accent; clean edges; no text. Single image.
```

### Button Accent Glow
```
Create a rounded button glow effect; electric blue outer glow with neon pink inner highlight; transparent background if possible; modern UI accent; no text. Single image.
```

### Card Highlight Effect
```
Create a rectangular card edge glow; electric blue gradient with subtle particles; transparent background if possible; modern UI accent; no text. Single image.
```

---

## Notes for ChatGPT Usage
- If transparency isn’t supported, request “flat Deep Navy #0A0E27 background” for easy masking later.
- To simplify an icon further, add: “ultra‑minimalist, single weight lines, no shading”.
- To unify style across a set, reuse the exact wording and only swap the subject phrase.
- For consistency, reiterate palette lines if colors drift.

