import { defineStore } from "pinia";
import { ref } from "vue";
import { CollaborationStatus } from "../types/collaboration";

export const useCollaborationStore = defineStore("collaboration", () => {
  const confirmRequest = ref(true);
  const status = ref<CollaborationStatus>("idle");
  const collaborator = ref<string | null>(null);

  const turnOff = () => {
    confirmRequest.value = false;
  };
  const changeStatus = (newStatus: CollaborationStatus) => {
    status.value = newStatus;
  };

  const setCollaborator = (newCollaborator: string) => {
    collaborator.value = newCollaborator;
  };

  const clearCollaborator = () => {
    collaborator.value = null;
  };

  return {
    confirmRequest,
    status,
    collaborator,
    turnOff,
    changeStatus,
    setCollaborator,
    clearCollaborator,
  };
});
