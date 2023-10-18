import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchAddress } from "../services/location/apis";
import { Location } from "../types/location";

export const useLocationStore = defineStore("location", () => {
  const currentLocation = ref<Location | null>(null);
  const currentAddress = ref<string>("");

  const updateLocation = (location: Location) => {
    currentLocation.value = location;
  };

  const updateAddress = async () => {
    if (currentLocation.value) {
      currentAddress.value = await fetchAddress(currentLocation.value);
    } else {
      currentAddress.value = "Location Unknown";
    }
  };

  const clearLocation = () => {
    currentLocation.value = null;
  };

  return { currentLocation, currentAddress, updateAddress, updateLocation, clearLocation };
});
