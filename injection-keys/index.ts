import type { InjectionKey } from "vue";
import { PageContext } from "~/pages/index.vue";

export const pageContextKey = Symbol("page-data") as InjectionKey<PageContext>;
