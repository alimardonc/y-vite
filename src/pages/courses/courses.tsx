import CourseCard from "@/components/ui/course-card";
import type { ICourse } from "@/types";
import Search from "./search";
import { NavLink } from "react-router";

export const courses: ICourse[] = [
  {
    id: 0,
    title: "Learn to Code in Python",
    lessonCount: 100,
    timeToFinish: 40,
    tech: "Python",
    description:
      "Learn to code using the latest version of Python 3, arguably the most popular professional programming language",
    image:
      "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/zjjcJKZ.png",
  },
  {
    id: 1,
    title: "Learn to Code in Go",
    lessonCount: 100,
    timeToFinish: 10,
    tech: "Go",
    description:
      "Learn to code using the latest version of Go, a statically typed, compiled language that feels like a scripting language",
    image:
      "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/3elNhQu.png",
  },
  {
    id: 2,
    title: "Learn to Code in Javascript",
    lessonCount: 100,
    timeToFinish: 30,
    tech: "Javascript",
    description:
      "Learn to code using the latest version of Javascript, the language of the web",
    image:
      "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/A8mpuSH.png",
  },
  {
    id: 3,
    title: "Learn to Code in Javascript",
    lessonCount: 100,
    timeToFinish: 30,
    tech: "Javascript",
    description:
      "Learn to code using the latest version of Javascript, the language of the web",
    image:
      "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/A8mpuSH.png",
  },
];

const Courses = () => {
  return (
    <main className="pb-5">
      <div className="flex flex-col gap-2 items-center justify-center my-15">
        <h2 className="text-4xl font-bold sm:text-5xl max-[350px]:text-3xl">
          Course Catalog
        </h2>
        <h4 className="sm:text-xl text-sm text-muted-foreground">
          Every course and project that we offer
        </h4>
      </div>
      <Search />
      <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
        {courses.map((course) => (
          <NavLink to={`/courses/${course.id}`} key={course.id}>
            <CourseCard course={course} key={course.id} />
          </NavLink>
        ))}
      </div>
    </main>
  );
};

export default Courses;
