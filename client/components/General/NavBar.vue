<script setup lang="ts">
import router from "@/router";

interface Props {
  hideSignUpButton?: boolean;
}

const { hideSignUpButton } = defineProps<Props>();
</script>

<template>
  <nav class="fixed top-0 z-10 font-poppins w-full p-5 pl-[6px] flex justify-between items-center border-b-[1px] border-base-200">
    <button class="btn btn-ghost text-base font-bold min-h-[36px] h-9" @click="router.push({ name: 'Home' })">MapStory</button>
    <button v-if="!hideSignUpButton" class="btn btn-primary btn-outline min-h-[36px] h-9" @click="router.push({ name: 'SignUp' })">Sign up</button>
  </nav>
</template>
