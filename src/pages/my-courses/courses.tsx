import { Button } from "@/components/ui/button";
import Centered from "@/components/ui/centered";
import { Spinner } from "@/components/ui/spinner";
import { axiosClient } from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import type { ICourse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Plus } from "lucide-react";
import { NavLink } from "react-router";

const MyCourses = () => {
  const user = useAuthStore((state) => state.user);

  const { data, isLoading } = useQuery<ICourse[]>({
    queryKey: ["user-course", user?.id],
    queryFn: async () => {
      const res = await axiosClient.get("/courses/my/");
      return res.data;
    },
  });

  if (isLoading || !data)
    return (
      <Centered>
        <Spinner />
      </Centered>
    );

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">
          {user?.first_name + " " + user?.last_name} courses
        </h1>
        <NavLink to="/course/create">
          <Button>
            <Plus />
            Create
          </Button>
        </NavLink>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {data?.map((course) => (
          <NavLink
            to={`/course/${course?.id}`}
            key={course?.id}
            className="flex flex-col gap-2 justify-between bg-card w-full h-45 p-4 rounded-md border cursor-pointer hover:bg-card-foreground/10"
          >
            <h3 className="text-2xl font-bold">{course?.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {course?.desc}
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
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
