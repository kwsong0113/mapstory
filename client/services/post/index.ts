import { useMutation } from "@tanstack/vue-query";
import { createPost } from "./apis";

export const useCreatePost = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess,
  });
};
