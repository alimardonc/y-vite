import { cn } from "@/lib/utils";

const Desc = ({ desc, className }: { desc: string; className?: string }) => {
  return <span className={cn("text-muted-foreground", className)}>{desc}</span>;
};

export default Desc;
