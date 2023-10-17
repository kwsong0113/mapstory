<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { RouterView } from "vue-router";
import { useFetchSession } from "./services/user";

import ToastGroup from "./components/General/ToastGroup.vue";
import { calcViewPort } from "./utils/calcViewPort";
import LoadingView from "./views/LoadingView.vue";

const showInitialLoading = ref(true);

useFetchSession({
  onSettled() {
    showInitialLoading.value = false;
  },
});

onBeforeMount(() => {
  calcViewPort();
});
</script>

<template>
  <LoadingView v-if="showInitialLoading" />
  <RouterView v-else />
  <ToastGroup />
</template>
