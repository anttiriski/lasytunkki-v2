"use client";

import { Input } from "@/components/ui/input";
import Space from "@/components/ui/space";
import { useState } from "react";
import Fuse from "fuse.js";
import SongListItem from "@/components/SongListItem";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SongsLanguageSelector from "@/components/SongsLanguageSelector";
import { useAuth } from "@/components/supabase-provider";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Song {
  id: number;
  title: string;
  created_at: string;
  lyrics: string;
  slug: string;
  melody: string;
  melody_link: string;
  language: "finnish" | "swedish" | "english" | "other";
}

interface SongListProps {
  songs: Song[];
}

const SongList: React.FC<SongListProps> = ({ songs: initialSongs }) => {
  const { authenticated } = useAuth();

  const fuse = new Fuse(initialSongs, {
    keys: ["title"],
    threshold: 0.2,
  });

  const [songs, setSongs] = useState(initialSongs);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return setSongs(initialSongs);
    }

    const results = fuse.search(event.target.value);

    const foundSongs = results.map((result) => result.item);

    setSongs(foundSongs);
  };

  const onLanguageChange = (languages) => {
    if (languages.length === 0) {
      return setSongs(initialSongs);
    }

    const filteredSongs = initialSongs.filter((song) =>
      languages.includes(song.language)
    );

    setSongs(filteredSongs);
  };

  return (
    <div>
      <div className="flex space-x-3 items-center">
        <SongsLanguageSelector onLanguageChange={onLanguageChange} />

        <Input onChange={handleSearch} placeholder="Etsi laulun sanat" />

        {authenticated && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button asChild>
                  <Link href="/uusi-laulu">
                    <PlusCircle size={20} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mr-4">Lisää uusi laulu</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <Space className="mt-4" />

      <Space className="mt-4" />

      <ul className="divide-y">
        {songs.map((song) => (
          <SongListItem key={song.id} song={song} />
        ))}
      </ul>

      {songs.length === 0 && <p className="mt-8">Ei löytynyt</p>}
    </div>
  );
};

export default SongList;
