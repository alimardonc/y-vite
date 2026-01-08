import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Preview from "./preview";
import { useRef, useState } from "react";
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
import { ImageIcon, VideoIcon, X } from "lucide-react";

interface IFiles {
  image: File | null;
  video: File | null;
}

const FilePreview = ({
  type,
  file,
  action,
}: {
  type: "image" | "video";
  file: File | null;
  action: () => void;
}) => {
  if (!file) return <></>;
  if (type === "image")
    return (
      <div className="flex items-center justify-between border p-2 gap-2">
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="size-9 rounded-md"
        />
        <p className="truncate w-full">{file.name}</p>
        <Button onClick={action} size="icon" variant="destructive">
          <X className="size-4" />
        </Button>
      </div>
    );
  if (type === "video") console.log(file);
  return (
    <div className="flex items-center justify-between border p-2 gap-2">
      <video src={URL.createObjectURL(file)} controls className="size-9" />
      <p className="truncate w-full">{file.name}</p>
      <Button onClick={action} size="icon" variant="destructive">
        <X className="size-4" />
      </Button>
    </div>
  );
};

const CreateCourse = () => {
  const fileImageRef = useRef<HTMLInputElement>(null);
  const fileVideoRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<IFiles>({
    image: null,
    video: null,
  });
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

  const handleFileSelect = (
    files: FileList | null,
    type: "image" | "video",
  ) => {
    if (!files?.[0]) return;

    const file = files[0];

    setUploadedFiles((prev) => ({
      ...prev,
      [type]: file,
    }));

    if (type === "image") {
      methods.setValue("cover_image", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    if (type === "video") {
      methods.setValue("intro_video", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleBoxClick = (type: "image" | "video") => {
    if (type === "image") {
      fileImageRef.current?.click();
    } else if (type === "video") {
      fileVideoRef.current?.click();
    }
  };

  const removeFile = (type: "image" | "video") => {
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: null,
    }));

    if (type === "image") {
      methods.setValue("cover_image", undefined as any, {
        shouldValidate: true,
      });
    }

    if (type === "video") {
      methods.setValue("intro_video", undefined, {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (formValue: CourseFormValues) => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("cover_image", formValue.cover_image);
      if (formValue.intro_video) {
        formData.append("intro_video", formValue.intro_video);
      }
      formData.append("name", formValue.name);
      formData.append("desc", formValue.desc);
      formData.append("language", formValue.language);
      formData.append("type", formValue.type);
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const { data: course } = await axiosClient.post("/courses/", formData);
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
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="p-5 flex flex-col gap-4"
      >
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

        {/*           File upload         */}

        <div className="grid grid-cols-2 max-md:grid-cols-1 justify-between gap-2">
          {!uploadedFiles.image ? (
            <Field>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleBoxClick("image")}
                className="w-full"
              >
                Upload cover image <ImageIcon className="text-primary" />
                <input
                  type="file"
                  id="fileUpload"
                  ref={fileImageRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files, "image")}
                />
              </Button>
              {errors.cover_image && (
                <FieldError errors={[errors.cover_image]} />
              )}
            </Field>
          ) : (
            <FilePreview
              type="image"
              file={uploadedFiles.image}
              action={() => removeFile("image")}
            />
          )}
          {!uploadedFiles.video ? (
            <Button
              variant="outline"
              type="button"
              onClick={() => handleBoxClick("video")}
              className="w-full"
            >
              Upload intro video <VideoIcon className="text-primary" />
              <input
                type="file"
                id="fileUpload"
                ref={fileVideoRef}
                className="hidden"
                accept="video/*"
                onChange={(e) => handleFileSelect(e.target.files, "video")}
              />
            </Button>
          ) : (
            <FilePreview
              type="video"
              file={uploadedFiles.video}
              action={() => removeFile("video")}
            />
          )}
        </div>

        <Controller
          name="desc"
          disabled={isCreating}
          control={methods.control}
          render={({ field }) => (
            <Textarea {...field} placeholder="Description" className="h-20" />
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

      {isPreview && (
        <Preview
          onClosePreview={() => setIsPreview(false)}
          course={{
            name: methods.watch("name"),
            desc: methods.watch("desc"),
            language: methods.watch("language"),
          }}
        />
      )}
    </FormProvider>
  );
};

export default CreateCourse;
