import CourseCard from "@/components/blocks/course-card";
import CreateCourse from "@/components/course-form/create-course";
import { Button } from "@/components/ui/button";
import Centered from "@/components/ui/centered";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { axiosClient } from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import type { ICourse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

const MyCourses = () => {
  const user = useAuthStore((state) => state.user);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  console.log(user);
  const { data, isLoading } = useQuery<ICourse[]>({
    queryKey: ["USER_COURSES", user?.email],
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {data.length > 0 ? (
          data.map((course: ICourse) => (
            <CourseCard
              course={course}
              key={course.id}
              onDelete={setDeleteId}
              onEdit={setEditId}
            />
          ))
        ) : (
          <>You haven't any course</>
        )}
      </div>
      <Dialog open={deleteId !== null}>delete </Dialog>
    </div>
  );
};

export default MyCourses;
