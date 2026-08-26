"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
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
import { SendHorizontal, Loader2 } from "lucide-react";

const MODELS = [
  {
    group: "Cloud",
    items: [
      { value: "gpt-4o-mini", label: "GPT-4o Mini" },
      { value: "gpt-3.5-turbo", label: "GPT‑3.5 Turbo" },
    ],
  },
];

const SUGGESTIONS = [
  "Landing page for an AI note-taking app",
  "Pricing page for a developer SaaS",
  "Hero section for a fintech product",
  "Waitlist page for a new AI tool",
];

interface Project {
  id: string;
  name: string;
  config: Record<string, unknown>;
  code: string;
  created_at: string;
}

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.push("/sign-in");
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user) {
      fetch("/api/projects", {
        headers: { "x-user-id": user?.id ?? "" },
      })
        .then((res) => res.json())
        .then((data) => setProjects(data.projects))
        .catch(() => {});
    }
  }, [user]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !model) return;

    setIsGenerating(true);
    try {
      const createRes = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user?.id ?? "",
        },
        body: JSON.stringify({
          name: prompt.slice(0, 50) + (prompt.length > 50 ? "..." : ""),
          config: { title: prompt.slice(0, 50) },
        }),
      });
      if (!createRes.ok) throw new Error("Failed to create project");
      const { project } = await createRes.json();

      const genRes = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user?.id ?? "",
        },
        body: JSON.stringify({ projectId: project.id, prompt, model }),
      });
      if (!genRes.ok) throw new Error("Failed to generate");
      const { code } = await genRes.json();

      const updatedProject = { ...project, code };
      setActiveProject(updatedProject);
      setProjects((prev) => [updatedProject, ...prev]);
      setPrompt("");
    } finally {
      setIsGenerating(false);
    }
  };

  if (authLoading) return <Loader2 className="size-6 animate-spin" />;
  if (!user) return null;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col">
          {activeProject ? (
            <div className="flex-1 overflow-auto p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{activeProject.name}</h2>
                <Button variant="outline" size="sm" onClick={() => setActiveProject(null)}>
                  Back to generator
                </Button>
              </div>
              {activeProject.code ? (
                <div className="rounded-xl border bg-background p-4">
                  <pre className="overflow-x-auto font-mono text-xs">
                    <iframe
                      srcDoc={activeProject.code}
                      className="w-full h-full border-0 min-h-dvh"
                      sandbox="allow-scripts"
                    />
                  </pre>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
                  No code generated yet
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-6">
              <div className="w-full max-w-2xl space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    What are we building today?
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Describe your landing page and pick a model
                  </p>
                </div>
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div className="rounded-2xl border bg-card shadow-sm transition-all focus-within:ring-2 focus-within:ring-ring/30">
                    <textarea
                      placeholder="Create a landing page for..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={3}
                      className="w-full resize-none rounded-t-2xl bg-transparent px-4 pt-3 pb-2 text-sm outline-none placeholder:text-muted-foreground/70"
                    />
                    <div className="flex items-center justify-between border-t px-3 py-2">
                      <Select value={model} onValueChange={(v) => setModel(v ?? "")}>
                        <SelectTrigger className="h-8 w-auto gap-1.5 border-transparent bg-transparent px-2 text-xs hover:bg-muted">
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
                      <Button type="submit" size="icon-sm" disabled={!prompt.trim() || !model || isGenerating} className="rounded-full">
                        {isGenerating ? <Loader2 className="size-3.5 animate-spin" /> : <SendHorizontal className="size-3.5" />}
                      </Button>
                    </div>
                  </div>
                </form>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} type="button" onClick={() => setPrompt(s)} className="rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
