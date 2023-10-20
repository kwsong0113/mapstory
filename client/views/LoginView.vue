<script setup lang="ts">
import NavBar from "@/components/General/NavBar.vue";
import UserForm from "@/components/User/UserForm.vue";
import { RouterLink } from "vue-router";
</script>
<template>
  <main class="flex flex-col items-center justify-center h-screen">
    <NavBar :hide-sign-up-button="true" />
    <UserForm type="signin" />
    <div class="flex flex-row justify-start gap-2 mt-4">
      <p>New to MapStory?</p>
      <RouterLink to="./signup" class="link link-hover link-primary">Create an account</RouterLink>
    </div>
  </main>
</template>
