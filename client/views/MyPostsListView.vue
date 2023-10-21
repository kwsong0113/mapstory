<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import PostPiece from "../components/Post/PostPiece.vue";
import { useMyPostMarkers } from "../services/post";
import { useLocationStore } from "../stores/location";

const { setCenter } = useLocationStore();
const { data: myPostMarkers } = useMyPostMarkers();
const sortedPostMarkers = computed(() => myPostMarkers.value?.toSorted((a, b) => -new Date(a.post.dateCreated).getTime() + new Date(b.post.dateCreated).getTime()));
</script>
<template>
  <main>
    <div class="fixed top-0 w-full px-5 pt-3 pb-3 bg-base-200">
      <div class="flex flex-row justify-between items-center">
        <h1 class="font-bold text-lg">My Posts</h1>
        <RouterLink to="/?">
          <font-awesome-icon icon="fa-solid fa-xmark" class="h-5" />
        </RouterLink>
      </div>
    </div>
    <div class="overflow-y-auto mt-[52px]">
      <section v-for="{ post, location } in sortedPostMarkers" :key="post._id" class="px-5 py-5 border-t-4">
        <PostPiece :piece="post.pieces[0]" />
        <template v-if="post.pieces.length > 1">
          <div class="divider"></div>
          <PostPiece :piece="post.pieces[1]" />
        </template>
        <div class="flex flex-row mt-2 justify-between items-center">
          <RouterLink :to="`/`" class="btn btn-sm btn-ghost text-neutral px-1" @click="setCenter(location)">
            <font-awesome-icon icon="fa-solid fa-map" />
            View on map
          </RouterLink>
          <h1 class="p-[2px] italic text-end">{{ new Date(post.dateCreated).toLocaleString() }}</h1>
        </div>
      </section>
    </div>
  </main>
</template>
