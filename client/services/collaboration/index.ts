import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useCollaborationStore } from "../../stores/collaboration";
import { useLocationStore } from "../../stores/location";
import { useUserStore } from "../../stores/user";
import { acceptMeetingRequest, endMyMeeting, fetchMeetingRequestMarkers, fetchMyMeeting, removeMeetingRequest, sendMeetingRequest } from "./apis";

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
  });
};

export const useAcceptMeetingRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptMeetingRequest,
    onSuccess() {
      void queryClient.invalidateQueries(["requests"]);
      void queryClient.invalidateQueries(["meeting"]);
    },
  });
};

export const useMyMeeting = () => {
  const { currentUsername } = storeToRefs(useUserStore());
  const { status } = storeToRefs(useCollaborationStore());
  const { setCollaborator, clearCollaborator, changeStatus } = useCollaborationStore();

  return useQuery({
    queryKey: ["meeting"],
    queryFn: fetchMyMeeting,
    onSuccess({ host, guest }) {
      setCollaborator(host === currentUsername.value ? guest : host);
      changeStatus("meeting");
    },
    onError() {
      clearCollaborator();
      if (status.value === "meeting") {
        status.value = "idle";
      }
    },
    refetchInterval: status.value !== "idle" ? 10000 : false,
  });
};

export const useEndMyMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: endMyMeeting,
    onSuccess() {
      void queryClient.invalidateQueries(["meeting"]);
    },
  });
};
