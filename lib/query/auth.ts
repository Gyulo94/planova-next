import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  login,
  resetPassword,
  sendEmail,
  signup,
  verifyToken,
} from "../actions";

export function useLogin() {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message !== "NEXT_REDIRECT") {
          toast.error("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
      }
    },
  });
  return mutation;
}

export function useSignup() {
  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

// export function useLogout() {
//   const router = useRouter();
//   const mutation = useMutation({
//     mutationFn: logout,
//     onSuccess: (data) => {
//       router.push("/login");
//     },
//     onError: (error) => {
//       if (error instanceof Error) {
//         toast.error(error.message);
//       }
//     },
//   });
//   return mutation;
// }

export function useVerifyToken(token: string) {
  const query = useQuery({
    queryKey: ["verifyToken"],
    queryFn: async () => verifyToken(token),
    enabled: !!token,
    retry: false,
  });
  return query;
}

export function useSendMail() {
  const mutation = useMutation({
    mutationFn: async ({
      email,
      type,
    }: {
      email: string;
      type: "signup" | "reset";
    }) => sendEmail(email, type),
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

export function useResetPassword() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
