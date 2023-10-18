<script setup lang="ts">
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useCreatePost } from "../../services/post";
import { useLocationStore } from "../../stores/location";
import AsyncButton from "../General/AsyncButton.vue";

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const content = ref("");
const locationStore = useLocationStore();
const { currentLocation, currentAddress } = storeToRefs(locationStore);
const { mutate, isLoading } = useCreatePost({
  onSuccess: () => {
    content.value = "";
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
const open = async () => {
  bottomSheetRef.value?.open();
  await locationStore.updateAddress();
  textareaRef.value?.focus();
};
const close = () => {
  void bottomSheetRef.value?.close();
};
defineExpose({ open, close });
</script>
<template>
  <VueBottomSheet ref="bottomSheetRef">
    <section class="px-5 pb-12">
      <h1 class="p-[2px] mb-1 italic">{{ currentAddress }}</h1>
      <textarea autofocus ref="textareaRef" v-model="content" class="textarea text-[16px] p-[2px] w-full focus:outline-0 h-40" placeholder="New Post"></textarea>
      <AsyncButton @click="createPost" :isLoading="isLoading" :disabled="currentLocation === null || content.length === 0" class="btn btn-primary w-full font-bold text-[16px]">Share</AsyncButton>
    </section>
  </VueBottomSheet>
</template>
