import { HeatMap } from "../../types/heatmap";
import { fetchy } from "../../utils/fetchy";

export const fetchHeatMap = async () => {
  return (await fetchy("/api/heatmap", "GET", {
    alert: false,
  })) as HeatMap[];
};
