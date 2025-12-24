import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { axiosClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";
import { COURSE_CONTENT_TYPES, QuizSchema, type QuizType } from "@/types";
import { cn } from "@/lib/utils";
import Previews from "./preview";
import Contents from "./contents";

const formSchema = z.discriminatedUnion("type", [
  z.object({
    name: z.string().min(3).max(50),
    type: z.literal("markdown"),
    language: z.string().min(1),
    content: z.string().min(1, "Content required").nullable(),
  }),
  z.object({
    name: z.string().min(3).max(50),
    type: z.literal("quiz-test"),
    language: z.string().min(1),
    content: z.array(QuizSchema).nullable(),
  }),
]);

const CreateCourse = () => {
  const [isPending, setIsPending] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "markdown",
      language: "",
      content: null,
    },
  });

  const contentType = form.watch("type");

  console.log(form.watch("type"));

  const onClosePreview = useCallback(() => {
    setIsPreview(false);
  }, []);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axiosClient.post("/course/create", formData);
      console.log(data);
      toast.success("Login successful!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="grid grid-cols-2 h-dvh gap-3 max-xl:grid-cols-1">
      <form
        key={"create"}
        className="bg-card p-5 flex flex-col justify-between items-center w-full gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h3 className="text-2xl font-bold">Create course</h3>
        <div className="flex flex-col w-full gap-3">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
                <Input type="text" placeholder="name..." {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="language"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <FieldLabel className="w-full" htmlFor="form-rhf-demo-language">
                  Language
                </FieldLabel>
                <Input type="text" placeholder="html,css,js..." {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-type">Type</FieldLabel>
                <FieldContent>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {COURSE_CONTENT_TYPES.map((content) => (
                          <SelectItem key={content} value={content}>
                            {content}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldContent>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="form-rhf-demo-description"
                  className="font-bold text-2xl"
                >
                  Content
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                {/*---------------------------------- Contents --------------------------------------*/}
                <Contents
                  {...(contentType === "markdown"
                    ? {
                        field: {
                          value: (field.value as string) ?? "",
                          onChange: field.onChange,
                        },
                        type: "markdown" as const,
                      }
                    : {
                        field: {
                          value: (field.value as QuizType[]) ?? [],
                          onChange: field.onChange,
                        },
                        type: "quiz-test" as const,
                      })}
                />
              </Field>
            )}
          />
        </div>

        <div className={cn("grid-cols-2 grid xl:grid-cols-1 w-full gap-3")}>
          <Button
            variant={"outline"}
            type="button"
            className={cn("max-xl:flex w-full hidden")}
            onClick={() => setIsPreview(true)}
          >
            {isPreview ? <Eye /> : <EyeOff />}
            Preview
          </Button>
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? (
              <>
                Creating...
                <Spinner />{" "}
              </>
            ) : (
              <>Create</>
            )}
          </Button>
        </div>
      </form>

      {/* Preview */}
      <Previews
        {...(contentType === "markdown"
          ? {
              isPreview,
              onClosePreview,
              type: "markdown" as const,
              value: form.watch("content") as string,
            }
          : {
              isPreview,
              onClosePreview,
              type: "quiz-test" as const,
              value: form.watch("content") as QuizType[],
            })}
      />
    </div>
  );
};
export default CreateCourse;
