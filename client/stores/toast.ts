import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { ref } from "vue";

type Toast = {
  message: string;
  style: "success" | "error";
};

type IToast = Toast & {
  id: string;
};

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<IToast[]>([]);

  const showToast = (t: Toast, timeoutMs = 1500) => {
    const id = uuid();
    toasts.value.push({
      ...t,
      id,
    });
    setTimeout(() => hideToast(id), timeoutMs);
  };

  const hideToast = (toastId: string) => {
    toasts.value = toasts.value.filter(({ id }) => id !== toastId);
  };

  return {
    toasts,
    showToast,
    hideToast,
  };
});
