<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLogoutUser } from "../services/user";
import { useUserStore } from "../stores/user";

const { currentUsername } = storeToRefs(useUserStore());
const { mutate: logoutUser } = useLogoutUser();
</script>

<template>
  <main class="min-h-screen">
    <h1>Welcome {{ currentUsername }}</h1>
    <button @click="() => logoutUser()" class="btn btn-primary">Log Out</button>
  </main>
</template>

<style scoped>
.background-gradient {
  background: radial-gradient(112.79999999999998% 100% at 0% 100%, #fbff66 0%, #5cd385 30%, #34b47d 50%, #38716b 100%);
  flex: none;
  inset: 0;
  overflow: hidden;
  position: absolute;
  z-index: 0;
}

.button-gradient {
  background: linear-gradient(90deg, #5cd385 0%, #34b47d 15%, #38716b 100%);
}

.background-white {
  background: radial-gradient(182.29999999999998% 69% at 50% 8.4%, #ffffff 0%, #ffffff 28.345139819430482%, rgba(255, 255, 255, 0.88) 46.39900258832971%, rgba(0, 0, 0, 0) 100%);
  flex: none;
  inset: 0;
  overflow: hidden;
  position: absolute;
  z-index: 1;
}
</style>
../stores/auth
