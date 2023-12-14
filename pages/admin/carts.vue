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
  <table class="table table-zebra">
    <thead>
      <tr>
        <th>Cart</th>
        <th>Floor</th>
        <th>Room</th>
        <th>Color</th>
        <th>Text Color</th>
      </tr>
    </thead>
  </table>
</template>

<style scoped>
input {
  @apply input input-bordered input-sm;
}
</style>
