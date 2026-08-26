"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function ProjectPreviewPage() {
  const { user } = useAuth();
  const params = useSearchParams();
  const id = params.get("id");

  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id || !id) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchPreview = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/projects/${id}/preview`, {
          headers: {
            "x-user-id": user.id,
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to load preview (${res.status})`);
        }

        const text = await res.text();

        if (!cancelled) {
          setHtml(text);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load project preview."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPreview();

    return () => {
      cancelled = true;
    };
  }, [user?.id, id]);

  if (!id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-400">
        <p>Project not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950">
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
