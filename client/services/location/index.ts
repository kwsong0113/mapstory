import { useQuery } from "@tanstack/vue-query";
import { Ref, reactive } from "vue";
import { Location } from "../../types/location";
import { fetchAddress } from "./apis";

export const useAddress = (location: Ref<Location | null>) => {
  return useQuery({
    queryKey: reactive(["address", location]),
    queryFn: () => fetchAddress(location.value === null ? { lat: 0, lng: 0 } : location.value),
    retry: 0,
  });
};
