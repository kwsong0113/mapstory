import { useLocationStore } from "../stores/location";

export const watchLocation = () => {
  const { updateLocation } = useLocationStore();

  navigator.geolocation.watchPosition(
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
};
