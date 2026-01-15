import { LayoutDashboard, Settings, SquareTerminal, User } from "lucide-react";

export const sidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Courses",
      url: "/my-courses",
      icon: SquareTerminal,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};
