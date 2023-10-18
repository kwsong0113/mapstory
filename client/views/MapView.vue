<script setup lang="ts">
import { ref } from "vue";
import FloatingButtonGroup from "../components/Map/FloatingButtonGroup.vue";
import MapWrapper from "../components/Map/MapWrapper.vue";
import MyMarker from "../components/Map/MyMarker.vue";
import CreatePostBottomSheet from "../components/Post/CreatePostBottomSheet.vue";

const bottomSheetRef = ref<InstanceType<typeof CreatePostBottomSheet> | null>(null);
</script>

<template>
  <main class="w-screen h-screen">
    <MapWrapper>
      <MyMarker />
    </MapWrapper>
    <FloatingButtonGroup @bottom-click="() => bottomSheetRef?.open()" />
  </main>
  <CreatePostBottomSheet ref="bottomSheetRef" />
</template>
