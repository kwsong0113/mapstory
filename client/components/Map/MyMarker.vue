<script setup lang="ts">
import { storeToRefs } from "pinia";
import { CustomMarker } from "vue3-google-map";
import { useLocationStore } from "../../stores/location";

const { currentLocation } = storeToRefs(useLocationStore());
</script>
<template>
  <CustomMarker :options="{ position: currentLocation }">
    <div class="flex justify-center items-center bg-base-100 w-[22px] h-[22px] rounded-lg">
      <div class="bg-info w-4 h-4 rounded-lg"></div>
    </div>
  </CustomMarker>
</template>
