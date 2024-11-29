<template>
  <div class="index-page">
    <div class="container">
      <transition name="slide" :duration="500" mode="out-in">
        <component :is="view" />
      </transition>

      <div class="index-page__actions">
        <ui-button
          v-if="step.canSkip"
          variant="outline"
          color="primary"
          @click="skip()"
        >
          Пропустить
        </ui-button>
        <ui-button color="primary" variant="filled" @click="step.next()">
          Далее
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pageContextKey } from "~/injection-keys";
import { type Component, type Ref, type ComputedRef } from "vue";
import type { Messenger } from "~/entities/messenger";

import { getMessengers } from "~/api/messengers";
import UiButton from "~/components/atoms/ui-button.vue";

import SelectMessengers from "~/components/pages/select-messengers.vue";
import ConfirmMessengers from "~/components/pages/confirm-messengers.vue";

export interface Step {
  component: Component;
  canSkip?: boolean;
  next?: () => {};
  back?: () => {};
}

export interface PageData {
  messengers: Map<string, boolean | null>;
}

export interface PageContext {
  pageData: Ref<PageData>;
  messengers: ComputedRef<Messenger[]>;
  step: Ref<Step>;
}

const { data: messengers } = await useAsyncData<Messenger[]>(
  "messengers",
  getMessengers
);

const pageData = ref<PageData>({
  messengers: new Map<string, boolean | null>(
    messengers.value
      ?.filter(({ confirmed }) => !confirmed)
      .map(({ id }) => [id, null])
  ),
});

const STEPS: Record<string, Step> = {
  "select-messengers": {
    component: SelectMessengers,
    canSkip: true,
    next: () => {
      step.value = STEPS["confirm-messengers"];
    },
  } as Step,
  "confirm-messengers": {
    component: ConfirmMessengers,
    next: () => {
      console.log("finish");
    },
  } as Step,
};

const step = shallowRef<Step>(STEPS["select-messengers"]);

provide(pageContextKey, {
  pageData,
  step,
  messengers: computed(() => messengers.value),
});

const view: ComputedRef<Component> = computed<Component>(
  () => step.value?.component
);

const skip = () => {
  console.log("skip not implemented");
};
</script>

<style lang="scss" scoped>
.index-page {
  padding: 32px 0;

  @include tablet-only {
    padding: 80px 0;
  }

  @include tablet-up {
    padding: 43px 0 112px;
  }

  &__actions {
    --button-width: 100%;

    display: flex;
    flex-direction: column;
    margin-top: 48px;

    @include mobile-up {
      flex-direction: row;

      & > *:not(:last-child) {
        margin-right: 24px;
      }
    }

    & > *:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  @include tablet-only {
    --container-width: 503px;
  }

  @include tablet-up {
    --container-width: 1569px;
  }
}
</style>
