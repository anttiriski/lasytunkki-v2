"use client";

import { Input } from "@/components/ui/input";
import Space from "@/components/ui/space";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import SongListItem from "@/components/SongListItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Song {
  id: number;
  title: string;
  created_at: string;
  lyrics: string;
  slug: string;
  melody: string;
  melody_link: string;
  deleted: boolean;
  language: "finnish" | "swedish" | "english" | "other";
}

interface SongListProps {
  songs: Song[];
}

const SongList: React.FC<SongListProps> = ({ songs: initialSongs }) => {
  const fuse = new Fuse(initialSongs, {
    keys: ["title"],
    threshold: 0.2,
  });

  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [songs, setSongs] = useState(initialSongs);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return setSongs(initialSongs);
    }

    const results = fuse.search(event.target.value);

    const foundSongs = results.map((result) => result.item);

    setSongs(foundSongs);
  };

  useEffect(() => {
    if (selectedLanguage === "all") {
      return setSongs(initialSongs);
    }

    const filteredSongs = initialSongs.filter(
      (song) => song.language === selectedLanguage
    );

    setSongs(filteredSongs);
  }, [selectedLanguage]);

  return (
    <div>
      <Input onChange={handleSearch} placeholder="Etsi laulun sanat" />

      <Space className="mt-4" />

      <Select
        onValueChange={(value) => setSelectedLanguage(value)}
        defaultValue="finnish"
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Kieli" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="finnish">Suomi</SelectItem>
          <SelectItem value="swedish">Ruotsi</SelectItem>
          <SelectItem value="english">Englanti</SelectItem>
          <SelectItem value="other">Muu</SelectItem>
        </SelectContent>
      </Select>

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
