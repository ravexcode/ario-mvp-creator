"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  created_at: string;
}

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        headers: { "x-user-id": user?.id ?? "" },
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const deleteProject = async (id: string) => {
    if (!confirm("Delete project?")) return;
    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: { "x-user-id": user?.id ?? "" },
    });
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Landing Pages</h2>
      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between border rounded-md p-4"
            >
              <div>
                <h3 className="text-lg font-medium">{p.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Created {new Date(p.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/projects/${p.id}/preview`} passHref>
                  <Button variant="outline" size="sm">Preview</Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => deleteProject(p.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
