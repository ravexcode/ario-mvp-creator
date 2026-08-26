import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { comparePasswords, signToken, setAuthCookie } from "@/lib/auth";
import { LoginRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Find user
    const { data: user } = await supabase
      .from("users")
      .select("id, email, name, password_hash")
      .eq("email", email.toLowerCase())
      .single();

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const valid = await comparePasswords(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Sign JWT
    const token = signToken({ userId: user.id, email: user.email });

    // Set cookie
    await setAuthCookie(token);

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
