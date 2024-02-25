import Header from "@/components/Header";
import TunkkiSongList from "@/components/TunkkiSongList";
import Space from "@/components/ui/space";
import { createServerClient } from "@/lib/supabase/server";

const SongbookCreationPage = async () => {
  const songs = await getAllSongs();

  return (
    <div>
      <Header />

      <h1 className="text-4xl sm:text-5xl font-black text-center mt-8 text-green-800 dark:text-neutral-300">
        Läsytunkki v.2
      </h1>

      <Space className="mt-8" />

      <TunkkiSongList songs={songs} />
    </div>
  );
};

const getAllSongs = async () => {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("songs_v2")
    .select("*")
    .order("title");

  if (error) {
    throw error;
  }

  return data;
};

export default SongbookCreationPage;
