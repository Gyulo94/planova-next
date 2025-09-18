import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { joinWorkspace } from "../actions";

export function useJoinWorkspace(workspaceId?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (inviteCode: string) => joinWorkspace(workspaceId, inviteCode),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({
        queryKey: ["workspace", { id: workspaceId }],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
