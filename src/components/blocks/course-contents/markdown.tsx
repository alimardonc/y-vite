import MarkdownView from "@/components/markdown";
import { Button } from "@/components/ui/button";
import MDEditor from "@/components/ui/md-editor";
import { cn } from "@/lib/utils";

interface IProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  isPreview: boolean;
  onClosePreview: () => void;
}

const Markdown = ({ field, isPreview, onClosePreview }: IProps) => {
  return (
    <>
      <MDEditor field={field} />
      <MarkdownView
        content={field.value}
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
    </>
  );
};

export default Markdown;
