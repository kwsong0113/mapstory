<script setup lang="ts">
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useContribute, useMyCollaboration } from "../../services/collaboration";
import { useCollaborationStore } from "../../stores/collaboration";
import AsyncButton from "../General/AsyncButton.vue";

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const content = ref("");
const { mutate, isLoading } = useContribute({
  onSuccess: () => {
    content.value = "";
    close?.();
  },
});
const { data: collab } = useMyCollaboration();
const { collaborator } = storeToRefs(useCollaborationStore());
const placeholder = computed(() => `What happened with @${collaborator.value}?`);
const contribute = () => {
  if (collab.value) {
    mutate({ id: collab.value._id, content: content.value });
  }
};

const bottomSheetRef = ref<InstanceType<typeof VueBottomSheet>>();
const open = async () => {
  bottomSheetRef.value?.open();
  textareaRef.value?.focus();
};
const close = () => {
  void bottomSheetRef.value?.close();
};
defineExpose({ open, close });
</script>
<template>
  <VueBottomSheet ref="bottomSheetRef">
    <section class="h-[40vh] w-full px-5 flex flex-col justify-between pb-5 gap-1">
      <textarea autofocus ref="textareaRef" v-model="content" class="textarea text-[16px] p-[2px] w-full focus:outline-0 flex-grow mb-2" :placeholder="placeholder"></textarea>
      <AsyncButton @click="contribute" :isLoading="isLoading" :disabled="!collab || content.length === 0" class="btn btn-primary w-full font-bold text-[16px]">Add to Collaborative Post</AsyncButton>
    </section>
  </VueBottomSheet>
</template>
