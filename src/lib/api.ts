/**
 * Client-side proxy helper.
 *
 * Calls our own /api/proxy which injects the real API key server-side.
 * Pass the API_SECRET as Bearer token.
 */

const PROXY_ENDPOINT = "/api/proxy";

export async function proxyFetch<T = unknown>(
  targetUrl: string,
  body?: unknown,
  opts?: { method?: "GET" | "POST"; secret?: string }
): Promise<T> {
  const { method = "POST", secret } = opts ?? {};

  const headers: Record<string, string> = {};
  if (secret) {
    headers["Authorization"] = `Bearer ${secret}`;
  }

  const res = await fetch(PROXY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({ url: targetUrl, method, body }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error ?? `Proxy request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}
