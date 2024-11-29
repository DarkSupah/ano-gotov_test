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

    <div class="confirm-messengers__actions">
      <ui-button
        color="primary"
        variant="filled"
        type="submit"
        @click="step.next()"
      >
        Далее
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

import { pageContextKey } from "~/injection-keys";
import { type PageContext } from "~/pages/index.vue";

import ConfirmMessenger from "~/components/organisms/confirm-messenger.vue";
import UiButton from "~/components/atoms/ui-button.vue";

const { messengers, pageData, step } = inject<PageContext>(pageContextKey);

const selected = computed(() =>
  messengers.value?.filter(
    ({ id }) => pageData.value.messengers.get(id) === true
  )
);
</script>

<style lang="scss" scoped>
.confirm-messengers {
  &__heading {
    text-align: center;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 24px;

    margin-top: 32px;

    & > * {
      width: 100%;
    }

    @include mobile-up {
      margin-top: 48px;

      @include tablet-up {
        flex-direction: row;
        justify-content: center;

        & > * {
          width: 503px;
        }
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
