# Styling Agent

## Context
Tailwind CSS 4 with PostCSS plugin. Geist font family.

## Rules
- Use Tailwind utility classes only
- No custom CSS unless absolutely necessary
- Dark mode via dark: prefix (system preference)
- Responsive: sm: breakpoint at 640px

## Colors
- Background: bg-zinc-50 (light), bg-black (dark)
- Text: text-black (light), text-zinc-50 (dark)
- Foreground: bg-foreground for buttons
- Borders: border-black/[.08] light, border-white/[.145] dark

## Layout Patterns
- Flex layouts with flex-col/flex-row
- Max width containers: max-w-3xl, max-w-md
- Padding: px-16 py-32 for main sections
- Gap spacing: gap-4, gap-6

## Common Classes
```
flex flex-col flex-1 items-center justify-center
rounded-full px-5 transition-colors
hover:bg-[#383838] dark:hover:bg-[#ccc]
font-mono text-[0.9em]
```

## Animations
- Transition-colors for hover states
- Keep subtle, no heavy animations
