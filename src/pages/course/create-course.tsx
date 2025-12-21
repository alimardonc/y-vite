import MarkdownView from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { axiosClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectTrigger } from "@radix-ui/react-select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";

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
      description: "",
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
    <div className="flex flex-col items-center justify-center p-2 md:p-5 min-h-dvh">
      <form
        key={"create"}
        className="bg-card rounded-md m-auto p-5 flex flex-col justify-center items-center max-w-80 w-full md:max-w-[50%] gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h3 className="text-xl font-bold">Create course</h3>
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
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  {[0, 1, 2, 3].map((index) => (
                    <SelectItem key={index} value={`content-${index}`}>
                      Content {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-description">
                Description
              </FieldLabel>
              <Textarea placeholder="about your content..." {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-content">
                <Button
                  variant={"outline"}
                  type="button"
                  className="mx-auto"
                  onClick={() => setIsPreview((prev) => !prev)}
                >
                  {isPreview ? <Eye /> : <EyeOff />}
                  Content
                </Button>
              </FieldLabel>
              {isPreview && <MarkdownView content={field.value} />}
            </Field>
          )}
        />

        <Button className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              Creating...
              <Spinner />{" "}
            </>
          ) : (
            <>Create</>
          )}
        </Button>
      </form>
    </div>
  );
};
export default CreateCourse;
