import { NavLink, useParams } from "react-router";
import { courses } from "../courses/courses";
import { Button } from "@/components/ui/button";

const Course = () => {
  const params = useParams();
  const course = courses[parseInt(params.id + "")];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-20 max-w-md text-center">
        <img src={course.image} alt={course.title} className="mx-auto mb-4" />
        <h1 className="text-4xl font-bold">{course.title}</h1>
        <p className="text-muted-foreground my-4">{course.description}</p>
      </div>
      <NavLink to={"/lesson/" + course.id}>
        <Button>Start the course</Button>
      </NavLink>
    </div>
  );
};

export default Course;
