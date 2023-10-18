<script setup lang="ts">
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useFetchAddress } from "../../services/location";
import { useCreatePost } from "../../services/post";
import { useLocationStore } from "../../stores/location";
import AsyncButton from "../General/AsyncButton.vue";

const content = ref("");
const { currentLocation } = storeToRefs(useLocationStore());
const { data: address } = useFetchAddress(currentLocation.value ?? { lat: 0, lng: 0 });
const { mutate, isLoading } = useCreatePost({
  onSuccess: () => {
    close?.();
  },
});

const createPost = () => {
  if (currentLocation.value) {
    mutate({
      location: currentLocation.value,
      content: content.value,
    });
  }
};

const bottomSheetRef = ref<InstanceType<typeof VueBottomSheet>>();
const open = () => {
  bottomSheetRef.value?.open();
};
const close = () => {
  void bottomSheetRef.value?.close();
};
defineExpose({ open, close });
</script>
<template>
  <VueBottomSheet ref="bottomSheetRef">
    <section class="px-5 pb-12 w-full h-full">
      <h1 class="p-[2px] italic">{{ address }}</h1>
      <textarea v-model="content" class="textarea text-[16px] p-[2px] w-full focus:outline-0 h-40" placeholder="New Post"></textarea>
      <AsyncButton @click="createPost" :isLoading="isLoading" :disabled="currentLocation === null || content.length === 0" class="btn btn-primary w-full font-bold text-[16px]">Share</AsyncButton>
    </section>
  </VueBottomSheet>
</template>
