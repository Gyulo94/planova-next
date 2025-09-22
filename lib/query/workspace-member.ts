import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  findMyWorkspaceMemberInfo,
  findWorkspaceMembers,
  joinWorkspace,
  removeWorkspaceMember,
  updateWorkspaceMember,
} from "../actions";

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

export function useFindWorkspaceMembers(workspaceId?: string) {
  const query = useQuery({
    enabled: !!workspaceId,
    queryKey: ["workspace-members"],
    queryFn: () => findWorkspaceMembers(workspaceId),
    retry: false,
  });
  return query;
}

export function useFindMyWorkspaceMemberInfo(
  workspaceId?: string,
  userId?: string
) {
  const query = useQuery({
    enabled: !!workspaceId && !!userId,
    queryKey: ["workspace-member", { userId }],
    queryFn: () => findMyWorkspaceMemberInfo(workspaceId),
    retry: false,
  });
  return query;
}

export function useRemoveWorkspaceMember(workspaceId?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (memberId: string) =>
      removeWorkspaceMember(workspaceId, memberId),
    onSuccess: (data, memberId) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspace-members"] });
      queryClient.invalidateQueries({
        queryKey: ["workspace-member", { memberId }],
      });
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

export function useUpdateWorkspaceMember(workspaceId?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (memberId: string) =>
      updateWorkspaceMember(workspaceId, memberId),
    onSuccess: (data, memberId) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspace-members"] });
      queryClient.invalidateQueries({
        queryKey: ["workspace-member", { memberId }],
      });
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
