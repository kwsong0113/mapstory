<script setup lang="ts">
import NavBar from "@/components/General/NavBar.vue";
import UserForm from "@/components/User/UserForm.vue";
import { RouterLink } from "vue-router";
</script>
<template>
  <main class="flex flex-col items-center justify-center h-screen">
    <NavBar :hide-sign-up-button="true" />
    <UserForm type="signup" />
    <div class="flex flex-row justify-start gap-2 mt-4">
      <p>Already have an account?</p>
      <RouterLink to="./login" class="link link-hover link-primary">Sign in</RouterLink>
    </div>
  </main>
</template>
