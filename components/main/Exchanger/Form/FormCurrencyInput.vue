<template>
  <label class="input">
    <span class="text-small input__title">
      {{ label }}
    </span>
    <div class="input__inner">
      <SharedUiCurrencyLogo
        class="input__inner-logo"
        :logo="currency.logo"
        :name="currency.name"
        v-if="currency"
      />

      <input
        type="number"
        class="text-medium"
        :min="currency?.min ?? 0"
        :max="currency?.max ?? 0"
        v-model="localRef"
      />
    </div>

    <div class="input__footer text-smaller">
      <template v-if="store.isLoading">
        <SharedUiLoading size="24" />
      </template>
      <template
        v-else-if="currency?.min === undefined || currency?.max === undefined"
      >
        <span> Выберите валюту для обмена </span>
      </template>
      <template v-else>
        <span> Мин.: {{ currency?.min }} </span>

        <span> Макс.: {{ currency?.max }} </span>
      </template>
    </div>
  </label>
</template>

<script setup lang="ts">
import { TBoundCurrency } from "~/features/types/currency.types";
import { checkIsUndefined } from "~/features/utils/checkIsUndefined";
import { useExchangerStore } from "~/stores/useExchangerStore";

interface IFormCurrencyInput {
  currency: TBoundCurrency | null;
  label: string;
  handleChange: (v: string) => void;
}

const localRef = ref<string>("");

const { currency, label, handleChange } = defineProps<IFormCurrencyInput>();
const store = useExchangerStore();

watch(localRef, (next, prev) => {
  if (!currency) return (localRef.value = "");
  const parsedPrev = parseFloat(prev);
  const parsedNext = parseFloat(next);

  if (checkIsUndefined(currency.min) || checkIsUndefined(currency.max)) {
    return (localRef.value = "");
  }
  if (
    (parsedNext < currency.min || parsedNext > currency.max) &&
    parsedNext.toString().length >= currency.max.toString().length
  ) {
    return (localRef.value = parsedPrev.toString());
  }
  handleChange(localRef.value);
});
</script>

<style scoped lang="scss">
.input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .input__title {
    color: white;
    font-weight: 700;
  }

  &__inner {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;

    padding: 2rem;
    background-color: var(--blue-dark);
    border-radius: var(--radius-small);

    &:focus-within {
      outline: 1px solid white;
    }

    &-logo {
      flex: 1;
      width: 100%;
    }

    input {
      text-align: right;
      color: white;
      max-width: 35%;
      outline: none;
    }
  }

  &__footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: var(--gray);
      font-weight: 400;
    }
  }
}
</style>
