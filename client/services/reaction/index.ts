import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { ReactionChoice } from "../../types/reaction";
import { deleteReaction, fetchReactions, sendReaction } from "./apis";

export const availableReactionChoices: ReactionChoice[] = ["heart", "like", "check", "question", "sad", "angry"];

export const useReactions = (id: string) => {
  return useQuery({
    queryKey: ["reactions", id],
    queryFn: () => fetchReactions(id),
  });
};

export const useDeleteReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReaction,
    onSuccess(_, { id }) {
      void queryClient.invalidateQueries(["reactions", id]);
      void queryClient.invalidateQueries(["posts"]);
    },
  });
};

export const useSendReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendReaction,
    onSuccess(_, { id }) {
      void queryClient.invalidateQueries(["reactions", id]);
      void queryClient.invalidateQueries(["posts"]);
    },
  });
};
