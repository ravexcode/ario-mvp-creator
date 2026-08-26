import { sql, parseJson, toJson } from "./index";
import { LandingPageConfig } from "../types";

export interface DbProject {
  id: string;
  user_id: string;
  name: string;
  config: LandingPageConfig;
  code: string | null;
  created_at: string;
  updated_at: string;
}

export async function findProjectsByUser(
  userId: string
): Promise<DbProject[]> {
  const rows = await sql`
    SELECT id, name, config, created_at, updated_at
    FROM projects
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
  `;
  return rows.map((r) => ({
    ...r,
    user_id: userId,
    code: null,
    config: parseJson<LandingPageConfig>(r.config),
  }));
}

export async function findProjectById(
  id: string,
  userId: string
): Promise<DbProject | null> {
  const rows = await sql`
    SELECT *
    FROM projects
    WHERE id = ${id} AND user_id = ${userId}
  `;
  if (!rows[0]) return null;
  return {
    ...rows[0],
    config: parseJson<LandingPageConfig>(rows[0].config),
  };
}

export async function findProjectForPreview(
  id: string
): Promise<{ id: string; code: string; name: string } | null> {
  const rows = await sql`
    SELECT id, code, name
    FROM projects
    WHERE id = ${id}
  `;
  return rows[0] ?? null;
}

export async function createProject(
  userId: string,
  name: string,
  config: unknown = {}
): Promise<DbProject> {
  const rows = await sql`
    INSERT INTO projects (user_id, name, config)
    VALUES (${userId}, ${name}, ${toJson(config)})
    RETURNING id, name, config, created_at, updated_at
  `;
  return {
    ...rows[0],
    user_id: userId,
    code: null,
    config: parseJson<LandingPageConfig>(rows[0].config),
  };
}

export async function deleteProject(
  id: string,
  userId: string
): Promise<void> {
  await sql`
    DELETE FROM projects
    WHERE id = ${id} AND user_id = ${userId}
  `;
}

export async function updateProjectCode(
  id: string,
  code: string
): Promise<void> {
  await sql`
    UPDATE projects
    SET code = ${code}, updated_at = ${new Date().toISOString()}
    WHERE id = ${id}
  `;
}
