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
          <>
            <div
              key={i}
              className="flex flex-col gap-1 justify-between bg-card rounded-md border cursor-pointer hover:bg-card-foreground/10"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNv0dZhJ1Xy2mQ7u08m5GM46Qyou8H267ACw&s"
                alt="Course Image"
                className="w-full rounded-t-md"
              />
              <div className="p-4">
                <h3 className="text-2xl font-bold">Course title {i + 1}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, voluptatum. Quisquam, voluptatum. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                  Quisquam, voluptatum.
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
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
