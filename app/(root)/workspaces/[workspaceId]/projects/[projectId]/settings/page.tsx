import DeleteSection from "@/components/project/settings/delete-section";
import EditSection from "@/components/project/settings/edit-section";
import { findProjectById } from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: Promise<{
    projectId: string;
    workspaceId: string;
  }>;
}

export default async function ProjectSettingPage({ params }: Props) {
  const { projectId, workspaceId } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["project", { id: projectId }],
    queryFn: () => findProjectById(projectId),
  });
  const state = dehydrate(queryClient);
  return (
    <div className="max-w-5xl mx-auto py-10 flex flex-col gap-4 px-4">
      <HydrationBoundary state={state}>
        <EditSection projectId={projectId} workspaceId={workspaceId} />
        <DeleteSection projectId={projectId} workspaceId={workspaceId} />
      </HydrationBoundary>
    </div>
  );
}
