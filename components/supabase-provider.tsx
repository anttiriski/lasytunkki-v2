"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { SupabaseClient, User } from "@supabase/supabase-js";
import { createBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SupabaseContext = {
  supabase: SupabaseClient;
  authenticated: boolean;
  loadingUser: boolean;
  signInEmail: (email: string, password: string) => void;
  signOut: () => void;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserClient());
  const [loadingUser, setLoadingUser] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const signInEmail = async (email: string, password: string) => {
    setLoadingUser(true);

    try {
      await supabase.auth.signInWithPassword({ email, password });
    } catch (error) {}

    setAuthenticated(true);
    setLoadingUser(false);
    toast("Kirjauduttu sisään", {});

    router.push("/");
  };

  const signOut = async () => {
    await supabase.auth.signOut();

    toast("Kirjauduttu ulos");
    setAuthenticated(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        setLoadingUser(true);

        const { data, error } = await supabase.auth.getUser();

        if (error) {
        }

        if (data?.user) {
          setLoadingUser(false);
          setAuthenticated(true);
        }
      } catch (error) {
      } finally {
        setLoadingUser(false);
      }
    };

    checkUser();
  }, []);

  return (
    <Context.Provider
      value={{
        supabase,
        authenticated,
        loadingUser,
        signInEmail,
        signOut,
      }}
    >
      <>{children}</>
    </Context.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("use must be used inside SupabaseProvider");
  }

  return context;
};
