<script setup lang="ts">
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const bottomSheetRef = ref<InstanceType<typeof VueBottomSheet>>();

const open = async () => {
  bottomSheetRef.value?.open();
};
const close = () => {
  void bottomSheetRef.value?.close();
};
defineExpose({ open, close });
const emit = defineEmits(["topClick"]);
</script>
<template>
  <VueBottomSheet ref="bottomSheetRef">
    <section class="w-full flex flex-col justify-between gap-1">
      <div class="flex flex-col">
        <h1 class="font-bold text-lg px-5 mb-3">Filter</h1>
        <div class="flex flex-col bg-base-200">
          <button
            class="btn btn-filter"
            @click="
              () => {
                emit('topClick');
                close();
              }
            "
          >
            My Posts on the map
          </button>
          <RouterLink
            to="/my"
            class="btn btn-filter"
            @click="
              () => {
                close();
              }
            "
          >
            My Posts as a list
          </RouterLink>
        </div>
      </div>
    </section>
  </VueBottomSheet>
</template>
<style scoped>
.btn-filter {
  @apply btn-ghost justify-start pl-5;
}
</style>
