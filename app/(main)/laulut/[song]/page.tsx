import SongPage from "@/components/SongPage";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";

const SingleSongPage = async ({ params }) => {
  const song = await fetchSongData(params.song);

  return <SongPage song={song} />;
};

export const generateStaticParams = async () => {
  const adminSupabase = getAdminSupabase();

  const { data } = await adminSupabase.from("songs_v2").select("slug");

  if (data === null) {
    return [];
  }

  return data.map((song) => ({
    song: song.slug,
  }));
};

const fetchSongData = async (slug) => {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("songs_v2")
    .select("*")
    .eq("slug", slug)
    .single();

  return data;
};

export default SingleSongPage;
