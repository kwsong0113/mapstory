<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useDeletePostPiece } from "../../services/post";
import { useUserStore } from "../../stores/user";
import { PostPiece } from "../../types/post";
import AsyncButton from "../General/AsyncButton.vue";

const { piece } = defineProps<{
  piece: PostPiece;
}>();
const emit = defineEmits(["delete"]);

const { currentUsername } = storeToRefs(useUserStore());
const isAuthor = computed(() => currentUsername.value === piece.author);
const { mutate: deletePostPiece, isLoading } = useDeletePostPiece({
  onSuccess() {
    emit("delete");
  },
});
</script>
<template>
  <div class="flex justify-between items-center mb-2">
    <span class="author">{{ "@" + piece.author }}</span>
    <AsyncButton v-if="isAuthor" :is-loading="isLoading" class="btn btn-warning min-h-6 h-6 w-24" @click="deletePostPiece(piece._id)">Delete</AsyncButton>
  </div>
  <article class="content" :class="{ my: isAuthor }">{{ piece.content }}</article>
</template>

<style scoped>
.author {
  @apply badge badge-md font-semibold h-6 rounded-lg;
}
.content {
  @apply bg-base-200 rounded-lg p-3 break-words;
}

.my {
  @apply bg-info text-white;
}
</style>
