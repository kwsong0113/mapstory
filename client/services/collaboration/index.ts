import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useCollaborationStore } from "../../stores/collaboration";
import { useLocationStore } from "../../stores/location";
import { useUserStore } from "../../stores/user";
import { acceptMeetingRequest, contribute, endMyMeeting, fetchMeetingRequestMarkers, fetchMyCollaboration, fetchMyMeeting, removeMeetingRequest, sendMeetingRequest } from "./apis";

export const useSendMeetingRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMeetingRequest,
    onSuccess() {
      void queryClient.invalidateQueries(["requests"]);
    },
  });
};

export const useRemoveMeetingRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeMeetingRequest,
    onSuccess() {
      void queryClient.invalidateQueries(["requests"]);
    },
  });
};

export const useMeetingRequestMarkers = () => {
  const { currentUsername } = storeToRefs(useUserStore());
  const { currentLocation } = storeToRefs(useLocationStore());
  const { status } = storeToRefs(useCollaborationStore());

  return useQuery({
    queryKey: ["requests"],
    queryFn: () => fetchMeetingRequestMarkers(currentLocation.value ?? { lat: 0, lng: 0 }),
    onSuccess(data) {
      if (data.some(({ meetingRequest: { from } }) => from === currentUsername.value)) {
        if (status.value === "idle") status.value = "requested";
      } else {
        if (status.value === "requested") status.value = "idle";
      }
    },
    refetchInterval: status.value === "idle" ? 10000 : false,
  });
};

export const useAcceptMeetingRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptMeetingRequest,
    onSuccess() {
      void queryClient.invalidateQueries(["requests"]);
      void queryClient.invalidateQueries(["meeting"]);
      void queryClient.invalidateQueries(["collab"]);
    },
  });
};

export const useMyMeeting = () => {
  const { currentUsername } = storeToRefs(useUserStore());
  const { status } = storeToRefs(useCollaborationStore());
  const { setCollaborator, clearCollaboration, changeStatus, setMeetingLocation } = useCollaborationStore();

  return useQuery({
    queryKey: ["meeting"],
    queryFn: fetchMyMeeting,
    onSuccess({ host, guest, at }) {
      setCollaborator(host === currentUsername.value ? guest : host);
      setMeetingLocation(at);
      changeStatus("meeting");
    },
    onError() {
      clearCollaboration();
      if (status.value === "meeting") {
        status.value = "idle";
      }
    },
    refetchInterval: status.value !== "idle" ? 10000 : false,
    retry: 0,
  });
};

export const useEndMyMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: endMyMeeting,
    onSuccess() {
      void queryClient.invalidateQueries(["meeting"]);
      void queryClient.invalidateQueries(["collab"]);
    },
  });
};

export const useMyCollaboration = () => {
  const { status } = storeToRefs(useCollaborationStore());
  const { clearCollaboration } = useCollaborationStore();

  return useQuery({
    queryKey: ["collab"],
    queryFn: fetchMyCollaboration,
    onError() {
      clearCollaboration();
      if (status.value === "meeting") {
        status.value = "idle";
      }
    },
    refetchInterval: status.value === "meeting" ? 10000 : false,
    retry: 0,
  });
};

export const useContribute = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contribute,
    onSuccess() {
      onSuccess();
      void queryClient.invalidateQueries(["posts"]);
      void queryClient.invalidateQueries(["myPosts"]);
      void queryClient.invalidateQueries(["meeting"]);
      void queryClient.invalidateQueries(["collab"]);
    },
  });
};
