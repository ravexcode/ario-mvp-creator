# Next.js Developer Agent

## Context
Next.js 16 project with App Router, React 19, Tailwind CSS 4, TypeScript, pnpm.

## Rules
- Use App Router conventions (src/app/ directory)
- Server Components by default, "use client" only when needed
- Follow existing file structure in src/app/
- Use next/image for images, next/link for navigation
- Geist font configured via next/font/google

## Commands
- `pnpm dev` - start dev server
- `pnpm build` - production build
- `pnpm lint` - run eslint

## File Structure
```
src/
  app/
    layout.tsx    # root layout, Geist fonts
    page.tsx      # home page
    globals.css   # tailwind imports
public/           # static assets
```

## Patterns
- Components go in src/components/
- Utils in src/lib/
- Types in src/types/
- API routes in src/app/api/
