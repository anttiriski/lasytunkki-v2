import EditSongPage from "@/components/EditSongPage";
import { Song } from "@/components/SongList";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const EditSong = async ({ params }) => {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/kirjaudu");
  }

  const song = await fetchSongData({ slug: params.song });

  return <EditSongPage song={song} />;
};

const fetchSongData = async ({ slug }) => {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("songs_v2")
    .select("*")
    .eq("slug", slug)
    .single();

  return data as Song;
};

export default EditSong;
