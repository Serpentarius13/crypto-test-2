<template>
  <Transition name="fade">
    <div class="loading-screen" v-if="isLoading">
      <SharedUiLoading />
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{ isLoading: boolean }>();
</script>

<style scoped lang="scss">
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  height: 100%;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 232;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.25s;
}
</style>
