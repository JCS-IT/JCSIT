<script setup lang="ts">
// Composables

const props = defineProps<{
  top?: boolean;
  modelValue: string;
  options: string[];
  edit: boolean;
}>();

// data
const modelValue = defineModel<string>({ default: "" });

// Refs
const select = ref<HTMLSelectElement | null>(null);

// Computed
const filter = computed(() => {
  return props.options.filter((item) =>
    item.toLowerCase().includes(modelValue.value.toLowerCase())
  );
});

// methods
const isBottom = () => {
  if (select.value) {
    const { top, height } = select.value.getBoundingClientRect();

    return top + height > window.innerHeight / 2;
  }
};
</script>

<template>
  <div
    :class="`dropdown w-full ${isBottom() ? 'dropdown-top' : ''}`"
    v-if="edit"
    ref="select"
  >
    <input
      tabindex="0"
      type="search"
      class="input w-full input-bordered"
      v-model="modelValue"
    />
    <ul
      tabindex="1"
      class="p-2 shadow menu dropdown-content z-[1] bg-base-300 rounded-box w-52 max-w-full overflow-y-auto max-h-[20rem] grid grid-cols-1"
      v-if="options.length > 0 && modelValue !== filter[0] && filter.length > 0"
    >
      <li v-for="option in filter" :key="option">
        <button @click="modelValue = option">
          {{ option }}
        </button>
      </li>
    </ul>
  </div>
  <div v-else>
    {{ modelValue }}
  </div>
</template>
