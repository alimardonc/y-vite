import { useState } from "react";
import Contents from "../course/create-course/contents";
import type { QuizType } from "@/types";

const CreateQuiz = () => {
  const [quizs, setQuizs] = useState<QuizType[]>([
    {
      quest: "1-quiz",
      variants: [{ value: "" }, { value: "" }, { value: "" }],
      answer: 0,
    },
    { quest: "2-quiz", variants: [{ value: "" }], answer: 0 },
    { quest: "", variants: [{ value: "" }], answer: 0 },
  ]);
  return (
    <>
      <Contents type="quiz-test" field={{ value: quizs, setQuizs: setQuizs }} />
    </>
  );
};
export default CreateQuiz;
