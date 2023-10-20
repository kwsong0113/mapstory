import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useUserStore } from "../../stores/user";
import { createUser, deleteUser, fetchSession, loginUser, logoutUser, updateUser } from "./apis";

export const useCreateUser = () => {
  const { mutate: loginUser } = useLoginUser();
  return useMutation({
    mutationFn: createUser,
    onSuccess(_, req) {
      loginUser(req);
    },
  });
};

export const useUpdateUsername = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => updateUser({ username }),
    onSuccess() {
      void queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (password: string) => updateUser({ password }),
    onSuccess() {
      void queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation(loginUser, {
    onSuccess() {
      void queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};

export const useLogoutUser = () => {
  const { resetStore } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation(logoutUser, {
    onSuccess() {
      void queryClient.invalidateQueries();
      resetStore();
    },
  });
};

export const useDeleteUser = () => {
  const { resetStore } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess() {
      void queryClient.invalidateQueries();
      resetStore();
    },
  });
};

export const useSession = ({ onSettled }: { onSettled?: () => void }) => {
  const { updateUsername, resetStore } = useUserStore();

  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    onSuccess(username) {
      updateUsername(username);
    },
    onError() {
      resetStore();
    },
    onSettled,
    retry: 0,
  });
};
