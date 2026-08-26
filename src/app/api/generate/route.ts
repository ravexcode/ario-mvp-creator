import { NextResponse } from "next/server";
import { findProjectById, updateProjectCode } from "@/lib/db/projects";
import { GenerateRequest } from "@/lib/types";

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";

interface OllamaResponse {
  model: string;
  message: { role: string; content: string };
  done: boolean;
}

async function callOllama(prompt: string, model: string): Promise<string> {
  const systemPrompt = `You are an expert web developer. Generate ONLY valid HTML/CSS/JS code for landing pages.
Rules:
- Output complete, self-contained HTML
- Include all CSS inline in <style> tags
- Use modern CSS (flexbox, grid, variables)
- Responsive design with mobile-first approach
- Clean, semantic HTML5
- No external dependencies
- Professional, modern design
- Include smooth animations and transitions
- Use a cohesive color scheme
- Output ONLY the HTML code, no explanations`;

  const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      stream: false,
    }),
  });

  if (!res.ok) throw new Error(`Ollama error: ${res.status}`);

  const data: OllamaResponse = await res.json();
  return data.message.content;
}

function extractHtml(response: string): string {
  const codeBlockMatch = response.match(/```(?:html)?\s*\n?([\s\S]*?)```/);
  if (codeBlockMatch) return codeBlockMatch[1].trim();

  if (response.includes("<!DOCTYPE") || response.includes("<html")) {
    return response;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Page</title>
</head>
<body>
${response}
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: GenerateRequest & { model?: string } = await request.json();
    const { projectId, prompt, model = "minimax-m3" } = body;

    if (!projectId || !prompt) {
      return NextResponse.json(
        { error: "Project ID and prompt required" },
        { status: 400 }
      );
    }

    const project = await findProjectById(projectId, userId);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const rawResponse = await callOllama(prompt, model);
    const code = extractHtml(rawResponse);

    await updateProjectCode(projectId, code);

    return NextResponse.json({ code });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("Generate error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
