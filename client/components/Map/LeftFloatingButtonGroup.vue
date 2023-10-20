<script setup lang="ts">
const emit = defineEmits(["bottomClick"]);
const { isHeatMapMode } = defineProps<{
  isHeatMapMode: boolean;
}>();
</script>
<template>
  <div class="fixed bottom-6 left-3">
    <div class="join join-vertical w-12 shadow-[0px_4px_6px_#04366C]">
      <button @click="emit('bottomClick')" class="btn btn-neutral">
        <font-awesome-icon v-if="isHeatMapMode" icon="fa-solid fa-map" class="h-5" />
        <div v-else class="grid grid-rows-2 grid-flow-col gap-[2px]">
          <font-awesome-icon icon="fa-solid fa-heart" class="h-[14px] text-red-500" />
          <font-awesome-icon icon="fa-solid fa-check" class="h-[14px] text-primary" />
          <font-awesome-icon icon="fa-solid fa-thumbs-up" class="h-[14px] text-info" />
          <font-awesome-icon icon="fa-regular fa-face-sad-cry" class="h-[14px] text-yellow-600" />
        </div>
      </button>
    </div>
  </div>
</template>
