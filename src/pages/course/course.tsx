import { useParams } from "react-router";
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

const Course = () => {
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteChapter, setDeleteChapter] = useState<IChapter | null>(null);
  const [editChapter, setEditChapter] = useState<IChapter | null>(null);

  console.log(editChapter);

  const { data, isLoading, refetch } = useQuery<ICourse>({
    queryKey: ["COURSE", params.id],
    queryFn: async () => {
      const res = await axiosClient.get("/courses/" + params.id);
      return res.data;
    },
  });

  const { mutateAsync: handleDeleteChapter } = useDeleteHook({
    mutationKey: ["COURSE", params.id],
    mutationFn: async (chapterId: number) => {
      const res = await axiosClient.delete(`/chapters/${chapterId}/`);
      return res.data;
    },
  });

  const onDelete = async (chapterId: number) => {
    try {
      await handleDeleteChapter(chapterId);
      refetch();
      toast.success("Deleted!");
    } catch {
      toast.error("Error!");
    }
    console.log(chapterId);
  };

  if (isLoading || !data) return <Loading />;
  return (
    <>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <TypographySmall className="text-[#fff9]">
              {data.name}
            </TypographySmall>
          </SidebarHeader>
          <SidebarContent>
            <Accordion type="multiple">
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
                  <AccordionContent>a</AccordionContent>
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
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus />
                  Create chapter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Create Chapter</DialogTitle>
                <DialogDescription
                  onClick={() => setIsOpen(true)}
                  className="sr-only"
                >
                  Create a new chapter
                </DialogDescription>
                <ChapterForm
                  course={data}
                  refetch={refetch}
                  confirmText="Create"
                  onClose={() => setIsOpen(false)}
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
              onClick={() => (deleteChapter ? onDelete(deleteChapter.id) : {})}
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
    </>
  );
};

export default Course;
