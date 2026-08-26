"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Code2,
  Eye,
  Maximize2,
  RefreshCw,
  Smartphone,
  Tablet,
  Monitor,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Viewport = "mobile" | "tablet" | "desktop";

export function PreviewPanel() {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className="flex h-full flex-col bg-muted/30">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-background px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 items-center rounded-md border border-border bg-muted/50 p-0.5">
            <TabButton active={tab === "preview"} onClick={() => setTab("preview")}>
              <Eye className="size-3.5" />
              Preview
            </TabButton>
            <TabButton active={tab === "code"} onClick={() => setTab("code")}>
              <Code2 className="size-3.5" />
              Code
            </TabButton>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden h-7 items-center rounded-md border border-border bg-muted/50 p-0.5 sm:flex">
            <ViewportButton
              active={viewport === "mobile"}
              onClick={() => setViewport("mobile")}
              aria-label="Mobile viewport">
              <Smartphone className="size-3.5" />
            </ViewportButton>
            <ViewportButton
              active={viewport === "tablet"}
              onClick={() => setViewport("tablet")}
              aria-label="Tablet viewport">
              <Tablet className="size-3.5" />
            </ViewportButton>
            <ViewportButton
              active={viewport === "desktop"}
              onClick={() => setViewport("desktop")}
              aria-label="Desktop viewport">
              <Monitor className="size-3.5" />
            </ViewportButton>
          </div>

          <Button variant="ghost" size="icon-sm" aria-label="Refresh">
            <RefreshCw className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Fullscreen">
            <Maximize2 className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Share">
            <Share2 className="size-3.5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="default" size="sm" className="ml-1 gap-1.5">
                  Deploy
                  <ChevronDown className="size-3.5" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Deploy to Vercel</DropdownMenuItem>
              <DropdownMenuItem>Open pull request</DropdownMenuItem>
              <DropdownMenuItem>Export as ZIP</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Frame */}
      <div className="flex flex-1 items-start justify-center overflow-auto p-3 sm:p-6">
        <div
          className={cn(
            "h-full w-full overflow-hidden rounded-xl border border-border bg-background shadow-sm dark:shadow-black/40 transition-all",
            viewport === "mobile" && "max-w-sm",
            viewport === "tablet" && "max-w-2xl",
            viewport === "desktop" && "max-w-5xl"
          )}>
          {tab === "preview" ? <MockLanding /> : <MockCode />}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-6 items-center gap-1.5 rounded px-2 text-xs font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}>
      {children}
    </button>
  );
}

function ViewportButton({
  active,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...rest}
      className={cn(
        "grid h-6 w-7 place-items-center rounded text-muted-foreground transition-colors",
        active && "bg-background text-foreground shadow-sm"
      )}
    />
  );
}

function MockLanding() {
  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-xs">
        <span className="font-mono text-muted-foreground">lumen.app</span>
        <div className="flex gap-3 text-muted-foreground">
          <span>Features</span>
          <span>Pricing</span>
          <span className="rounded-md bg-primary px-2 py-0.5 text-primary-foreground">
            Get started
          </span>
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-10">
        <div className="space-y-3 text-center">
          <Badge variant="secondary" className="mx-auto">
            New · AI-powered
          </Badge>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Notes that think with you.
          </h3>
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            Lumen turns scattered ideas into connected knowledge, automatically.
          </p>
        </div>

        <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
          <div className="rounded-md border border-border bg-card p-3 text-xs">
            <div className="mb-1 font-medium">Capture</div>
            <div className="text-muted-foreground">Voice, text, image.</div>
          </div>
          <div className="rounded-md border border-border bg-card p-3 text-xs">
            <div className="mb-1 font-medium">Connect</div>
            <div className="text-muted-foreground">Auto-linked notes.</div>
          </div>
          <div className="rounded-md border border-border bg-card p-3 text-xs">
            <div className="mb-1 font-medium">Recall</div>
            <div className="text-muted-foreground">Ask in plain English.</div>
          </div>
          <div className="rounded-md border border-border bg-card p-3 text-xs">
            <div className="mb-1 font-medium">Share</div>
            <div className="text-muted-foreground">One link, no setup.</div>
          </div>
        </div>

        <div className="mx-auto h-32 max-w-md rounded-lg border border-dashed border-border bg-muted/30" />
      </div>
    </div>
  );
}

function MockCode() {
  return (
    <div className="h-full overflow-auto bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-100">
      <div className="mb-3 flex items-center gap-2 text-zinc-400">
        <span className="rounded bg-zinc-800 px-1.5 py-0.5">page.tsx</span>
        <span>React · TypeScript</span>
      </div>
      <pre className="text-zinc-300">
{`export default function Home() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Hero />
      <Features />
      <Pricing />
    </main>
  );
}`}
      </pre>
    </div>
  );
}
