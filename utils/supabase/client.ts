import { createBrowserClient } from "@supabase/ssr";

// Used inside Client Components ("use client" files) that run in the browser.
// Safe to use the public URL + publishable/anon key here -- never the secret key.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
