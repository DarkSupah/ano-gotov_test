<template>
  <div class="select-messengers">
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
        :item="messenger"
        :disabled="messenger.confirmed"
        :model-value="pageData.messengers.get(messenger.id)"
        @update:model-value="pageData.messengers.set(messenger.id, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { pageContextKey } from "~/injection-keys";
import { PageData, Step } from "~/pages/index.vue";

import MessengerItem from "~/components/organisms/messenger-item.vue";

const { messengers, pageData } = inject(pageContextKey);
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;

    @include tablet-up {
      grid-auto-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
