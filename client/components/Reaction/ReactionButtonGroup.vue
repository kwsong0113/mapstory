<script setup lang="ts">
import { availableReactionChoices, useDeleteReaction, useReactions, useSendReaction } from "@/services/reaction";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useLocationStore } from "../../stores/location";
import { useUserStore } from "../../stores/user";
import { ReactionChoice } from "../../types/reaction";
import ReactCountButton from "./ReactCountButton.vue";

const { postId } = defineProps<{
  postId: string;
}>();

const { currentUsername } = storeToRefs(useUserStore());
const { currentLocation } = storeToRefs(useLocationStore());

const { data: reactions } = useReactions(postId);
const { mutate: sendReaction, isLoading: isSendLoading } = useSendReaction();
const { mutate: deleteReaction, isLoading: isDeleteLoading } = useDeleteReaction();
const isLoading = computed(() => isSendLoading.value || isDeleteLoading.value);
const myReaction = computed(() => reactions.value?.find(({ by }) => by === currentUsername.value)?.choice);
const reactionCount = computed(
  () =>
    reactions.value?.reduce(
      (counts, { choice }) => {
        counts[choice] = (counts[choice] || 0) + 1;
        return counts;
      },
      {} as Record<ReactionChoice, number>,
    ),
);

const onClick = (choice: ReactionChoice) => {
  if (currentLocation.value) {
    if (choice === myReaction.value) {
      deleteReaction({ id: postId, location: currentLocation.value });
    } else {
      sendReaction({ id: postId, choice, location: currentLocation.value });
    }
  }
};
</script>
<template>
  <footer class="fixed bottom-0 bg-base-200 border-t-2 w-full">
    <div v-if="isLoading" class="absolute w-full bg-base-300 h-full opacity-50">
      <div class="flex justify-center items-center h-full">
        <span v-if="true" class="loading loading-spinner loading-md text-primary"></span>
      </div>
    </div>
    <div class="flex flex-row px-5 py-2 justify-between">
      <ReactCountButton v-for="choice in availableReactionChoices" :key="choice" :type="choice" :count="reactionCount?.[choice] ?? 0" :selected="myReaction === choice" @click="onClick(choice)" />
    </div>
  </footer>
</template>
