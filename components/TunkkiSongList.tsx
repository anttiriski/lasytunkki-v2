"use client";

import TunkkiSelectedSongs from "@/components/TunkkiSelectedSongs";
import { Input } from "@/components/ui/input";
import Space from "@/components/ui/space";
import { cn } from "@/lib/utils";
import Fuse from "fuse.js";
import { useRef, useState } from "react";

const TunkkiSongList = ({ songs: initialSongs }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedSongs, setSelectedSongs] = useState<any[]>([]);

  const handleSelectSong = (song) => {
    if (selectedSongs.includes(song)) {
      setSelectedSongs(selectedSongs.filter((s) => s !== song));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }

    if (inputRef.current) {
      setSongs(initialSongs);
      inputRef.current.value = "";
    }
  };

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

  return (
    <div>
      <TunkkiSelectedSongs
        selectedSongs={selectedSongs}
        setSelectedSongs={setSelectedSongs}
      />

      <Space className="mt-8" />

      <Input
        ref={inputRef}
        onChange={handleSearch}
        placeholder="Etsi laulun sanat"
      />

      <Space className="mt-4" />

      <div className="space-y-1">
        {songs.map((song) => (
          <div
            tabIndex={0}
            onClick={() => handleSelectSong(song)}
            className={cn(
              selectedSongs.includes(song) && "bg-accent",
              "flex flex-col px-2 py-2 hover:bg-neutral-50 dark:hover:bg-opacity-5 fade-in cursor-pointer"
            )}
            key={song.id}
          >
            <p className="text-sm">{song.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TunkkiSongList;
