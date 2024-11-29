<template>
  <div class="confirm-messenger">
    <div class="confirm-messenger__header">
      <nuxt-img
        class="confirm-messenger__icon"
        width="40"
        height="40"
        draggable="false"
        loading="lazy"
        :src="item.icon"
      />
      <span class="confirm-messenger__title">
        {{ item.name }}
      </span>
    </div>

    <hr class="confirm-messenger__splitter" />

    <span class="confirm-messenger__message">
      Откройте диалог с нашим ботом нажмите «Запуск», мы пришлём вам ответное
      сообщение
    </span>

    <hr
      :class="[
        'confirm-messenger__splitter',
        { 'confirm-messenger__splitter--no-bonus': !item.bonus },
      ]"
    />

    <bonus-badge v-if="item.bonus" />

    <ui-button
      class="confirm-messenger__link"
      href="https://google.com"
      target="_blank"
      variant="outline"
      color="primary"
    >
      Открыть диалог c ботом
    </ui-button>
  </div>
</template>

<script setup lang="ts">
import type { Messenger } from "~/entities/messenger";
import BonusBadge from "~/components/atoms/bonus-badge.vue";
import UiButton from "~/components/atoms/ui-button.vue";

interface Props {
  item: Omit<Messenger, "confirmed">;
}

withDefaults(defineProps<Props>(), {
  item: null,
});
</script>

<style lang="scss" scoped>
.confirm-messenger {
  border-radius: 28px;
  background: var(--c-white);
  padding: 16px;

  &__header {
    display: flex;
    align-items: center;
  }

  &__icon {
    width: 32px;
    height: 32px;

    @include mobile-up {
      width: 40px;
      height: 40px;
    }
  }

  &__splitter {
    margin: 16px 0;

    &--no-bonus {
      margin: 16px 0 48px 0;
    }
  }

  &__title {
    @include h5;

    margin-left: 12px;
  }

  &__message {
    @include h6;
  }

  &__link {
    --button-width: 100%;
    margin-top: 16px;

    @include mobile-up {
      margin-top: 18px;
    }
  }
}
</style>
