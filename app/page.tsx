import Header from "@/components/Header";
import SongList from "@/components/SongList";
import Space from "@/components/ui/space";
import { createServerClient } from "@/lib/supabase/server";

export const revalidate = 10;

const Home = async () => {
  const allSongs = await getAllSongs();

  // These rows keep supabase from being paused
  const supabase = createServerClient();
  supabase.from("songs_v2").select("*");

  return (
    <main className="max-w-screen-sm mx-auto p-4">
      <Header />

      <h1 className="text-4xl sm:text-5xl font-black text-center mt-8 text-green-800 dark:text-neutral-300">
        Laulutunkki v.2
      </h1>

      <Space className="mt-8" />

      <SongList songs={allSongs} />
    </main>
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

export default Home;
