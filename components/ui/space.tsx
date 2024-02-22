import { cn } from "@/lib/utils";

interface SpaceProps {
  className?: string;
}

const Space: React.FC<SpaceProps> = ({ className }) => {
  return <div className={cn(className)} />;
};

export default Space;
