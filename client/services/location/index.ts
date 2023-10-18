import { useQuery } from "@tanstack/vue-query";
import { Location } from "../../types/location";
import { fetchAddress } from "./apis";

export const useFetchAddress = (location: Location) => {
  return useQuery({
    queryKey: ["address", location.lat],
    queryFn: () => fetchAddress(location),
    onSuccess() {},
    onError() {},
  });
};
