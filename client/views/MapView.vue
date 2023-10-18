<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import FloatingButtonGroup from "../components/Map/FloatingButtonGroup.vue";
import MapWrapper from "../components/Map/MapWrapper.vue";
import MyMarker from "../components/Map/MyMarker.vue";
import CreatePostBottomSheet from "../components/Post/CreatePostBottomSheet.vue";
import { useLocationStore } from "../stores/location";

const bottomSheetRef = ref<InstanceType<typeof CreatePostBottomSheet> | null>(null);
const mapRef = ref<InstanceType<typeof MapWrapper> | null>(null);
const { currentLocation } = storeToRefs(useLocationStore());
</script>

<template>
  <main class="w-screen h-screen">
    <MapWrapper ref="mapRef">
      <MyMarker />
    </MapWrapper>
    <FloatingButtonGroup
      @top-click="
        () => {
          if (currentLocation) {
            mapRef?.panTo(currentLocation);
          }
        }
      "
      @bottom-click="() => bottomSheetRef?.open()"
    />
  </main>
  <CreatePostBottomSheet ref="bottomSheetRef" />
</template>
