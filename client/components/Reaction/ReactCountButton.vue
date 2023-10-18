<script setup lang="ts">
import { ReactionChoice } from "../../types/reaction";
import ReactionIcon from "./ReactionIcon.vue";

const { type, count } = defineProps<{
  type: ReactionChoice;
  count: number;
  selected: boolean;
}>();

const emit = defineEmits(["click"]);
</script>
<template>
  <button class="kbd kbd-md justify-between min-w-[48px]" :class="{ 'bg-neutral': selected }" @click="emit('click')">
    <ReactionIcon :type="type" />
    <span class="text-sm font-poppins" :class="{ 'text-white': selected }">{{ count }}</span>
  </button>
</template>
