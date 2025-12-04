import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const Desc = ({
  desc,
  icon,
  className,
  iconSize = 20,
}: {
  desc: string;
  icon: LucideIcon;
  className?: string;
  iconSize?: number;
}) => {
  const Icon = icon;
  return (
    <span
      className={cn("text-muted-foreground flex items-center gap-2", className)}
    >
      <Icon size={iconSize} />
      {desc}
    </span>
  );
};

export default Desc;
