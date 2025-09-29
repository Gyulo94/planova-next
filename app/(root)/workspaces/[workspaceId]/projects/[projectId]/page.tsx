import { auth } from "@/auth";
import TopSection from "@/components/project/details/top-section";
import TaskViewSwitcher from "@/components/task/task-view-switcher";
import { findProjectById, findWorkspaceMembers } from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: {
    projectId: string;
    workspaceId: string;
  };
}

export default async function ProjectIdPage({ params }: Props) {
  const { projectId, workspaceId } = params;

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
