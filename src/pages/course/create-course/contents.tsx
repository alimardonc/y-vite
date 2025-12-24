import MDEditor from "@/components/blocks/course-contents/markdown";
import QuizTest from "@/components/blocks/course-contents/quiz-test";
import type { QuizType } from "@/types";

type MarkdownProps = {
  type: "markdown";
  field: {
    value: string;
    onChange: (value: string) => void;
  };
};

type QuizProps = {
  type: "quiz-test";
  field: {
    value: QuizType[];
    setQuizs: React.Dispatch<React.SetStateAction<QuizType[]>>;
  };
};

type IProps = MarkdownProps | QuizProps;

const Contents = ({ field, type }: IProps) => {
  switch (type) {
    case "markdown":
      return <MDEditor field={field} />;
    case "quiz-test":
      return <QuizTest quizs={field.value} setQuizs={field.setQuizs} />;
    default:
      return null;
  }
};

export default Contents;
