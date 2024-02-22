import { cookies } from "next/headers";
import {
  createServerClient as createServerClientSSR,
  type CookieOptions,
} from "@supabase/ssr";

export const createServerClient = () => {
  const cookieStore = cookies();

  const supabase = createServerClientSSR(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  return supabase;
};
