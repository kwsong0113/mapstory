<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onUnmounted, watch } from "vue";
import { useEndMyMeeting, useMyCollaboration, useMyMeeting, useRemoveMeetingRequest } from "../../services/collaboration";
import { useDirection } from "../../services/location";
import { useCollaborationStore } from "../../stores/collaboration";
import { useLocationStore } from "../../stores/location";
import { useUserStore } from "../../stores/user";
import AsyncButton from "../General/AsyncButton.vue";

const { status, collaborator, meetingLocation } = storeToRefs(useCollaborationStore());
const { isLocationAvailable } = storeToRefs(useLocationStore());
const { currentUsername } = storeToRefs(useUserStore());
const { mutate: removeMeetingRequest, isLoading: isRemoveLoading } = useRemoveMeetingRequest();
const { mutate: endMyMeeting, isLoading: isEndLoading } = useEndMyMeeting();
const { endAddress, showDirection, hideDirection } = useDirection();
const { isFetching } = useMyMeeting();
const { data: collab } = useMyCollaboration();
const userWaiting = computed(() => collab?.value?.waitingFor.includes(currentUsername.value));
const otherWaiting = computed(() => collab?.value?.waitingFor.includes(collaborator.value ?? ""));

watch(
  [isLocationAvailable, meetingLocation],
  () => {
    if (isLocationAvailable.value && meetingLocation.value) {
      void showDirection(meetingLocation.value);
    }
  },
  { immediate: true },
);
onUnmounted(() => {
  hideDirection();
});

const emit = defineEmits(["click"]);
</script>

<template>
  <header class="fixed top-0 w-screen bg-primary text-white px-5 py-3">
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-user-group" class="h-5" />
        <h1 class="font-semibold text-lg">
          {{ status === "requested" ? "Waiting for someone..." : `@${collaborator}` }}
        </h1>
        <kbd v-if="status === 'meeting' && collaborator" class="kbd kbd-sm gap-2" :class="otherWaiting ? 'text-error' : 'text-primary'">
          <template v-if="otherWaiting">
            <font-awesome-icon icon="fa-solid fa-spinner" />
            not yet
          </template>
          <template v-else>
            <font-awesome-icon icon="fa-solid fa-check" />
            contributed
          </template>
        </kbd>
      </div>
      <AsyncButton v-if="status === 'requested'" :is-loading="isRemoveLoading" class="btn btn-sm" @click="() => removeMeetingRequest()">Cancel</AsyncButton>
      <AsyncButton v-if="status === 'meeting'" :is-loading="isEndLoading || isFetching" class="btn btn-xs btn-secondary w-[52px]" @click="() => endMyMeeting()">End</AsyncButton>
    </div>
    <div v-if="status === 'meeting'" class="flex flex-row justify-between mt-[6px] items-center">
      <div v-if="meetingLocation !== null" class="flex flex-row items-center gap-[13px] pl-1">
        <font-awesome-icon icon="fa-solid fa-location-dot" class="h-5" />
        <p class="italic">{{ endAddress }}</p>
      </div>
      <span></span>
      <AsyncButton v-if="userWaiting" class="btn btn-xs btn-neutral w-[52px]" @click="emit('click')">
        <font-awesome-icon icon="fa-solid fa-pen" />
      </AsyncButton>
      <kbd v-else class="kbd kbd-sm w-[52px]">
        <font-awesome-icon icon="fa-solid fa-check" class="text-info" />
      </kbd>
    </div>
  </header>
</template>
