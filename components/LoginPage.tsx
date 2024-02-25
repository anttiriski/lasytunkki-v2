"use client";

import ButtonLoading from "@/components/LoadingButton";
import { useAuth } from "@/components/supabase-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Space from "@/components/ui/space";
import { useState } from "react";

const LoginPage = () => {
  const { signInEmail } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    setLoading(true);

    await signInEmail(email, password);

    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <h2 className="text-2xl font-bold mb-4">Kirjaudu</h2>

        <Label htmlFor="email" className="text-sm font-medium">
          Sähköposti
        </Label>

        <Input type="email" id="email" name="email" required />

        <div className="mt-4" />

        <Label htmlFor="password" className="text-sm font-medium">
          Salasana
        </Label>

        <Input type="password" id="password" name="password" required />

        <Space className="mt-4" />

        {loading ? (
          <ButtonLoading>Kirjaudu</ButtonLoading>
        ) : (
          <Button type="submit">Kirjaudu</Button>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
