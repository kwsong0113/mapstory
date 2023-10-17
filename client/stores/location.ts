import { defineStore } from "pinia";
import { ref } from "vue";
import { Location } from "../types/location";

export const useLocationStore = defineStore("location", () => {
  const currentLocation = ref<Location | null>(null);

  const updateLocation = (location: Location) => {
    currentLocation.value = location;
  };

  const clearLocation = () => {
    currentLocation.value = null;
  };

  return { currentLocation, updateLocation, clearLocation };
});
