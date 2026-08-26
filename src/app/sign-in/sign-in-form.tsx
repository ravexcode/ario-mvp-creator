"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/layout/footer";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tosAccepted, setTosAccepted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push(redirectTo);
    } catch {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <div className="p-4">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 animate-fade-in-up">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex justify-center">
            <Image
              src="/logo.svg"
              alt="Ar0"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setTosAccepted(!tosAccepted)}
                className={`mt-0.5 size-4 rounded-full border-2 transition-colors flex items-center justify-center ${
                  tosAccepted
                    ? "bg-primary border-primary"
                    : "border-muted-foreground/50 hover:border-muted-foreground"
                }`}
              >
                {tosAccepted && (
                  <div className="size-2 rounded-full bg-primary-foreground" />
                )}
              </button>
              <span className="text-sm text-muted-foreground">
                I accept the{" "}
                <button
                  type="button"
                  onClick={() => router.push("/tos")}
                  className="text-foreground underline underline-offset-2 hover:text-primary transition-colors"
                >
                  Terms of Service
                </button>
              </span>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!tosAccepted || isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/sign-up")}
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
