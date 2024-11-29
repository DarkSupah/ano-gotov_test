<template>
  <div class="select-messengers">
    <submit-form @handle-submit="step.next()">
      <div class="select-messengers__headings">
        <h1 class="h4">Заполните, пожалуйста, небольшую анкету</h1>
        <h2 class="h5">
          Какими мессенджерами/соцсетями<br class="mobile-only" />
          вы пользуетесь?
        </h2>
      </div>

      <div class="select-messengers__items">
        <messenger-item
          v-for="messenger in messengers"
          :key="messenger.id"
          class="select-messengers__item"
          :item="messenger"
          :disabled="messenger.confirmed"
          :model-value="pageData.messengers.get(messenger.id)"
          @update:model-value="pageData.messengers.set(messenger.id, $event)"
        />
      </div>

      <div class="select-messengers__actions">
        <ui-button variant="outline" color="primary" @click="skip()">
          Пропустить
        </ui-button>
        <ui-button color="primary" variant="filled" type="submit">
          Далее
        </ui-button>
      </div>
    </submit-form>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

import { pageContextKey } from "~/injection-keys";
import { type PageData, type Step } from "~/pages/index.vue";

import MessengerItem from "~/components/organisms/messenger-item.vue";
import UiButton from "~/components/atoms/ui-button.vue";
import SubmitForm from "~/components/templates/submit-form.vue";

const { messengers, pageData, step } = inject(pageContextKey);

const skip = () => {
  console.log("skip not implemented");
};
</script>

<style lang="scss" scoped>
.select-messengers {
  &__headings {
    text-align: center;
    margin-bottom: 32px;

    & > *:not(:last-child) {
      margin-bottom: 12px;
    }

    @include mobile-up {
      margin-bottom: 48px;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 24px;

    & > * {
      width: 100%;
    }

    @include tablet-up {
      flex-direction: row;
      justify-content: center;

      & > * {
        width: 503px;
      }
    }
  }

  &__actions {
    --button-width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-top: 48px;

    @include mobile-up {
      flex-direction: row;

      & > *:not(:last-child) {
        margin-right: 24px;
      }
    }

    @include tablet-up {
      --button-width: 240px;

      & > *:not(:last-child) {
        margin-bottom: 0;
      }
    }

    & > *:not(:last-child) {
      margin-bottom: 12px;
    }
  }
}
</style>
