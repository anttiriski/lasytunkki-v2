"use client";

import { useAuth } from "@/components/supabase-provider";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import Link from "next/link";

const EditSongButton = ({ songSlug }) => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return null;
  }

  return (
    <div>
      <Button variant={"secondary"} asChild>
        <Link href={`/laulut/${songSlug}/edit`} className="space-x-2">
          <Edit2 size={20} />

          <p>Muokkaa kappaletta</p>
        </Link>
      </Button>
    </div>
  );
};

export default EditSongButton;
