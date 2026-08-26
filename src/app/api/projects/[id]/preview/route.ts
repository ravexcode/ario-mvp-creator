import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: project } = await supabase
      .from("projects")
      .select("id, code, name")
      .eq("id", id)
      .single();

    if (!project || !project.code) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(project.code, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
