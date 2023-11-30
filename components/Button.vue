<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean;
  tooltip?: string;
  ghost?: boolean;
  icon?: string;
}>();
const formattedTip = () => {
  if (!props.tooltip) return "";
  return props.tooltip
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
</script>

<template>
  <button
    class="btn"
    :class="{ 'btn-ghost': ghost }"
    :disabled="disabled"
    :title="formattedTip()"
    v-bind="$attrs"
  >
    <IconCSS :name="icon" v-if="icon" size="20" />
    <slot />
  </button>
</template>
