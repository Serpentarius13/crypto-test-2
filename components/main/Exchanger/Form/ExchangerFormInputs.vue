<template>
  <div v-for="input in inputs" :key="input.name">
    <MainExchangerFormTextInput
      :key="input.name"
      :pattern="input.regex"
      :type="input.type"
      :error="direction === 'send' ? input.send.error : input.receive.error"
      :placeholder="
        direction === 'send'
          ? input.send.placeholder
          : input.receive.placeholder
      "
      v-model="store.formValues[input.name]"
      v-if="input.send.visible"
    />
  </div>
</template>

<script setup lang="ts">
import { IStructInput } from "~/features/types/form-struct.types";
import { useExchangerStore } from "~/stores/useExchangerStore";

const store = useExchangerStore();

interface IExchangerFormInputs {
  inputs: IStructInput[];
  direction: "receive" | "send";
}

defineProps<IExchangerFormInputs>();
</script>

<style scoped lang="scss"></style>
