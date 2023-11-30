<script setup lang="ts">
const props = defineProps({
  name: String,
});

const mouse = useMouse();
</script>

<template>
  <div class="card" :class="`left-[${mouse.x}px] top-[${mouse.y}px]`">
    <div class="card-body">
      <div>
        <input
          type="text"
          class="input input-bordered"
          placeholder="Name"
          v-model="name"
        />
      </div>
    </div>
  </div>
</template>
