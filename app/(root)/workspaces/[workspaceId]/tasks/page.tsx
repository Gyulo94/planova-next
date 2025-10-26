import { auth } from "@/auth";
import WorkspaceSwitcher from "@/components/task/table/switcher/workspace-switcher";
import WorkspaceAnalyticSection from "@/components/workspace/workspace-analytic-section";
import {
  findMyTaskCountsByWorkspaceId,
  findWorkspaceById,
  findWorkspaceMembers,
} from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: Promise<{
    projectId: string;
    workspaceId: string;
  }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function TaskPage({ params, searchParams }: Props) {
  const { workspaceId } = await params;

  const filterOptions = {
    status: (await searchParams).status,
    priority: (await searchParams).priority,
    search: (await searchParams).search,
    projectId: (await searchParams).projectId,
    startDate: (await searchParams).startDate,
  };

  const session = await auth();
  const userId = session?.user.id;
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["workspace-members"],
      queryFn: () => findWorkspaceMembers(workspaceId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["workspace", { id: workspaceId }],
      queryFn: () => findWorkspaceById(workspaceId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["tasks", { workspaceId, filterOptions }],
    }),
    queryClient.prefetchQuery({
      queryKey: ["workspace", "count", { id: workspaceId, userId }],
      queryFn: () => findMyTaskCountsByWorkspaceId(workspaceId),
    }),
  ]);
  const state = dehydrate(queryClient);

  return (
    <div>
      <HydrationBoundary state={state}>
        <WorkspaceAnalyticSection workspaceId={workspaceId} />
        <WorkspaceSwitcher workspaceId={workspaceId} userId={userId} />
      </HydrationBoundary>
    </div>
  );
}
