import type { IChapter, ICourse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ChapterSchema, type ChapterValues } from "./schema";
import { usePostHook } from "@/hooks/usePostQuery";
import { usePatchHook } from "@/hooks/usePatchQuery";
import { axiosClient } from "@/lib/axios";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import toast from "react-hot-toast";

const ChapterForm = ({
  chapter,
  course,
  confirmText,
  onClose,
}: {
  chapter?: IChapter | null;
  course: ICourse;
  confirmText: string;
  onClose: () => void;
  refetch: () => void;
}) => {
  const isEdit = !!chapter;
  const methods = useForm<ChapterValues>({
    resolver: zodResolver(ChapterSchema),
    defaultValues: {
      name: isEdit ? chapter?.name : "",
    },
  });

  const {
    formState: { errors },
  } = methods;

  const { mutateAsync: createChapter, isPending: isCreating } = usePostHook({
    mutationKey: ["COURSE", course.id.toString()],
    mutationFn: async (data: ChapterValues) => {
      await axiosClient.post(`/courses/${course.id}/chapters/`, {
        ...data,
        course: course.id,
      });
    },
  });

  const { mutateAsync: editChapter, isPending: isEditing } = usePatchHook({
    mutationKey: ["COURSE", course.id.toString()],
    mutationFn: async ({
      data,
      chapterId,
    }: {
      data: ChapterValues;
      courseId: number;
      chapterId: number;
    }) =>
      await axiosClient.patch(`/chapters/${chapterId}/`, {
        ...data,
        course: course.id,
      }),
  });

  const onSubmit = async (formValue: ChapterValues) => {
    try {
      if (isEdit && chapter?.id) {
        await editChapter({
          data: formValue,
          chapterId: chapter.id,
          courseId: course.id,
        });
        toast.success("Edited!");
      } else {
        await createChapter(formValue);
        toast.success("Created!");
      }
      onClose();
    } catch {
      toast.error("Error!");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="p-5 flex flex-col gap-4"
      >
        <Field data-invalid={!!errors.name}>
          <FieldLabel>Name</FieldLabel>
          <Input
            {...methods.register("name")}
            placeholder="Chapter Name"
            disabled={isCreating}
          />
          {errors.name && <FieldError errors={[errors.name]} />}
        </Field>
        <Button type="submit" disabled={isCreating}>
          {isCreating || isEditing ? (
            <>
              {isCreating ? "Creating" : "Editing"} <Spinner />
            </>
          ) : (
            confirmText
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
export default ChapterForm;
