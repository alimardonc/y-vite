import { Command } from "lucide-react";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth";

export function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton size="lg">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <Command className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">Learning Platform</span>
          <span className="truncate text-xs">{user?.role}</span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
