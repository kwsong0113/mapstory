<script setup lang="ts">
import { watchLocation } from "@/utils/watchLocation";
import LoadingView from "@/views/LoadingView.vue";
import { VMap } from "@geoql/v-mapkit.js";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import { useLocationStore } from "../../stores/location";

const jwt = import.meta.env.VITE_MAPKIT_JWT;
console.log(import.meta);

const loadingObject = ref({
  init: true,
  load: true,
});

const { currentLocation } = storeToRefs(useLocationStore());

const isLoading = computed(() => loadingObject.value.init || loadingObject.value.load || currentLocation === null);

const mapInitialized = (e: any) => {
  if (e) {
    loadingObject.value.init = false;
  }
};
const mapLoaded = (e: any) => {
  if (e) {
    loadingObject.value.load = false;
  }
};

onBeforeMount(() => {
  watchLocation();
});
</script>

<template>
  <LoadingView v-if="isLoading" class="w-screen absolute z-10 bg-mapground"></LoadingView>
  <VMap
    class="w-full h-full"
    :access-token="jwt"
    :map-options="{
      showsUserLocation: true,
      tracksUserLocation: true,
      showsZoomControl: true,
      showsUserLocationControl: true,
      showsScale: true,
      showsCompass: false,
      cameraDistance: 2500,
    }"
    :geocoder-options="{
      getsUserLocation: true,
    }"
    @map-initialized="mapInitialized"
    @map-loaded="mapLoaded"
  >
    <slot></slot>
  </VMap>
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
