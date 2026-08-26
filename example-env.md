# Environment Variables

## Overview
This file contains the environment variables required for the Ario project. Copy `.env.example` to `.env` and fill in your values.

## Variables
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Ario

OPENROUTER_API_KEY=your_openrouter_api_key
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_API_KEY=http://localhost:11434

DATABASE_URL=your_database_url
```

## Notes
- Never commit `.env` files to version control
- Use `NEXT_PUBLIC_` prefix for client-side accessible variables
- Keep sensitive keys server-side only
