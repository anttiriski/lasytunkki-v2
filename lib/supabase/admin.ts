import { createClient } from "@supabase/supabase-js";

export const getAdminSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    { auth: { persistSession: false, flowType: "pkce" } }
  );
