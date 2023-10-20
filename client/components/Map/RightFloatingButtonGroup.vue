<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineEmits } from "vue";
import { useCollaborationStore } from "../../stores/collaboration";
const emit = defineEmits(["topClick", "midClick", "bottomClick"]);
const { status } = storeToRefs(useCollaborationStore());
</script>
<template>
  <div class="fixed bottom-6 right-3">
    <div class="join join-vertical w-12 shadow-[0px_4px_6px_#04366C]">
      <button @click="emit('topClick')" class="btn bg-white join-item">
        <font-awesome-icon icon="fa-solid fa-location-arrow" class="h-5 text-info" />
      </button>
      <button :disabled="status !== `idle`" @click="emit('midClick')" class="btn btn-neutral join-item">
        <font-awesome-icon icon="fa-solid fa-user-group" class="h-5" />
      </button>
      <button @click="emit('bottomClick')" class="btn btn-neutral join-item">
        <font-awesome-icon icon="add" class="h-5" />
      </button>
    </div>
  </div>
</template>
