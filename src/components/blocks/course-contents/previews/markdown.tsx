import MarkdownView from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IProps {
  isPreview: boolean;
  onClosePreview: () => void;
  value: string;
}

const MarkdownPreview = ({ isPreview, onClosePreview, value }: IProps) => {
  return (
    <MarkdownView
      content={value}
      className={cn(
        "h-dvh! p-2 overflow-y-auto!",
        isPreview
          ? "max-xl:fixed w-full top-0 left-0 bg-background z-100"
          : "max-xl:hidden",
      )}
      closeBtn={
        <Button
          variant={"outline"}
          type="button"
          className="w-max max-xl:flex hidden"
          onClick={onClosePreview}
        >
          Close preview
        </Button>
      }
    />
  );
};

export default MarkdownPreview;
