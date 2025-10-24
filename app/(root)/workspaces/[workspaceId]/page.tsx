import { auth } from "@/auth";
import WorkspaceDashboard from "@/components/workspace/dashboard/workspace-dashboard";
import {
  findProjectsByWorkspaceId,
  findTaskCountsByWorkspaceId,
  findTasksByWorkspaceId,
  findWorkspaceById,
  findWorkspaceMembers,
} from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Session } from "next-auth";

interface Props {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function WorkspaceIdPage({ params }: Props) {
  const { workspaceId } = await params;
  const session = await auth();
  const userId = session?.user.id;

  const workspaceMembers = await findWorkspaceMembers(workspaceId);
  const isMember = workspaceMembers.members.some((member: Session["user"]) => {
    return member.id === userId;
  });
  if (!isMember) {
    console.log("워크스페이스 멤버 아님");

    return <div className="flex flex-col gap-6 pb-3 px-3">멤버가 아님</div>;
  }

  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["workspace", "count", { id: workspaceId }],
      queryFn: () => findTaskCountsByWorkspaceId(workspaceId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["workspace-members"],
      queryFn: () => findWorkspaceMembers(workspaceId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["workspace", { id: workspaceId }],
      queryFn: () => findWorkspaceById(workspaceId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["tasks", { workspaceId }],
      queryFn: () => findTasksByWorkspaceId(workspaceId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["projects", { workspaceId }],
      queryFn: () => findProjectsByWorkspaceId(workspaceId),
    }),
  ]);

  const state = dehydrate(queryClient);

  return (
    <div className="flex flex-col gap-6 pb-3 px-3">
      <HydrationBoundary state={state}>
        <WorkspaceDashboard workspaceId={workspaceId} userId={userId} />
      </HydrationBoundary>
    </div>
  );
}
