import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");
    const confirmRequest = ref(true);

    const isLoggedIn = computed(() => currentUsername.value !== "");

    const updateUsername = (username: string) => {
      currentUsername.value = username;
    };

    const turnOff = () => {
      confirmRequest.value = false;
    };

    const resetStore = () => {
      currentUsername.value = "";
    };

    return {
      currentUsername,
      isLoggedIn,
      confirmRequest,
      turnOff,
      updateUsername,
      resetStore,
    };
  },
  { persist: true },
);
