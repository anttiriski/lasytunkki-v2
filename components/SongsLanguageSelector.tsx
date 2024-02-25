import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface SongsLanguageSelectorProps {
  onLanguageChange: (languages: string[]) => void;
}

const SongsLanguageSelector: React.FC<SongsLanguageSelectorProps> = ({
  onLanguageChange,
}) => {
  const [showFinnish, setShowFinnish] = useState<Checked>(false);
  const [showSwedish, setShowSwedish] = useState<Checked>(false);
  const [showEnglish, setShowEnglish] = useState<Checked>(false);
  const [showOther, setShowOther] = useState<Checked>(false);

  useEffect(() => {
    const languages: string[] = [];

    if (showFinnish) {
      languages.push("finnish");
    }

    if (showSwedish) {
      languages.push("swedish");
    }

    if (showEnglish) {
      languages.push("english");
    }

    if (showOther) {
      languages.push("other");
    }

    onLanguageChange(languages);
  }, [showFinnish, showSwedish, showEnglish, showOther]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"}>
          <Languages className="w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Valitse kieli</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={showFinnish}
          onCheckedChange={setShowFinnish}
        >
          Suomi
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={showEnglish}
          onCheckedChange={setShowEnglish}
        >
          Englanti
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showSwedish}
          onCheckedChange={setShowSwedish}
        >
          Ruotsi
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showOther}
          onCheckedChange={setShowOther}
        >
          Muut
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SongsLanguageSelector;
