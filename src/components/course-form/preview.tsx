import { cn } from "@/lib/utils";
import MarkdownView from "../markdown";
import { Button } from "../ui/button";
import { CONTENT_TYPES } from "./constants";

interface PreviewProps {
  type: string;
  value: string;
  isPreview: boolean;
  onClosePreview: () => void;
}

const Preview = ({ type, value, isPreview, onClosePreview }: PreviewProps) => {
  const previews = {
    [CONTENT_TYPES.MARKDOWN]: <MarkdownView content={value} />,
  };

  return (
    <div
      className={cn(
        "h-dvh overflow-hidden",
        isPreview
          ? "max-xl:fixed w-full top-0 left-0 bg-background z-100"
          : "max-xl:hidden",
      )}
    >
      <div className="flex justify-between items-center pr-2 py-4 mb-4">
        <h4 className="font-bold uppercase text-muted-foreground">
          {type} Preview
        </h4>
        <Button
          onClick={onClosePreview}
          variant="outline"
          className="xl:hidden"
        >
          Close
        </Button>
      </div>
      <div className="bg-background max-h-[calc(100%-80px)] h-max overflow-auto">
        {previews[type as keyof typeof previews] || <p>No preview available</p>}
      </div>
    </div>
  );
};

export default Preview;
