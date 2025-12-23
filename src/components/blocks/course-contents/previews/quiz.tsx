import type { IQuizTypes } from "@/types";

interface IProps {
  value: IQuizTypes;
}
const QuizPreview = ({ value }: IProps) => {
  return <>{value}</>;
};
export default QuizPreview;
