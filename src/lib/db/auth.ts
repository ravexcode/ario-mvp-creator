import { sql } from "./index";

export interface DbUser {
  id: string;
  email: string;
  name: string;
  password_hash: string;
}

export interface DbUserPublic {
  id: string;
  email: string;
  name: string;
  settings: unknown;
  created_at: string;
}

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const rows = await sql`
    SELECT id, email, name, password_hash
    FROM users
    WHERE email = ${email.toLowerCase()}
  `;
  return rows[0] ?? null;
}

export async function findUserById(id: string): Promise<DbUserPublic | null> {
  const rows = await sql`
    SELECT id, email, name, settings, created_at
    FROM users
    WHERE id = ${id}
  `;
  return rows[0] ?? null;
}

export async function createUser(
  email: string,
  name: string,
  passwordHash: string
): Promise<{ id: string; email: string; name: string }> {
  const rows = await sql`
    INSERT INTO users (email, name, password_hash)
    VALUES (${email.toLowerCase()}, ${name}, ${passwordHash})
    RETURNING id, email, name
  `;
  return rows[0];
}
