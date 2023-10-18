<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(["topClick", "bottomClick"]);
</script>
<template>
  <div class="fixed bottom-6 right-3">
    <div class="join join-vertical w-12">
      <button @click="emit('topClick')" class="btn glass join-item">
        <font-awesome-icon icon="fa-solid fa-location-arrow" class="h-5 text-info" />
      </button>
      <button @click="emit('bottomClick')" class="btn btn-neutral join-item">
        <font-awesome-icon icon="add" class="h-5" />
      </button>
    </div>
  </div>
</template>
