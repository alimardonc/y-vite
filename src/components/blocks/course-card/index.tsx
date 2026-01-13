import { Badge } from "@/components/ui/badge";
import { S3_URL } from "@/lib/axios";
import type { ICourse } from "@/types";
import { Calendar, LucidePencil, LucideTrash } from "lucide-react";
import { Link } from "react-router";

const CourseCard = ({
  course,
  onDelete,
  onEdit,
}: {
  course: ICourse;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  isOwner: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2 justify-between bg-card rounded-md border cursor-pointer hover:bg-card-foreground/10 duration-200 hover:ring-1 hover:ring-primary">
      <div className="w-full h-60 relative">
        <div className="z-20 flex flex-row p-1 rounded-md gap-2 delay-100 transition-all hover:bg-[#fff2] absolute top-1 right-1">
          <LucideTrash
            onClick={() => onDelete(course.id)}
            size={"20px"}
            color="red"
          />
          <LucidePencil
            onClick={() => onEdit(course.id)}
            size={"20px"}
            color="blue"
          />
        </div>
        <Link to={`/course/${course?.id}`}>
          <img
            src={course.cover_image ? S3_URL + course.cover_image : "/logo.svg"}
            className="w-full h-full object-cover aspect-square border-b"
          />
        </Link>
      </div>
      <Link className="p-4" to={`/course/${course?.id}`}>
        <div className="w-full flex flex-row items-center justify-between mb-4">
          <div>
            <Badge
              variant={
                course.type === "public"
                  ? "default"
                  : course.type === "private"
                    ? "outline"
                    : course.type === "archived"
                      ? "secondary"
                      : "destructive"
              }
            >
              {course.type}
            </Badge>
          </div>

          <div className="flex justify-end items-center gap-1.5">
            <Calendar className="text-muted-foreground" size={16} />
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <h3 className="text-2xl font-bold truncate">{course?.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {course?.desc}
        </p>
      </Link>
    </div>
  );
};

export default CourseCard;
