import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod/v3";
import {
  createProject,
  deleteProject,
  findProjectById,
  findProjectsByWorkspaceId,
  findTaskCountsByProjectId,
  updateProject,
} from "../actions";
import { ProjectFormSchema } from "../validations";

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

export function useUpdateProject(id?: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof ProjectFormSchema>) =>
      updateProject(values, id),
    onSuccess: (data) => {
      toast.success(data.message);
      router.push(
        `/workspaces/${data.body.workspaceId}/projects/${data.body.id}`
      );
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", { id }] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: (data, id) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", { id }] });
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

export function useFindProjectById(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["project", { id }],
    queryFn: () => findProjectById(id),
    retry: false,
  });
  return query;
}

export function useFindTaskCountsByProjectId(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["project", "count", { id }],
    queryFn: () => findTaskCountsByProjectId(id),
    retry: false,
  });
  return query;
}
