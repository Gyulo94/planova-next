import JoinWorkspaceForm from "@/components/workspace/form/join-workspace-form";
import { findWorkspaceById } from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: {
    workspaceId: string;
    inviteCode: string;
  };
}

export default async function WorkspaceInvitePage({ params }: Props) {
  const { workspaceId } = params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["workspace", { id: workspaceId }],
    queryFn: () => findWorkspaceById(workspaceId),
  });
  const state = dehydrate(queryClient);
  return (
    <HydrationBoundary state={state}>
      <JoinWorkspaceForm workspaceId={workspaceId} />
    </HydrationBoundary>
  );
}
