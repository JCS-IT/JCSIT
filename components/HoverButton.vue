<script setup lang="ts">
defineProps<{
  room: string;
}>();

const btnRef = ref<HTMLButtonElement | null>(null);
const isHovered = useElementHover(btnRef);
</script>

<template>
  <button class="btn hover:btn-error relative" ref="btnRef">
    <IconCSS
      name="mdi:delete"
      @click="$emit('click', room)"
      class="absolute"
      :class="{
        'opacity-0': !isHovered,
      }"
    />
    <span
      :class="{
        'opacity-0': isHovered,
      }"
    >
      {{ room }}
    </span>
  </button>
</template>
