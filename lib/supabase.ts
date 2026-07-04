import { createClient } from "@supabase/supabase-js";

// Client-side — uses anon key, safe to expose
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
