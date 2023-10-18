<script setup lang="ts">
interface Props {
  isLoading?: boolean;
}

const { isLoading = false } = defineProps<Props>();
</script>

<template>
  <button>
    <span v-if="isLoading" class="loading loading-spinner"></span>
    <slot v-else />
  </button>
</template>
