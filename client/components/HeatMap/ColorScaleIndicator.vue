<template>
  <div class="fixed bottom-6 left-20">
    <div class="absolute w-full h-full">
      <div class="flex h-full justify-between items-center px-2">
        <div class="emoji">
          <font-awesome-icon icon="fa-regular fa-face-frown" class="h-[18px] text-black" />
        </div>
        <div class="emoji">
          <font-awesome-icon icon="fa-regular fa-face-meh" class="h-[18px] text-black" />
        </div>
        <div class="emoji">
          <font-awesome-icon icon="fa-regular fa-face-smile" class="h-[18px] text-black" />
        </div>
      </div>
    </div>
    <div class="h-12 w-48 grad shadow-[0px_4px_4px_#AAAAAA]"></div>
  </div>
</template>
<style scoped>
.grad {
  background: linear-gradient(to right, red 0%, white 50%, palegreen 60%, green 100%);
  @apply border-2 border-base-300 rounded-lg;
}

.emoji {
  @apply flex justify-center items-center w-[28px] h-[28px] glass rounded-lg;
}
</style>
