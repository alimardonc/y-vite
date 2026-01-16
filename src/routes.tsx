import { createBrowserRouter, Navigate } from "react-router";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./App";
import Course from "./pages/course/course";
import Lesson from "./pages/lesson/lesson";
import Login from "./pages/login";
import AuthLayout from "./components/providers/auth";
import Profile from "./pages/profile/profile";
import LoginLayout from "./components/providers/login";
import MyCourses from "./pages/my-courses/courses";
import EditCard from "./pages/profile/edit-card";
import Register from "./pages/register";

export const router = createBrowserRouter([
  {
    Component: LoginLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: "/initialize",
        element: <EditCard />,
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
            path: "/my-courses",
            Component: MyCourses,
          },
        ],
      },
      {
        path: "/course/:cId",
        Component: Course,
        children: [
          {
            path: "lesson/:lId",
            Component: Lesson,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to={"/dashboard"} />,
      },
    ],
  },
]);
