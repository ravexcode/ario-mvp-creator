import { NextResponse } from "next/server";
import { findProjectsByUser, createProject } from "@/lib/db/projects";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await findProjectsByUser(userId);
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("Projects GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, config } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: "Project name required" },
        { status: 400 }
      );
    }

    const project = await createProject(userId, name, config);
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    console.error("Projects POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
