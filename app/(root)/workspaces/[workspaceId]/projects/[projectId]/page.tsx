import TopSection from "@/components/project/details/top-section";
import { findProjectById } from "@/lib/actions";
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
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["project", { id: projectId }],
    queryFn: () => findProjectById(projectId),
  });
  const state = dehydrate(queryClient);
  return (
    <div>
      <HydrationBoundary state={state}>
        <TopSection workspaceId={workspaceId} projectId={projectId} />
      </HydrationBoundary>
    </div>
  );
}
