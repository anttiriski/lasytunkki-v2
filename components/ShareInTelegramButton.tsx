"use client";

import TelegramIcon from "@/components/icons/telegram";
import { Button } from "@/components/ui/button";

interface ShareInTelegramButtonProps {
  title: string;
  lyrics: string;
}

const ShareInTelegramButton: React.FC<ShareInTelegramButtonProps> = ({
  lyrics,
  title,
}) => {
  const urlEncodedText = encodeURIComponent(`\n**${title}**\n\n${lyrics}`);

  const shareUrl = `https://t.me/share/url?url=${window.location.href}&text=${urlEncodedText}`;

  //   const shareUrl = `tg://msg_url?url=${window.location.href}&text=${urlEncodedText}`;

  return (
    <div>
      <Button variant="secondary" className="space-x-4" asChild>
        <a target="_blank" rel="noopener noreferrer" href={shareUrl}>
          <TelegramIcon />

          <p>Jaa telegramissa</p>
        </a>
      </Button>
    </div>
  );
};

export default ShareInTelegramButton;
