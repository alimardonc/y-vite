import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { LessonSchema, type LessonValues } from "./schema";
import type { IChapter, ILesson } from "@/types";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import MDEditor from "./editors/markdown";
import { useState } from "react";
import MarkdownView from "../markdown";
import { Button } from "../ui/button";
import { createPortal } from "react-dom";
import { TypographyLarge } from "../ui/typography";
import { X } from "lucide-react";

const LessonForm = ({
  lesson,
  chapter,
}: {
  lesson?: ILesson;
  chapter: IChapter;
}) => {
  const isEdit = false;
  const methods = useForm<LessonValues>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
      chapters: chapter.id,
      name: isEdit ? lesson?.name : "",
      type: "video",
      content: isEdit ? lesson?.content : "",
      minutes: isEdit ? lesson?.minutes : 0,
    },
  });

  const {
    watch,
    formState: { errors },
  } = methods;

  const [show, setShow] = useState(false);

  const onSubmit = () => {
    console.log("created");
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Field data-invalid={!!errors.name}>
          <FieldLabel>Name</FieldLabel>
          <Input
            {...methods.register("name")}
            placeholder="Lesson Name"
            // disabled={isCreating}
          />
          {errors.name && <FieldError errors={[errors.name]} />}
        </Field>

        <Field data-invalid={!!errors.minutes}>
          <FieldLabel>Minutes</FieldLabel>
          <Input
            {...methods.register("minutes", { valueAsNumber: true })}
            placeholder="Lesson Minutes"
            type="number"
          />
          {errors.minutes && <FieldError errors={[errors.minutes]} />}
        </Field>

        <Field data-invalid={!!errors.content}>
          <FieldLabel>Content</FieldLabel>

          <div className="h-[150px] overflow-y-auto">
            <Controller
              name="content"
              control={methods.control}
              render={({ field }) => <MDEditor field={field} />}
            />
          </div>

          {errors.content && <FieldError errors={[errors.content]} />}
        </Field>
        {show &&
          createPortal(
            <div
              className="fixed inset-0 z-99999 bg-black/30 flex justify-center items-start p-4 pointer-events-auto"
              onClick={() => setShow(false)}
            >
              <div
                className="w-full h-full bg-accent p-4 overflow-auto rounded shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <TypographyLarge>Markdown Preview</TypographyLarge>
                  <X
                    className="cursor-pointer"
                    onClick={() => setShow(false)}
                  />
                </div>
                <MarkdownView content={watch("content")} />
              </div>
            </div>,
            document.body,
          )}

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setShow((prev) => !prev)}
          >
            Preview
          </Button>
          <Button>Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};
export default LessonForm;
