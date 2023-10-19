<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEndMyMeeting, useMyMeeting, useRemoveMeetingRequest } from "../../services/collaboration";
import { useCollaborationStore } from "../../stores/collaboration";
import AsyncButton from "../General/AsyncButton.vue";

const { mutate: removeMeetingRequest, isLoading: isRemoveLoading } = useRemoveMeetingRequest();
const { mutate: endMyMeeting, isLoading: isEndLoading } = useEndMyMeeting();
const { status, collaborator } = storeToRefs(useCollaborationStore());
const { isFetching } = useMyMeeting();
</script>

<template>
  <header class="fixed top-0 w-screen bg-primary text-white px-5 py-3">
    <div class="flex flex-row justify-between">
      <div class="flex flex-row items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-user-group" class="h-5" />
        <h1 class="font-semibold text-lg">
          {{ status === "requested" ? "Waiting for someone..." : `With @${collaborator}` }}
        </h1>
      </div>
      <AsyncButton v-if="status === 'requested'" :is-loading="isRemoveLoading" class="btn btn-sm" @click="() => removeMeetingRequest()">Cancel</AsyncButton>
      <AsyncButton v-if="status === 'meeting'" :is-loading="isEndLoading || isFetching" class="btn btn-sm" @click="() => endMyMeeting()">End</AsyncButton>
    </div>
  </header>
</template>
