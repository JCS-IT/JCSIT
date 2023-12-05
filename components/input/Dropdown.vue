<script setup lang="ts">
const props = defineProps<{
  options: { label: string; value: string }[] | string[];
  placeholder?: string;
}>();

const modelValue = defineModel<string | null>({ default: "" });

const select = ref<HTMLSelectElement | null>(null);

const parsedOptions = computed(() => {
  return props.options.map((option) => {
    if (typeof option === "string") {
      return {
        label: option,
        value: option,
      };
    } else {
      return option;
    }
  });
});
</script>

<template>
  <select
    tabindex="0"
    v-model="modelValue"
    class="select select-bordered w-full"
    ref="select"
  >
    <option value="" disabled selected hidden>
      {{ placeholder || "Select an option" }}
    </option>
    <option
      v-for="option in parsedOptions"
      :key="option.value"
      tabindex="1"
      class="text-lg"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>
