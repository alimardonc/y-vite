import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

interface IProps {
  content: string;
  className?: string;
}

const MarkdownView = ({ content, className }: IProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        "flex flex-col mm:h-[calc(100dvh-136px)] mm:overflow-y-auto mm:pr-2",
        className,
      )}
    >
      <MarkdownPreview
        source={content}
        style={{
          background: "transparent",
        }}
        wrapperElement={{
          "data-color-mode": theme == "light" ? "light" : "dark",
        }}
      />
      <div className="h-2 shrink-0 w-full" />
    </div>
  );
};

export default MarkdownView;
