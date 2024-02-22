"use client";

import { DarkmodeToggle } from "@/components/DarkmodeToggle";
import { useAuth } from "@/components/supabase-provider";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { authenticated, supabase, loadingUser } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex justify-between">
      <DarkmodeToggle />

      {!loadingUser &&
        (authenticated ? (
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="space-x-2 animate-in fade-in"
          >
            <p>Kirjaudu ulos</p>
            <KeyRound className="w-5" />
          </Button>
        ) : (
          <Button asChild variant="ghost">
            <Link href="/kirjaudu" className="space-x-2">
              <p>Kirjaudu</p>
              <KeyRound className="w-5" />
            </Link>
          </Button>
        ))}
    </div>
  );
};

export default Header;
