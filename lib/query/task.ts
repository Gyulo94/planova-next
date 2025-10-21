import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod/v3";
import {
  bulkUpdateTask,
  createTask,
  deleteTask,
  findMyTasksByWorkspaceId,
  findTaskById,
  findTasksByProjectId,
  findTasksByWorkspaceId,
  updateTask,
} from "../actions";
import { TaskFilterOptions } from "../types";
import { StatusTypes, TaskFormSchema } from "../validations";

export function useCreateTask(userId?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["tasks", { projectId: data.body.project.id }],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "tasks",
          { workspaceId: data.body.project.workspaceId, userId },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", "count", { id: data.body.project.id }],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "workspace",
          "count",
          { workspaceId: data.body.project.workspaceId, userId },
        ],
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

export function useFindTasksByProjectId(
  projectId: string,
  filterOptions?: TaskFilterOptions
) {
  const query = useQuery({
    queryKey: ["tasks", { projectId, filterOptions }],
    queryFn: () => findTasksByProjectId(projectId, filterOptions),
    enabled: !!projectId,
  });
  return query;
}

export function useFindTasksByWorkspaceId(workspaceId: string) {
  const query = useQuery({
    queryKey: ["tasks", { workspaceId }],
    queryFn: () => findTasksByWorkspaceId(workspaceId),
    enabled: !!workspaceId,
  });
  return query;
}

export function useFindMyTasksByWorkspaceId(
  workspaceId: string,
  userId?: string,
  filterOptions?: TaskFilterOptions
) {
  const query = useQuery({
    queryKey: ["tasks", { workspaceId, filterOptions, userId }],
    queryFn: () => findMyTasksByWorkspaceId(workspaceId, filterOptions),
    enabled: !!workspaceId && !!userId,
  });
  return query;
}

export function useFindTaskById(id?: string) {
  const query = useQuery({
    queryKey: ["task", { id }],
    queryFn: () => findTaskById(id),
    enabled: !!id,
  });
  return query;
}

export function useUpdateTask(
  projectId?: string,
  id?: string,
  userId?: string
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof TaskFormSchema>) =>
      updateTask(id, values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["tasks", { projectId }],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "tasks",
          { workspaceId: data.body.project.workspaceId, userId },
        ],
      });
      queryClient.invalidateQueries({ queryKey: ["task", { id }] });
      queryClient.invalidateQueries({
        queryKey: ["project", "count", { id: projectId }],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "workspace",
          "count",
          { workspaceId: data.body.project.workspaceId, userId },
        ],
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

export function useBulkUpdateTask(projectId?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (
      values: {
        id: string;
        status: z.infer<typeof StatusTypes>;
        position: number;
      }[]
    ) => bulkUpdateTask(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["tasks", { projectId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", "count", { id: projectId }],
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

export function useDeleteTask(projectId?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: (data, id) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["tasks", { projectId }],
      });
      queryClient.invalidateQueries({ queryKey: ["task", { id }] });
      queryClient.invalidateQueries({
        queryKey: ["project", "count", { id: projectId }],
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
