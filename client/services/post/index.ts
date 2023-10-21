import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { Ref } from "vue";
import { useLocationStore } from "../../stores/location";
import { useUserStore } from "../../stores/user";
import { Location } from "../../types/location";
import { createPost, deletePostPiece, fetchPosts, updatePostPiece } from "./apis";

export const useCreatePost = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess() {
      void queryClient.invalidateQueries(["posts"]);
      void queryClient.invalidateQueries(["myPosts"]);
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
    refetchInterval: 10000,
  });
};

export const useMyPostMarkers = () => {
  const { currentUsername } = storeToRefs(useUserStore());
  const { currentLocation } = storeToRefs(useLocationStore());

  return useQuery({
    queryKey: ["myPosts"],
    queryFn: () =>
      fetchPosts({
        ...(currentLocation.value
          ? {
              lat: `${currentLocation.value.lat}`,
              lng: `${currentLocation.value.lng}`,
            }
          : {}),
        author: currentUsername.value,
      }),
  });
};

export const useDeletePostPiece = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePostPiece,
    onSuccess() {
      void queryClient.invalidateQueries(["posts"]);
      void queryClient.invalidateQueries(["myPosts"]);
      onSuccess();
    },
  });
};

export const useUpdatePostPiece = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePostPiece,
    onSuccess() {
      void queryClient.invalidateQueries(["posts"]);
      void queryClient.invalidateQueries(["myPosts"]);
      onSuccess();
    },
  });
};
