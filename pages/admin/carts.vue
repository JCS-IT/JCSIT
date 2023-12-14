<script setup lang="ts">
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import type { Cart, ConfigData, Floor } from "~/types";

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
    newFloors: [
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
</script>

<template>
  <NewCart />
  <table class="table table-zebra">
    <thead>
      <tr>
        <th>Cart</th>
        <th>Name</th>
        <th>Floor</th>
        <th>Room</th>
        <th>Color</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(_, i) in carts">
        <td>
          <InputBasic
            type="number"
            class="w-[70px]"
            placeholder="Cart ID"
            v-model="carts[i].id"
          />
        </td>
        <td>
          <InputBasic
            type="text"
            class="w-[10rem]"
            placeholder="Cart Name"
            v-model="carts[i].name"
          />
        </td>
        <td>
          <InputBasic
            type="number"
            placeholder="Floor"
            class="w-[5rem]"
            v-model="carts[i].location.floor"
          />
        </td>
        <td>
          <InputBasic
            type="text"
            placeholder="Room"
            class="w-[5.5rem]"
            v-model="carts[i].location.room"
          />
        </td>
        <td>
          <InputBasic
            type="text"
            placeholder="Color"
            class="w-[5.5rem]"
            v-model="carts[i].color"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
