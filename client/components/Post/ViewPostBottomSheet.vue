<script setup lang="ts">
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { storeToRefs } from "pinia";
import { defineExpose, ref } from "vue";
import { useUserStore } from "../../stores/user";
import { Post } from "../../types/post";
import PostPiece from "./PostPiece.vue";

const post = ref<Post | null>(null);
const { currentUsername } = storeToRefs(useUserStore());
const bottomSheetRef = ref<InstanceType<typeof VueBottomSheet>>();
const open = (newPost: Post) => {
  post.value = newPost;
  bottomSheetRef.value?.open();
};
const close = () => {
  void bottomSheetRef.value?.close();
};
defineExpose({ open, close });
</script>
<template>
  <VueBottomSheet ref="bottomSheetRef">
    <section class="h-[40vh] w-full px-5 flex flex-col">
      <template v-if="post">
        <PostPiece :piece="post.pieces[0]" @delete="close" />
        <template v-if="post.pieces.length > 1">
          <div class="divider"></div>
          <PostPiece :piece="post.pieces[1]" @delete="close" />
        </template>
      </template>
    </section>
  </VueBottomSheet>
</template>
