<template>
  <SharedUiBlockWrapper>
    <form class="form" @submit.prevent="handleSubmit">
      <MainExchangerFormCurrencyInput
        :currency="store.leftCurrency"
        label="Отдаете"
        :handle-change="store.setLeftValue"
      />
      <MainExchangerFormCurrencyInput
        :currency="store.rightCurrency"
        label="Получаете"
        :handle-change="store.setRightValue"
      />

      <h3 class="form__midtitle text-big">Ваши реквизиты</h3>

      <SharedUiInputText
        icon="avatar"
        placeholder="ФИО Получателя"
        v-model="name"
      />
      <SharedUiInputText
        icon="mail"
        placeholder="Почта получателя"
        v-model="email"
      />

      <SharedUiInputCheckbox v-model="acceptsRules">
        <p class="text-smaller form__checkbox-text" @click.prevent>
          Я согласен с <a> обработкой персональных данных </a> и принимаю
          <a> правила обмена </a>
        </p>
      </SharedUiInputCheckbox>

      <SharedUiButton
        class="form__submit"
        type="submit"
        :disabled="store.isOutOfBounds || !name || !email || !acceptsRules"
      >
        <NuxtIcon name="loading" />

        <span> Перейти к оплате </span>
      </SharedUiButton>
    </form>
  </SharedUiBlockWrapper>
</template>

<script setup lang="ts">
import { useExchangerStore } from "~/stores/useExchangerStore";

const store = useExchangerStore();

const isChecked = ref<boolean>(false);

const name = ref<string>("");
const email = ref<string>("");
const acceptsRules = ref<boolean>(false);

function handleSubmit() {
  console.log(store.isOutOfBounds);
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: var(--padding-medium);

  &__midtitle {
    padding-top: 0.5rem;
    padding-bottom: 1rem;
    color: white;
    font-weight: 700;
  }

  &__checkbox {
    &-text {
      color: var(--light-gray);
      user-select: none;
      a {
        color: var(--blue);
        &:hover,
        &:active {
          text-decoration: underline 1px solid var(--blue);
        }
      }
    }
  }

  &__submit {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 auto;
  }
}
</style>
