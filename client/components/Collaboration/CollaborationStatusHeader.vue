<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onUnmounted, watch } from "vue";
import { useEndMyMeeting, useMyMeeting, useRemoveMeetingRequest } from "../../services/collaboration";
import { useDirection } from "../../services/location";
import { useCollaborationStore } from "../../stores/collaboration";
import { useLocationStore } from "../../stores/location";
import AsyncButton from "../General/AsyncButton.vue";

const { mutate: removeMeetingRequest, isLoading: isRemoveLoading } = useRemoveMeetingRequest();
const { mutate: endMyMeeting, isLoading: isEndLoading } = useEndMyMeeting();
const { status, collaborator, meetingLocation } = storeToRefs(useCollaborationStore());
const { isLocationAvailable } = storeToRefs(useLocationStore());
const { endAddress, showDirection, hideDirection } = useDirection();
const { isFetching } = useMyMeeting();

watch(
  [isLocationAvailable, meetingLocation],
  () => {
    if (isLocationAvailable.value && meetingLocation.value) {
      void showDirection(meetingLocation.value);
    }
  },
  { immediate: true, deep: true },
);

onUnmounted(() => {
  hideDirection();
});
</script>

<template>
  <header class="fixed top-0 w-screen bg-primary text-white px-5 py-3">
    <div class="flex flex-row justify-between">
      <div class="flex flex-row items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-user-group" class="h-5" />
        <h1 class="font-semibold text-lg">
          {{ status === "requested" ? "Waiting for someone..." : `@${collaborator}` }}
        </h1>
      </div>
      <AsyncButton v-if="status === 'requested'" :is-loading="isRemoveLoading" class="btn btn-sm" @click="() => removeMeetingRequest()">Cancel</AsyncButton>
      <AsyncButton v-if="status === 'meeting'" :is-loading="isEndLoading || isFetching" class="btn btn-sm" @click="() => endMyMeeting()">End</AsyncButton>
    </div>
    <div v-if="meetingLocation !== null" class="flex flex-row items-center gap-[13px] mt-1 pl-1">
      <font-awesome-icon icon="fa-solid fa-location-dot" class="h-5" />
      <p class="italic">{{ endAddress }}</p>
    </div>
  </header>
</template>
