import type { QuizType } from "@/types";

interface IProps {
  value: QuizType[];
}
const QuizPreview = ({ value }: IProps) => {
  console.log(value);
  return <>asdasd</>;
};
export default QuizPreview;
