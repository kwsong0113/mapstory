import { useQuery } from "@tanstack/vue-query";
import { fetchHeatMap } from "./apis";

export const useHeatMap = () => {
  return useQuery({
    queryKey: ["heatmap"],
    queryFn: fetchHeatMap,
    retry: 0,
  });
};
