import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { Ref, reactive, ref } from "vue";
import { useLocationStore } from "../../stores/location";
import { Location } from "../../types/location";
import { fetchAddress } from "./apis";

export const useAddress = (location: Ref<Location | null>) => {
  return useQuery({
    queryKey: reactive(["address", location]),
    queryFn: () => fetchAddress(location.value === null ? { lat: 0, lng: 0 } : location.value),
    retry: 0,
  });
};

export const useDirection = () => {
  const { currentLocation, map } = storeToRefs(useLocationStore());
  const endAddress = ref<Location | null>(null);
  const directionsRenderer = ref<any>(null);

  const showDirection = async (destination: Location) => {
    // @ts-expect-error DirectionsService
    const directionsService = new google.maps.DirectionsService();
    if (directionsRenderer.value === null) {
      // @ts-expect-error DirectionsRenderer
      directionsRenderer.value = new google.maps.DirectionsRenderer({
        markerOptions: {
          visible: false,
        },
        polylineOptions: {
          strokeColor: "#000000",
        },
      });
    }
    directionsRenderer.value.setMap(map.value);

    try {
      const route = await directionsService.route({
        origin: currentLocation.value,
        destination,
        // @ts-expect-error TravelMode
        travelMode: google.maps.TravelMode.WALKING,
      });
      endAddress.value = route.routes[0]["legs"][0]["end_address"].split(",").slice(0, 2).join(",");
      await directionsRenderer.value.setDirections(route);
    } catch (e) {
      console.log(e);
    }
  };

  const hideDirection = () => {
    if (directionsRenderer.value) {
      directionsRenderer.value.setMap(null);
    }
  };

  return { endAddress, showDirection, hideDirection };
};
