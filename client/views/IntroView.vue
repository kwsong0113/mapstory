<script setup lang="ts">
import NavBar from "@/components/General/NavBar.vue";
import router from "@/router";
</script>

<template>
  <main class="h-screen">
    <section class="hero h-full absolute z-10">
      <div class="hero-content text-center">
        <div class="font-poppins">
          <h1 class="text-[40px] sm:text-6xl md:text-7xl lg:text-8xl font-bold sm:mb-2">Share your <span class="text-black">story</span></h1>
          <h1 class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 lg:mb-10">on the <span class="text-black">map.</span></h1>
          <button class="btn btn-neutral md:btn-md lg:btn-lg bg-black" @click="router.push({ name: 'SignUp' })">Start sharing</button>
        </div>
      </div>
    </section>
    <NavBar />
    <section class="background-gradient h-full"></section>
    <section class="background-white h-full"></section>
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
