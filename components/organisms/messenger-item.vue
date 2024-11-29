<template>
  <div class="messenger-item">
    <div class="messenger-item__header">
      <nuxt-img
        class="messenger-item__icon"
        width="40"
        height="40"
        draggable="false"
        loading="lazy"
        :src="item.icon"
      />
      <span class="messenger-item__title">
        {{ item.name }}
      </span>

      <ui-badge
        class="messenger-item__badge"
        v-if="item.confirmed"
        type="success"
      >
        Уже подтверждён
      </ui-badge>
    </div>

    <hr class="messenger-item__splitter" />

    <radio-group
      class="messenger-item__options"
      :options="options"
      :model-value="modelValue"
      :disabled="disabled"
      @update:model-value="$emit('update:model-value', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Messenger } from "~/entities/messenger";
import RadioGroup from "~/components/molecules/radio-group.vue";
import UiBadge from "~/components/atoms/ui-badge.vue";

interface Props {
  item: Omit<Messenger, "bonus", "link">;
  modelValue?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  item: null,
  modelValue: null,
  disabled: false,
});

const options = [
  {
    title: "Пользуюсь",
    value: true,
  },
  {
    title: "Не пользуюсь",
    value: false,
  },
];
</script>

<style lang="scss" scoped>
.messenger-item {
  border-radius: 28px;
  background: var(--c-white);
  padding: 16px;

  @include mobile-up {
    padding: 32px;
  }

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

    @include mobile-up {
      margin: 18px 0;
    }
  }

  &__title {
    @include h5;

    margin-left: 12px;
  }

  &__options {
    display: flex;
    align-items: center;

    & > *:not(:last-child) {
      margin-right: 24px;
    }
  }

  &__badge {
    margin-left: auto;
  }
}
</style>
