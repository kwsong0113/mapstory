<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineProps } from "vue";
import { CustomMarker } from "vue3-google-map";
import { useUserStore } from "../../stores/user";
import { Location } from "../../types/location";
import { Post } from "../../types/post";
import { ReactionChoice } from "../../types/reaction";
import ReactionIcon from "../Reaction/ReactionIcon.vue";

const { location, post, reaction } = defineProps<{
  location: Location;
  post: Post;
  reaction?: ReactionChoice;
}>();

const { currentUsername } = storeToRefs(useUserStore());
</script>
<template>
  <CustomMarker :options="{ position: location, anchorPoint: 'BOTTOM_LEFT', zIndex: post.pieces.length * 300 }">
    <button @click="$emit('click')" class="indicator text-start">
      <span v-if="reaction" class="indicator-item">
        <kbd class="kbd kbd-md">
          <ReactionIcon :type="reaction" />
        </kbd>
      </span>
      <div v-if="post.pieces.length === 1" class="chat chat-start">
        <div
          class="chat-bubble text-base-100 bg-opacity-90 font-semibold max-w-[200px] max-h-[76px] break-all text-sm flex items-center"
          :class="{ 'bg-info': post.pieces[0].author === currentUsername }"
        >
          <span> {{ post.pieces[0].content.slice(0, 70) + (post.pieces[0].content.length >= 70 ? "..." : "") }}</span>
        </div>
      </div>
      <div v-else class="chat chat-start">
        <div class="chat-bubble bg-white opacity-90 font-semibold max-w-[200px] max-h-[76px] break-all text-sm flex flex-col justify-center">
          <span class="truncate" :class="post.pieces[0].author === currentUsername ? 'text-info' : 'text-black'">{{ post.pieces[0].content }}</span>
          <span class="truncate" :class="post.pieces[1].author === currentUsername ? 'text-info' : 'text-black'">{{ post.pieces[1].content }}</span>
        </div>
      </div>
    </button>
  </CustomMarker>
</template>
