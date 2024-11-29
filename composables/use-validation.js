import { computed } from "vue";
import { useField } from "vee-validate";
import { defineRule } from "vee-validate";
import { isEmptyValue } from "~/utils/helpers";

import { validators } from "~/utils/validators";

Object.entries(validators).forEach(([key, value]) => {
  defineRule(key, value);
});

export const useValidation = ({ name, rules, modelValue, modelPropName }) => {
  const {
    value,
    errorMessage,
    meta,
    validate,
    handleChange,
    handleBlur,
    setValue,
  } = useField(!isEmptyValue(name) ? name : "name-unset", rules, {
    validateOnValueUpdate: false,
    modelPropName,
    initialValue: !isEmptyValue(modelValue.value)
      ? modelValue.value
      : undefined,
    syncVModel: true,
  });

  const hasError = computed(() => !!errorMessage.value);

  return {
    value,
    errorMessage,
    hasError,
    validate,
    handleChange,
    handleBlur,
    setValue,
    meta,
  };
};
