import { createClient, SupabaseClient } from "@supabase/supabase-js";

declare global {
  var __supabase: SupabaseClient | undefined;
}

function getSupabase(): SupabaseClient {
  if (process.env.NODE_ENV === "production") {
    return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  }
  if (!global.__supabase) {
    global.__supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  }
  return global.__supabase;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getSupabase() as any)[prop];
  },
});
