import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./App";
import { Navigate } from "react-router";
import Courses from "./pages/courses/courses";
import Course from "./pages/course/course";
import Lesson from "./pages/lesson/lesson";
import Login from "./pages/login";
import AuthLayout from "./components/providers/auth";
import Profile from "./pages/profile/profile";
import LoginLayout from "./components/providers/login";
import CreateCourse from "./components/course-form/course-form";
import MyCourses from "./pages/my-courses/courses";

export const router = createBrowserRouter([
  {
    Component: LoginLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: "/initialize",
        element: <Profile />,
      },
      {
        Component: AppLayout,
        children: [
          {
            path: "/dashboard",
            Component: Dashboard,
          },
          {
            path: "/profile",
            Component: Profile,
          },
          {
            path: "/courses",
            Component: Courses,
          },
          {
            path: "/lesson/:id",
            Component: Lesson,
          },
          {
            path: "/my-courses",
            Component: MyCourses,
          },
        ],
      },
      {
        path: "/courses/:id",
        Component: Course,
      },
      {
        path: "/course/create",
        Component: CreateCourse,
      },
      {
        path: "*",
        element: <Navigate to={"/dashboard"} />,
      },
    ],
  },
]);
