import { useQuery } from "@tanstack/vue-query";
import * as d3 from "d3";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useLocationStore } from "../../stores/location";
import { HeatMap, Region } from "../../types/heatmap";
import { fetchHeatMap } from "./apis";

const REGIONS = new Set([
  "Cambridge",
  "Somerville",
  "Boston",
  "Brookline",
  "Medford",
  "Watertown",
  "Everett",
  "Arlington",
  "Belmont",
  "Chelsea",
  "Malden",
  "Revere",
  "Winchester",
  "Newton",
  "Winthrop",
  "Melrose",
]);

export const useHeatMap = () => {
  const isHeatMapMode = ref(false);
  const { showHeatMap, hideHeatMap } = useHeatMapControl();

  const { isFetching, refetch } = useQuery({
    queryKey: ["heatmap"],
    queryFn: fetchHeatMap,
    retry: 0,
    onSuccess(heatMap) {
      if (isHeatMapMode.value) {
        showHeatMap(heatMap);
      }
    },
  });

  const toggleHeatMap = () => {
    if (isHeatMapMode.value) {
      hideHeatMap();
    } else {
      void refetch();
    }
    isHeatMapMode.value = !isHeatMapMode.value;
  };

  return { isFetching, isHeatMapMode, toggleHeatMap };
};

export const loadGeoJson = (map: any) => {
  map.data.loadGeoJson("/data.geojson");
  map.data.setStyle({
    visible: false,
  });
};

export const useHeatMapControl = () => {
  const { map } = storeToRefs(useLocationStore());
  const showHeatMap = (heatMap: HeatMap[]) => {
    map.value.data.setStyle((feature: any) => {
      const name = feature.getProperty("NAME").split(" ")[0] as Region;
      if (REGIONS.has(name)) {
        return {
          fillColor: scoreToColor(heatMap.find(({ region }) => region === name)?.avgScore ?? 0),
          fillOpacity: 0.9,
          strokeOpacity: 0.7,
          title: name,
        };
      }
      return {
        visible: false,
      };
    });
  };

  const hideHeatMap = () => {
    map.value.data.setStyle({
      visible: false,
    });
  };

  return { showHeatMap, hideHeatMap };
};

function scoreToColor(score: number) {
  const color = d3.scaleLinear([-3, 0, 3], ["red", "white", "green"])(score);
  return color;
}
