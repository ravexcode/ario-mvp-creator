import { NextResponse } from "next/server";
import { findUserById } from "@/lib/db/auth";
import { getAuthFromRequest } from "@/lib/auth";
import { parseJson } from "@/lib/db";
import { UserSettings } from "@/lib/types";

export async function GET() {
  try {
    const auth = await getAuthFromRequest();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await findUserById(auth.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        ...user,
        settings: parseJson<UserSettings>(user.settings),
      },
    });
  } catch (err) {
    console.error("Me error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
