import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod/v3";
import {
  deleteUser,
  findUserById,
  updateUser,
  updateUserPassword,
} from "../actions";
import { ChangePasswordFormSchema, UserFormSchema } from "../validations";

export function useFindUserById(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["user", { id }],
    queryFn: () => findUserById(id),
    retry: false,
  });
  return query;
}

export function useUpdateUser(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof UserFormSchema>) =>
      updateUser(values, id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspace-members"] });
      queryClient.invalidateQueries({
        queryKey: ["workspace-member", { userId: id }],
      });
      queryClient.invalidateQueries({ queryKey: ["user", { id }] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useUpdateUserPassword(id?: string) {
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof ChangePasswordFormSchema>) =>
      updateUserPassword(values, id),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id?: string) => deleteUser(id),
    onSuccess: (data, id) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspace-members"] });
      queryClient.invalidateQueries({
        queryKey: ["workspace-member", { userId: id }],
      });
      queryClient.invalidateQueries({ queryKey: ["user", { id }] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
