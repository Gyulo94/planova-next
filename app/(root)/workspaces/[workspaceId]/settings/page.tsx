import DeleteSection from "@/components/workspace/setting/delete-section";
import EditSection from "@/components/workspace/setting/edit-section";
import InviteCodeSection from "@/components/workspace/setting/invite-code-section";
import { findWorkspaceById } from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: {
    workspaceId: string;
  };
}

export default async function WorkspaceSettingPage({ params }: Props) {
  const { workspaceId } = params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["workspace", { id: workspaceId }],
    queryFn: () => findWorkspaceById(workspaceId),
  });
  const state = dehydrate(queryClient);
  return (
    <div className="max-w-5xl mx-auto py-10 flex flex-col gap-4 px-4">
      <HydrationBoundary state={state}>
        <EditSection workspaceId={workspaceId} />
        <InviteCodeSection workspaceId={workspaceId} />
        <DeleteSection workspaceId={workspaceId} />
      </HydrationBoundary>
    </div>
  );
}
