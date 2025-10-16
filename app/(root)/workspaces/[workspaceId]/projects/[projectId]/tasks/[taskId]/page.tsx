import TaskDetail from "@/components/task/detail/task-detail";
import { findTaskById, findWorkspaceMembers } from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: Promise<{
    taskId: string;
    workspaceId: string;
  }>;
}

export default async function TasksPage({ params }: Props) {
  const { taskId, workspaceId } = await params;

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["task", { id: taskId }],
      queryFn: () => findTaskById(taskId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["workspace-members"],
      queryFn: () => findWorkspaceMembers(workspaceId),
    }),
  ]);

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <TaskDetail taskId={taskId} workspaceId={workspaceId} />
    </HydrationBoundary>
  );
}
