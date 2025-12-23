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

const Contents = ({ type, field }: IProps) => {
  return (
    <>
      {type == "markdown" && <Markdown field={field} />}
      {type == "quiz-test" && <QuizTest />}
    </>
  );
};

export default Contents;
