<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { useFetchSession } from "./services/user";

import ToastAlert from "./components/General/ToastAlert.vue";
import LoadingView from "./views/LoadingView.vue";

const showInitialLoading = ref(true);

useFetchSession({
  onSettled() {
    showInitialLoading.value = false;
  },
});
</script>

<template>
  <LoadingView v-if="showInitialLoading" />
  <RouterView v-else />
  <ToastAlert />
</template>
