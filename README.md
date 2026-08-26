# Ario

A modern web application built with Next.js.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **UI:** [React 19](https://react.dev)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com)
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Font:** [Geist](https://vercel.com/font)
- **Package Manager:** [pnpm](https://pnpm.io)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
git clone <repo-url>
cd ario
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Project Structure

```
ario/
├── src/
│   └── app/
│       ├── layout.tsx    # Root layout
│       ├── page.tsx      # Home page
│       └── globals.css   # Global styles
├── public/               # Static assets
├── opencode/
│   └── agents/           # AI coding agents
└── package.json
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
