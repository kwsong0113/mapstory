<script setup lang="ts">
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useDeleteUser, useLogoutUser, useUpdatePassword, useUpdateUsername } from "../../services/user";
import { useUserStore } from "../../stores/user";
import AsyncButton from "../General/AsyncButton.vue";

const username = ref("");
const password = ref("");
const bottomSheetRef = ref<InstanceType<typeof VueBottomSheet>>();

const open = async () => {
  bottomSheetRef.value?.open();
};
const close = () => {
  void bottomSheetRef.value?.close();
};
defineExpose({ open, close });

const { mutate: mutateUsername, isLoading: isUsernameLoading } = useUpdateUsername();
const { mutate: mutatePassword, isLoading: isPasswordLoading } = useUpdatePassword();
const { mutate: logout, isLoading: isLogoutLoading } = useLogoutUser();
const { mutate: deleteUser, isLoading: isDeleteUserLoading } = useDeleteUser();
const updateUsername = () => {
  mutateUsername(username.value);
  username.value = "";
};
const updatePassword = () => {
  mutatePassword(password.value);
  password.value = "";
};
const { currentUsername } = storeToRefs(useUserStore());
</script>
<template>
  <VueBottomSheet ref="bottomSheetRef">
    <section class="h-[80vh] w-full px-5 flex flex-col justify-between pb-5 gap-1">
      <div class="flex flex-col">
        <div class="flex flex-row items-center justify-between">
          <h1 class="font-bold text-lg">Account Settings</h1>
          <kbd class="kbd">{{ "@" + currentUsername }}</kbd>
        </div>
        <div class="divider mt-1 mb-2"></div>
        <h3 class="input-label">Change Username</h3>
        <div class="join mb-4">
          <input class="input-item" placeholder="Username" v-model="username" />
          <AsyncButton :is-loading="isUsernameLoading" @click="updateUsername" :disabled="username.length === 0 || username === currentUsername" class="btn join-item">Save</AsyncButton>
        </div>
        <h3 class="input-label">Change Password</h3>
        <div class="join">
          <input type="password" class="input-item" placeholder="Password" v-model="password" />
          <AsyncButton :is-loading="isPasswordLoading" @click="updatePassword" :disabled="password.length === 0" class="btn join-item">Save</AsyncButton>
        </div>
      </div>
      <div class="flex gap-2 w-full">
        <AsyncButton :is-loading="isLogoutLoading" @click="logout" class="btn btn-bottom btn-neutral">Logout</AsyncButton>
        <AsyncButton :is-loading="isDeleteUserLoading" @click="deleteUser" class="btn btn-bottom btn-error">Delete Account</AsyncButton>
      </div>
    </section>
  </VueBottomSheet>
</template>
<style scoped>
.input-label {
  @apply font-semibold text-[14px] mb-1 ml-[2px];
}

.input-item {
  @apply input input-bordered join-item w-full;
}

.btn-bottom {
  @apply flex-1 basis-0 join-item font-bold text-[16px];
}
</style>
