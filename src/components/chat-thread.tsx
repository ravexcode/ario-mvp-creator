"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Square, Paperclip, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "user" | "assistant";
type Status = "streaming" | "done";

type Message = {
  id: string;
  role: Role;
  content: string;
  status?: Status;
};

type ModelGroup = { group: string; items: { value: string; label: string }[] };

const MODELS: ModelGroup[] = [
  { group: "Local", items: [{ value: "ollama:minimax-m3", label: "minimax-m3" }] },
  {
    group: "Cloud",
    items: [
      { value: "openrouter:anthropic/claude-sonnet-4.5", label: "Claude Sonnet 4.5" },
      { value: "openrouter:openai/gpt-5", label: "GPT-5" },
      { value: "openrouter:google/gemini-2.5-pro", label: "Gemini 2.5 Pro" },
    ],
  },
];

const SUGGESTIONS = [
  "Landing page for an AI note-taking app",
  "Pricing page for a developer SaaS",
  "Hero redesign for a fintech product",
  "Waitlist page for a new AI tool",
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "user",
    content:
      "Build a modern landing page for an AI-powered note-taking app called Lumen. Target audience: knowledge workers and students. Tone: clean, focused, slightly playful.",
  },
  {
    id: "2",
    role: "assistant",
    status: "done",
    content:
      "I'll create a clean, focused landing page for Lumen. Here's the structure I'm generating: a hero with a product preview, a features grid, a social proof strip, pricing, and a CTA footer.\n\n```tsx\n// app/page.tsx\nexport default function Home() {\n  return (\n    <main className=\"min-h-dvh bg-background text-foreground\">\n      <Hero />\n      <Features />\n      <Pricing />\n    </main>\n  );\n}\n```\n\nYou can preview the result on the right. Want me to tweak the copy, swap the accent color, or add a FAQ section?",
  },
];

export function ChatThread() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");
  const [model, setModel] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);

  const canSend = draft.trim().length > 0 && model.length > 0 && !isStreaming;

  const send = () => {
    if (!canSend) return;
    const next: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: draft.trim(),
    };
    setMessages((prev) => [...prev, next]);
    setDraft("");
    setIsStreaming(true);

    // Mock assistant reply.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          status: "streaming",
          content: "Generating your page…",
        },
      ]);
    }, 400);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Thread */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-6">
          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setDraft(s)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card shadow-sm dark:shadow-black/40 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30 transition-all">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Describe the page you want to build…"
              rows={3}
              className="w-full resize-none rounded-t-2xl bg-transparent px-4 pt-3 pb-2 text-sm leading-relaxed outline-none placeholder:text-muted-foreground/70"
            />

            <div className="flex items-center justify-between gap-2 border-t border-border/60 px-2 py-2">
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Attach file"
                  className="text-muted-foreground">
                  <Paperclip className="size-4" />
                </Button>

                <Select value={model} onValueChange={(v) => setModel(v ?? "")}>
                  <SelectTrigger className="h-8 w-auto gap-1.5 border-transparent bg-transparent px-2 text-xs hover:bg-muted data-[size=default]:h-8">
                    <Sparkles className="size-3.5 text-primary" />
                    <SelectValue placeholder="Choose model" />
                  </SelectTrigger>
                  <SelectContent>
                    {MODELS.map((group) => (
                      <SelectGroup key={group.group}>
                        <SelectLabel>{group.group}</SelectLabel>
                        {group.items.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                size="icon-sm"
                onClick={send}
                disabled={!canSend}
                aria-label={isStreaming ? "Stop generating" : "Send message"}
                className="rounded-full">
                {isStreaming ? (
                  <Square className="size-3.5 fill-current" />
                ) : (
                  <Send className="size-3.5" />
                )}
              </Button>
            </div>
          </div>

          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            Ar0 can make mistakes. Review generated pages before publishing.
          </p>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-3.5" />
        </span>
      )}

      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}>
        <MessageBody content={message.content} />
        {message.status === "streaming" && (
          <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-current" />
            <span className="size-1.5 animate-pulse rounded-full bg-current [animation-delay:120ms]" />
            <span className="size-1.5 animate-pulse rounded-full bg-current [animation-delay:240ms]" />
          </span>
        )}
      </div>

      {isUser && (
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
          <User className="size-3.5" />
        </span>
      )}
    </div>
  );
}

function MessageBody({ content }: { content: string }) {
  // Naive markdown-ish splitter for fenced code blocks.
  const parts = content.split(/```(\w*)\n([\s\S]*?)```/g);
  // parts: [text, lang, code, text, lang, code, ...]

  return (
    <div className="space-y-2">
      {parts.map((part, i) => {
        if (i % 3 === 0) {
          return part.trim() ? (
            <p key={i} className="whitespace-pre-wrap">
              {part}
            </p>
          ) : null;
        }
        if (i % 3 === 1) {
          // language tag — skip render, code is next
          return null;
        }
        return (
          <pre
            key={i}
            className="mt-2 overflow-x-auto rounded-lg border border-border/60 bg-background/80 p-3 font-mono text-xs leading-relaxed">
            <code>{part}</code>
          </pre>
        );
      })}
    </div>
  );
}
