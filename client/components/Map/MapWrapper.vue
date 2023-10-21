<script setup lang="ts">
import { useWatchLocation } from "@/utils/watchLocation";
import LoadingView from "@/views/LoadingView.vue";
import { storeToRefs } from "pinia";
import { ref, watch, watchEffect } from "vue";
import { GoogleMap } from "vue3-google-map";
import { loadGeoJson } from "../../services/heatmap";
import { useLocationStore } from "../../stores/location";
import { Location } from "../../types/location";

const API_KEY = import.meta.env.VITE_GOOGLEMAP_API_KEY;
const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null);
const { currentLocation, isLocationAvailable, center } = storeToRefs(useLocationStore());
const { setMap, clearCenter } = useLocationStore();

const panTo = (location: Location) => {
  mapRef.value?.map.panTo(location);
};
const setZoom = (zoom: number) => {
  mapRef.value?.map.setZoom(zoom);
};
useWatchLocation();
watchEffect(() => {
  if (mapRef.value?.map) {
    setMap(mapRef.value.map);
    loadGeoJson(mapRef.value?.map);
  }
});

watch(isLocationAvailable, () => {
  if (center.value) {
    panTo(center.value);
    setZoom(17);
    clearCenter();
  } else if (currentLocation.value) {
    panTo(currentLocation.value);
  }
});
defineExpose({
  panTo,
  setZoom,
});
</script>

<template>
  <LoadingView v-if="currentLocation === null" class="w-screen absolute z-10"></LoadingView>
  <GoogleMap ref="mapRef" :api-key="API_KEY" :disable-default-ui="true" :keyboard-shortcuts="false" :clickable-icons="false" :zoom="15" class="h-screen w-screen">
    <slot></slot>
  </GoogleMap>
  <dialog id="location_permission" class="modal z-30">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Allow Location Access</h3>
      <p class="py-4">Location permission is necessary for MapStory to provide personalized and accurate information based on your current location.</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
