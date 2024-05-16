<script setup lang="ts">
import { doc, updateDoc } from "firebase/firestore";
import type { Cart, ConfigData } from "~/types";

definePageMeta({
  middleware: "auth",
});

const carts = ref<Cart[]>([]);

const configRef = doc(useFirestore(), "global/config");

const configData = useDocument<ConfigData>(configRef);

watchEffect(() => {
  if (configData.value?.floors) {
    const floors = configData.value.floors;
    const allCarts = floors.flatMap((floor) => floor.carts);
    carts.value = allCarts;
  }
});

const updateCarts = async () => {
  await updateDoc(configRef, {
    floors: [
      {
        name: "Main Floor",
        carts: carts.value.filter((cart) => cart.location.floor == 1),
      },
      {
        name: "Second Floor",
        carts: carts.value.filter((cart) => cart.location.floor == 2),
      },
      {
        name: "Third Floor",
        carts: carts.value.filter((cart) => cart.location.floor == 3),
      },
    ],
  });
};
const { width } = useWindowSize();
</script>

<template>
  <NewCart @submit="(d) => carts.push(d)" />
  <button class="btn btn-primary" @click="updateCarts()">Save Changes</button>

  <div class="grid gap-2">
    <div
      class="grid sm:grid-cols-[4.5rem_10rem_4.5rem_7rem_5.5rem_1fr] ml-2"
      v-if="width > 640"
    >
      <span
        v-for="text in ['number', 'name', 'floor', 'room', 'color (hex)']"
        class="capitalize text-xs text-[var(--fallback-bc,oklch(var(--bc)/0.6))] font-extrabold"
      >
        {{ text }}
      </span>
    </div>
    <div
      v-for="(_, i) in carts.sort((a, b) => a.id - b.id)"
      class="grid sm:grid-cols-[4.5rem_10rem_4.5rem_7rem_5.5rem_1fr] odd:bg-base-200 join max-sm:join-vertical"
    >
      <label class="form-control join-item w-full">
        <input
          type="number"
          class="input input-bordered bg-inherit join-item"
          min="1"
          max="99"
          v-model="carts[i].id"
          title="Cart Number"
        />
      </label>
      <input
        type="text"
        class="input input-bordered bg-inherit join-item"
        placeholder="Cart Name"
        v-model="carts[i].name"
        title="Cart Name"
      />
      <input
        type="number"
        class="input input-bordered bg-inherit join-item"
        min="1"
        max="3"
        v-model="carts[i].location.floor"
      />
      <input
        type="text"
        class="input input-bordered bg-inherit join-item"
        placeholder="Room"
        v-model="carts[i].location.room"
        title="Room"
      />
      <input
        type="color"
        class="input input-bordered bg-inherit join-item w-full"
        title="Color (HEX)"
        v-model="carts[i].color"
      />
      <button
        class="btn btn-ghost join-item input-bordered"
        @click="
          carts.splice(i, 1);
          updateCarts();
        "
      >
        <IconCSS name="mdi:delete" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.grid-cols {
  @apply grid-cols-[4.5rem_10rem_4.5rem_7rem_5.5rem_1fr];
}
</style>
