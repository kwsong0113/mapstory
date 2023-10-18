import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useUserStore } from "../../stores/user";
import { createUser, fetchSession, loginUser, logoutUser } from "./apis";

export const useCreateUser = () => {
  const { mutate: loginUser } = useLoginUser();
  return useMutation({
    mutationFn: createUser,
    onSuccess(_, req) {
      loginUser(req);
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
  return useMutation(logoutUser, {
    onSuccess() {
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
