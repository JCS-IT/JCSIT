<script setup lang="ts">
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import type { Cart, ConfigData, Floor } from "~/types";

definePageMeta({
  middleware: "auth",
});

const floors = ref<Floor[]>([]);

const configRef = doc(useFirestore(), "global/config");

const configData = useDocument<ConfigData>(configRef);

watchEffect(() => {
  if (configData.value?.rooms) {
    floors.value = configData.value.floors;
  }
});

const addCart = async (cart: Cart) => {};

const removeCart = async (floor: Floor, cart: Cart) => {};
</script>

<template>
  <div v-for="floor in floors.toReversed()">
    <div class="divider">{{ floor.name }}</div>
    <div class="flex flex-wrap gap-2 justify-center max-w-3xl">
      <div
        v-for="cart in floor.carts"
        class="card card-compact border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] max-w-sm"
      >
        <div class="card-body">
          <input type="text" placeholder="Cart Name" v-model="cart.name" />
          <input
            type="text"
            placeholder="Cart Room"
            v-model="cart.location.room"
          />
          <input type="text" placeholder="Cart Number" v-model="cart.id" />
          <input type="text" placeholder="Cart Color" v-model="cart.color.bg" />
          <input
            type="text"
            placeholder="Text Color"
            v-model="cart.color.text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  @apply input input-bordered input-sm;
}
</style>
