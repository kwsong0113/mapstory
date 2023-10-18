import { useQuery } from "@tanstack/vue-query";
import { Ref } from "vue";
import { Location } from "../../types/location";
import { fetchAddress } from "./apis";

export const useFetchAddress = (location: Ref<Location | null>) => {
  return useQuery({
    queryKey: ["address", location],
    queryFn: () => fetchAddress(location.value ?? { lat: 0, lng: 0 }),
  });
};
