import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");

    const isLoggedIn = computed(() => currentUsername.value !== "");

    const updateUsername = (username: string) => {
      currentUsername.value = username;
    };

    const resetStore = () => {
      currentUsername.value = "";
    };

    return {
      currentUsername,
      isLoggedIn,
      updateUsername,
      resetStore,
    };
  },
  { persist: true },
);
