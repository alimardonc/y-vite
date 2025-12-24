import MarkdownView from "@/components/markdown";
import { cn } from "@/lib/utils";

interface IProps {
  value: string;
}

const MarkdownPreview = ({ value }: IProps) => {
  return (
    <MarkdownView
      content={value}
      className={cn("h-dvh! p-2 overflow-y-auto!")}
    />
  );
};

export default MarkdownPreview;
