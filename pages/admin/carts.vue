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
  <div class="grid gap-2">
    <div class="flex">
      <span class="text-sm w-[4.5rem]">Number</span>
      <span class="text-sm w-[10rem]">Name</span>
      <span class="text-sm w-[80px]">Floor</span>
      <span class="text-sm w-[88px]">Room</span>
      <span class="text-sm w-[84px]">Color</span>
    </div>
    <div v-for="(_, i) in carts" class="even:bg-base-200 rounded-md join">
      <InputBasic
        type="number"
        class="bg-inherit w-[4.5rem] join-item"
        min="1"
        max="99"
        v-model="carts[i].id"
      />
      <InputBasic
        type="text"
        class="bg-inherit w-[10rem] join-item"
        placeholder="Cart Name"
        v-model="carts[i].name"
      />
      <InputBasic
        type="number"
        class="bg-inherit w-[5rem] join-item"
        min="1"
        max="3"
        v-model="carts[i].location.floor"
      />
      <InputBasic
        type="text"
        class="bg-inherit w-[5.5rem] join-item"
        placeholder="Room"
        v-model="carts[i].location.room"
      />
      <InputBasic
        type="text"
        class="bg-inherit w-[5.5rem] join-item"
        placeholder="Color"
        v-model="carts[i].color"
      />
    </div>
  </div>
</template>
