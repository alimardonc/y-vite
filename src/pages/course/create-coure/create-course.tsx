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
import Contents from "./contents";
import { COURSE_CONTENT_TYPES, type IQuizTypes } from "@/types";
import Previews from "./previews";
import QuizTest from "@/components/blocks/course-contents/quiz-test";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  type: z.enum(COURSE_CONTENT_TYPES),
  language: z.string().min(1, "Language required"),
  description: z.string().min(1, "Description required"),
});

const CreateCourse = () => {
  const [isPending, setIsPending] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [quizs, setQuizs] = useState<IQuizTypes[]>([
    {
      quest: "Birinchi savol",
      variants: [
        { value: "A) Variant 1" },
        { value: "B) Variant 2" },
        { value: "C) Variant 3" },
      ],
      answer: 0,
    },
    {
      quest: "Ikkinchi savol",
      variants: [
        { value: "A) Variant A" },
        { value: "B) Variant B" },
        { value: "C) Variant C" },
      ],
      answer: 1,
    },
  ]);

  console.log(quizs);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "quiz-test",
      language: "",
      description:
        '# Title\njavascript\n\n```js\nfunction hello(){\n     console.log("Hello");\n}\nhello();\n// Hello\n```\n> blockquote\n\n![The San Juan Mountains are beautiful](https://cdn.pixabay.com/photo/2023/12/16/19/33/christmas-8453173_1280.jpg "San Juan Mountains")',
    },
  });
  const contentType = form.watch("type");

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

          {contentType === "markdown" && (
            <>
              <p className="text-xl text-center font-bold">Markdown</p>
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="">
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      Content
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    {/*---------------------------------- Contents --------------------------------------*/}
                    <Contents field={field} type={contentType} />
                  </Field>
                )}
              />
            </>
          )}

          {contentType === "quiz-test" && (
            <>
              <p className="text-xl text-center font-bold">Quiz</p>
              <QuizTest quizs={quizs} setQuizs={setQuizs} />
            </>
          )}
        </div>

        <div
          className={cn(
            (contentType === "markdown" ? "grid-cols-2" : "") +
              " grid xl:grid-cols-1 w-full gap-3",
          )}
        >
          <Button
            variant={"outline"}
            type="button"
            className={cn(
              (contentType === "markdown" ? "max-xl:flex" : "") +
                " w-full hidden",
            )}
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

      {/*  Preview   */}
      <Previews
        type={contentType}
        isPreview={isPreview}
        onClosePreview={onClosePreview}
        value={form.watch("description")}
      />
    </div>
  );
};
export default CreateCourse;
