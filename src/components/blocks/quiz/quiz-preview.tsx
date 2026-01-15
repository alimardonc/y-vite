import type { QuizType } from "@/components/course-form/schema";

interface IProps {
  value: QuizType[];
}
const QuizPreview = ({ value }: IProps) => {
  console.log(value);
  return <>asdasd</>;
};
export default QuizPreview;
