<template>
  <div class="confirm-messengers">
    <h1 class="confirm-messengers__heading h4">
      Для того чтобы мы могли присылать вам уведомления<br
        class="mobile-only"
      />
      о мероприятиях, подтвердите хотя бы один способ связи с вами.
    </h1>

    <div class="confirm-messengers__items">
      <confirm-messenger
        v-for="messenger in selected"
        :key="messenger.id"
        :item="messenger"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { pageContextKey } from "~/injection-keys";
import { type PageContext } from "~/pages/index.vue";

import ConfirmMessenger from "~/components/organisms/confirm-messenger.vue";

const ctx = inject<PageContext>(pageContextKey);

const selected = computed(() =>
  ctx?.messengers.value?.filter(
    ({ id }) => ctx?.pageData.value.messengers.get(id) === true
  )
);
</script>

<style lang="scss" scoped>
.confirm-messengers {
  &__heading {
    text-align: center;
  }

  &__items {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;

    margin-top: 32px;

    @include mobile-up {
      margin-top: 48px;
    }
  }
}
</style>
