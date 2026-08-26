import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

/** Parse JSON column (Neon returns strings, not objects). */
export function parseJson<T>(value: unknown): T {
  if (typeof value === "string") return JSON.parse(value) as T;
  return value as T;
}

/** Stringify for JSON column insert/update. */
export function toJson(value: unknown): string {
  return JSON.stringify(value);
}
