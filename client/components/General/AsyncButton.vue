<script setup lang="ts">
interface Props {
  isLoading?: boolean;
  disabled?: boolean;
}

const { isLoading = false, disabled = false } = defineProps<Props>();
</script>

<template>
  <button :disabled="isLoading || disabled">
    <span v-if="isLoading" class="loading loading-spinner"></span>
    <slot v-else />
  </button>
</template>
