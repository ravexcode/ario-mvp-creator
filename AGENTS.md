# Ario — Project Context

## Overview
Ario is a Next.js 16 web application using App Router, React 19, Tailwind CSS 4, and TypeScript.

## Stack
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, React DOM 19
- **Styling:** Tailwind CSS 4 via PostCSS
- **Language:** TypeScript 5
- **Font:** Geist (via next/font/google)
- **Package Manager:** pnpm 11
- **React Compiler:** babel-plugin-react-compiler

## Commands
```bash
pnpm dev        # Dev server at localhost:3000
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## File Structure
```
src/
├── app/
│   ├── layout.tsx      # Root layout, Geist fonts, metadata
│   ├── page.tsx        # Home page
│   └── globals.css     # Tailwind imports
├── components/         # Reusable UI components
├── lib/                # Utilities, helpers
└── types/              # TypeScript type definitions
public/                 # Static assets (images, icons)
opencode/agents/        # AI coding agent configs
```

## Conventions
- Server Components by default, add "use client" only for interactivity
- TypeScript interfaces for all props
- Tailwind utility classes only (no CSS modules)
- PascalCase for component files and names
- camelCase for utilities and functions
- One component per file

## Layout
- Root layout: `src/app/layout.tsx`
- Metadata defined in layout
- Geist Sans and Geist Mono fonts configured
- Dark mode via `dark:` prefix (system preference)

## Styling
- Colors: zinc-50/black for backgrounds, black/zinc-50 for text
- Responsive breakpoint: sm (640px)
- Transitions on hover states
- Rounded-full for buttons

## Agents
AI agent configs in `opencode/agents/`:
- `nextdev.md` — General Next.js dev
- `uicomponent.md` — Component creation
- `styling.md` — Tailwind CSS patterns
- `apiconfig.md` — API routes
- `deploy.md` — Vercel deployment
- `testing.md` — Test setup
- `refactor.md` — Code cleanup
