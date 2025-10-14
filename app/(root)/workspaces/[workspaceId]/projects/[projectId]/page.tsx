import { auth } from "@/auth";
import TopSection from "@/components/project/details/top-section";
import TaskViewSwitcher from "@/components/task/task-view-switcher";
import {
  findProjectById,
  findTasksByProjectId,
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

export default async function ProjectIdPage({ params, searchParams }: Props) {
  const { projectId, workspaceId } = await params;

  const filterOptions = {
    status: (await searchParams).status,
    priority: (await searchParams).priority,
    search: (await searchParams).search,
    assigneeId: (await searchParams).assigneeId,
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
      queryKey: ["project", { id: projectId }],
      queryFn: () => findProjectById(projectId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["tasks", { projectId, filterOptions }],
      queryFn: () => findTasksByProjectId(projectId, filterOptions),
    }),
  ]);
  const state = dehydrate(queryClient);
  return (
    <div>
      <HydrationBoundary state={state}>
        <TopSection workspaceId={workspaceId} projectId={projectId} />
        <TaskViewSwitcher
          workspaceId={workspaceId}
          projectId={projectId}
          userId={userId}
        />
      </HydrationBoundary>
    </div>
  );
}
