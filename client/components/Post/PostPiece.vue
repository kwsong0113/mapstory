<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useDeletePostPiece, useUpdatePostPiece } from "../../services/post";
import { useUserStore } from "../../stores/user";
import { PostPiece } from "../../types/post";
import { delay } from "../../utils/delay";
import AsyncButton from "../General/AsyncButton.vue";

const { piece } = defineProps<{
  piece: PostPiece;
}>();
const emit = defineEmits(["delete"]);

const content = ref(piece.content);
const editContent = ref(piece.content);
const editing = ref(false);
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const { currentUsername } = storeToRefs(useUserStore());
const isAuthor = computed(() => currentUsername.value === piece.author);
const { mutate: deletePostPiece, isLoading: isDeleteLoading } = useDeletePostPiece({
  onSuccess() {
    emit("delete");
  },
});

const { mutate: updatePostPiece, isLoading: isUpdateLoading } = useUpdatePostPiece({
  onSuccess() {
    editing.value = false;
    content.value = editContent.value;
  },
});

const toggleEditing = async () => {
  if (editing.value) {
    editContent.value = content.value;
    editing.value = !editing.value;
  } else {
    editing.value = !editing.value;
    await delay(300);
    textareaRef.value?.focus();
  }
};
</script>
<template>
  <div class="flex justify-between items-center mb-2">
    <span class="author">{{ "@" + piece.author }}</span>
    <div v-if="isAuthor" class="join">
      <AsyncButton class="btn btn-mini" @click="toggleEditing">{{ editing ? "Cancel" : "Edit" }}</AsyncButton>
      <AsyncButton v-if="editing" :is-loading="isUpdateLoading" class="btn btn-mini btn-primary" @click="updatePostPiece({ _id: piece._id, content: editContent })">Submit</AsyncButton>
      <AsyncButton v-else :is-loading="isDeleteLoading" class="btn btn-mini btn-warning" @click="deletePostPiece(piece._id)">Delete</AsyncButton>
    </div>
  </div>
  <textarea autofocus ref="textareaRef" v-show="editing" v-model="editContent" class="content h-40 focus:outline-0" :class="{ my: isAuthor }"></textarea>
  <article v-show="!editing" class="content" :class="{ my: isAuthor }">{{ content }}</article>
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

.btn-mini {
  @apply min-h-6 h-6 w-20 join-item;
}
</style>
