"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import React from "react";

const Login = () => {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const supabase = createBrowserClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data) {
      router.push("/");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <h2 className="text-2xl font-bold mb-4">Kirjaudu</h2>

        <label htmlFor="email" className="text-sm font-medium">
          Sähköposti
        </label>

        <Input type="email" id="email" name="email" required />

        <div className="mt-4" />

        <label htmlFor="password" className="text-sm font-medium">
          Salasana
        </label>

        <Input type="password" id="password" name="password" required />

        <Button type="submit" className="mt-4">
          Kirjaudu
        </Button>
      </form>
    </div>
  );
};

export default Login;
