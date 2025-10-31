# 2HLABS – Personalized Preworkout Platform

> **Discover your training soul. Build the formula that matches it.**

2HLABS is a modern web experience that guides athletes through a science-backed assessment, assigns one of twelve distinct "training souls," and generates a tailored preworkout formula that can be further customized ingredient by ingredient.

## Table of Contents
1. [Key Features](#key-features)
2. [Screenshots](#screenshots)
3. [Architecture at a Glance](#architecture-at-a-glance)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
6. [Available Scripts](#available-scripts)
7. [Project Structure](#project-structure)
8. [Roadmap & Next Steps](#roadmap--next-steps)
9. [Contributing Guidelines](#contributing-guidelines)
10. [License & Contact](#license--contact)

## Key Features
- **Soul Discovery Quiz** – Caffeine-first decision tree that maps athletes to one of 12 archetypes with 100 % deterministic matching.
- **Dynamic Formula Builder** – Automatically generates an evidence-based stack for the selected soul, with real-time dosage sliders, ingredient deletion/restoration, and safeguarded manual additions.
- **Immersive Soul Library** – Rich profiles for every archetype featuring color-coded stats, cinematic hover treatments (auto-enabled on mobile), and personalization cues.
- **Ingredient Knowledge Base** – Filterable catalog of clinically dosed ingredients with bilingual copy and science ratings.
- **Internationalization Ready** – Full English & Spanish translations across UI, quiz flow, formulas, and data-driven content.
- **Production-Ready Build** – Vite, PWA support, strict TypeScript, and accessibility-conscious Tailwind theming.

## Screenshots
Planned showcase (add assets under `public/screenshots/`):
- Landing page hero in an urban rooftop setting at dusk.
- Quiz question flow on mobile next to a gym mirror wall.
- Soul reveal result projected onto a nighttime cityscape billboard.
- Formula editor displayed on a lab bench with neon highlights.
- Ingredient library showcased on a large-format storefront lightbox.

> _Tip: place final images in `public/screenshots/` and update this section with markdown image tags once assets are ready._

## Architecture at a Glance
- **Domain Layers**
  - `quizQuestions` → Conditional flow that prioritizes caffeine tolerance.
  - `archetypeMatching` → Direct archetype resolution with score fallback.
  - `archetypeFormulaGenerator` → Body-weight aware formula creation with caffeine adjustments.
  - `doseAnalysis` → Clinical range comparison and labeling.
- **Presentation**
  - React + Tailwind component library with Framer Motion for transitions.
  - Page-level data composed via hooks; shared UI in `components/common`.
- **Internationalization**
  - `src/i18n/locales/en.json` & `es.json` hold mirrored keys for all dynamic copy.

For deeper documentation see `.claude/ARCHITECTURE.md` and `.codex/README.md`.

## Tech Stack
| Category        | Choices |
|-----------------|---------|
| Framework       | React 18, TypeScript 5, Vite 7 |
| Styling         | Tailwind CSS 3, Framer Motion 11 |
| State & Forms   | React Hook Form, React Router 7 |
| Tooling         | ESLint, PostCSS, PWA Plugin |
| Deployment      | Vercel (recommended), Node ≥ 20.19 |

## Getting Started
### Prerequisites
- Node.js **22.x** (`nvm install 22` recommended)
- npm **10.x** (bundled with Node 22)

### Installation
```bash
# clone the repository
git clone https://github.com/HermannPR/2HLABS.git
cd 2HLABS/preworkout-startup

# install dependencies
npm install

# start the dev server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## Available Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and bundle for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` *(planned)* | Lint project files |

## Project Structure
```
src/
├── components/
│   ├── common/         # Button, Card, etc.
│   ├── home/           # Landing page sections
│   ├── layout/         # Navbar, Footer, Layout shell
│   └── formula/        # Formula editor & utilities
├── data/               # Archetypes, quiz questions, ingredients
├── i18n/               # Locale dictionaries
├── pages/              # Route-level pages
└── utils/              # Matching, formula logic, dose analysis
```

## Roadmap & Next Steps
- ✅ Quiz redesign with caffeine-first logic
- ✅ Formula customization (sliders, restore, gated additions)
- ✅ Mobile-first soul visuals & consistent intensity gradient
- 🔄 Ingredient detail pages with richer research references
- 🔄 Dynamic screenshot gallery & marketing assets
- 🔄 Performance optimization (bundle splitting, image preloading)

Detailed priorities live in `.claude/NEXT_STEPS.md`.

## Contributing Guidelines
This is an internal 2HLABS project. For team members:
1. Branch from `main` → `feature/<your-feature>`
2. Follow coding standards (TypeScript, Tailwind utilities, lint rules)
3. Ensure `npm run build` succeeds before pushing
4. Open a pull request with context and screenshots when possible

## License & Contact
All rights reserved © 2025 2HLABS.

Questions? Reach out at **support@2hlabs.com** or open a private issue in this repository.

---
_Built by the 2HLABS product team – designed to power every training soul._
