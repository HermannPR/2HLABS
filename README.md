# 2HLABS - Personalized Preworkout Startup Website

A modern, full-featured startup website for 2HLABS, a personalized preworkout supplement company. Built with React, TypeScript, Tailwind CSS, and Vite.

## Features

### Complete Website Pages
- **Homepage**: Hero section, features, how it works, testimonials, FAQs, and CTAs
- **Formula Generator**: Interactive multi-step quiz that generates personalized preworkout formulas
- **How It Works**: Explanation of the science and process
- **Ingredients Library**: Comprehensive database of all ingredients with filtering
- **Pricing**: Three pricing tiers with detailed feature comparison
- **About**: Company mission, values, and story

### Formula Generator
- Multi-step form collecting user data (profile, training, preferences, health)
- Personalized formula algorithm that considers:
  - Body weight for dosage scaling
  - Training goals (strength, endurance, fat-loss, etc.)
  - Caffeine tolerance and stimulant preferences
  - Workout timing and type
  - Dietary restrictions
- Real-time formula generation with detailed ingredient breakdown
- Science-backed ingredient dosages based on clinical research

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation

### Design Features
- Modern, energetic color scheme (electric blue, neon pink, neon green)
- Smooth animations and transitions
- Fully responsive mobile-first design
- Dark theme optimized for fitness/performance brand
- Custom gradient text effects and glow effects

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (Button, Card)
│   ├── layout/          # Layout components (Navbar, Footer, Layout)
│   ├── home/            # Homepage sections
│   └── formula/         # Formula generator components
├── pages/               # Main page components
│   ├── Home.tsx
│   ├── FormulaGenerator.tsx
│   ├── HowItWorks.tsx
│   ├── Ingredients.tsx
│   ├── Pricing.tsx
│   └── About.tsx
├── utils/               # Utility functions and algorithms
│   └── formulaGenerator.ts  # Formula generation logic
├── data/                # Static data
│   ├── ingredients.ts   # Ingredient database
│   ├── testimonials.ts
│   └── faqs.ts
├── types/               # TypeScript type definitions
│   └── index.ts
└── App.tsx              # Main app component with routing
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd preworkout-startup
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Vercel Configuration

The project is already configured for Vercel deployment with the default Vite settings. No additional configuration needed.

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: '#00E5FF',    // Electric blue
  secondary: '#FF00E5',  // Neon pink
  accent: '#39FF14',     // Neon green
  dark: '#0A0E27',       // Dark background
}
```

### Ingredients
Add or modify ingredients in `src/data/ingredients.ts`

### Formula Algorithm
Customize the formula generation logic in `src/utils/formulaGenerator.ts`

## Key Components

### Formula Generator Algorithm
Located in `src/utils/formulaGenerator.ts`, the algorithm:
- Scales dosages based on body weight
- Selects ingredients based on training goals
- Adjusts caffeine based on tolerance and workout timing
- Includes electrolytes for high-intensity or long-duration workouts
- Generates personalized formula names

### Ingredient Database
15+ science-backed ingredients including:
- Energy: Caffeine, Theobromine
- Pump: L-Citrulline, Beetroot Extract
- Strength: Creatine, Betaine
- Endurance: Beta-Alanine, Taurine
- Focus: L-Tyrosine, Alpha-GPC, L-Theanine
- Hydration: Sodium, Potassium

## Features to Add (Future Enhancements)

- User authentication and saved formulas
- Payment integration (Stripe)
- Email capture and marketing automation
- Admin dashboard for order management
- Blog/content management system
- A/B testing for conversion optimization
- Analytics integration (Google Analytics, Mixpanel)
- Customer reviews and ratings
- Referral program
- Subscription management

## Current Status

✅ Development server is running at `http://localhost:5173`
✅ All pages are functional
✅ Formula generator is operational
✅ Responsive design implemented
✅ Ready for further customization and deployment

## License

All rights reserved - 2HLABS

## Support

For questions or issues, contact the development team.
