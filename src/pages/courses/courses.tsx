// import CourseCard from "@/components/ui/course-card";
// import type { ICourse } from "@/types";
import Search from "./search";
// import { NavLink } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import { axiosClient } from "@/lib/axios";

const Courses = () => {
  // const { data } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const res = await axiosClient.get("/courses/my/");
  //     return res.data;
  //   },
  // });

  // console.log(data);

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
        {/*{courses.map((course) => (
          <NavLink to={`/courses/${course.id}`} key={course.id}>
            <CourseCard course={course} key={course.id} />
          </NavLink>
        ))}*/}
      </div>
    </main>
  );
};

export default Courses;
