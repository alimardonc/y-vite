import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { COURSE_CONTENT_TYPES, type ICourseContentTypes } from "@/types";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { useNavigate } from "react-router";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";

const CreateCourse = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const methods = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: "",
      type: "public",
      language: "",
      desc: "",
    },
  });
  const {
    formState: { errors },
  } = methods;
  const navigate = useNavigate();

  const onSubmit = async (data: CourseFormValues) => {
    setIsCreating(true);
    try {
      const { data: course } = await axiosClient.post("/courses/", data);
      toast.success("Created!");
      navigate(`/course/${course.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Error");
    }
    setIsCreating(false);
  };

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-2 h-dvh max-xl:grid-cols-1">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="p-5 flex flex-col gap-4 bg-card"
        >
          <h3 className="text-2xl font-bold text-center">Create Course</h3>
          <Field data-invalid={!!errors.name}>
            <FieldLabel>Name</FieldLabel>
            <Input
              {...methods.register("name")}
              placeholder="Course Name"
              disabled={isCreating}
            />
            {errors.name && <FieldError errors={[errors.name]} />}
          </Field>
          <Field data-invalid={!!errors.language}>
            <FieldLabel>Language</FieldLabel>
            <Input
              {...methods.register("language")}
              placeholder="Language"
              disabled={isCreating}
            />
            {errors.language && <FieldError errors={[errors.language]} />}
          </Field>

          <Field data-invalid={!!errors.type}>
            <FieldLabel>Type</FieldLabel>
            <Select
              value={methods.watch("type")}
              defaultValue={"public"}
              onValueChange={(val) => {
                methods.setValue("type", val as ICourseContentTypes);
              }}
              disabled={isCreating}
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

          <Controller
            name="desc"
            disabled={isCreating}
            control={methods.control}
            render={({ field }) => (
              <Textarea {...field} placeholder="Description" className="h-48" />
            )}
          />

          <div className="grid grid-cols-2 xl:grid-cols-1 gap-2">
            <Button
              type="button"
              onClick={() => setIsPreview(true)}
              variant="outline"
              className="hidden max-xl:flex"
            >
              Preview
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? (
                <>
                  Creating <Spinner />
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>

        <Preview
          isPreview={isPreview}
          onClosePreview={() => setIsPreview(false)}
          course={{
            name: methods.watch("name"),
            desc: methods.watch("desc"),
            language: methods.watch("language"),
          }}
        />
      </div>
    </FormProvider>
  );
};

export default CreateCourse;
