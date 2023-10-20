import { onBeforeMount, onUnmounted, ref } from "vue";
import { useLocationStore } from "../stores/location";

export const useWatchLocation = () => {
  const { updateLocation, clearLocation } = useLocationStore();
  const watchId = ref<number | null>(null);

  onBeforeMount(() => {
    watchId.value = navigator.geolocation.watchPosition(
      function (position: GeolocationPosition) {
        updateLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function (error) {
        if (error.code == error.PERMISSION_DENIED) {
          // @ts-expect-error showModal
          document.getElementById("location_permission")?.showModal();
        }
      },
    );
  });

  onUnmounted(() => {
    clearLocation();
    if (watchId.value) {
      navigator.geolocation.clearWatch(watchId.value);
    }
  });
};
