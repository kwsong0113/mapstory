<script setup lang="ts">
import { storeToRefs } from "pinia";
import { CustomMarker } from "vue3-google-map";
import { useCollaborationStore } from "../../stores/collaboration";

const { meetingLocation, collaborator } = storeToRefs(useCollaborationStore());
</script>
<template>
  <CustomMarker v-if="meetingLocation && collaborator" :options="{ position: meetingLocation, anchorPoint: 'BOTTOM_CENTER' }">
    <font-awesome-icon icon="fa-solid fa-location-dot" class="h-10 text-neutral" />
  </CustomMarker>
</template>
