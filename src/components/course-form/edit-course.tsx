import { usePatchHook } from "@/hooks/usePatchQuery";
import { axiosClient } from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import type { ICourse } from "@/types";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useRef, useState } from "react";

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

const EditCourse = ({
  course,
  onClose,
}: {
  course: ICourse;
  onClose: () => void;
}) => {
  const fileImageRef = useRef<HTMLInputElement>(null);
  const fileVideoRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<IFiles>({
    image: null,
    video: null,
  });
  const [isPreview, setIsPreview] = useState(false);
  const user = useAuthStore((state) => state.user);

  const { mutateAsync: createCourse } = usePatchHook({
    mutationKey: ["USER_COURSES", user?.email],
    mutationFn: async (data: FormData) =>
      await axiosClient.patch("/courses/", data),
  });

  console.log(course);
  return <>EditCourse</>;
};
export default EditCourse;
