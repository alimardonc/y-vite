import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { Calendar, Plus } from "lucide-react";

const MyCourses = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">
          {user?.first_name + " " + user?.last_name} courses
        </h1>
        <Button>
          <Plus />
          Create
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 justify-between bg-card w-full h-45 p-4 rounded-md border cursor-pointer hover:bg-card-foreground/10"
          >
            <h3 className="text-2xl font-bold">Course title</h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatum. Quisquam, voluptatum. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, voluptatum. Quisquam,
              voluptatum.
            </p>
            <div className="flex justify-end items-center gap-1.5">
              <Calendar className="text-muted-foreground" size={16} />
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
