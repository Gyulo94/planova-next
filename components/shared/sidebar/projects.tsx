"use client";

import ProjectAvatar from "@/components/project/project-avatar";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useParameters } from "@/lib/hooks/util";
import {
  useFindMyWorkspaceMemberInfo,
  useFindProjectsByWorkspaceId,
} from "@/lib/query";
import { useOpenProjectDialogStore } from "@/lib/stores";
import { Project } from "@/lib/types";
import {
  CheckCircleIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

const projects = [
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

export default function Projects() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { workspaceId } = useParameters();
  const { onOpen } = useOpenProjectDialogStore();
  const { data } = useFindProjectsByWorkspaceId(workspaceId);
  const { data: myInfo } = useFindMyWorkspaceMemberInfo(
    workspaceId,
    session?.user.id
  );
  const projects: Project[] = data || [];
  console.log(projects);

  return (
    <>
      <div className="flex flex-col gap-y-2 px-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-500">프로젝트</p>
          {myInfo?.role === "ADMIN" && (
            <RiAddCircleFill
              className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
              onClick={() => onOpen(workspaceId)}
            />
          )}
        </div>
      </div>
      <SidebarGroup>
        <SidebarMenu>
          {projects.map((project) => {
            const href = `/workspaces/${workspaceId}/projects/${project.id}`;
            return (
              <SidebarMenuItem
                key={project.id}
                className={`${
                  pathname === href
                    ? "bg-sidebar-accent"
                    : "text-muted-foreground"
                } rounded-md`}
              >
                <SidebarMenuButton asChild className="px-2 py-1.5">
                  <Link href={href}>
                    <ProjectAvatar name={project.name} size="sm" />
                    {project.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
