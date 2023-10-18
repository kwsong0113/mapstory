<script setup lang="ts">
import { ReactionChoice } from "../../types/reaction";

const { type } = defineProps<{
  type: ReactionChoice;
}>();
</script>
<template>
  <font-awesome-icon v-if="type === 'heart'" icon="fa-solid fa-heart" class="text-red-500" />
  <font-awesome-icon v-else-if="type === 'like'" icon="fa-solid fa-thumbs-up" class="text-info" />
  <font-awesome-icon v-else-if="type === 'check'" icon="fa-solid fa-check" class="text-primary" />
  <font-awesome-icon v-else-if="type === 'question'" icon="fa-solid fa-question" class="text-info" />
  <font-awesome-icon v-else-if="type === 'sad'" icon="fa-regular fa-face-sad-cry" class="text-yellow-600" />
  <font-awesome-icon v-else icon="fa-regular fa-face-angry" class="text-red-500" />
</template>
