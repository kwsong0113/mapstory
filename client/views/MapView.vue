<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import CollaborationRequestMarker from "../components/Collaboration/CollaborationRequestMarker.vue";
import CollaborationRequestModal from "../components/Collaboration/CollaborationRequestModal.vue";
import CollaborationStatusHeader from "../components/Collaboration/CollaborationStatusHeader.vue";
import MeetingMarker from "../components/Collaboration/MeetingMarker.vue";
import ColorScaleIndicator from "../components/HeatMap/ColorScaleIndicator.vue";
import LeftFloatingButtonGroup from "../components/Map/LeftFloatingButtonGroup.vue";
import MapWrapper from "../components/Map/MapWrapper.vue";
import MyMarker from "../components/Map/MyMarker.vue";
import RightFloatingButtonGroup from "../components/Map/RightFloatingButtonGroup.vue";
import CollabPostBottomSheet from "../components/Post/CollabPostBottomSheet.vue";
import CreatePostBottomSheet from "../components/Post/CreatePostBottomSheet.vue";
import PostMarker from "../components/Post/PostMarker.vue";
import ViewPostBottomSheet from "../components/Post/ViewPostBottomSheet.vue";
import SettingsBottomSheet from "../components/User/SettingsBottomSheet.vue";
import { useMeetingRequestMarkers, useMyMeeting } from "../services/collaboration";
import { useHeatMap } from "../services/heatmap";
import { usePostMarkers } from "../services/post";
import { useCollaborationStore } from "../stores/collaboration";
import { useLocationStore } from "../stores/location";

const createPostBottomSheet = ref<InstanceType<typeof CreatePostBottomSheet> | null>(null);
const collabPostBottomSheet = ref<InstanceType<typeof CollabPostBottomSheet> | null>(null);
const viewPostBottomSheet = ref<InstanceType<typeof ViewPostBottomSheet> | null>(null);
const settingsBottomSheet = ref<InstanceType<typeof SettingsBottomSheet> | null>(null);
const modal = ref<InstanceType<typeof CollaborationRequestModal> | null>(null);
const mapRef = ref<InstanceType<typeof MapWrapper> | null>(null);
const { currentLocation } = storeToRefs(useLocationStore());
const { data: postMarkers } = usePostMarkers(currentLocation);
const { data: requestMarkers } = useMeetingRequestMarkers();
const { status } = storeToRefs(useCollaborationStore());
useMyMeeting();
const { isHeatMapMode, toggleHeatMap } = useHeatMap();

const panToCurrentLocation = () => {
  if (currentLocation.value) {
    mapRef.value?.panTo(currentLocation.value);
  }
};
const toggleMode = () => {
  if (isHeatMapMode.value) {
    mapRef.value?.setZoom(15);
  } else {
    mapRef.value?.setZoom(11);
  }
  panToCurrentLocation();
  toggleHeatMap();
};
</script>

<template>
  <main class="w-screen h-screen">
    <MapWrapper ref="mapRef">
      <MyMarker />
      <template v-if="!isHeatMapMode">
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
        <CollaborationRequestMarker v-for="{ location, meetingRequest: { from } } in requestMarkers" :location="location" :username="from" :key="from" />
        <MeetingMarker />
      </template>
    </MapWrapper>
    <RightFloatingButtonGroup @top-click="panToCurrentLocation" @mid-click="modal?.open()" @bottom-click="() => createPostBottomSheet?.open()" />
    <LeftFloatingButtonGroup :is-heat-map-mode="isHeatMapMode" @top-click="settingsBottomSheet?.open" @bottom-click="toggleMode" />
    <ColorScaleIndicator v-if="isHeatMapMode" />
  </main>
  <CreatePostBottomSheet ref="createPostBottomSheet" />
  <ViewPostBottomSheet ref="viewPostBottomSheet" />
  <CollabPostBottomSheet ref="collabPostBottomSheet" />
  <SettingsBottomSheet ref="settingsBottomSheet" />
  <CollaborationRequestModal ref="modal" />
  <CollaborationStatusHeader v-if="status !== `idle`" @click="collabPostBottomSheet?.open" />
</template>
