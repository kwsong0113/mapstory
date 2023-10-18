import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { Ref } from "vue";
import { Location } from "../../types/location";
import { createPost, deletePostPiece, fetchPosts } from "./apis";

export const useCreatePost = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess() {
      void queryClient.invalidateQueries(["posts"]);
      onSuccess();
    },
  });
};

export const usePostMarkers = (location: Ref<Location | null>) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetchPosts(
        location.value
          ? {
              lat: `${location.value.lat}`,
              lng: `${location.value.lng}`,
            }
          : {},
      ),
  });
};

export const useDeletePostPiece = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePostPiece,
    onSuccess() {
      void queryClient.invalidateQueries(["posts"]);
      onSuccess();
    },
  });
};
