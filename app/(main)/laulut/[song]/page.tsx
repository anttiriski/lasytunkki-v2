import BackButton from "@/components/BackButton";
import ShareInTelegramButton from "@/components/ShareInTelegramButton";
import Space from "@/components/ui/space";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";

import { ExternalLink } from "lucide-react";

const SongPage = async ({ params }) => {
  const song = await fetchSongData(params.song);

  return (
    <div className="mt-4">
      <BackButton />

      <Space className="mt-4" />

      <ShareInTelegramButton lyrics={song.lyrics} title={song.title} />

      <Space className="mt-4" />

      <h1 className="font-semibold text-3xl">{song.title}</h1>

      <div className="flex items-center space-x-2">
        {song?.melody_link && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href={song.melody_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 mt-1" />
                </a>
              </TooltipTrigger>

              <TooltipContent>
                <p className="text-sm">Katso melodia</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {song?.melody && (
          <p className="text-sm text-muted-foreground italic mt-1">
            Mel. {song.melody}
          </p>
        )}
      </div>

      <p className="mt-4 whitespace-pre-line">{song.lyrics}</p>
    </div>
  );
};

export const generateStaticParams = async () => {
  const adminSupabase = getAdminSupabase();

  const { data } = await adminSupabase.from("songs_v2").select("slug");

  if (data === null) {
    return [];
  }

  return data.map((post) => ({
    song: post.slug,
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

export default SongPage;
