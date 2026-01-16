import { Outlet, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import type { IChapter, ICourse } from "@/types";
import Loading from "@/components/ui/loading";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, LucidePencil, LucideTrash } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ChapterForm from "@/components/course-form/chapter-form";
import { useState } from "react";
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
import { useDeleteHook } from "@/hooks/useDeleteQuery";
import toast from "react-hot-toast";
import LessonForm from "@/components/course-form/lesson-form";

const Course = () => {
  const { cId, lId } = useParams();
  const navigate = useNavigate();

  const [isChapterCreating, setIsChapterCreating] = useState(false);
  const [deleteChapter, setDeleteChapter] = useState<IChapter | null>(null);
  const [editChapter, setEditChapter] = useState<IChapter | null>(null);

  const { data, isLoading, refetch } = useQuery<ICourse>({
    queryKey: ["COURSE", cId],
    queryFn: async () => {
      const res = await axiosClient.get("/courses/" + cId);
      return res.data;
    },
  });

  const { data: lesson } = useQuery({
    queryKey: ["LESSON", lId],
    queryFn: async () => {
      const result = await axiosClient.get(`/lessons/${lId}/`);
      return result.data;
    },
  });

  const { mutateAsync: handleDeleteChapter } = useDeleteHook({
    mutationKey: ["COURSE", cId],
    mutationFn: async (chapterId: number) => {
      const res = await axiosClient.delete(`/chapters/${chapterId}/`);
      return res.data;
    },
  });

  const onDeleteChapter = async (chapterId: number) => {
    try {
      await handleDeleteChapter(chapterId);
      refetch();
      toast.success("Deleted!");
    } catch {
      toast.error("Error!");
    }
  };

  if (isLoading || !data) return <Loading />;
  return (
    <div className="flex">
      <SidebarProvider className="w-[256px]">
        <Sidebar>
          <SidebarHeader>
            <TypographySmall className="text-[#fff9]">
              {data.name}
            </TypographySmall>
          </SidebarHeader>
          <SidebarContent>
            <Accordion
              type="single"
              defaultValue={lesson.chapter ? `item-${lesson.chapter}` : ""}
            >
              {data.chapters.map((ch) => (
                <AccordionItem
                  key={ch.id}
                  value={`item-${ch.id}`}
                  className="relative group"
                  id="controller-container"
                >
                  <AccordionTrigger>
                    {ch.name}
                    <TypographyMuted className="absolute right-0.5 font-bold">
                      {ch.lessons.length}
                    </TypographyMuted>
                  </AccordionTrigger>
                  {ch.lessons.map((l) => (
                    <AccordionContent key={l.id}>
                      <Button
                        className="w-full"
                        variant={"ghost"}
                        size={"sm"}
                        onClick={() =>
                          navigate(`/course/${data.id}/lesson/${l.id}`)
                        }
                      >
                        {l.name}
                      </Button>
                    </AccordionContent>
                  ))}
                  <AccordionContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <Plus />
                          Create lesson
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Create Lesson</DialogTitle>
                        <DialogDescription className="sr-only">
                          Create a new lesson
                        </DialogDescription>
                        <LessonForm chapter={ch} />
                      </DialogContent>
                    </Dialog>
                  </AccordionContent>
                  <div
                    className="z-20 flex flex-row p-1 rounded-md gap-2 delay-100 transition-all hover:bg-[#fff2] absolute top-1 right-10"
                    id="controller-icons"
                  >
                    <LucideTrash
                      size={"20px"}
                      className="text-destructive hover:text-destructive/50 hover:cursor-pointer"
                      onClick={() => setDeleteChapter(ch)}
                    />
                    <LucidePencil
                      size={"20px"}
                      className="text-primary hover:text-primary/50 hover:cursor-pointer"
                      onClick={() => setEditChapter(ch)}
                    />
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </SidebarContent>
          <SidebarFooter className="w-full">
            <Dialog
              open={isChapterCreating}
              onOpenChange={setIsChapterCreating}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus />
                  Create chapter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Create Chapter</DialogTitle>
                <DialogDescription
                  onClick={() => setIsChapterCreating(true)}
                  className="sr-only"
                >
                  Create a new chapter
                </DialogDescription>
                <ChapterForm
                  course={data}
                  refetch={refetch}
                  confirmText="Create"
                  onClose={() => setIsChapterCreating(false)}
                />
              </DialogContent>
            </Dialog>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
      <AlertDialog
        open={!!deleteChapter}
        onOpenChange={() => setDeleteChapter(null)}
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
              onClick={() =>
                deleteChapter ? onDeleteChapter(deleteChapter.id) : {}
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={!!editChapter} onOpenChange={() => setEditChapter(null)}>
        <DialogContent>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription
            onClick={() => setEditChapter(null)}
            className="sr-only"
          >
            Edit a old chapter
          </DialogDescription>
          <ChapterForm
            course={data}
            chapter={editChapter}
            refetch={refetch}
            confirmText="Create"
            onClose={() => setEditChapter(null)}
          />
        </DialogContent>
      </Dialog>

      <Outlet />
    </div>
  );
};

export default Course;
