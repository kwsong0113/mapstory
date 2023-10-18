<script setup lang="ts">
import { storeToRefs } from "pinia";
import { CustomMarker } from "vue3-google-map";
import { useLocationStore } from "../../stores/location";

const { currentLocation } = storeToRefs(useLocationStore());
</script>
<template>
  <CustomMarker :options="{ position: currentLocation, zIndex: 1000 }">
    <div class="flex justify-center items-center bg-base-100 w-6 h-6 rounded-xl shadow-[0px_4px_6px_#999999]">
      <div class="bg-info w-4 h-4 rounded-xl"></div>
    </div>
  </CustomMarker>
</template>
