import Markdown from "@/components/blocks/course-contents/markdown";
import type { ICourseContentTypes } from "@/types";

interface IProps {
  type: ICourseContentTypes;
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  isPreview: boolean;
  onClosePreview: () => void;
}

const Contents = ({ type, field, isPreview, onClosePreview }: IProps) => {
  return (
    type == "markdown" && (
      <Markdown
        field={field}
        onClosePreview={onClosePreview}
        isPreview={isPreview}
      />
    )
  );

  return null;
};

export default Contents;
