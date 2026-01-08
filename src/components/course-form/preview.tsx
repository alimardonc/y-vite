import { Button } from "../ui/button";
import { useAuthStore } from "@/store/auth";

interface PreviewProps {
  onClosePreview: () => void;
  course: {
    name: string;
    desc: string;
    language: string;
  };
}

const Preview = ({ onClosePreview, course }: PreviewProps) => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <div className="flex justify-end items-center pr-2 py-4 xl:hidden">
        <Button onClick={onClosePreview} variant="outline">
          Close
        </Button>
      </div>
      <div className="bg-background max-h-[calc(100%-80px)] h-max overflow-auto">
        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="text-2xl font-bold max-w-80 text-center">
            {course.name}
          </h2>
          <p className="max-w-[80%] text-center">{course.desc}</p>
        </div>
        {/*<div className="bg-card flex justify-center gap-2 p-2">
          <AvatarWrapper user={user} className="size-20" />
          <div className="flex flex-col justify-around">
            <h2 className="text-xl font-bold">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>*/}
      </div>
    </>
  );
};

export default Preview;
