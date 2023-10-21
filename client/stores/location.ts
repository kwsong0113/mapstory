import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { fetchAddress } from "../services/location/apis";
import { Location } from "../types/location";

export const useLocationStore = defineStore("location", () => {
  const currentLocation = ref<Location | null>(null);
  const isLocationAvailable = computed(() => currentLocation.value !== null);
  const currentAddress = ref<string>("");
  const map = ref<any>(null);
  const center = ref<Location | null>(null);

  const setMap = (newMap: any) => {
    map.value = newMap;
  };

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

  const setCenter = (location: Location) => {
    center.value = location;
  };

  const clearCenter = () => {
    center.value = null;
  };

  const clearLocation = () => {
    currentLocation.value = null;
  };

  return { map, currentLocation, center, isLocationAvailable, currentAddress, setMap, updateAddress, updateLocation, clearLocation, setCenter, clearCenter };
});
