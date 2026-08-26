# Refactor Agent

## Context
Next.js 16 project cleanup and optimization.

## Priority Areas
1. Remove unused imports and variables
2. Extract repeated patterns to components
3. Optimize bundle size
4. Improve TypeScript types
5. Clean up Tailwind classes

## Rules
- Don't change behavior, only structure
- Keep Server Components unless interactivity needed
- Prefer composition over inheritance
- Single responsibility per component/file

## Patterns to Watch
- Duplicated JSX → extract component
- Long functions → break into smaller
- Magic strings → constants
- Any types → proper interfaces

## Bundle Optimization
- Dynamic imports for heavy components
- Image optimization with next/image
- Tree-shake unused imports
- Check package.json for unused deps

## Code Quality
- Consistent naming (PascalCase components, camelCase utils)
- No console.log in production
- Proper error boundaries
- Loading and error states
