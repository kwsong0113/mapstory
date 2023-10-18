<script setup lang="ts">
import { useAddress } from "@/services/location";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { defineExpose, ref } from "vue";
import { Location } from "../../types/location";
import { Post } from "../../types/post";
import ReactionButtonGroup from "../Reaction/ReactionButtonGroup.vue";
import PostPiece from "./PostPiece.vue";

const post = ref<Post | null>(null);
const location = ref<Location | null>(null);
const { data: address, isLoading } = useAddress(location);
const isOpen = ref(false);

const bottomSheetRef = ref<InstanceType<typeof VueBottomSheet>>();
const open = (newPost: Post, newLocation: Location) => {
  post.value = newPost;
  location.value = newLocation;
  bottomSheetRef.value?.open();
};
const close = () => {
  void bottomSheetRef.value?.close();
};

defineExpose({ open, close });
</script>
<template>
  <VueBottomSheet ref="bottomSheetRef" @opened="() => (isOpen = true)" @closed="() => (isOpen = false)">
    <section class="h-[40vh] w-full px-5 flex flex-col">
      <h1 class="p-1 mb-3 italic">{{ address }}</h1>
      <template v-if="isOpen && post">
        <PostPiece :piece="post.pieces[0]" @delete="close" />
        <template v-if="post.pieces.length > 1">
          <div class="divider"></div>
          <PostPiece :piece="post.pieces[1]" @delete="close" />
        </template>
      </template>
    </section>
    <ReactionButtonGroup v-if="isOpen && post" :post-id="post?._id" />
  </VueBottomSheet>
</template>
