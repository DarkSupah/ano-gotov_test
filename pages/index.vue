<template>
  <div class="index-page">
    <div class="container">
      <transition name="slide" :duration="350" mode="out-in">
        <component :is="view" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pageContextKey } from "~/injection-keys";
import {
  type Ref,
  type ComputedRef,
  type DefineComponent,
  shallowRef,
  ref,
  provide,
  computed,
} from "vue";
import type { Messenger } from "~/entities/messenger";

import { getMessengers } from "~/api/messengers";

import SelectMessengers from "~/components/pages/select-messengers.vue";
import ConfirmMessengers from "~/components/pages/confirm-messengers.vue";

export interface Step {
  component: DefineComponent;
  next?: () => {};
  back?: () => {};
}

export interface PageData {
  messengers: Map<string, boolean | null>;
}

export interface PageContext {
  pageData: Ref<PageData>;
  messengers: ComputedRef<Messenger[] | null>;
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

const view = computed<DefineComponent>(() => step.value?.component);
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

  @include tablet-only {
    --container-width: 503px;
  }

  @include tablet-up {
    --container-width: 1609px;
  }
}
</style>
