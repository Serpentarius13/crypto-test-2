<template>
  <label class="checkbox">
    <input type="checkbox" v-model="model" />
    <span class="mark" />

    <span class="checkbox__text">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ required: true });
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: 2rem;
  cursor: pointer;
  input {
    display: none;
    appearance: none;
  }

  input:checked + .mark::after {
    opacity: 1;
  }

  .mark {
    width: 2.4rem;
    aspect-ratio: 1;
    border: 2px solid var(--blue);

    position: relative;

    border-radius: var(--radius-smaller);

    &::after {
      content: "";
      position: absolute;

      inset: 0;
      margin: auto;
      width: 1.6rem;
      aspect-ratio: 1;

      border-radius: var(--radius-smaller);

      background-color: var(--blue);

      opacity: 0;
      transition: 0.25s;
    }
  }

  &__text {
    max-width: 35rem;
  }
}
</style>
