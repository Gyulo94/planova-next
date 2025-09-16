import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createWorkspace, findWorkspaces } from "../actions";

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createWorkspace,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useFindWorkspace() {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: findWorkspaces,
    retry: false,
  });
  return query;
}
