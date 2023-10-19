<script setup lang="ts">
import { storeToRefs } from "pinia";
import { CustomMarker } from "vue3-google-map";
import { useCollaborationStore } from "../../stores/collaboration";

const { meetingLocation, collaborator } = storeToRefs(useCollaborationStore());
</script>
<template>
  <CustomMarker v-if="meetingLocation && collaborator" :options="{ position: meetingLocation, zIndex: 1000 }">
    <font-awesome-icon icon="fa-solid fa-location-dot" class="h-10 text-white" />
  </CustomMarker>
</template>
