# General Agent — Ar0 Project

## Purpose
General-purpose AI agent for Ar0. Handles tasks not covered by specialized agents.

## Context
- **Project:** Ar0 — AI Landing Page Builder
- **Framework:** Next.js 16 (App Router, standalone output)
- **React:** 19.2.8 (React Compiler enabled via babel-plugin-react-compiler)
- **Language:** TypeScript 5 (strict mode, `@/*` → `./src/*`)
- **Styling:** Tailwind CSS 4 (PostCSS plugin `@tailwindcss/postcss`)
- **UI Kit:** shadcn/ui (base-nova style, lucide icons, CSS variables, neutral base)
- **Package Manager:** pnpm 11
- **Deployment:** Netlify (`@netlify/plugin-nextjs`) + Docker (standalone Node 22 Alpine)
- **Commands:** `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`

## Stack
| Tech | Role |
|------|------|
| Next.js 16 | Framework. App Router, API routes, SSR, standalone output |
| React 19 | UI. Server Components default, React Compiler on |
| TypeScript 5 | Language. Strict, bundler resolution, `@/*` aliases |
| Tailwind CSS 4 | CSS. PostCSS via `@tailwindcss/postcss`, no config file needed |
| shadcn/ui | Components. base-nova style, CSS variables, lucide icons |
| Supabase | Database + Auth. `@supabase/supabase-js` client |
| JWT + bcryptjs | Auth. `jsonwebtoken`, `bcryptjs` for token/password handling |
| Lenis | Smooth scrolling. `lenis` package |
| Lucide React | Icons |
| tw-animate-css + tailwind-animations | Animation utilities |
| class-variance-authority + clsx + tailwind-merge | Utility classes (`cn()` in `src/lib/utils.ts`) |

## Architecture
Two distinct UIs:
1. **Application UI:** Next.js + React + shadcn/ui + Tailwind — purple/brand theme
2. **Generated Landing Page:** Semantic HTML + CSS + Minimal JS — client-specific output

Data flow: User input → AI Agent → Brain + Visual rules → JSON spec → Renderer → HTML/CSS/JS → Preview/Export

## File Structure
```
src/
├── app/
│   ├── api/
│   │   ├── auth/           # login, logout, me, register routes
│   │   ├── generate/       # AI generation endpoint
│   │   ├── projects/       # CRUD + preview routes
│   │   ├── proxy/          # proxy route (NOT middleware.ts)
│   │   └── settings/       # user settings
│   ├── dashboard/          # Dashboard page + layout
│   ├── sign-in/            # Auth: sign-in page + form
│   ├── sign-up/            # Auth: sign-up page + form
│   ├── layout.tsx          # Root layout (ThemeProvider, SmoothScroll, fonts)
│   ├── page.tsx            # Landing page (Hero + MiniDashboard)
│   └── globals.css         # Tailwind imports, CSS variables, theme tokens
├── components/
│   ├── layout/             # header.tsx, footer.tsx
│   ├── ui/                 # shadcn/ui components (button, card, input, etc.)
│   ├── app-sidebar.tsx     # Dashboard sidebar
│   ├── chat-thread.tsx     # Chat interface
│   ├── mini-dashboard.tsx  # Main dashboard widget
│   ├── preview-panel.tsx   # Generated page preview
│   ├── smooth-scroll.tsx   # Lenis wrapper
│   ├── theme-provider.tsx  # Dark mode provider
│   └── theme-toggle.tsx    # Theme switcher
├── hooks/                  # use-auth.ts, use-mobile.ts
├── lib/                    # api.ts, auth.ts, db.ts, types.ts, utils.ts
├── proxy.ts                # Proxy handler (NOT middleware.ts)
├── types/                  # TypeScript type definitions
└── utils/                  # session_gestor.ts
public/                     # Static assets (favicon, logo, landing.jpeg)
```

## Conventions
- Server Components default; add `"use client"` only for interactivity
- TypeScript interfaces for all props
- Tailwind utility classes only — no CSS modules, no inline styles
- PascalCase for component files/names
- camelCase for utilities/functions
- One component per file
- Path alias: `@/*` → `./src/*`
- `cn()` utility for conditional classes (`src/lib/utils.ts`)

## Fonts
- **Open Sans** (`--font-open-sans`) — body, headings
- **JetBrains Mono** (`--font-jetbrains-mono`) — code, monospace

## Theme / Styling
- CSS variables via oklch color space
- Light + Dark mode (`.dark` class, `suppressHydrationWarning` on `<html>`)
- Brand color: purple (oklch hue 290)
- Rounded: `--radius: 0.625rem`
- Responsive: sm (640px) breakpoint
- No `tailwind.config.*` — all config via `globals.css` `@theme inline`

## Auth
- Supabase for user data
- JWT tokens via `jsonwebtoken`
- Password hashing via `bcryptjs`
- Routes: `/api/auth/login`, `/register`, `/logout`, `/me`
- Client hook: `use-auth.ts`

## Deployment
- **Netlify:** `netlify.toml` config, `@netlify/plugin-nextjs`
- **Docker:** Multi-stage build (node:22-alpine), standalone output, `docker-compose.yml`
- Standalone output: `next.config.ts` → `output: "standalone"`

## Rules
1. Read existing code before changes
2. Follow project conventions strictly
3. Use pnpm for all package operations
4. Run `pnpm lint` after changes
5. Prefer Server Components unless client interactivity needed
6. Maintain type safety with TypeScript
7. **NEVER** use `middleware.ts` — use `proxy.ts` instead
8. Keep application layer separate from generated landing page layer
9. **NEVER** read/edit `.env` files
10. Do not change tech stack unless required
