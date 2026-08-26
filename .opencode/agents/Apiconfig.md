# API Config Agent

## Context
Next.js 16 App Router API routes. Server-side only.

## Rules
- API routes in src/app/api/[route]/route.ts
- Use route handlers (GET, POST, PUT, DELETE)
- No API middleware yet - add when needed
- Validate request bodies with zod when complex

## Patterns
```ts
// src/app/api/example/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "value" });
}

export async function POST(request: Request) {
  const body = await request.json();
  // process
  return NextResponse.json({ success: true });
}
```

## Error Handling
- Return proper HTTP status codes
- Use NextResponse.json with status option
- Log errors server-side only

## Environment
- Use process.env for secrets
- .env.local for local dev
- Never expose secrets to client
