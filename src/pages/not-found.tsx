import { Button } from "@/components/ui/button";
import { BsEmojiDizzy } from "react-icons/bs";
import { NavLink } from "react-router";

const NotFound = () => {
  return (
    <div className="flex w-full h-dvh items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <BsEmojiDizzy className="text-6xl" />
        <p className="text-xl font-bold">Page not found</p>
        <NavLink to="/dashboard">
          <Button variant="link">Go back to home</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
