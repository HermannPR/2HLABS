# Quick Start Guide for New Sessions

## 🎯 If You're Starting Fresh

### 1. Read These Files First (in order):
1. **PROJECT_OVERVIEW.md** (5 min) - Understand the concept
2. **SESSION_HISTORY.md** (5 min) - Know what's been done
3. **ARCHITECTURE.md** (10 min) - Understand the system
4. **DEV_WORKFLOW.md** (10 min) - Learn the workflow
5. **NEXT_STEPS.md** (5 min) - See what's next

**Total Reading Time**: ~35 minutes

### 2. Start the Project:
```bash
cd D:\vscodeprojects\2HLABS\preworkout-startup
npm run dev
```

Open http://localhost:5173 (or 5174, 5175)

### 3. Test the Key Features:
- [ ] Visit homepage
- [ ] Click "Build Your Formula"
- [ ] Take the quiz (answer all 10 questions)
- [ ] See the archetype reveal
- [ ] View the formula breakdown
- [ ] Visit `/souls` to see all archetypes
- [ ] Check `/ingredients` page

### 4. Check the Codebase:
- [ ] Browse `src/data/archetypes.ts` - See all 12 souls
- [ ] Look at `src/data/quizQuestions.ts` - Understand the quiz
- [ ] Review `src/utils/archetypeMatching.ts` - The matching algorithm
- [ ] Check `src/pages/FormulaGenerator.tsx` - Main quiz page

## 🚀 Common Starting Points

### Scenario 1: "Continue where we left off"
**You should:**
1. Read `SESSION_HISTORY.md` (Recent Changes section)
2. Check `NEXT_STEPS.md` (Immediate Priorities)
3. Pick up the most recent task

**Current priority**: Generate visual assets using `ARTBOT_GENERATION_GUIDE.md`

### Scenario 2: "Fix a bug"
**You should:**
1. Reproduce the bug in browser
2. Check `DEV_WORKFLOW.md` (Troubleshooting section)
3. Fix the issue
4. Test with `npm run build`
5. Commit using standard format

### Scenario 3: "Add a new feature"
**You should:**
1. Review `ARCHITECTURE.md` to understand current system
2. Check if it's in `NEXT_STEPS.md` (roadmap)
3. Follow `DEV_WORKFLOW.md` for where to add files
4. Implement feature
5. Test and commit

### Scenario 4: "User feedback/change request"
**You should:**
1. Understand the request
2. Check `SESSION_HISTORY.md` for similar past changes
3. Update relevant files
4. Test in browser
5. Commit with clear description

### Scenario 5: "Deploy to production"
**You should:**
1. Run `npm run build` locally (must succeed)
2. Commit and push to GitHub
3. Vercel auto-deploys (wait 1-2 min)
4. Check live URL

## 📁 File Navigation Guide

### "Where do I find...?"

**Archetype definitions?**
→ `src/data/archetypes.ts`

**Quiz questions?**
→ `src/data/quizQuestions.ts`

**Ingredient database?**
→ `src/data/ingredients.ts`

**Matching algorithm?**
→ `src/utils/archetypeMatching.ts`

**Formula generation?**
→ `src/utils/archetypeFormulaGenerator.ts`

**Quiz page?**
→ `src/pages/FormulaGenerator.tsx`

**All Souls page?**
→ `src/pages/AllSouls.tsx`

**Type definitions?**
→ `src/types/index.ts`

**Styling configuration?**
→ `tailwind.config.js`

**Navbar?**
→ `src/components/layout/Navbar.tsx`

**Asset prompts?**
→ `ASSET_PROMPTS.md` (root)

**ArtBot guide?**
→ `ARTBOT_GENERATION_GUIDE.md` (root)

## 🔍 Understanding the Soul Discovery Flow

### User Journey:
```
1. User visits homepage
   → Sees "Discover Your Training Soul"

2. Clicks CTA
   → Goes to /formula

3. Takes quiz (10 questions)
   → Q1-Q5: Core personality
   → Q6: Caffeine tolerance
   → Q7: Training timing
   → Q8: Primary goal
   → Q9: Body size
   → Q10: Considerations (multi-select)

4. Analyzing screen (2.5s)
   → Spinning animation
   → "Analyzing Your Soul..."

5. Archetype reveal
   → Emoji + Name + Tagline
   → Match percentage
   → Soul's essence
   → Training DNA (5 dimensions)
   → Custom formula
   → Ingredient breakdown with dose context

6. CTAs
   → "Get Your [ARCHETYPE] Formula"
   → "Discover Another Soul"
   → "Compare All 12 Training Souls"
```

### Data Flow:
```
QuizAnswers
   ↓
DimensionScores (5 dimensions calculated)
   ↓
Archetype (best match found)
   ↓
UserContext (weight, timing, sensitivities extracted)
   ↓
Formula (ingredients selected, dosages calculated)
   ↓
DoseAnalysis (clinical context added per ingredient)
   ↓
Display to user
```

## 💡 Key Concepts to Remember

### 1. This is NOT a Workout Picker
- It's a SOUL DISCOVERY system
- Like MBTI for fitness
- Users can have multiple souls
- Each soul = 30-serving preworkout product

### 2. The 5 Dimensions
- **Intensity**: How hard you train
- **Duration**: How long you train
- **Focus**: Mental approach (aggressive/controlled/flow)
- **Energy Pattern**: How you want energy to hit
- **Stim Tolerance**: Caffeine handling

### 3. Formula is Personalized
- Based on archetype profile
- Adjusted for weight
- Adjusted for timing
- Adjusted for sensitivities
- 6 layers: Energy, Pump, Strength, Endurance, Focus, Hydration

### 4. NO EMOJIS in UI
- User explicitly requested this
- Emojis only in data/documentation
- Keep professional/serious brand

### 5. Transparency is Key
- Show clinical dose ranges
- Explain LOW/MODERATE/HIGH dosing
- Science-backed positioning
- Build trust through transparency

## 🎨 Brand Guidelines

### Colors:
- **Primary**: Electric Blue (#00E5FF)
- **Secondary**: Neon Pink (#FF00E5)
- **Accent**: Neon Green (#39FF14)
- **Dark**: Deep Navy (#0A0E27)

### Typography:
- **Headings**: Space Grotesk (bold, modern)
- **Body**: Inter (clean, readable)

### Tone:
- Powerful but not aggressive
- Science-backed but accessible
- Motivational but not cheesy
- Professional but not boring

### Style:
- Dark theme
- Energetic, modern, slightly futuristic
- Clean and minimal
- High-energy fitness aesthetic

## ⚡ Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Git
git status           # Check status
git add -A           # Stage all changes
git commit -m "msg"  # Commit
git push origin main # Push to GitHub

# Troubleshooting
Ctrl+C               # Stop dev server
rm -rf node_modules  # Clear dependencies
npm install          # Reinstall dependencies
```

## 🔗 Important Links

- **GitHub**: https://github.com/HermannPR/2HLABS
- **Live Site**: https://2-hlabs-nrcqgbjl9-hermannprs-projects.vercel.app/
- **Local Dev**: http://localhost:5173

## 📞 Common Questions

### "What should I work on next?"
→ Check `NEXT_STEPS.md` - Immediate Priorities section

### "How do I add a new page?"
→ See `DEV_WORKFLOW.md` - Common Tasks section

### "Where are the types defined?"
→ `src/types/index.ts` has all TypeScript definitions

### "How does the matching algorithm work?"
→ See `ARCHITECTURE.md` - Archetype Matching Algorithm section

### "What if the build fails?"
→ See `DEV_WORKFLOW.md` - Troubleshooting section

### "How do I generate images?"
→ Use `ARTBOT_GENERATION_GUIDE.md` with https://artbot.site

### "Can I use custom CSS?"
→ No, use Tailwind classes only (see `DEV_WORKFLOW.md`)

### "How do I commit code?"
→ Follow format in `DEV_WORKFLOW.md` - Git Workflow section

## 🎯 Your First Task

If this is your first time:

1. **Read** `PROJECT_OVERVIEW.md`
2. **Start** the dev server (`npm run dev`)
3. **Take** the quiz yourself to understand it
4. **Browse** the code for 10 minutes
5. **Pick** a task from `NEXT_STEPS.md` - Quick Wins section
6. **Do** the task following `DEV_WORKFLOW.md`
7. **Test** with `npm run build`
8. **Commit** following the format
9. **Push** to GitHub

Good luck! 🚀

---

## 📋 Quick Checklist

Before working:
- [ ] Read PROJECT_OVERVIEW.md
- [ ] Read SESSION_HISTORY.md
- [ ] Started dev server
- [ ] Tested key features
- [ ] Understand the soul discovery concept

Before committing:
- [ ] npm run build succeeds
- [ ] Tested in browser
- [ ] Followed commit message format
- [ ] No TypeScript errors
- [ ] No unused imports

Before asking questions:
- [ ] Checked these .claude/ docs
- [ ] Checked README.md
- [ ] Searched the codebase
- [ ] Tried running locally
