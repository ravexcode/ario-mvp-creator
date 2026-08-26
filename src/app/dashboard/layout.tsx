import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthFromRequest } from "@/lib/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Dashboard — Ario",
  description: "Build and manage your landing pages",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuthFromRequest();
  if (!auth) redirect("/sign-in");

  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background/80 backdrop-blur-sm px-4">
            <SidebarTrigger />
            <div className="flex-1" />
            <ThemeToggle />
          </header>
          <div className="flex-1 p-6">{children}</div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
