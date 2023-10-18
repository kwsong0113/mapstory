<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import FloatingButtonGroup from "../components/Map/FloatingButtonGroup.vue";
import MapWrapper from "../components/Map/MapWrapper.vue";
import MyMarker from "../components/Map/MyMarker.vue";
import CreatePostBottomSheet from "../components/Post/CreatePostBottomSheet.vue";
import PostMarker from "../components/Post/PostMarker.vue";
import ViewPostBottomSheet from "../components/Post/ViewPostBottomSheet.vue";
import { usePostMarkers } from "../services/post";
import { useLocationStore } from "../stores/location";

const createPostBottomSheet = ref<InstanceType<typeof CreatePostBottomSheet> | null>(null);
const viewPostBottomSheet = ref<InstanceType<typeof ViewPostBottomSheet> | null>(null);
const mapRef = ref<InstanceType<typeof MapWrapper> | null>(null);
const { currentLocation } = storeToRefs(useLocationStore());
const { data: postMarkers } = usePostMarkers(currentLocation);
</script>

<template>
  <main class="w-screen h-screen">
    <MapWrapper ref="mapRef">
      <MyMarker />
      <PostMarker
        v-for="{ post, location, reaction } in postMarkers"
        :post="post"
        :location="location"
        :reaction="reaction"
        :key="post._id"
        @click="
          () => {
            viewPostBottomSheet?.open(post, location);
          }
        "
      />
    </MapWrapper>
    <FloatingButtonGroup
      @top-click="
        () => {
          if (currentLocation) {
            mapRef?.panTo(currentLocation);
          }
        }
      "
      @bottom-click="() => createPostBottomSheet?.open()"
    />
  </main>
  <CreatePostBottomSheet ref="createPostBottomSheet" />
  <ViewPostBottomSheet ref="viewPostBottomSheet" />
</template>
