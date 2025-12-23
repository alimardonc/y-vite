import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./App";
import { Navigate } from "react-router";
import Courses from "./pages/courses/courses";
import Course from "./pages/course/course";
import Lesson from "./pages/lesson/lesson";
import Login from "./pages/login";
import AuthLayout from "./components/providers/auth-layout";
import Profile from "./pages/profile/profile";
import LoginLayout from "./components/providers/login-layout";
import CreateCourse from "./pages/course/create-coure/create-course";

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
