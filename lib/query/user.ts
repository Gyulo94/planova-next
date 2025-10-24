import { useQuery } from "@tanstack/react-query";
import { findUserById } from "../actions";

export function useFindUserById(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["user", { id }],
    queryFn: () => findUserById(id),
    retry: false,
  });
  return query;
}
