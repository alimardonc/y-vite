import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONTENT_TYPES, DEFAULT_VALUES_BY_TYPE } from "./constants";
import { ContentSwitcher } from "./content-switcher";
import Preview from "./preview";
import { useState } from "react";
import { courseFormSchema, type CourseFormValues } from "./schema";
import { axiosClient } from "@/lib/axios";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { COURSE_CONTENT_TYPES } from "@/types";
import { Field, FieldError, FieldLabel } from "../ui/field";

const CreateCourse = () => {
  const [isPreview, setIsPreview] = useState(false);
  const methods = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: "",
      type: CONTENT_TYPES.MARKDOWN,
      language: "",
      content:
        'Inline: $E = mc^2$\n$$\n\\int_0^1 x^2 dx = \\frac{1}{3}\n$$\n## python code\n```py\nprint("Hello world!!!")\n```',
    },
  });
  const {
    formState: { errors },
  } = methods;

  const onSubmit = async (data: CourseFormValues) => {
    try {
      await axiosClient.post("/course/create", data);
      toast.success("Created!");
    } catch (error) {
      console.error(error);
      toast.error("Error");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-2 h-dvh gap-3 max-xl:grid-cols-1">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="p-5 flex flex-col gap-4 bg-card"
        >
          <h3 className="text-2xl font-bold text-center">Create Course</h3>
          <Field data-invalid={!!errors.name}>
            <FieldLabel>Name</FieldLabel>
            <Input {...methods.register("name")} placeholder="Course Name" />
            {errors.name && <FieldError errors={[errors.name]} />}
          </Field>
          <Field data-invalid={!!errors.language}>
            <FieldLabel>Language</FieldLabel>
            <Input {...methods.register("language")} placeholder="Language" />
            {errors.language && <FieldError errors={[errors.language]} />}
          </Field>

          <Field data-invalid={!!errors.type}>
            <FieldLabel>Type</FieldLabel>
            <Select
              value={methods.watch("type")}
              onValueChange={(val) => {
                const typeKey = val as keyof typeof DEFAULT_VALUES_BY_TYPE;
                methods.setValue("type", typeKey);
                methods.setValue("content", DEFAULT_VALUES_BY_TYPE[typeKey]);
              }}
            >
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
          </Field>

          <ContentSwitcher />

          <div className="grid grid-cols-2 xl:grid-cols-1 gap-2">
            <Button
              type="button"
              onClick={() => setIsPreview(true)}
              variant="outline"
              className="hidden max-xl:flex"
            >
              Preview
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>

        <Preview
          isPreview={isPreview}
          type={methods.watch("type")}
          value={methods.watch("content")}
          onClosePreview={() => setIsPreview(false)}
        />
      </div>
    </FormProvider>
  );
};

export default CreateCourse;
