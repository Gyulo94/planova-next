import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProject, findProjectsByWorkspaceId } from "../actions";

export function useCreateProject() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push(
        `/workspaces/${data.body.workspaceId}/projects/${data.body.id}`
      );
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useFindProjectsByWorkspaceId(workspaceId?: string) {
  const query = useQuery({
    enabled: !!workspaceId,
    queryKey: ["projects", { workspaceId }],
    queryFn: () => findProjectsByWorkspaceId(workspaceId),
    retry: false,
  });
  return query;
}
