import MarkdownPreview from "@/components/blocks/course-contents/previews/markdown";
import type { ICourseContentTypes } from "@/types";

interface IProps {
  type: ICourseContentTypes;
  onClosePreview: () => void;
  isPreview: boolean;
  value: string;
}

const Previews = ({ type, onClosePreview, isPreview, value }: IProps) => {
  return (
    <>
      {type == "markdown" && (
        <MarkdownPreview
          isPreview={isPreview}
          onClosePreview={onClosePreview}
          value={value}
        />
      )}
    </>
  );
};

export default Previews;
