# General Agent — Ario Project

## Purpose
General-purpose AI agent for Ario Next.js project. Handles any task not covered by specialized agents.

## Context
- **Project:** Ario (Next.js 16, React 19, Tailwind CSS 4, TypeScript 5)
- **Package Manager:** pnpm 11
- **Commands:** `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`

## Stack (from Obsidian Brain)
| Tech | Role |
|------|------|
| Next.js | Framework. App Router, API routes, SSR, static generation |
| TypeScript | Language. Type safety across entire codebase |
| Tailwind CSS | CSS. Utility-first styling, design token integration |
| shadcn/ui | UI primitives. Themed with design tokens |
| NeonDB | Serverless PostgreSQL. User data, project storage |
| Ollama | Local AI inference. Fast prototyping |
| OpenRouter | Cloud AI gateway. Multiple model access |
| n8n Cloud | Workflow automation. Webhooks, integrations |
| Netlify | Hosting. Edge functions, form handling |

## Architecture
Two distinct UIs:
1. **Application UI:** Next.js + React + shadcn/ui + Tailwind (purple brand)
2. **Generated Landing Page:** Semantic HTML + CSS + Minimal JS (client-specific)

Data flow: User input → AI Agent → Brain + Visual rules → JSON spec → Renderer → HTML/CSS/JS → Preview/Export

## Conventions
- Server Components default; add "use client" only for interactivity
- TypeScript interfaces for all props
- Tailwind utility classes only (no CSS modules)
- PascalCase for components, camelCase for utilities
- One component per file

## File Structure
```
src/
├── app/          # Pages, layouts
├── components/   # Reusable UI
├── lib/          # Utilities
└── types/        # TypeScript types
```

## Guidelines
1. Read existing code before changes
2. Follow project conventions strictly
3. Use pnpm for all package operations
4. Run `pnpm lint` after changes
5. Prefer server components unless client needed
6. Maintain type safety with TypeScript
7. Do not change tech stack unless required
8. Keep application layer separate from generated LP layer

## Commands
```bash
pnpm dev        # Development server
pnpm build      # Production build
pnpm start      # Production server
pnpm lint       # ESLint check
```

## Notes
- Dark mode via `dark:` prefix
- Responsive at sm (640px)
- Geist font family
- React Compiler enabled