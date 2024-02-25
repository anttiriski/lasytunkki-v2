import { Song } from "@/components/SongList";
import Space from "@/components/ui/space";

import Link from "next/link";

interface SongListItemProps {
  song: Song;
}

const SongListItem: React.FC<SongListItemProps> = ({ song }) => {
  const lyricsPreview = song.lyrics.slice(0, 140);

  return (
    <Link
      href={`/laulut/${song.slug}`}
      className="flex flex-col p-4 hover:bg-neutral-50 dark:hover:bg-opacity-5 fade-in"
    >
      <p className="truncate font-medium">{song.title}</p>

      <Space className="mt-2" />

      <p className="text-sm text-muted-foreground">{lyricsPreview}...</p>
    </Link>
  );
};

export default SongListItem;
