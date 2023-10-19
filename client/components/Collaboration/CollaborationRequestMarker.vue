<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineProps } from "vue";
import { CustomMarker } from "vue3-google-map";
import { useAcceptMeetingRequest } from "../../services/collaboration";
import { useLocationStore } from "../../stores/location";
import { useUserStore } from "../../stores/user";
import { Location } from "../../types/location";
import AsyncButton from "../General/AsyncButton.vue";

const { location, username } = defineProps<{
  location: Location;
  username: string;
}>();

const { currentLocation } = storeToRefs(useLocationStore());
const { currentUsername } = storeToRefs(useUserStore());
const { mutate: acceptMeetingRequest, isLoading } = useAcceptMeetingRequest();
</script>
<template>
  <CustomMarker v-if="username !== currentUsername" :options="{ position: location, zIndex: 500 }">
    <kbd class="kbd kbd-md gap-2">
      {{ username }}
      <AsyncButton
        :class="'w-[62px]'"
        :is-loading="isLoading"
        @click="
          if (currentLocation) {
            acceptMeetingRequest({ from: username, location: currentLocation });
          }
        "
        class="btn btn-primary btn-xs"
      >
        Accept
      </AsyncButton>
    </kbd>
  </CustomMarker>
</template>
