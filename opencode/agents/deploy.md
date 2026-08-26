# Deploy Agent

## Context
Next.js 16 project deploying to Vercel.

## Commands
- `pnpm build` - verify build passes
- `pnpm start` - test production locally

## Vercel Config
- Framework: Next.js (auto-detected)
- Build command: pnpm build
- Output directory: .next
- Install command: pnpm install

## Pre-deploy Checklist
1. `pnpm lint` passes
2. `pnpm build` succeeds
3. No console errors in dev
4. Environment variables set in Vercel dashboard
5. Response times acceptable

## Environment Variables
- Set in Vercel project settings
- Use NEXT_PUBLIC_ prefix for client-side
- Keep secrets server-side only

## Common Issues
- Build fails: check TypeScript errors, missing deps
- Runtime errors: check env vars, API routes
- Slow loads: optimize images, check bundle size
