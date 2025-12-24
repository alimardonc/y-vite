import MarkdownPreview from "@/components/blocks/course-contents/previews/markdown";
import QuizPreview from "@/components/blocks/course-contents/previews/quiz";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuizType } from "@/types";

type ISharedProps = {
  onClosePreview: () => void;
  isPreview: boolean;
};

interface MarkdownProps extends ISharedProps {
  value: string;
  type: "markdown";
}

interface QuizProps extends ISharedProps {
  value: QuizType[];
  type: "quiz-test";
}

type IProps = MarkdownProps | QuizProps;

const Previews = ({ type, onClosePreview, isPreview, value }: IProps) => {
  return (
    <div
      className={cn(
        "overflow-y-auto",
        isPreview
          ? "max-xl:fixed w-full top-0 left-0 bg-background z-100"
          : "max-xl:hidden",
      )}
    >
      {isPreview && (
        <div className="pt-2 pr-2 justify-end max-xl:flex hidden">
          <Button
            variant={"outline"}
            type="button"
            className="w-max"
            onClick={onClosePreview}
          >
            Close preview
          </Button>
        </div>
      )}
      {type === "markdown" && <MarkdownPreview value={value as string} />}
      {type === "quiz-test" && <QuizPreview value={value as QuizType[]} />}
    </div>
  );
};

export default Previews;
