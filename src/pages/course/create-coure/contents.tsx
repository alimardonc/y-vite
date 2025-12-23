import Markdown from "@/components/blocks/course-contents/markdown";
import QuizTest from "@/components/blocks/course-contents/quiz-test";
import type { ICourseContentTypes } from "@/types";

interface IProps {
  type: ICourseContentTypes;
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

<<<<<<< HEAD
const Contents = ({ type, field, isPreview, onClosePreview }: IProps) => {
  return type === "markdown" ? (
    <Markdown
      field={field}
      onClosePreview={onClosePreview}
      isPreview={isPreview}
    />
  ) : type === "quiz-test" ? (
    <>Quiz</>
  ) : null;
=======
const Contents = ({ type, field }: IProps) => {
  return (
    <>
      {type == "markdown" && <Markdown field={field} />}
      {type == "quiz-test" && <QuizTest />}
    </>
  );
>>>>>>> 35aa70c84ebad7e70412b182d8882104146283fd
};

export default Contents;
