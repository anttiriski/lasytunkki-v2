"use client";

import { DarkmodeToggle } from "@/components/DarkmodeToggle";
import { useAuth } from "@/components/supabase-provider";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { authenticated, loadingUser, signOut } = useAuth();

  return (
    <div className="flex justify-between">
      <DarkmodeToggle />

      <div className="flex flex-col sm:flex-row">
        <Button asChild variant="ghost">
          <Link href="/tunkki">Läsytunkki v.2</Link>
        </Button>
        {!loadingUser &&
          (authenticated ? (
            <Button
              onClick={signOut}
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
    </div>
  );
};

export default Header;
