import MarkdownView from "@/components/markdown";
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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";
import { cn } from "@/lib/utils";
import MDEditor from "@/components/ui/md-editor";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  type: z.string().min(1, "Type required"),
  language: z.string().min(1, "Language required"),
  description: z.string().min(1, "Description required"),
});

const CreateCourse = () => {
  const [isPending, setIsPending] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      language: "",
      description:
        '# Title\njavascript\n\n```js\nfunction hello(){\n     console.log("Hello");\n}\nhello();\n// Hello\n```\n> blockquote\n\n![The San Juan Mountains are beautiful](https://cdn.pixabay.com/photo/2023/12/16/19/33/christmas-8453173_1280.jpg "San Juan Mountains")',
    },
  });

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
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
              <Input type="text" placeholder="name..." {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                      {[0, 1, 2, 3].map((index) => (
                        <SelectItem key={index} value={`content-${index}`}>
                          Content {index + 1}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FieldContent>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="form-rhf-demo-description">
                Content
              </FieldLabel>
              <MDEditor field={field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-2 xl:grid-cols-1 w-full gap-3">
          <Button
            variant={"outline"}
            type="button"
            className="w-full max-xl:flex hidden"
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

      <MarkdownView
        content={form.watch("description")}
        className={cn(
          "h-dvh! py-2",
          isPreview
            ? "max-xl:fixed w-full top-0 left-0 bg-background z-100"
            : "max-xl:hidden",
        )}
        closeBtn={
          <Button
            variant={"outline"}
            type="button"
            className="w-max max-xl:flex hidden"
            onClick={() => setIsPreview(false)}
          >
            Close preview
          </Button>
        }
      />
    </div>
  );
};
export default CreateCourse;
