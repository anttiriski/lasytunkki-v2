import BackButton from "@/components/BackButton";
import EditSongButton from "@/components/EditSongButton";
import ShareInTelegramButton from "@/components/ShareInTelegramButton";
import Space from "@/components/ui/space";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";

const SongPage = ({ song }) => {
  return (
    <div className="mt-4">
      <BackButton />

      <Space className="mt-4" />

      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
        <ShareInTelegramButton lyrics={song.lyrics} title={song.title} />

        <EditSongButton songSlug={song.slug} />
      </div>

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

export default SongPage;
