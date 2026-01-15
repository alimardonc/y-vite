import CourseCard from "@/components/blocks/course-card";
import CourseForm from "@/components/course-form/course-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loading from "@/components/ui/loading";
import { useDeleteHook } from "@/hooks/useDeleteQuery";
import { axiosClient } from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import type { ICourse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const MyCourses = () => {
  const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);

  const [editCourse, setEditCourse] = useState<ICourse | null>(null);
  const [deleteCourse, setDeleteCourse] = useState<ICourse | null>(null);

  const { data, isLoading } = useQuery<ICourse[]>({
    queryKey: ["USER_COURSES", user?.email],
    queryFn: async () => {
      const res = await axiosClient.get("/courses/my/");
      return res.data;
    },
  });

  const { mutateAsync: handleDeleteCourse } = useDeleteHook({
    mutationKey: ["USER_COURSES", user?.email],
    mutationFn: async (id: number) => {
      const res = await axiosClient.delete(`/courses/${id}/`);
      return res.data;
    },
  });

  const onDelete = async (id: number) => {
    try {
      await handleDeleteCourse(id);
      toast.success("Course deleted with success!");
    } catch {
      toast.error("Course didn't delete!");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Your courses</h1>
        <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
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
            <CourseForm onClose={() => setOpen(false)} confirmText="Create" />
          </DialogContent>
        </Dialog>
      </div>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {data.map((course) => (
            <CourseCard
              course={course}
              key={course.id}
              onDelete={setDeleteCourse}
              onEdit={setEditCourse}
              isOwner={
                course.my_roles
                  ? course.my_roles[0] === "owner"
                    ? true
                    : false
                  : false
              }
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-[60dvh] flex items-center justify-center">
          You haven't any course
        </div>
      )}

      <AlertDialog
        open={!!deleteCourse}
        onOpenChange={() => setDeleteCourse(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to delete the course?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              course.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => (deleteCourse ? onDelete(deleteCourse.id) : {})}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!editCourse} onOpenChange={() => setEditCourse(null)}>
        <DialogContent className="overflow-y-auto max-h-dvh">
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription className="sr-only">
            Edit a old course
          </DialogDescription>
          <CourseForm
            onClose={() => setEditCourse(null)}
            course={editCourse}
            confirmText="Edit"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCourses;
