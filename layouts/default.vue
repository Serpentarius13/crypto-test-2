<template>
  <div class="layout">
    <slot />
  </div>

 
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: 100vh;

  padding: 12.2rem 14.2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--black);
}
</style>
