"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { User } from "@/types/user";

export default function ProjectPreviewPage() {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const params = useParams();

  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/me");

      if (res.status !== 200) return router.push("/sign-in");

      const data = await res.json();
      setUser(data);
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/projects/${params.id}/preview`, {
          headers: {
            "x-user-id": data.user.id,
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to load preview (${res.status})`);
        }

        const text = await res.text();

        setHtml(text);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load project preview."
        );
      } finally {
        setLoading(false);
      }

      return;
    })();
  }, []);

  if (!params.id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-400">
        <p>Project not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen dark:bg-neutral-950">
      <button
        onClick={() => { router.back(); }}
        className="text-sm p-1 px-4 border border-neutral-300 hover:border-neutral-500 dark:border-neutral-800 dark:hover:border-neutral-600 cursor-pointer duration-300 rounded-sm mb-10">
        Back to projects
      </button>

      {loading && (
        <div className="flex min-h-screen items-center justify-center text-sm text-neutral-400">
          Loading preview...
        </div>
      )}

      {!loading && error && (
        <div className="flex min-h-screen items-center justify-center px-6 text-sm text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && html && (
        <iframe
          title="Project preview"
          srcDoc={html}
          className="block h-screen w-full border-0"
          sandbox="allow-scripts allow-forms allow-modals"
          referrerPolicy="no-referrer"
        />
      )}

      {!loading && !error && !html && (
        <div className="flex min-h-screen items-center justify-center text-sm text-neutral-400">
          No preview available.
        </div>
      )}
    </main>
  );
}
