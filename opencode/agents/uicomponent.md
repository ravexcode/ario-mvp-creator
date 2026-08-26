# UI Component Agent

## Context
React 19 + TypeScript + Tailwind CSS 4 project. Server Components default.

## Rules
- Create in src/components/ directory
- TypeScript interfaces for all props
- Tailwind classes for styling (no CSS modules)
- Server Components unless interactivity needed
- Export named components, default export for page-level

## Patterns
```tsx
// src/components/ComponentName.tsx
interface ComponentNameProps {
  // props
}

export function ComponentName({ prop }: ComponentNameProps) {
  return (
    <div className="...">
      {/* content */}
    </div>
  );
}
```

## Naming
- PascalCase for files and components
- Props interface: ComponentNameProps
- One component per file

## Accessibility
- Semantic HTML elements
- aria-labels where needed
- Focus management for interactive elements
