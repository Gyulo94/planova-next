"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useParameters } from "@/lib/hooks/util";
import {
  CheckCircleIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "홈",
    href: "",
    icon: HomeIcon,
  },
  {
    label: "내 작업",
    href: "tasks",
    icon: CheckCircleIcon,
  },
  {
    label: "세팅",
    href: "settings",
    icon: SettingsIcon,
  },
  {
    label: "멤버",
    href: "members",
    icon: UsersIcon,
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const { workspaceId } = useParameters();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {routes.map((nav) => {
          const href = `/workspaces/${workspaceId}/${nav.href}`;
          return (
            <SidebarMenuItem
              key={nav.label}
              className={`${
                pathname === href
                  ? "bg-sidebar-accent"
                  : "text-muted-foreground"
              } rounded-md`}
            >
              <SidebarMenuButton asChild className="px-2 py-1.5">
                <Link href={href}>
                  <nav.icon className="mr-2 size-4" />
                  {nav.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
