import { NextResponse } from "next/server";
import { getUserSettings, updateUserSettings } from "@/lib/db/settings";
import { UserSettings } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await getUserSettings(userId);
    if (!settings) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ settings });
  } catch (err) {
    console.error("Settings GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: UserSettings = await request.json();
    await updateUserSettings(userId, body);

    return NextResponse.json({ settings: body });
  } catch (err) {
    console.error("Settings PUT error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
