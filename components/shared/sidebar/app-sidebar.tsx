import { auth } from "@/auth";
import { DottedSeparator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  findMyWorkspaceMemberInfo,
  findProjectsByWorkspaceId,
  findWorkspaces,
} from "@/lib/actions";
import { LOGO } from "@/lib/constants";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Image from "next/image";
import Navigation from "./navigation";
import Projects from "./projects";
import WorkspaceSwitcher from "./workspace-switcher";

interface Props {
  workspaceId?: string;
}

export default async function AppSidebar({ workspaceId }: Props) {
  const session = await auth();
  const userId = session?.user.id;
  const queryClient = await getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["workspaces"],
    queryFn: findWorkspaces,
  });

  if (workspaceId) {
    await queryClient.prefetchQuery({
      queryKey: ["projects", { workspaceId }],
      queryFn: () => findProjectsByWorkspaceId(workspaceId),
    });
    await queryClient.prefetchQuery({
      queryKey: ["workspace-member", { userId }],
      queryFn: () => findMyWorkspaceMemberInfo(workspaceId),
    });
  }

  const state = dehydrate(queryClient);
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Image
            src={LOGO}
            alt={LOGO}
            width={26}
            height={26}
            className="object-cover object-center"
          />
          <SidebarGroupLabel>
            <h1 className="text-3xl font-bold dark:text-white">PLANOVA</h1>
          </SidebarGroupLabel>
        </div>
      </SidebarHeader>
      <DottedSeparator className="mb-4" />
      <SidebarContent>
        <HydrationBoundary state={state}>
          <WorkspaceSwitcher />
          <DottedSeparator className="my-4" />
          <Navigation />
          <DottedSeparator className="my-4" />
          <Projects />
        </HydrationBoundary>
      </SidebarContent>
    </Sidebar>
  );
}
