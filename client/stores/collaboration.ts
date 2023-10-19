import { defineStore } from "pinia";
import { ref } from "vue";
import { CollaborationStatus } from "../types/collaboration";
import { Location } from "../types/location";

export const useCollaborationStore = defineStore("collaboration", () => {
  const status = ref<CollaborationStatus>("idle");
  const collaborator = ref<string | null>(null);
  const meetingLocation = ref<Location | null>(null);

  const changeStatus = (newStatus: CollaborationStatus) => {
    status.value = newStatus;
  };

  const setCollaborator = (newCollaborator: string) => {
    collaborator.value = newCollaborator;
  };

  const setMeetingLocation = (location: Location) => {
    meetingLocation.value = location;
  };

  const clearCollaboration = () => {
    collaborator.value = null;
    meetingLocation.value = null;
  };

  return {
    status,
    collaborator,
    meetingLocation,
    changeStatus,
    setCollaborator,
    setMeetingLocation,
    clearCollaboration,
  };
});
