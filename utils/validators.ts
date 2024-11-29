import { isEmptyValue } from "~/utils/helpers";

export interface RequiredOptions {
  message?: string;
}

export const validators: Record<string, any> = {
  required: (
    val: unknown,
    options: RequiredOptions = { message: "Поле обязательно" }
  ) => {
    return !isEmptyValue(val) || options.message;
  },
};
