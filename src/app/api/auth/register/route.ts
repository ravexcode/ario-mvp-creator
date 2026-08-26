import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { hashPassword, signToken, setAuthCookie } from "@/lib/auth";
import { RegisterRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: RegisterRequest = await request.json();
    const { name, email, password, confirmPassword } = body;

    // Validate
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check existing user
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Insert user
    const { data: user, error } = await supabase
      .from("users")
      .insert({
        email: email.toLowerCase(),
        name,
        password_hash: passwordHash,
      })
      .select("id, email, name")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
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
