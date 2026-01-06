import CourseCard from "@/components/blocks/course-card";
import { Button } from "@/components/ui/button";
import Centered from "@/components/ui/centered";
import { Spinner } from "@/components/ui/spinner";
import { axiosClient } from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import type { ICourse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Link } from "react-router";

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

  console.log(data[0]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">
          {user?.first_name + " " + user?.last_name} courses
        </h1>
        <Link to="/course/create">
          <Button>
            <Plus />
            Create
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {data?.map((course) => (
          <Link to={`/course/${course?.id}`} key={course?.id}>
            <CourseCard course={course} isOwnCourse={true} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
