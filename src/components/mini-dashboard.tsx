import { Settings } from "lucide-react";
import Image from "next/image";

export default function MiniDashboard() {
  return (
    <section className="hidden md:flex flex-row w-full max-w-3xl aspect-video border border-border bg-card text-card-foreground rounded-xl shadow-2xl shadow-black/20 dark:shadow-black/60 animate-fade-in-up cursor-default text-sm overflow-hidden">
      <aside className="h-full p-2 flex flex-col items-center justify-center border-r border-border bg-muted/40 w-14 shrink-0">
        <Image
          src="/app_icon.svg"
          alt="App icon"
          width={50}
          height={50}
          className="aspect-square w-6" />

        <Settings
          className="aspect-square w-5 mt-auto text-muted-foreground"
          strokeWidth={1.5} />
      </aside>

      <div className="w-full flex flex-col items-center justify-center p-6 gap-3">
        <p className="text-xl sm:text-2xl tracking-tight font-semibold">
          What are we building today?
        </p>

        <div className="border border-border bg-background p-3 w-full max-w-md mt-1 rounded-lg flex flex-col gap-4">
          <p className="text-muted-foreground w-full text-start px-1">
            Create a landing page for my saas...
          </p>

          <div className="flex justify-between items-center w-full">
            <span className="px-3 py-1 rounded-md border border-border text-xs text-muted-foreground">
              Ollama / minimax-m3
            </span>

            <span className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium text-white">
              Send
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
