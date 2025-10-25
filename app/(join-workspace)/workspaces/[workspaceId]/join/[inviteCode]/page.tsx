import JoinWorkspaceForm from "@/components/workspace/form/join-workspace-form";
import { findWorkspaceById } from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { Workspace } from "@/lib/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { workspaceId: string };
}): Promise<Metadata> {
  const { workspaceId } = params;
  const workspace: Workspace = await findWorkspaceById(workspaceId);
  return {
    title: `${workspace.name}`,
    description: workspace.owner.name + "님의 워크스페이스에 초대합니다.",
    openGraph: {
      title: workspace.name,
      description: workspace.owner.name + "님의 워크스페이스에 초대합니다.",
      url: `https://planova.vercel.app/workspaces/${workspaceId}`,
      images: [
        {
          url: workspace.image!,
          width: 1200,
          height: 630,
          alt: workspace.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: workspace.name,
      description: workspace.owner.name + "님의 워크스페이스에 초대합니다.",
      images: `https://planova.vercel.app/workspaces/${workspaceId}`,
    },
  };
}

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
