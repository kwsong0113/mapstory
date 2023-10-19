<script setup lang="ts">
import { useSendMeetingRequest } from "@/services/collaboration";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useCollaborationStore } from "../../stores/collaboration";
import { useLocationStore } from "../../stores/location";
const modal = ref(null);
const checked = ref(false);

const collaborationStore = useCollaborationStore();
const { confirmRequest } = storeToRefs(collaborationStore);
const { currentLocation } = storeToRefs(useLocationStore());
const { mutate } = useSendMeetingRequest();

const sendMeetingRequest = () => {
  if (currentLocation.value) {
    mutate(currentLocation.value);
  }
};

const open = () => {
  console.log(confirmRequest.value);
  if (confirmRequest.value) {
    // @ts-expect-error showModal
    modal.value?.showModal();
  } else {
    sendMeetingRequest();
  }
};
const close = () => {
  // @ts-expect-error close
  modal.value?.close();
};
defineExpose({ open, close });
</script>

<template>
  <dialog ref="modal" id="confirm_request" class="modal z-30">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Warning</h3>
      <p class="py-4">Sending a collaboration request will share your username and current location with nearby users. Proceed only if you're comfortable with this.</p>
      <div class="flex flex-row justify-end items-center gap-3">
        <span class="label-text">Don't ask again</span>
        <input type="checkbox" v-model="checked" class="checkbox" />
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Cancel</button>
        </form>
        <button
          class="btn btn-primary"
          @click="
            () => {
              close();
              sendMeetingRequest();
              console.log(checked);
              if (checked) {
                collaborationStore.turnOff();
              }
            }
          "
        >
          Send Request
        </button>
      </div>
    </div>
  </dialog>
</template>
