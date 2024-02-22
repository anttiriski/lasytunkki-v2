"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { SupabaseClient, User } from "@supabase/supabase-js";
import { createBrowserClient } from "@/lib/supabase/client";

type SupabaseContext = {
  supabase: SupabaseClient;
  authenticated: boolean;
  loadingUser: boolean;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createBrowserClient());
  const [loadingUser, setLoadingUser] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

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
