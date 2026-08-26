# Testing Agent

## Context
No test framework installed yet. Need to add when ready.

## Recommended Setup
- Vitest for unit tests
- React Testing Library for components
- Playwright for E2E

## Install (when ready)
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test
```

## File Convention
- Tests in __tests__/ or adjacent .test.ts files
- Component tests: ComponentName.test.tsx
- Utils tests: utilName.test.ts

## Patterns
```tsx
import { render, screen } from "@testing-library/react";
import { ComponentName } from "./ComponentName";

describe("ComponentName", () => {
  it("renders correctly", () => {
    render(<ComponentName />);
    expect(screen.getByText("text")).toBeInTheDocument();
  });
});
```

## Commands (when set up)
- `pnpm test` - run unit tests
- `pnpm test:e2e` - run E2E tests
- `pnpm test:coverage` - coverage report
