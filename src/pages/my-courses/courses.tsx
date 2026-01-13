import CourseCard from "@/components/blocks/course-card";
import CreateCourse from "@/components/course-form/create-course";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loading from "@/components/ui/loading";
import { axiosClient } from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import type { ICourse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

const MyCourses = () => {
  const user = useAuthStore((state) => state.user);

  const [editId, setEditId] = useState<number | null>(null);

  const { data, isFetching } = useQuery<ICourse[]>({
    queryKey: ["USER_COURSES", user?.email],
    queryFn: async () => {
      const res = await axiosClient.get("/courses/my/");
      return res.data;
    },
  });

  const onDelete = (courseId: number) => {};

  if (isFetching) return <Loading />;

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Your courses</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              Create
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-y-auto max-h-dvh">
            <DialogTitle>Create Course</DialogTitle>
            <DialogDescription className="sr-only">
              Create a new course
            </DialogDescription>
            <CreateCourse />
          </DialogContent>
        </Dialog>
      </div>
      {data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {data.map((course) => (
            <CourseCard
              course={course}
              key={course.id}
              onDelete={onDelete}
              onEdit={setEditId}
              isOwner={course?.my_roles[0] === "owner"}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-[60dvh] flex items-center justify-center">
          You haven't any course
        </div>
      )}
    </div>
  );
};

export default MyCourses;
