import Centered from "./centered";
import { Spinner } from "./spinner";

const Loading = () => {
  return (
    <Centered>
      <Spinner className="size-12!" />
    </Centered>
  );
};

export default Loading;
