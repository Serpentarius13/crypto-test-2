<template>
  <div class="error">
    <div class="error__inner">
      <h1>There was an error</h1>
      <p class="text-small">
        {{ error.message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: Error; reset: () => void }>();
</script>

<style scoped lang="scss">
.error {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: var(--blue-darkest);

  &__inner {
    max-width: 60rem;
    text-align: center;

    h1 {
      color: red;
      font-size: 4rem;
    }

    p {
        color: white;
    }
  }
}
</style>
