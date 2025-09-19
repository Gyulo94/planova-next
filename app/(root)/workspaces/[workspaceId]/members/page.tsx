import { auth } from "@/auth";
import MembersList from "@/components/member/members-list";
import {
  findNyWorkspaceMemberInfo,
  findWorkspaceById,
  findWorkspaceMembers,
} from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: {
    workspaceId: string;
  };
}

export default async function MembersPage({ params }: Props) {
  const { workspaceId } = params;
  const session = await auth();
  const userId = session?.user.id;
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["workspace-members"],
      queryFn: () => findWorkspaceMembers(workspaceId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["workspace-member", { userId }],
      queryFn: () => findNyWorkspaceMemberInfo(workspaceId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["workspace", { id: workspaceId }],
      queryFn: () => findWorkspaceById(workspaceId),
    }),
  ]);
  const state = dehydrate(queryClient);
  return (
    <div className="max-w-5xl mx-auto py-10 flex flex-col gap-4 px-4">
      <HydrationBoundary state={state}>
        <MembersList workspaceId={workspaceId} />
      </HydrationBoundary>
    </div>
  );
}
