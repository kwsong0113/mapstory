<script setup lang="ts">
import AsyncButton from "@/components/General/AsyncButton.vue";
import router from "@/router";
import { useCreateUser, useLoginUser } from "@/services/user";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";

const { type } = defineProps<{
  type: "signup" | "signin";
}>();

const username = ref("");
const password = ref("");
const { mutate: createUser, isLoading: isCreateUserLoading } = useCreateUser();
const { mutate: loginUser, isLoading: isLoginUserLoading } = useLoginUser();
const { isLoggedIn } = storeToRefs(useUserStore());

const onSubmit = () => {
  const reqBody = { username: username.value, password: password.value };
  if (type === "signup") {
    createUser(reqBody);
  } else {
    loginUser(reqBody);
  }
};

watchEffect(() => {
  if (isLoggedIn.value) {
    void router.push({ name: "Home" });
  }
});
</script>
<template>
  <form class="form-control w-full max-w-xs gap-3" @submit.prevent="onSubmit">
    <h1 class="text-center text-3xl font-bold font-poppins mb-4 leading-tight">
      {{ type === "signup" ? "Create your MapStory Account" : "Sign in\nto MapStory" }}
    </h1>
    <input type="text" v-model.trim="username" placeholder="Username" class="input input-bordered" required />
    <input type="password" v-model.trim="password" placeholder="Password" class="input input-bordered" required />
    <AsyncButton :isLoading="isCreateUserLoading || isLoginUserLoading" type="submit" :disabled="username.length === 0 || password.length === 0" class="btn btn-primary">{{
      type == "signup" ? "Sign up" : "Sign in"
    }}</AsyncButton>
  </form>
</template>
