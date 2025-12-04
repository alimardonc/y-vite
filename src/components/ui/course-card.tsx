import { BookOpen, Clock } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import DescWithIcon from "./desc-with-icon";
import Desc from "./desc";
import type { ICourse } from "@/types";

const CourseCard = ({ course }: { course: ICourse }) => {
  return (
    <Card className="gap-3.5 hover:border-muted-foreground hover:scale-105 transition-all duration-200 cursor-pointer">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{course.title}</CardTitle>
          <img src={course.image} alt={course.title} className="size-12" />
        </div>
        <CardDescription className="flex gap-2.5">
          <DescWithIcon desc={"course"} icon={BookOpen} />
          <span>{course.lessonCount} lessons</span>
        </CardDescription>
        {/*<div className="flex items-center gap-1.5">
        <Rating defaultValue={e.rating} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} size={15} />
          ))}
        </Rating>
        <Desc desc={`(${e.rating})`} />
      </div>*/}
      </CardHeader>
      <CardFooter className="justify-between">
        <DescWithIcon
          desc={course.timeToFinish + " hours"}
          icon={Clock}
          iconSize={16}
          className="text-xs"
        />
        <Desc
          desc={
            "Last updated: " +
            new Date().toLocaleString("default", { month: "short" }) +
            " " +
            new Date().getFullYear()
          }
          className="text-xs"
        />
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
