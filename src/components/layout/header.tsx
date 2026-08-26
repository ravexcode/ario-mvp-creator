"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

import { useEffect, useState } from "react";
import { getAuthCookie } from "@/utils/session_gestor";

export default function Header() {
  const [hasSession, setHasSession] = useState<boolean>(false);

  useEffect(() => {
    (() => {
      const token = getAuthCookie();

      if (token) return setHasSession(true);

      return;
    })();
  }, [])

  return (
    <header
      className="w-full flex justify-between items-center border-b border-border py-2 px-4 sm:px-6 h-14 z-20 sticky top-0 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 animate-fade-in-down">
      <div className="flex gap-2 items-center justify-center">
        <Image src="/logo.svg" alt="App logo" width={30} height={30} />

        <p className="text-2xl font-bold tracking-wide text-purple-500">
          Ar0
        </p>
      </div>

      <div className="flex gap-2 items-center justify-center">
        <Link
          href={ hasSession ? "/dashboard" : "/sign-in" }
          className="text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/80 w-28 p-2 rounded-md text-center transition-colors text-white">
          { hasSession ? "Dashboard" : "Sign in" }
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
