# Context Index for Codex Agents

| Topic | Read First | Notes |
|-------|------------|-------|
| Project overview & brand | `.claude/PROJECT_OVERVIEW.md` | Mission, souls, brand voice |
| Recent work | `.claude/SESSION_HISTORY.md` | Summaries of the latest sessions & commits |
| Architecture & data flow | `.claude/ARCHITECTURE.md` | Quiz logic, formula pipeline, type map |
| Daily workflow | `.claude/DEV_WORKFLOW.md` | Setup, scripts, git conventions, deployment |
| Roadmap / priorities | `.claude/NEXT_STEPS.md` | Immediate tasks and ideas |

## Quick Facts
- **Primary runtime**: Node 22.x, npm 10.x, Vite 7.
- **Mandatory check**: `npm run build` before pushing.
- **Internationalization**: Update both `en.json` and `es.json` for copy changes.
- **Customization**: Formula editor respects clinical ranges—warn users when adding new ingredients.

## Useful Files
- `src/data/quizQuestions.ts` – Quiz decision tree
- `src/data/archetypes.ts` – Soul definitions
- `src/utils/archetypeFormulaGenerator.ts` – Formula synthesis logic
- `src/components/formula/FormulaEditor.tsx` – Interactive customization UI

Keep this index short; expand details inside `.claude/` docs.
