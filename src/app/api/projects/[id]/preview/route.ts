import { NextResponse } from "next/server";
import { findProjectForPreview } from "@/lib/db/projects";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await findProjectForPreview(id);

    console.log(project)

    if (!project || !project.code) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(project.code, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Preview error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
