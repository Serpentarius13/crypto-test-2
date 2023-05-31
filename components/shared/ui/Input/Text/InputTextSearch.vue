<template>
  <label class="search text-small">
    <span v-if="label"> {{ label }} </span>

    <div>
      <NuxtIcon name="search" class="icon" />

      <input
        type="text"
        :placeholder="placeholder"
        v-bind="$attrs"
        v-model="model"
      />
    </div>
  </label>
</template>

<script setup lang="ts">
interface IInputText {
  label?: string;

  placeholder: string;
}

const props = defineProps<IInputText>();

const model = defineModel<string>({ required: true });
</script>

<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;

  span {
    color: white;
  }

  div {
    position: relative;

    input {
      width: 100%;
      padding: 2.5rem 2rem 2.5rem 5.5rem;
      background-color: var(--blue-darkest);
      border-radius: var(--radius-small);
      color: var(--gray);

      font-weight: 500;

      &:focus {
        outline-color: white;
      }
    }

    .icon {
      position: absolute;
      left: 2rem;
      top: 50%;
      transform: translateY(-50%);
      width: 2rem;
      aspect-ratio: 1;
      color: white;
    }
  }
}
</style>
