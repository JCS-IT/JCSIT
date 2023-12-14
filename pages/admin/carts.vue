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
    <div class="flex flex-wrap gap-2">
      <div
        v-for="cart in floor.carts"
        class="card card-compact border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] max-w-sm"
      >
        <div class="card-body">
          <input type="text" placeholder="Cart Name" v-model="cart.name" />
          <div class="flex gap-1">
            <input
              type="text"
              placeholder="Cart Floor"
              v-model="cart.location.floor"
            />
            <input
              type="text"
              placeholder="Cart Room"
              v-model="cart.location.room"
            />
          </div>
          <input type="text" placeholder="Cart Number" v-model="cart.id" />
          <div class="flex">
            <input
              type="color"
              placeholder="Cart Color"
              v-model="cart.color.bg"
            />
            <input
              type="color"
              placeholder="Text Color"
              v-model="cart.color.bg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
