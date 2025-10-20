import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod/v3";
import {
  createWorkspace,
  deleteWorkspace,
  findTaskCountsByWorkspaceId,
  findWorkspaceById,
  findWorkspaces,
  resetInviteCode,
  updateWorkspace,
} from "../actions";
import { WorkspaceFormSchema } from "../validations";

export function useCreateWorkspace() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createWorkspace,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push(`/workspaces/${data.body.id}`);
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

export function useUpdateWorkspace(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof WorkspaceFormSchema>) =>
      updateWorkspace(values, id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", { id }] });
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

export function useFindWorkspaceById(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["workspace", { id }],
    queryFn: () => findWorkspaceById(id),
    retry: false,
  });
  return query;
}

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteWorkspace(id),
    onSuccess: (data, id) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", { id }] });
      router.push(`/`);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useResetInviteCode() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => resetInviteCode(id),
    onSuccess: (data, id) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", { id }] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useFindTaskCountsByWorkspaceId(id?: string, userId?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["workspace", "count", { id, userId }],
    queryFn: () => findTaskCountsByWorkspaceId(id),
    retry: false,
  });
  return query;
}
