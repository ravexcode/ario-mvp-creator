import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/proxy
 *
 * Proxies requests to an upstream service, injecting `process.env.API_KEY`
 * as a Bearer token. The client never sees or sends the key.
 *
 * Body: { "url": "<upstream endpoint>", "method"?: "GET"|"POST", "body"?: unknown }
 *
 * Rate limiting, logging, and retry logic can be added here.
 */

const UPSTREAM_TIMEOUT_MS = 30_000;

export async function POST(req: NextRequest) {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    console.error("[proxy] API_KEY is not set in environment variables");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  let payload: { url: string; method?: string; body?: unknown };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { url, method = "POST", body } = payload;

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing or invalid `url`" }, { status: 400 });
  }

  // Block private / internal targets to prevent SSRF.
  try {
    const parsed = new URL(url);
    if (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname.startsWith("10.") ||
      parsed.hostname.startsWith("192.168.") ||
      parsed.hostname.startsWith("172.") ||
      parsed.protocol === "file:"
    ) {
      return NextResponse.json({ error: "Target not allowed" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid target URL" }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstreamRes = await fetch(url, {
      method: method.toUpperCase(),
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const contentType = upstreamRes.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json")
      ? await upstreamRes.json()
      : await upstreamRes.text();

    return NextResponse.json(data, { status: upstreamRes.status });
  } catch (err) {
    const message =
      err instanceof DOMException && err.name === "AbortError"
        ? "Upstream request timed out"
        : "Upstream request failed";
    console.error("[proxy]", message, err);
    return NextResponse.json({ error: message }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
