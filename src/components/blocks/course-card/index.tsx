import { Badge } from "@/components/ui/badge";
import { S3_URL } from "@/lib/axios";
import type { ICourse } from "@/types";
import { Calendar } from "lucide-react";

const CourseCard = ({
  course,
  isOwnCourse = false,
}: {
  course: ICourse;
  isOwnCourse?: boolean;
}) => {
  console.log(course);
  return (
    <div className="flex flex-col gap-2 justify-between bg-card rounded-md border cursor-pointer hover:bg-card-foreground/10 duration-200 hover:ring-1 hover:ring-primary">
      <div className="w-full h-60 relative">
        <img
          src={S3_URL + course.cover_image}
          className="w-full h-full object-cover aspect-square"
        />
        {!isOwnCourse && (
          <img
            src={course.owner.avatar ?? "/logo.svg"}
            className="absolute bottom-0 right-0 object-cover rounded-full"
          />
        )}
      </div>
      <div className="p-4">
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
      </div>
    </div>
  );
};

export default CourseCard;
