<script setup lang="ts">
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { ref } from "vue";

const open = () => {
  bottomSheetRef.value?.open();
};

const close = () => {
  void bottomSheetRef.value?.close();
};
const bottomSheetRef = ref<InstanceType<typeof VueBottomSheet>>();

defineExpose({ open, close });
</script>
<template>
  <VueBottomSheet ref="bottomSheetRef">
    <h1>Lorem Ipsum</h1>
    <h2>What is Lorem Ipsum?</h2>
    <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
  </VueBottomSheet>
</template>
