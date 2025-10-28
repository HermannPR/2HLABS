# Development Workflow

## Getting Started

### First Time Setup:
```bash
cd D:\vscodeprojects\2HLABS\preworkout-startup
npm install
npm run dev
```

### Environment:
- **Node.js**: v16+
- **Package Manager**: npm
- **Editor**: VSCode (recommended)
- **Terminal**: Use 3 terminals (optional but helpful):
  1. Dev server (`npm run dev`)
  2. Git operations
  3. Testing/builds

## Daily Development

### Start Development:
```bash
# Terminal 1: Start dev server
npm run dev

# Opens at http://localhost:5173 (or 5174, 5175 if ports occupied)
```

### Making Changes:
1. Edit files in `src/`
2. Save file
3. **HMR (Hot Module Replacement)** updates browser automatically
4. Check browser for changes

### Common Commands:
```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
```

## Git Workflow

### Committing Changes:
```bash
# Stage all changes
git add -A

# Check status
git status

# Commit with message
git commit -m "Description of changes

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push origin main
```

### Commit Message Format:
```
Brief description (imperative mood)

- Bullet point details if needed
- Another detail
- etc.

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Example:
```
Add dose analysis system to formula results

- Created doseAnalysis.ts utility
- Shows clinical dose ranges
- Displays LOW/MODERATE/HIGH indicators
- Applied to all ingredients in formula

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Testing Before Commit

### Always run:
```bash
npm run build
```

**Build MUST succeed** before committing. Common errors:
- TypeScript type errors
- Unused imports
- Unused variables

### Fix TypeScript Errors:
```typescript
// ERROR: Unused import
import { something } from './file';  // ❌ Not used

// FIX: Remove it
// (delete the line)

// ERROR: Unused variable
const getColor = () => { ... };  // ❌ Declared but never used

// FIX: Remove it or use it

// ERROR: Type import
import { Type } from './types';  // ❌ Should use 'import type'

// FIX: Use type-only import
import type { Type } from './types';
```

## Deployment

### Automatic (Vercel):
1. Push to `main` branch on GitHub
2. Vercel automatically detects push
3. Runs build
4. Deploys to production if build succeeds
5. Takes ~1-2 minutes

### Manual (if needed):
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or force production
vercel --prod
```

### Check Deployment:
- **Live URL**: https://2-hlabs-nrcqgbjl9-hermannprs-projects.vercel.app/
- **GitHub**: https://github.com/HermannPR/2HLABS
- **Vercel Dashboard**: Check build logs

## Project Structure

### Where to Add Things:

#### New Page:
1. Create in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`
3. Add link in `src/components/layout/Navbar.tsx` (if needed)

#### New Component:
- **Reusable**: `src/components/common/`
- **Page-specific**: `src/components/[page-name]/`
- **Layout**: `src/components/layout/`

#### New Data:
- **Static data**: `src/data/`
- **Types**: `src/types/index.ts`

#### New Utility:
- **Business logic**: `src/utils/`

## Common Tasks

### Adding a New Archetype:
1. Open `src/data/archetypes.ts`
2. Add new archetype object to `ARCHETYPES` array
3. Ensure all required fields are filled
4. Test on `/souls` page

### Modifying Quiz:
1. Open `src/data/quizQuestions.ts`
2. Edit question text or add options
3. Ensure scores are assigned
4. Test quiz flow

### Changing Colors:
1. Open `tailwind.config.js`
2. Edit color values in `theme.extend.colors`
3. Colors auto-update via HMR

### Adding Ingredients:
1. Open `src/data/ingredients.ts`
2. Add ingredient object to array
3. Ensure dosage range is set
4. Test on `/ingredients` page

## Troubleshooting

### Dev Server Won't Start:
```bash
# Kill existing processes
Ctrl+C in terminal

# Try different port
npm run dev -- --port 5180

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Fails:
```bash
# Check TypeScript errors
npm run build

# Common fixes:
# 1. Remove unused imports
# 2. Change 'import' to 'import type' for types
# 3. Remove unused variables
# 4. Fix any 'any' types
```

### HMR Not Working:
```bash
# Restart dev server
Ctrl+C
npm run dev
```

### Git Issues:
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all changes
git reset --hard HEAD

# Pull latest
git pull origin main
```

## File Editing Best Practices

### TypeScript:
- Always use `import type` for type-only imports
- Avoid `any` type - use proper types
- Define interfaces in `src/types/index.ts`

### React Components:
```typescript
// ✅ Good
export const MyComponent = () => {
  return <div>Content</div>;
};

// ❌ Bad (default export)
export default function MyComponent() { ... }
```

### Styling:
```typescript
// ✅ Good: Use Tailwind classes
<div className="bg-dark p-4 rounded-lg">

// ❌ Bad: Inline styles
<div style={{ background: '#000', padding: '16px' }}>

// ❌ Bad: Custom CSS
<div className="my-custom-class">
```

### State Management:
```typescript
// ✅ Good: Descriptive state names
const [isAnalyzing, setIsAnalyzing] = useState(false);
const [archetypeResult, setArchetypeResult] = useState<ArchetypeResult | null>(null);

// ❌ Bad: Unclear names
const [flag, setFlag] = useState(false);
const [data, setData] = useState(null);
```

## Code Review Checklist

Before committing:
- [ ] Code builds successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] No unused imports/variables
- [ ] Used `import type` for type imports
- [ ] Followed Tailwind CSS approach (no custom CSS)
- [ ] Tested in browser
- [ ] Responsive design works (mobile/tablet/desktop)
- [ ] Animations work smoothly
- [ ] No console errors

## Performance Monitoring

### Check Bundle Size:
```bash
npm run build

# Look for output like:
# dist/assets/index-xyz.js   445.77 kB │ gzip: 137.68 kB
```

### Large Bundle? Check:
- Are all imports necessary?
- Can components be lazy loaded?
- Are images optimized?

## Helpful VSCode Extensions

Recommended:
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind class autocomplete
- **TypeScript Error Translator** - Better error messages
- **GitLens** - Git integration

## Documentation

Always update when making changes:
- `README.md` - For major features
- `.claude/` files - For context
- `ASSET_PROMPTS.md` - For new assets
- Code comments - For complex logic
