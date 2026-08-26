import { sql, parseJson, toJson } from "./index";
import { UserSettings } from "../types";

export async function getUserSettings(
  userId: string
): Promise<UserSettings | null> {
  const rows = await sql`
    SELECT settings
    FROM users
    WHERE id = ${userId}
  `;
  if (!rows[0]) return null;
  return parseJson<UserSettings>(rows[0].settings);
}

export async function updateUserSettings(
  userId: string,
  settings: UserSettings
): Promise<void> {
  await sql`
    UPDATE users
    SET settings = ${toJson(settings)}
    WHERE id = ${userId}
  `;
}
